import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axiosInstance';
import styles from './Dashboard.module.css';

const STATUS_MAP = {
  not_submitted:{label:'Not submitted',cls:'statusNone'},
  pending:{label:'Pending',cls:'statusPending'},
  approved:{label: 'Approved',cls:'statusApproved'},
  rejected:{label:'Rejected',cls:'statusRejected'},
};

const AdminDashboard = () => {
  const navigate         = useNavigate();
  const { user, logout } = useAuth();

  const [stats, setStats]         = useState({ total: 0, pending: 0, approved: 0, rejected: 0 });
  const [panQuery, setPanQuery]   = useState('');
  const [result, setResult]       = useState(null);         
  const [searchError, setSearchError] = useState('');
  const [pendingList, setPendingList] = useState([]);      
  const [actionNote, setActionNote]   = useState('');       
  const [updating, setUpdating]       = useState(false);

  // Load dashboard stats and recent pending list on mount
  useEffect(() => {
    const load = async () => {
      try {
        const [statsRes, listRes] = await Promise.all([
          api.get('/admin/stats'),
          api.get('/admin/kyc/pending'),
        ]);
        setStats(statsRes.data);
        setPendingList(listRes.data.users);
      } catch (err) {
        console.error('Failed to load admin data', err);
      }
    };
    load();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    setSearchError('');
    setResult(null);
    if (!panQuery.trim()) return;
    try {
      const { data } = await api.get(`/admin/kyc/search?pan=${panQuery.toUpperCase()}`);
      setResult(data.user);
    } catch (err) {
      setSearchError(err.response?.data?.message || 'No investor found with that PAN.');
    }
  };

  const handleAction = async (userId, newStatus) => {
    if (newStatus === 'rejected' && !actionNote.trim()) {
      alert('Please enter a rejection reason before rejecting.');
      return;
    }
    setUpdating(true);
    try {
      await api.patch(`/admin/kyc/${userId}/status`, {
        status: newStatus,
        rejectionNote: newStatus === 'rejected' ? actionNote : '',
      });
      
      setResult((prev) => ({ ...prev, kyc: { ...prev.kyc, status: newStatus } }));
      setActionNote('');
    } catch (err) {
      alert(err.response?.data?.message || 'Action failed.');
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className={styles.dashPage}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarLogo}>
          <div className={`${styles.logoMark} ${styles.logoMarkAdmin}`}>
            <i className="ti ti-building-bank" aria-hidden="true" />
          </div>
          <span className={styles.logoText}>KYC Admin</span>
        </div>
        <nav className={styles.sidebarNav}>
          <button className={`${styles.navItem} ${styles.navItemActive}`}>
            <i className="ti ti-layout-dashboard" aria-hidden="true" /> Dashboard
          </button>
          <button className={styles.navItem}>
            <i className="ti ti-search" aria-hidden="true" /> Search by PAN
          </button>
          <button className={styles.navItem}>
            <i className="ti ti-history" aria-hidden="true" /> Audit Log
          </button>
        </nav>
        <button className={styles.navItemBottom} onClick={() => { logout(); navigate('/login'); }}>
          <i className="ti ti-logout" aria-hidden="true" /> Sign out
        </button>
      </aside>

      <main className={styles.main}>
        <div className={styles.topbar}>
          <h1 className={styles.pageHead}>Admin Dashboard</h1>
          <div className={styles.userChip}>
            <div className={`${styles.avatar} ${styles.avatarAdmin}`}>
              {user?.name?.[0]?.toUpperCase()}
            </div>
            <span>{user?.name}</span>
          </div>
        </div>

        <div className={styles.statGrid}>
          <div className={styles.statCard}>
            <p className={styles.statLabel}>Total submissions</p>
            <p className={styles.statValue}>{stats.total}</p>
          </div>
          <div className={styles.statCard}>
            <p className={styles.statLabel}>Pending review</p>
            <p className={`${styles.statValue} ${styles.statusPending}`}>{stats.pending}</p>
          </div>
          <div className={styles.statCard}>
            <p className={styles.statLabel}>Approved</p>
            <p className={`${styles.statValue} ${styles.statusApproved}`}>{stats.approved}</p>
          </div>
          <div className={styles.statCard}>
            <p className={styles.statLabel}>Rejected</p>
            <p className={`${styles.statValue} ${styles.statusRejected}`}>{stats.rejected}</p>
          </div>
        </div>

        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Search investor by PAN</h2>
          <form onSubmit={handleSearch} className={styles.searchRow}>
            <input
              className={styles.searchInput}
              placeholder="Enter PAN e.g. ABCDE1234F"
              value={panQuery}
              onChange={(e) => setPanQuery(e.target.value.toUpperCase())}
            />
            <button type="submit" className={styles.searchBtn}>Search</button>
          </form>

          {searchError && <p className={styles.error}>{searchError}</p>}

          {/* Search result */}
          {result && (
            <div className={styles.resultCard}>
              <div className={styles.cardHeader}>
                <div>
                  <h3 className={styles.resultName}>{result.name}</h3>
                  <p className={styles.resultEmail}>{result.email}</p>
                </div>
                <span className={`${styles.badge} ${styles[STATUS_MAP[result.kyc?.status || 'not_submitted'].cls]}`}>
                  {STATUS_MAP[result.kyc?.status || 'not_submitted'].label}
                </span>
              </div>

              <div className={styles.detailGrid}>
                <div className={styles.detailField}>
                  <span className={styles.detailLabel}>PAN</span>
                  <span className={styles.detailValue}>{result.kyc?.panNumber || '—'}</span>
                </div>
                <div className={styles.detailField}>
                  <span className={styles.detailLabel}>Aadhaar (masked)</span>
                  <span className={styles.detailValue}>
                    {result.kyc?.aadhaarNumber ? `XXXX XXXX ${result.kyc.aadhaarNumber.slice(-4)}` : '—'}
                  </span>
                </div>
                <div className={styles.detailField}>
                  <span className={styles.detailLabel}>Date of birth</span>
                  <span className={styles.detailValue}>{result.kyc?.dateOfBirth || '—'}</span>
                </div>
                <div className={styles.detailField}>
                  <span className={styles.detailLabel}>Submitted</span>
                  <span className={styles.detailValue}>
                    {result.kyc?.submittedAt
                      ? new Date(result.kyc.submittedAt).toLocaleDateString('en-IN')
                      : '—'}
                  </span>
                </div>
              </div>

              {result.kyc && (
                <div className={styles.docRow}>
                  <a
                    href={result.kyc.panImageUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.docThumb}
                  >
                    <i className="ti ti-id" aria-hidden="true" />
                    <span>PAN card — view</span>
                  </a>
                  <a
                    href={result.kyc.aadhaarImageUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.docThumb}
                  >
                    <i className="ti ti-fingerprint" aria-hidden="true" />
                    <span>Aadhaar — view</span>
                  </a>
                </div>
              )}

              {result.kyc?.status === 'pending' && (
                <div className={styles.actionArea}>
                  <textarea
                    className={styles.noteInput}
                    placeholder="Rejection reason (required if rejecting)"
                    value={actionNote}
                    onChange={(e) => setActionNote(e.target.value)}
                    rows={2}
                  />
                  <div className={styles.actionBtns}>
                    <button
                      className={styles.approveBtn}
                      onClick={() => handleAction(result._id, 'approved')}
                      disabled={updating}
                    >
                      <i className="ti ti-check" aria-hidden="true" /> Approve KYC
                    </button>
                    <button
                      className={styles.rejectBtn}
                      onClick={() => handleAction(result._id, 'rejected')}
                      disabled={updating}
                    >
                      <i className="ti ti-x" aria-hidden="true" /> Reject
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {pendingList.length > 0 && (
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Recent pending submissions</h2>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>PAN</th>
                  <th>Submitted</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {pendingList.map((u) => (
                  <tr key={u._id}>
                    <td>{u.name}</td>
                    <td className={styles.monoText}>{u.kyc?.panNumber}</td>
                    <td>{u.kyc?.submittedAt ? new Date(u.kyc.submittedAt).toLocaleDateString('en-IN') : '—'}</td>
                    <td>
                      <span className={`${styles.badge} ${styles.statusPending}`}>Pending</span>
                    </td>
                    <td>
                      <button
                        className={styles.reviewBtn}
                        onClick={() => { setPanQuery(u.kyc?.panNumber || ''); setResult(u); }}
                      >
                        Review
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
