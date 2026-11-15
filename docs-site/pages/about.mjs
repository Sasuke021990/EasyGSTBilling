// About & Support - the docs-site twin of the app's About & Support page
// (src/components/SupportView.jsx). Keep the two saying the same things.
// The upstream donation UPI, star banner and supporter list were removed in
// the EasyGSTBilling rebrand.
import { SITE } from '../site.mjs';

const SERVICES = [
  ['Custom software &amp; web apps', 'Websites, web apps and business tools built for how you work.'],
  ['Customising this app', 'Your own invoice layout, reports or features in EasyGSTBilling.'],
  ['Setup &amp; data migration', 'Installation, moving your data from Tally or Excel, and training.'],
  ['Support plans for businesses', 'Priority help and updates on a yearly plan.'],
  ['AI integration', 'Add AI to your product: assistants, document reading, smart search.'],
  ['AI automation', 'Automate the repetitive work in the software you already use.'],
  ['Mobile apps', 'Android and iPhone apps for your business or customers.'],
];

export default [
{
  slug: 'support',
  title: 'About & Support',
  nav: 'About & Support',
  lead: 'Who makes EasyGSTBilling, what it does for businesses, and how to get help.',
  body: `
<section id="about">
<h2>Free, and it stays free</h2>
<p>EasyGSTBilling is built and maintained by <a href="${SITE.publisher.url}">EasyGSTBilling</a>. No ads, no account, no locked features, and your invoices never leave your computer. The full source code is on <a href="${SITE.repo}">GitHub</a>, so anyone can read what the app does.</p>
<p><b>Safe and private</b> lists what happens to your data: it stays on this computer, no account, works offline, no tracking, other computers cannot open it, source you can read, a safe install, daily backups, the PIN lock, problem reports, security fixes, and your part. Each point opens its part of <a href="security.html">Is it safe? Security and privacy</a>.</p>
<p>EasyGSTBilling is based on Free GST Billing Software by DiceCodes, released under the MIT licence.</p>
</section>

<section id="services">
<h2>Work with EasyGSTBilling</h2>
<p>The team behind this app builds software for businesses too.</p>
<ul>
${SERVICES.map(([t, d]) => `  <li><b>${t}</b> - ${d}</li>`).join('\n')}
</ul>
<p>Email <a href="mailto:contact@easygstbilling.com">contact@easygstbilling.com</a> or visit <a href="${SITE.publisher.url}">easygstbilling.com</a>.</p>
</section>

<section id="help">
<h2>Something wrong?</h2>
<ul>
  <li><b>Report a bug or ask for a feature</b> on <a href="${SITE.repo}/issues/new/choose">GitHub</a>. Many features started as a request.</li>
  <li><b>Tell another business</b> - the app is free and works offline, so a friend can just try it.</li>
</ul>
</section>

<section id="weekly">
<h2>Saturday updates</h2>
<p>Problems are fixed in an update most Saturdays, and anything urgent, such as the app not opening, sooner. The app tells you when an update is out and asks before installing it, or download the newest release from <a href="${SITE.repo}/releases">GitHub</a>.</p>
</section>

<section id="whats-new">
<h2>What's new</h2>
<p>The About &amp; Support page shows what changed in the last few versions, newest first: a one-line summary for each, then its <b>Added</b>, <b>Improved</b> and <b>Fixed</b> lists. Older versions are in the <a href="${SITE.repo}/blob/main/CHANGELOG.md">changelog on GitHub</a>.</p>
</section>
`,
},
];
