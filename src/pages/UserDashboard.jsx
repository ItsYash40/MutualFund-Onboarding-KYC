import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axiosInstance';
import styles from './Dashboard.module.css';

// Maps kycStatus value → label + CSS class
const STATUS_MAP = {
  not_submitted: { label: 'Not submitted', cls: 'statusNone'     },
  pending:       { label: 'Under review',  cls: 'statusPending'  },
  approved:      { label: 'Approved',      cls: 'statusApproved' },
  rejected:      { label: 'Rejected',      cls: 'statusRejected' },
};

const UserDashboard = () => {
  const navigate      = useNavigate();
  const { user, logout } = useAuth();

  const [kycData, setKycData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const { data } = await api.get('/kyc/status');
        setKycData(data.kyc);
      } catch {
        // If no KYC record exists yet, that's fine — status stays null
        setKycData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchStatus();
  }, []);

  const status = STATUS_MAP[kycData?.status || 'not_submitted'];

  return (
    <div className={styles.dashPage}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarLogo}>
          <div className={styles.logoMark}>
            <i className="ti ti-building-bank" aria-hidden="true" />
          </div>
          <span className={styles.logoText}>KYC Platform</span>
        </div>
        <nav className={styles.sidebarNav}>
          <button className={`${styles.navItem} ${styles.navItemActive}`}>
            <i className="ti ti-layout-dashboard" aria-hidden="true" /> Dashboard
          </button>
          <button className={styles.navItem} onClick={() => navigate('/kyc-form')}>
            <i className="ti ti-file-upload" aria-hidden="true" /> KYC Upload
          </button>
        </nav>
        <button className={styles.navItemBottom} onClick={() => { logout(); navigate('/login'); }}>
          <i className="ti ti-logout" aria-hidden="true" /> Sign out
        </button>
      </aside>

      {/* Main */}
      <main className={styles.main}>
        <div className={styles.topbar}>
          <h1 className={styles.pageHead}>My Dashboard</h1>
          <div className={styles.userChip}>
            <div className={styles.avatar}>{user?.name?.[0]?.toUpperCase()}</div>
            <span>{user?.name}</span>
          </div>
        </div>

        {loading ? (
          <p className={styles.loadingText}>Loading your KYC status…</p>
        ) : (
          <>
            {/* Stat cards */}
            <div className={styles.statGrid}>
              <div className={styles.statCard}>
                <p className={styles.statLabel}>KYC Status</p>
                <p className={`${styles.statValue} ${styles[status.cls]}`}>{status.label}</p>
              </div>
              <div className={styles.statCard}>
                <p className={styles.statLabel}>Documents uploaded</p>
                <p className={`${styles.statValue} ${styles.statGreen}`}>
                  {kycData ? '2 / 2' : '0 / 2'}
                </p>
              </div>
              <div className={styles.statCard}>
                <p className={styles.statLabel}>Submitted on</p>
                <p className={styles.statValue}>
                  {kycData?.submittedAt
                    ? new Date(kycData.submittedAt).toLocaleDateString('en-IN')
                    : '—'}
                </p>
              </div>
            </div>

            {/* KYC status card */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>KYC Verification Status</h2>
                <span className={`${styles.badge} ${styles[status.cls]}`}>{status.label}</span>
              </div>

              {!kycData && (
                <div className={styles.emptyState}>
                  <i className="ti ti-file-upload" aria-hidden="true" />
                  <p>You haven't submitted your KYC documents yet.</p>
                  <button className={styles.actionBtn} onClick={() => navigate('/kyc-form')}>
                    Upload documents now
                  </button>
                </div>
              )}

              {kycData?.status === 'pending' && (
                <p className={styles.statusMsg}>
                  Your documents are being reviewed by our team. You'll be notified once a decision is made.
                </p>
              )}

              {kycData?.status === 'approved' && (
                <p className={`${styles.statusMsg} ${styles.msgGreen}`}>
                  Your KYC has been verified and approved. You can now invest in mutual funds.
                </p>
              )}

              {kycData?.status === 'rejected' && (
                <>
                  <p className={`${styles.statusMsg} ${styles.msgRed}`}>
                    Your KYC was rejected. Reason: {kycData.rejectionNote || 'Documents unclear or mismatch found.'}
                  </p>
                  <button className={styles.actionBtn} onClick={() => navigate('/kyc-form')}>
                    Resubmit documents
                  </button>
                </>
              )}

              {kycData && (
                <div className={styles.docRow}>
                  <div className={styles.docBox}>
                    <i className="ti ti-id" aria-hidden="true" />
                    <span>PAN Card</span>
                    <strong className={styles.docUploaded}>Uploaded</strong>
                  </div>
                  <div className={styles.docBox}>
                    <i className="ti ti-fingerprint" aria-hidden="true" />
                    <span>Aadhaar</span>
                    <strong className={styles.docUploaded}>Uploaded</strong>
                  </div>
                </div>
              )}
            </div>

            {/* Account details */}
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Account Details</h2>
              <div className={styles.detailGrid}>
                <div className={styles.detailField}>
                  <span className={styles.detailLabel}>Full name</span>
                  <span className={styles.detailValue}>{user?.name}</span>
                </div>
                <div className={styles.detailField}>
                  <span className={styles.detailLabel}>Email</span>
                  <span className={styles.detailValue}>{user?.email}</span>
                </div>
                {kycData && (
                  <>
                    <div className={styles.detailField}>
                      <span className={styles.detailLabel}>PAN number</span>
                      <span className={styles.detailValue}>{kycData.panNumber}</span>
                    </div>
                    <div className={styles.detailField}>
                      <span className={styles.detailLabel}>Aadhaar (masked)</span>
                      <span className={styles.detailValue}>XXXX XXXX {kycData.aadhaarNumber?.slice(-4)}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default UserDashboard;
