import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Bell, Bookmark, CalendarDays, Link as LinkIcon } from "lucide-react";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Link, Navigate, useParams } from "react-router-dom";
import Footer from "../components/Footer.jsx";
import Navbar from "../components/Navbar.jsx";
import { api, getApiError } from "../lib/api.js";
import { bankingApi } from "../lib/bankingApi.js";
import { investmentApi } from "../lib/investmentApi.js";
import { findInstrument } from "../lib/marketData.js";

function rupee(value) {
  return `Rs. ${Number(value || 0).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function generateChart(trend) {
  const points = trend === "down"
    ? [76, 66, 70, 58, 62, 44, 49, 39, 42, 28, 34, 31, 25, 33, 22, 30]
    : [34, 42, 39, 51, 48, 62, 57, 68, 65, 76, 72, 82, 78, 88, 84, 92];

  return points.map((y, index) => `${index * 44},${100 - y}`).join(" ");
}

export default function StockDetailPage() {
  const { symbol } = useParams();
  const item = findInstrument(symbol);
  const queryClient = useQueryClient();
  const [quantity, setQuantity] = useState(1);
  const [orderMode, setOrderMode] = useState("lumpsum");
  const [sipAmount, setSipAmount] = useState(1000);
  const [sipDate, setSipDate] = useState(5);

  const profileQuery = useQuery({
    queryKey: ["profile-me"],
    queryFn: () => api.get("/profile/me").then((response) => response.data.profile)
  });
  const bankQuery = useQuery({ queryKey: ["banking-summary"], queryFn: bankingApi.summary, refetchInterval: 15000 });
  const portfolioQuery = useQuery({ queryKey: ["portfolio"], queryFn: investmentApi.portfolio });

  const buy = useMutation({
    mutationFn: (payload) => (payload.monthlyAmount ? investmentApi.createSip(payload) : investmentApi.buy(payload)),
    onSuccess() {
      toast.success(`${item.symbol} added to portfolio`);
      queryClient.invalidateQueries({ queryKey: ["portfolio"] });
      queryClient.invalidateQueries({ queryKey: ["banking-summary"] });
      queryClient.invalidateQueries({ queryKey: ["navbar-app-notifications"] });
    },
    onError(error) {
      toast.error(getApiError(error));
    }
  });

  const account = bankQuery.data?.account;
  const kycApproved = profileQuery.data?.kycStatus === "approved";
  const isFund = item?.type === "mutual_fund";
  const owned = useMemo(
    () => (portfolioQuery.data || []).filter((holding) => holding.symbol === item?.symbol).reduce((sum, holding) => sum + Number(holding.quantity || 0), 0),
    [portfolioQuery.data, item?.symbol]
  );

  if (!item) {
    return <Navigate to="/dashboard" replace />;
  }

  const amount = isFund && orderMode === "sip" ? Number(sipAmount || 0) : item.price * Number(quantity || 0);
  const canBuy = Boolean(account && kycApproved && (orderMode === "sip" ? Number(sipAmount) >= 100 : quantity > 0) && !buy.isPending);

  function submitOrder(event) {
    event.preventDefault();
    if (!kycApproved) {
      toast.error("Complete KYC approval before buying.");
      return;
    }
    if (!account) {
      toast.error("Complete bank verification before buying.");
      return;
    }
    if (isFund && orderMode === "sip") {
      buy.mutate({
        symbol: item.symbol,
        name: item.name,
        nav: item.nav,
        monthlyAmount: Number(sipAmount),
        sipDate: Number(sipDate),
        amcAccount: item.account,
        metadata: {
          category: item.sector,
          risk: item.risk,
          fundManager: item.fundManager
        }
      });
      return;
    }

    buy.mutate({
      symbol: item.symbol,
      name: item.name,
      price: item.price,
      quantity: Number(quantity),
      assetType: isFund ? "mutual_fund" : "stock",
      amcAccount: item.account,
      metadata: isFund
        ? { category: item.sector, risk: item.risk, fundManager: item.fundManager, aum: item.aum }
        : { sector: item.sector, marketCap: item.marketCap, pe: item.pe, dividendYield: item.dividendYield }
    });
  }

  return (
    <div className="app-surface">
      <Navbar />
      <main className="stock-detail-layout">
        <section className="stock-detail-main">
          <div className="stock-title-row">
            <div className="stock-symbol large">{item.symbol}</div>
            <div>
              <p>{item.symbol} / {item.exchange} / {isFund ? item.sector : item.sector}</p>
              <h1>{item.name}</h1>
              <strong>{rupee(item.price)} <span className={item.trend}>{item.change}</span></strong>
            </div>
            <div className="stock-actions">
              <button type="button"><LinkIcon size={17} /></button>
              <button type="button"><Bell size={17} /></button>
              <button type="button"><Bookmark size={17} /></button>
            </div>
          </div>

          <div className="large-chart">
            <svg viewBox="0 0 660 120" preserveAspectRatio="none">
              <polyline points={generateChart(item.trend)} />
            </svg>
          </div>

          <div className="range-tabs">
            {["1D", "1W", "1M", "3M", "6M", "1Y", "3Y", "5Y", "All"].map((range) => (
              <button className={range === "1D" ? "active" : ""} type="button" key={range}>{range}</button>
            ))}
          </div>

          <Link className="stock-sip-card" to={isFund ? `/stocks/${item.symbol}` : "/dashboard?market=mutual-funds"}>
            <CalendarDays size={22} />
            <div>
              <strong>{isFund ? "SIP Available" : "Create Stock SIP"}</strong>
              <p>{isFund ? "Create a monthly auto-debit schedule with folio tracking" : "Automate monthly investments in this instrument"}</p>
            </div>
            <span>{isFund ? "AMC" : "Open"}</span>
          </Link>

          <section className="stock-info-tabs">
            <nav>
              {["Overview", "Technicals", "News", "Events", "F&O"].map((tab, index) => (
                <button className={index === 0 ? "active" : ""} type="button" key={tab}>{tab}</button>
              ))}
            </nav>
            <div className="performance-band">
              <h2>Performance</h2>
              <div>
                <span>Today's low <strong>{rupee(item.low)}</strong></span>
                <div className="performance-line"><i /></div>
                <span>Today's high <strong>{rupee(item.high)}</strong></span>
              </div>
            </div>
            <div className="instrument-facts">
              {(isFund
                ? [
                    ["AUM", item.aum],
                    ["Risk", item.risk],
                    ["Expense ratio", `${item.expenseRatio}%`],
                    ["Fund manager", item.fundManager],
                    ["1Y return", `${item.oneYear}%`],
                    ["5Y return", `${item.fiveYear}%`]
                  ]
                : [
                    ["Market cap", item.marketCap],
                    ["Sector", item.sector],
                    ["PE ratio", item.pe],
                    ["Dividend yield", `${item.dividendYield}%`],
                    ["Volume", item.volume],
                    ["Treasury account", item.account?.accountNumber]
                  ]).map(([label, value]) => (
                <div key={label}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
          </section>
        </section>

        <aside className="order-panel">
          <div className="order-head">
            <strong>{item.symbol}</strong>
            <span>{item.exchange} {isFund ? `${rupee(item.nav)} NAV` : rupee(item.price)}</span>
          </div>
          <div className="order-tabs">
            <button className={orderMode === "lumpsum" ? "active" : ""} type="button" onClick={() => setOrderMode("lumpsum")}>{isFund ? "LUMPSUM" : "BUY"}</button>
            <button className={orderMode === "sip" ? "active" : ""} type="button" onClick={() => setOrderMode("sip")} disabled={!isFund}>{isFund ? "SIP" : "SELL"}</button>
          </div>
          <form className="order-form" onSubmit={submitOrder}>
            <div className="order-mode-row">
              <span>{isFund ? "Folio" : "Delivery"}</span>
              <span>{isFund ? item.risk : "Intraday"}</span>
              <span>{isFund ? item.sector : "MTF 3.89x"}</span>
            </div>
            {isFund && orderMode === "sip" ? (
              <>
                <label>
                  Monthly SIP
                  <input type="number" min="100" step="100" value={sipAmount} onChange={(event) => setSipAmount(event.target.value)} />
                </label>
                <label>
                  SIP Date
                  <input type="number" min="1" max="28" value={sipDate} onChange={(event) => setSipDate(event.target.value)} />
                </label>
              </>
            ) : (
              <label>
                {isFund ? "Units" : "Qty"}
                <input type="number" min={isFund ? "0.001" : "1"} step={isFund ? "0.001" : "1"} value={quantity} onChange={(event) => setQuantity(event.target.value)} />
              </label>
            )}
            <label>
              {isFund ? "NAV" : "Price Limit"}
              <input value={item.price.toFixed(2)} readOnly />
            </label>
            <div className="amc-routing-box">
              <span>Money routes to</span>
              <strong>{item.account?.accountHolder}</strong>
              <p>{item.account?.bankName} / {item.account?.accountNumber} / {item.account?.ifsc}</p>
            </div>
            <div className="order-summary">
              <span>Balance: {account ? rupee(account.balance) : "Not linked"}</span>
              <span>Approx req: {rupee(amount)}</span>
              <span>Owned: {owned}</span>
            </div>
            {!kycApproved ? <p className="order-warning">KYC approval required before buying.</p> : null}
            {!account ? <p className="order-warning">Verify bank account before buying.</p> : null}
            <button className="primary-button" type="submit" disabled={!canBuy}>
              {buy.isPending ? "Processing..." : isFund && orderMode === "sip" ? "Start SIP" : isFund ? "Invest" : "Buy"}
            </button>
          </form>
        </aside>
      </main>
      <Footer />
    </div>
  );
}
