import { Link } from "react-router-dom";

const footerGroups = [
  ["Platform", ["Stocks", "Mutual Funds", "Banking", "KYC", "SIP Simulator"]],
  ["Operations", ["RTA Console", "AMC Desk", "Audit Trail", "OCR Review", "Folio Records"]],
  ["Resources", ["Risk Disclosure", "Demo Data", "API Status", "Security", "Support"]]
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <section className="footer-brand">
          <Link to="/dashboard" className="footer-logo" aria-label="Finboard home">
            <span />
            <strong>Finboard</strong>
          </Link>
          <p>
            A simulated investor onboarding, KYC, banking, RTA, AMC, and market operations platform for learning enterprise fintech workflows.
          </p>
          <div className="footer-status-grid">
            <span>MongoDB Auth</span>
            <span>PostgreSQL Banking</span>
            <span>OCR Assisted KYC</span>
          </div>
        </section>

        <nav className="footer-links" aria-label="Footer navigation">
          {footerGroups.map(([title, links]) => (
            <div key={title}>
              <strong>{title}</strong>
              {links.map((label) => (
                <Link to={label === "Banking" ? "/banking" : label === "KYC" ? "/kyc" : "/dashboard"} key={label}>
                  {label}
                </Link>
              ))}
            </div>
          ))}
        </nav>
      </div>
      <div className="footer-bottom">
        <span>Finboard Simulation Suite</span>
        <span>For demo and education only. No real bank, exchange, broker, RTA, or AMC integration.</span>
      </div>
    </footer>
  );
}
