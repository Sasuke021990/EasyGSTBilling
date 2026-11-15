// Support & About (EasyGSTBilling). The upstream donation UPI, star banner and
// supporter list were removed in the rebrand. One credit line kept per the MIT
// licence of the app this is based on.
import { Mail, Globe, Code, Wrench, Database, LifeBuoy, Bot, Smartphone, Workflow, Heart } from 'lucide-react';
import WhatsNew from './WhatsNew';
import ProblemLog from './ProblemLog';
import HelpButton from './HelpButton';
import { SafePrivateSection } from './SafePrivateNote';

const REPO = 'https://github.com/Sasuke021990/EasyGSTBilling';
const EMAIL = 'contact@easygstbilling.com';
const SITE = 'https://easygstbilling.com';

const SERVICES = [
  { icon: Code, title: 'Custom software & web apps', text: 'Websites, web apps and business tools built for how you work.' },
  { icon: Wrench, title: 'Customising this app', text: 'Your own invoice layout, reports or features in EasyGSTBilling.' },
  { icon: Database, title: 'Setup & data migration', text: 'Installation, moving your data from Tally or Excel, and training.' },
  { icon: LifeBuoy, title: 'Support plans for businesses', text: 'Priority help and updates on a yearly plan.' },
  { icon: Bot, title: 'AI integration', text: 'Add AI to your product: assistants, document reading, smart search.' },
  { icon: Workflow, title: 'AI automation', text: 'Automate the repetitive work in the software you already use.' },
  { icon: Smartphone, title: 'Mobile apps', text: 'Android and iPhone apps for your business or customers.' },
];

export default function SupportView() {
  const card = { padding: '1.25rem 1.5rem' };

  return (
    <div className="dashboard-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">About &amp; Support <HelpButton title="About & Support" doc="support" size={16} style={{ marginLeft: 6 }} /></h1>
          <p className="page-subtitle">Who makes EasyGSTBilling, and how to get help</p>
        </div>
      </div>

      <div className="glass-panel" style={{ ...card, marginBottom: '1.25rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
        <Heart size={28} style={{ color: '#e11d48', flexShrink: 0, marginTop: 2 }} />
        <div>
          <h3 style={{ margin: '0 0 0.4rem', fontSize: '1.05rem' }}>Free, and it stays free <HelpButton title="Free, and it stays free" doc="support#about" size={16} /></h3>
          <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '70ch' }}>
            EasyGSTBilling is built and maintained by <b>EasyGSTBilling</b>. No ads, no account, no locked features,
            and your invoices never leave this computer.
          </p>
          <p style={{ margin: '0.6rem 0 0', fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: '70ch' }}>
            EasyGSTBilling is based on Free GST Billing Software by DiceCodes, released under the MIT licence.
          </p>
        </div>
      </div>

      <SafePrivateSection style={{ marginBottom: '1.25rem' }} />

      <WhatsNew />

      <ProblemLog />

      <div className="glass-panel" style={card}>
        <h3 style={{ margin: '0 0 0.25rem', fontSize: '1rem' }}>Work with EasyGSTBilling <HelpButton title="Work with EasyGSTBilling" doc="support#services" size={16} /></h3>
        <p style={{ margin: '0 0 1rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>The team behind this app builds software for businesses too.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem', marginBottom: '1.1rem' }}>
          {SERVICES.map((w) => (
            <div key={w.title} style={{ display: 'flex', gap: '0.7rem', padding: '0.85rem', borderRadius: 8, background: 'var(--bg-secondary)' }}>
              <w.icon size={20} style={{ color: 'var(--primary)', flexShrink: 0, marginTop: 2 }} />
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>{w.title}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.15rem', lineHeight: 1.45 }}>{w.text}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
          <a className="btn btn-primary" href={`mailto:${EMAIL}?subject=${encodeURIComponent('Project enquiry (from EasyGSTBilling)')}`}>
            <Mail size={16} /> Email {EMAIL}
          </a>
          <a className="btn btn-secondary" href={SITE} target="_blank" rel="noopener noreferrer"><Globe size={16} /> easygstbilling.com</a>
        </div>
      </div>
    </div>
  );
}
