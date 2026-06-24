import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../api/authApi';
import { useAuth } from '../context/AuthContext';
import styles from './Auth.module.css';

// Role selector tile
const RoleCard = ({ value, label, subtitle, icon, selected, onSelect }) => (
  <button
    type="button"
    onClick={() => onSelect(value)}
    className={`${styles.roleCard} ${selected ? (value === 'admin' ? styles.roleCardAdmin : styles.roleCardInvestor) : ''}`}
    aria-pressed={selected}
  >
    <span className={`${styles.roleIcon} ${value === 'admin' ? styles.roleIconAdmin : styles.roleIconInvestor}`}>
      <span className="material-icon">{icon}</span>
    </span>
    <span className={styles.roleInfo}>
      <span className={styles.roleLabel}>{label}</span>
      <span className={styles.roleSub}>{subtitle}</span>
    </span>
  </button>
);

const Register = () => {
  const navigate  = useNavigate();
  const { login } = useAuth();

  const [form, setForm]       = useState({ name: '', email: '', password: '', role: 'investor' });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (form.password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    setLoading(true);
    try {
      const { data } = await registerUser(form);
      login(data.token, data.user);
      // Redirect based on role
      navigate(data.user.role === 'admin' ? '/admin/dashboard' : '/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      {/* Left brand panel */}
      <aside className={styles.panel}>
        <div className={styles.panelLogo}>
          <span className={styles.panelLogoMark}>🏦</span>
          <span className={styles.panelLogoText}>KYC Platform</span>
        </div>
        <ul className={styles.panelSteps}>
          <li>Register &amp; verify your identity</li>
          <li>Upload PAN &amp; Aadhaar documents</li>
          <li>Track KYC approval status in real time</li>
        </ul>
        <p className={styles.panelTagline}>
          Compliant with SEBI regulations for mutual fund investors in India.
        </p>
      </aside>

      {/* Right form panel */}
      <main className={styles.formArea}>
        <h1 className={styles.formTitle}>Create your account</h1>
        <p className={styles.formSub}>Choose your role to get started</p>

        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} noValidate>
          {/* Role selector */}
          <p className={styles.sectionLabel}>I am a</p>
          <div className={styles.roleRow}>
            <RoleCard
              value="investor"
              label="Investor"
              subtitle="KYC onboarding"
              icon="person"
              selected={form.role === 'investor'}
              onSelect={(r) => setForm((p) => ({ ...p, role: r }))}
            />
            <RoleCard
              value="admin"
              label="Admin"
              subtitle="Review &amp; approve"
              icon="shield"
              selected={form.role === 'admin'}
              onSelect={(r) => setForm((p) => ({ ...p, role: r }))}
            />
          </div>

          {/* Fields */}
          <div className={styles.field}>
            <label htmlFor="name">Full name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Asha Rao"
              value={form.name}
              onChange={handleChange}
              required
              autoComplete="name"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="asha@example.com"
              value={form.email}
              onChange={handleChange}
              required
              autoComplete="email"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Minimum 8 characters"
              value={form.password}
              onChange={handleChange}
              required
              autoComplete="new-password"
            />
          </div>

          <button
            type="submit"
            className={`${styles.btn} ${form.role === 'admin' ? styles.btnAdmin : ''}`}
            disabled={loading}
          >
            {loading ? 'Creating account…' : 'Create account'}
          </button>
        </form>

        <p className={styles.switchLine}>
          Already have an account?{' '}
          <Link to="/login" className={styles.switchLink}>Sign in</Link>
        </p>
      </main>
    </div>
  );
};

export default Register;
