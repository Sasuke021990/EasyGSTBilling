#!/bin/sh
# EasyGSTBilling - builds the .deb and the AppImage. Runs INSIDE a
# debian:bookworm-slim container started by scripts/build-linux.mjs:
#   /work/app             the staged app (server.js, dist, node_modules ...)
#   /work/node.tar.gz     Node.js linux-x64 (SHA256 checked by build-linux.mjs)
#   /work/appimagetool    appimagetool + /work/runtime-x86_64 (checked too)
#   /work/packaging       the packaging/ folder
# Writes /work/out/. Arguments: deb and/or appimage. Env: VERSION.
set -eu
V=${VERSION:?}
P=/work/packaging/linux
A=/build/app
rm -rf /build && mkdir -p /build /work/out

# --- The program tree: what goes to /opt/easygstbilling ---
cp -r /work/app "$A"
tar -xzf /work/node.tar.gz -C /build
mkdir -p "$A/node/bin" "$A/linux"
cp /build/node-v*-linux-x64/bin/node "$A/node/bin/node"
cp /build/node-v*-linux-x64/LICENSE "$A/node/LICENSE"
cp "$P/easygstbilling" "$A/easygstbilling"
cp "$P/old-installs.mjs" "$A/linux/old-installs.mjs"
# Files from Windows carry no Unix modes: set them all.
find "$A" -type d -exec chmod 755 {} +
find "$A" -type f -exec chmod 644 {} +
chmod 755 "$A/node/bin/node" "$A/easygstbilling" "$A"/*.sh
"$A/node/bin/node" -e 'process.exit(process.versions.node.startsWith("20.") ? 0 : 1)'
# A program file with Windows line endings fails on Linux.
if grep -rlI "$(printf '\r')" "$A/easygstbilling" "$A/linux" "$A"/*.sh; then echo 'CRLF line endings found' >&2; exit 1; fi

build_deb() {
  R=/build/deb
  O=/work/out/easygstbilling_${V}_amd64.deb
  rm -rf "$R"
  mkdir -p "$R/DEBIAN" "$R/opt" "$R/usr/bin" "$R/usr/share/applications" "$R/usr/share/doc/easygstbilling" \
    "$R/usr/share/icons/hicolor/512x512/apps" "$R/usr/share/icons/hicolor/192x192/apps"
  cp -a "$A" "$R/opt/easygstbilling"
  echo deb > "$R/opt/easygstbilling/install-kind.txt"
  ln -s /opt/Sasuke021990/EasyGSTBilling "$R/usr/bin/easygstbilling"
  install -m 644 "$P/easygstbilling.desktop" "$R/usr/share/applications/com.easygstbilling.easygstbilling.desktop"
  install -m 644 "$A/dist/icons/icon-512.png" "$R/usr/share/icons/hicolor/512x512/apps/easygstbilling.png"
  install -m 644 "$A/dist/icons/icon-192.png" "$R/usr/share/icons/hicolor/192x192/apps/easygstbilling.png"
  install -m 644 "$A/LICENSE" "$R/usr/share/doc/easygstbilling/copyright"
  # No maintainer scripts: installing and removing touch no one's home
  # folder, start nothing and ask nothing. dpkg's own triggers refresh the menu.
  cat > "$R/DEBIAN/control" <<EOF
Package: easygstbilling
Version: $V
Architecture: amd64
Maintainer: EasyGSTBilling <support@easygstbilling.com>
Installed-Size: $(du -sk "$R/opt" "$R/usr" | awk '{s += $1} END {print s}')
Section: misc
Priority: optional
Recommends: xdg-utils, zip
Homepage: https://github.com/Sasuke021990/EasyGSTBilling
Description: EasyGSTBilling invoicing software for India
 GST tax invoices, credit notes, delivery challans, GSTR-1 / GSTR-3B
 exports, e-Way Bill and reports. Runs on this computer only (127.0.0.1)
 and keeps each user's books in ~/.local/share/easygstbilling-data.
 Removing the package never deletes the books.
EOF
  dpkg-deb --root-owner-group -Zxz --build "$R" "$O"
  dpkg-deb --info "$O" > /dev/null
  echo "built $O"
}

build_appimage() {
  D=/build/AppDir
  O=/work/out/EasyGSTBilling-Linux-x86_64.AppImage
  rm -rf "$D"
  cp -a "$A" "$D"
  echo appimage > "$D/install-kind.txt"
  ln -s easygstbilling "$D/AppRun"
  install -m 644 "$P/easygstbilling.desktop" "$D/easygstbilling.desktop"
  install -m 644 "$A/dist/icons/icon-512.png" "$D/easygstbilling.png"
  ln -s easygstbilling.png "$D/.DirIcon"
  install -m 755 /work/appimagetool /build/appimagetool
  # appimagetool refuses to start without the `file` command, which the slim
  # image lacks; ARCH is given, so it only needs one that answers.
  # ponytail: shim instead of apt-get install file (no extra download); use a
  # base image with `file` if appimagetool ever reads its output.
  if ! command -v file >/dev/null 2>&1; then
    mkdir -p /build/bin
    printf '#!/bin/sh\nfor f; do echo "$f: ELF 64-bit LSB executable, x86-64"; done\n' > /build/bin/file
    chmod 755 /build/bin/file
    PATH=/build/bin:$PATH
  fi
  (cd /build && ARCH=x86_64 ./appimagetool --appimage-extract-and-run --no-appstream \
    --runtime-file /work/runtime-x86_64 "$D" "$O")
  chmod 755 "$O"
  echo "built $O"
}

for t in "$@"; do
  case $t in
    deb) build_deb ;;
    appimage) build_appimage ;;
    *) echo "unknown target: $t" >&2; exit 2 ;;
  esac
done
