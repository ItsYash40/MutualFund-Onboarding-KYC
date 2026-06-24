import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axiosInstance';
import styles from './Dashboard.module.css';

// Drag-and-drop file upload box
const UploadBox = ({ label, name, file, onChange }) => (
  <div className={styles.uploadSection}>
    <label className={styles.fieldLabel}>{label}</label>
    <label className={styles.uploadBox}>
      <input
        type="file"
        name={name}
        accept="image/*,application/pdf"
        onChange={onChange}
        style={{ display: 'none' }}
      />
      {file ? (
        <div className={styles.uploadReady}>
          <i className="ti ti-circle-check" aria-hidden="true" />
          <span>{file.name}</span>
        </div>
      ) : (
        <div className={styles.uploadPrompt}>
          <i className="ti ti-upload" aria-hidden="true" />
          <p><span className={styles.uploadHighlight}>Click to upload</span> or drag &amp; drop</p>
          <p className={styles.uploadHint}>JPG, PNG or PDF · max 5 MB</p>
        </div>
      )}
    </label>
  </div>
);

const KycForm = () => {
  const navigate     = useNavigate();
  const { user }     = useAuth();

  const [form, setForm] = useState({
    panNumber: '',
    dateOfBirth: '',
    aadhaarNumber: '',
    aadhaarName: '',
  });
  const [files, setFiles]   = useState({ panImage: null, aadhaarImage: null });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleFile = (e) =>
    setFiles((p) => ({ ...p, [e.target.name]: e.target.files[0] }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Basic PAN format validation: 5 letters, 4 digits, 1 letter
    if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(form.panNumber.toUpperCase())) {
      setError('PAN number format is invalid. Example: ABCDE1234F');
      return;
    }
    if (!files.panImage || !files.aadhaarImage) {
      setError('Please upload both PAN card and Aadhaar images.');
      return;
    }

    setLoading(true);
    try {
      // Use FormData because we're sending files (multipart/form-data)
      const formData = new FormData();
      Object.entries(form).forEach(([k, v]) => formData.append(k, v));
      formData.append('panImage', files.panImage);
      formData.append('aadhaarImage', files.aadhaarImage);

      await api.post('/kyc/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setSuccess(true);
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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
          <button className={styles.navItem} onClick={() => navigate('/dashboard')}>
            <i className="ti ti-layout-dashboard" aria-hidden="true" /> Dashboard
          </button>
          <button className={`${styles.navItem} ${styles.navItemActive}`}>
            <i className="ti ti-file-upload" aria-hidden="true" /> KYC Upload
          </button>
        </nav>
        <button className={styles.navItemBottom} onClick={() => navigate('/login')}>
          <i className="ti ti-logout" aria-hidden="true" /> Sign out
        </button>
      </aside>

      {/* Main content */}
      <main className={styles.main}>
        <div className={styles.topbar}>
          <h1 className={styles.pageHead}>KYC Document Upload</h1>
          <div className={styles.userChip}>
            <div className={styles.avatar}>{user?.name?.[0]?.toUpperCase()}</div>
            <span>{user?.name}</span>
          </div>
        </div>

        {error   && <div className={styles.error}>{error}</div>}
        {success && <div className={styles.successBanner}>Documents submitted! Redirecting…</div>}

        <form onSubmit={handleSubmit}>
          {/* PAN section */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>PAN Card Details</h2>
            <div className={styles.twoCol}>
              <div>
                <label className={styles.fieldLabel} htmlFor="panNumber">PAN number</label>
                <input
                  id="panNumber"
                  name="panNumber"
                  className={styles.input}
                  placeholder="ABCDE1234F"
                  value={form.panNumber}
                  onChange={handleChange}
                  style={{ textTransform: 'uppercase' }}
                  required
                />
              </div>
              <div>
                <label className={styles.fieldLabel} htmlFor="dateOfBirth">Date of birth</label>
                <input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  className={styles.input}
                  value={form.dateOfBirth}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <UploadBox
              label="Upload PAN card image"
              name="panImage"
              file={files.panImage}
              onChange={handleFile}
            />
          </div>

          {/* Aadhaar section */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Aadhaar Details</h2>
            <div className={styles.twoCol}>
              <div>
                <label className={styles.fieldLabel} htmlFor="aadhaarNumber">Aadhaar number</label>
                <input
                  id="aadhaarNumber"
                  name="aadhaarNumber"
                  className={styles.input}
                  placeholder="XXXX XXXX XXXX"
                  value={form.aadhaarNumber}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className={styles.fieldLabel} htmlFor="aadhaarName">Name on Aadhaar</label>
                <input
                  id="aadhaarName"
                  name="aadhaarName"
                  className={styles.input}
                  placeholder="As printed on card"
                  value={form.aadhaarName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <UploadBox
              label="Upload Aadhaar image"
              name="aadhaarImage"
              file={files.aadhaarImage}
              onChange={handleFile}
            />
          </div>

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? 'Uploading…' : 'Submit KYC documents'}
          </button>
        </form>
      </main>
    </div>
  );
};

export default KycForm;
