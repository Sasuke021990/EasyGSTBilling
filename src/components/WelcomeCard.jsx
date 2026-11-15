// v1.10.81 - a welcome for new users at the top of the Dashboard (asked for by
// the maintainer): thanks them, and whoever told them about the app, says it
// is free for good, and that support of any amount is welcome but never
// needed. On the page, not a popup; shown until closed and only while the
// business has fewer than 10 invoices (from 10 the daily support card takes
// over, so the two never show together).
import { useState } from 'react';
import { Heart, Share2, X } from 'lucide-react';
// The welcome card steps aside once the user knows the app (was
// SUPPORT_NUDGE_MIN_INVOICES in the removed supporters module).
const WELCOME_CARD_MAX_INVOICES = 10;
import HelpButton from './HelpButton';

const KEY = 'easygstbill_welcomeCard';
const SHARE_TEXT = 'I use EasyGSTBilling for my GST invoices. It is free, works offline and keeps the data on your own PC: https://github.com/Sasuke021990/EasyGSTBilling';

const isClosed = () => { try { return localStorage.getItem(KEY) === 'closed'; } catch { return false; } };

export default function WelcomeCard({ invoiceCount, onOpenSupport }) {
  const [closed, setClosed] = useState(isClosed);
  if (closed || invoiceCount >= WELCOME_CARD_MAX_INVOICES) return null;
  const close = () => {
    try { localStorage.setItem(KEY, 'closed'); } catch { /* private mode */ }
    setClosed(true);
  };
  return (
    <section className="welcome-card" aria-labelledby="welcome-card-title">
      <button type="button" className="welcome-card-close" onClick={close} aria-label="Close the welcome note">
        <X size={18} />
      </button>
      <h2 id="welcome-card-title">Thank you for choosing EasyGSTBilling <HelpButton title="The welcome note" doc="dashboard#welcome-card" size={16} /></h2>
      <p className="welcome-card-lead">
        And thank you to whoever told you about it. This app grows
        because shop owners, accountants and CAs recommend it to each other.
      </p>
      <ul className="welcome-card-points">
        <li><strong>Free, for good.</strong> No subscription, no ads, no locked features.</li>
        <li><strong>Your data stays yours.</strong> Everything is saved on this PC and works offline.</li>
        <li><strong>A new update every Saturday.</strong> Fixes and new features each week; tell us what you need on GitHub (Support &amp; About).</li>
        <li><strong>Help is here when you need it.</strong> Bug reports and ideas on GitHub are always welcome (About &amp; Support).</li>
      </ul>
      <div className="welcome-card-actions">
        <button type="button" className="welcome-card-btn welcome-card-btn-primary" onClick={onOpenSupport}>
          <Heart size={16} /> About &amp; Support
        </button>
        <a className="welcome-card-btn" href={`https://wa.me/?text=${encodeURIComponent(SHARE_TEXT)}`} target="_blank" rel="noopener noreferrer">
          <Share2 size={16} /> Share on WhatsApp
        </a>
        <button type="button" className="welcome-card-btn welcome-card-btn-quiet" onClick={close}>Start billing</button>
      </div>
    </section>
  );
}
