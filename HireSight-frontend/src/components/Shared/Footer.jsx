import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={styles.footer}>
      <div style={styles.mainContainer}>
      
        <div style={styles.linksGrid}>

          <div style={styles.brandColumn}>
            <h4 style={styles.brandText}>
              Job<span style={styles.brandAccent}>Pipeline</span>
            </h4>
            <p style={styles.description}>
              An intelligent, full-stack application pipeline assistant engineered to streamline career tracking through automated data extraction.
            </p>
          </div>

          <div style={styles.linkColumn}>
            <h5 style={styles.columnTitle}>Platform</h5>
            <Link to="/dashboard" style={styles.footerLink}>Kanban Workspace</Link>
            <Link to="/profile" style={styles.footerLink}>Account Profile</Link>
            <Link to="/login" style={styles.footerLink}>Authentication Portal</Link>
          </div>

          <div style={styles.linkColumn}>
            <h5 style={styles.columnTitle}>System Stack</h5>
            <span style={styles.staticText}>React Engine</span>
            <span style={styles.staticText}>Node.js / Express API</span>
            <span style={styles.staticText}>MongoDB Persistence</span>
            <span style={styles.staticText}>LLM Orchestration Layer</span>
          </div>

<div style={styles.linkColumn}>
  <h5 style={styles.columnTitle}>Developer</h5>
  
  <a 
    href="https://github.com/Cyril-Cristo-Johns" 
    target="_blank" 
    rel="noreferrer" 
    style={styles.footerLink}
    onMouseEnter={(e) => e.target.style.color = '#0f172a'}
    onMouseLeave={(e) => e.target.style.color = '#64748b'}
  >
    GitHub Profile
  </a>
  
  <a 
    href="https://www.linkedin.com/in/cyril-cristo-johns-539a75200/" 
    target="_blank" 
    rel="noreferrer" 
    style={styles.footerLink}
    onMouseEnter={(e) => e.target.style.color = '#0284c7'}
    onMouseLeave={(e) => e.target.style.color = '#64748b'}
  >
    LinkedIn Connect
  </a>

</div>


        </div>

        <div style={styles.bottomBar}>
          <p style={styles.copyrightText}>
            © {currentYear} JobPipeline Workspace. System engineered with secure JWT authorization protocols.
          </p>
          <div style={styles.statusGroup}>
            <span style={styles.statusDot}></span>
            <span style={styles.statusText}>API Core Operational</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

const styles = {
  footer: {
    width: '100%',
    boxSizing: 'border-box',
    backgroundColor: '#ffffff',
    borderTop: '1px solid #e2e8f0',
    marginTop: 'auto', 
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  mainContainer: {
    maxWidth: '1400px', 
    margin: '0 auto',
    padding: '48px 24px 24px 24px', 
    display: 'flex',
    flexDirection: 'column',
    gap: '40px',
  },
  linksGrid: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    gap: '32px',
  },
  brandColumn: {
    flex: '2 1 280px', 
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  brandText: {
    margin: 0,
    fontSize: '16px',
    fontWeight: '700',
    color: '#0f172a',
    letterSpacing: '-0.02em',
  },
  brandAccent: {
    color: '#2563eb',
  },
  description: {
    margin: 0,
    fontSize: '13px',
    color: '#64748b',
    lineHeight: '1.6',
    maxWidth: '320px',
  },
  linkColumn: {
    flex: '1 1 160px', 
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  columnTitle: {
    margin: '0 0 4px 0',
    fontSize: '12px',
    fontWeight: '700',
    color: '#475569',
    textTransform: 'uppercase', 
    letterSpacing: '0.05em',
  },
  footerLink: {
    fontSize: '13px',
    color: '#64748b',
    textDecoration: 'none',
    fontWeight: '500',
    transition: 'color 0.15s ease',
  },
  staticText: {
    fontSize: '13px',
    color: '#94a3b8', 
    fontWeight: '400',
  },
  bottomBar: {
    borderTop: '1px solid #f1f5f9',
    paddingTop: '24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '16px',
  },
  copyrightText: {
    margin: 0,
    fontSize: '12px',
    color: '#94a3b8',
  },
  statusGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  statusDot: {
    width: '6px',
    height: '6px',
    backgroundColor: '#10b981', 
    borderRadius: '50%',
  },
  statusText: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#64748b',
  },
};

export default Footer;
