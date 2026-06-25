import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BarChart3, BriefcaseBusiness, CheckCircle2, LogOut, PauseCircle, PiggyBank, UsersRound } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getApiError } from "../lib/api.js";
import { investmentApi } from "../lib/investmentApi.js";
import { useAuth } from "../state/AuthContext.jsx";

function rupee(value) {
  return `Rs. ${Number(value || 0).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function Stat({ icon: Icon, label, value }) {
  return (
    <article className="admin-stat">
      <Icon size={21} />
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  );
}

export default function AmcAdminPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const overview = useQuery({ queryKey: ["amc-admin-overview"], queryFn: investmentApi.adminOverview });
  const orders = overview.data?.holdings || [];
  const summary = overview.data?.summary || {};

  const updateStatus = useMutation({
    mutationFn: ({ id, status }) => investmentApi.updateOrderStatus(id, status),
    onSuccess() {
      toast.success("Order status updated");
      queryClient.invalidateQueries({ queryKey: ["amc-admin-overview"] });
    },
    onError(error) {
      toast.error(getApiError(error));
    }
  });

  function signOut() {
    logout();
    navigate("/admin/login");
  }

  return (
    <div className="admin-shell">
      <header className="admin-topbar">
        <div className="admin-brand-block">
          <span className="admin-logo">M</span>
          <strong>AMC Dashboard</strong>
        </div>
        <span>{user?.email}</span>
        <button type="button" onClick={signOut}><LogOut size={17} /> Log out</button>
      </header>

      <main className="amc-layout">
        <section className="amc-hero">
          <div>
            <p>Asset Management Company</p>
            <h1>Scheme operations, SIP book, and investor order control</h1>
            <span>Simulates AMC responsibilities: NAV operations, fund AUM, SIP collection, order approval, and collection-account visibility.</span>
          </div>
        </section>

        <section className="admin-stat-grid">
          <Stat icon={BriefcaseBusiness} label="Total AUM" value={rupee(summary.totalAum)} />
          <Stat icon={PiggyBank} label="Monthly SIP Book" value={rupee(summary.sipBook)} />
          <Stat icon={UsersRound} label="Investors" value={summary.totalInvestors || 0} />
          <Stat icon={PauseCircle} label="Pending Orders" value={summary.pendingOrders || 0} />
        </section>

        <section className="amc-grid">
          <article className="admin-panel">
            <div className="admin-section-heading">
              <div>
                <p>AMC order book</p>
                <h1>Mutual fund and SIP orders</h1>
              </div>
              <BarChart3 color="#02c39a" />
            </div>
            <div className="amc-order-list">
              {orders
                .filter((order) => order.assetType !== "stock")
                .map((order) => (
                  <div className="amc-order-card" key={order._id}>
                    <div>
                      <strong>{order.name}</strong>
                      <span>{order.symbol} / {order.assetType} / {order.orderStatus}</span>
                    </div>
                    <div>
                      <span>Investor</span>
                      <strong>{order.investor?.name || "Investor"}</strong>
                      <p>{order.investor?.email}</p>
                    </div>
                    <div>
                      <span>Folio</span>
                      <strong>{order.folioNumber || "Pending"}</strong>
                      <p>{order.amcAccount?.accountHolder}</p>
                    </div>
                    <div>
                      <span>Amount</span>
                      <strong>{rupee(order.totalAmount)}</strong>
                      <p>{order.quantity?.toFixed?.(3) || order.quantity} units</p>
                    </div>
                    <div className="amc-actions">
                      <button type="button" onClick={() => updateStatus.mutate({ id: order._id, status: order.assetType === "sip" ? "sip_active" : "successful" })}>
                        <CheckCircle2 size={16} /> Approve
                      </button>
                      <button type="button" onClick={() => updateStatus.mutate({ id: order._id, status: "rejected" })}>Reject</button>
                    </div>
                  </div>
                ))}
              {!orders.filter((order) => order.assetType !== "stock").length ? <p className="muted">No mutual fund orders yet.</p> : null}
            </div>
          </article>

          <article className="admin-panel">
            <div className="admin-section-heading">
              <div>
                <p>RTA visibility</p>
                <h1>Investor stock activity</h1>
              </div>
            </div>
            <div className="amc-stock-list">
              {orders
                .filter((order) => order.assetType === "stock")
                .slice(0, 12)
                .map((order) => (
                  <div key={order._id}>
                    <strong>{order.symbol}</strong>
                    <span>{order.investor?.name || "Investor"}</span>
                    <em>{rupee(order.totalAmount)}</em>
                  </div>
                ))}
            </div>
          </article>
        </section>
      </main>
    </div>
  );
}
