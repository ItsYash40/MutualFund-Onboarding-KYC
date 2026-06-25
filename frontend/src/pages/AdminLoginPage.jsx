import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AuthShell from "../components/AuthShell.jsx";
import { api, getApiError } from "../lib/api.js";
import { useAuth } from "../state/AuthContext.jsx";

export default function AdminLoginPage() {
  const [form, setForm] = useState({ email: "", password: "", adminRole: "rta_admin" });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function submit(event) {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await api.post("/auth/admin/signin", form);
      login(response.data);
      toast.success("Admin signed in");
      navigate(response.data.user.role === "amc_admin" ? "/admin/amc" : "/admin/dashboard");
    } catch (error) {
      toast.error(getApiError(error));
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell title="Admin sign in" subtitle="Seeded admin access for RTA investor records and AMC scheme operations.">
      <form className="form-stack" onSubmit={submit}>
        <label>
          Admin role
          <select name="adminRole" value={form.adminRole} onChange={updateField}>
            <option value="rta_admin">RTA Admin - KYC and investor records</option>
            <option value="amc_admin">AMC Admin - schemes, SIPs, AUM</option>
            <option value="admin">Super Admin - all modules</option>
          </select>
        </label>
        <label>
          Admin email
          <input name="email" type="email" value={form.email} onChange={updateField} required />
        </label>
        <label>
          Password
          <input name="password" type="password" value={form.password} onChange={updateField} required />
        </label>
        <button className="primary-button" disabled={loading} type="submit">
          {loading ? "Checking..." : "Open admin dashboard"}
        </button>
      </form>
      <div className="admin-login-hints">
        <strong>Seeded demo logins</strong>
        <span>RTA: rta.admin@finboard.local / RtaAdmin@12345</span>
        <span>AMC: amc.admin@finboard.local / AmcAdmin@12345</span>
        <span>Super: admin@finboard.local / Admin@12345</span>
      </div>
      <p className="switch-link">
        Customer login? <Link to="/signin">Go to sign in</Link>
      </p>
    </AuthShell>
  );
}
