import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../api/authApi';
import { useAuth } from '../context/AuthContext';
import styles from './Auth.module.css';

const Login = () => {
  const navigate  = useNavigate();
  const { login } = useAuth();

  const [form, setForm]       = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await loginUser(form);
      login(data.token, data.user);
      navigate(data.user.role === 'admin' ? '/admin/dashboard' : '/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
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
        <h1 className={styles.formTitle}>Welcome back</h1>
        <p className={styles.formSub}>Sign in to check your KYC status</p>

        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} noValidate>
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
              placeholder="Your password"
              value={form.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
            />
          </div>

          <button type="submit" className={styles.btn} disabled={loading}>
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <p className={styles.switchLine}>
          Don't have an account?{' '}
          <Link to="/register" className={styles.switchLink}>Register</Link>
        </p>
      </main>
    </div>
  );
};

export default Login;
