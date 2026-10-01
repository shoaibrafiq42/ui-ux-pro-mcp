import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Activity, BookOpen, Check, ChevronDown, Clipboard, Clock3, Code2, Copy,
  Ellipsis, Eye, EyeOff, Fingerprint, KeyRound, LayoutDashboard, LockKeyhole,
  Plus, RefreshCw, Search, Settings, ShieldCheck, TerminalSquare, Users, X
} from "lucide-react";
import "./index.css";

const initialKeys = [
  { id: 1, name: "Payments production", prefix: "sk_live_••••8D2F", env: "Production", scope: "payments:write", owner: "Maya Chen", created: "18 Sep 2026", used: "4 min ago", requests: "248.6k", status: "Active" },
  { id: 2, name: "Webhook verifier", prefix: "sk_live_••••1A90", env: "Production", scope: "webhooks:verify", owner: "Jon Bell", created: "02 Aug 2026", used: "19 min ago", requests: "89.3k", status: "Active" },
  { id: 3, name: "CLI local dev", prefix: "sk_test_••••C041", env: "Test", scope: "read:all", owner: "Priya N.", created: "29 Sep 2026", used: "2 h ago", requests: "3.8k", status: "Active" },
  { id: 4, name: "Legacy reporting", prefix: "sk_live_••••7EE4", env: "Production", scope: "reports:read", owner: "Maya Chen", created: "11 Jan 2026", used: "18 d ago", requests: "12.1k", status: "Review" }
];

const activity = [
  ["09:31", "Payments production", "Request accepted", "POST /v1/charges", "MEL"],
  ["09:26", "Webhook verifier", "Signature verified", "POST /hooks/payment", "SYD"],
  ["09:18", "CLI local dev", "Token used", "GET /v1/customers", "BNE"],
  ["08:57", "Payments production", "Request accepted", "POST /v1/refunds", "SYD"]
];

function App() {
  const [keys, setKeys] = useState(initialKeys);
  const [query, setQuery] = useState("");
  const [environment, setEnvironment] = useState("All");
  const [revealed, setRevealed] = useState(null);
  const [copied, setCopied] = useState(null);
  const [rotateTarget, setRotateTarget] = useState(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [newKey, setNewKey] = useState({ name: "", env: "Test", scope: "read:all" });

  const filtered = useMemo(() => keys.filter((key) => {
    const q = query.toLowerCase();
    const matchesQuery = [key.name, key.owner, key.scope].some(v => v.toLowerCase().includes(q));
    return matchesQuery && (environment === "All" || key.env === environment);
  }), [keys, query, environment]);

  const copyKey = async (key) => {
    await navigator.clipboard?.writeText("sk_demo_51NX9xR9rF8m2K7Q");
    setCopied(key.id);
    setTimeout(() => setCopied(null), 1300);
  };

  const rotate = () => {
    setKeys(prev => prev.map(k => k.id === rotateTarget.id
      ? { ...k, prefix: k.env === "Production" ? "sk_live_••••" + Math.random().toString(16).slice(2, 6).toUpperCase() : "sk_test_••••" + Math.random().toString(16).slice(2, 6).toUpperCase(), created: "02 Oct 2026", used: "Never" }
      : k));
    setRotateTarget(null);
  };

  const createKey = (e) => {
    e.preventDefault();
    if (!newKey.name.trim()) return;
    setKeys(prev => [{
      id: Date.now(),
      name: newKey.name.trim(),
      prefix: newKey.env === "Production" ? "sk_live_••••NEW1" : "sk_test_••••NEW1",
      env: newKey.env,
      scope: newKey.scope,
      owner: "You",
      created: "02 Oct 2026",
      used: "Never",
      requests: "0",
      status: "Active"
    }, ...prev]);
    setNewKey({ name: "", env: "Test", scope: "read:all" });
    setCreateOpen(false);
  };

  return (
    <div className="min-h-screen">
      <aside className="fixed inset-y-0 left-0 hidden w-[224px] border-r border-[#E2E8F0] bg-white/65 px-5 py-6 backdrop-blur-sm lg:block">
        <div className="flex items-center gap-2.5">
          <div className="grid size-8 place-items-center bg-slate-950 text-white"><TerminalSquare size={16} /></div>
          <span className="text-[14px] font-semibold tracking-[-0.02em]">Northstar API</span>
        </div>

        <nav className="mt-14 space-y-1 text-[13px]">
          <Nav icon={LayoutDashboard} label="Overview" />
          <Nav icon={KeyRound} label="API keys" active />
          <Nav icon={Activity} label="Request logs" />
          <Nav icon={Users} label="Team access" />
          <Nav icon={BookOpen} label="API reference" />
        </nav>

        <div className="absolute bottom-6 left-5 right-5">
          <div className="border-t border-[#E2E8F0] pt-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="text-[12px] font-medium">Platform team</div>
                <div className="mt-0.5 text-[11px] text-slate-500">12 members</div>
              </div>
              <ChevronDown size={14} className="text-slate-400" />
            </div>
            <button className="flex h-9 w-full items-center gap-2 text-[12px] font-medium text-slate-600 hover:text-slate-950">
              <Settings size={14} /> Workspace settings
            </button>
          </div>
        </div>
      </aside>

      <main className="lg:pl-[224px]">
        <div className="mx-auto max-w-[1480px] px-5 pb-16 pt-6 sm:px-8 lg:px-12 lg:pt-10">
          <header className="flex items-center justify-between border-b border-[#E2E8F0] pb-5 lg:hidden">
            <div className="flex items-center gap-2.5"><TerminalSquare size={18} /><span className="text-sm font-semibold">Northstar API</span></div>
            <button aria-label="Open navigation"><Ellipsis size={20} /></button>
          </header>

          <section className="pt-12 lg:pt-4">
            <div className="max-w-4xl">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">Developer platform / credentials</p>
              <div className="flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">
                <div>
                  <h1 className="max-w-3xl text-[44px] font-medium leading-[0.98] tracking-[-0.055em] text-slate-950 sm:text-[58px]">API keys</h1>
                  <p className="mt-5 max-w-xl text-[14px] leading-6 text-slate-500">Issue and rotate credentials used by services, local tooling, and production endpoints.</p>
                </div>
                <button onClick={() => setCreateOpen(true)} className="inline-flex h-10 w-fit items-center gap-2 bg-slate-950 px-4 text-[12px] font-semibold text-white transition-opacity hover:opacity-85">
                  <Plus size={15} /> Create key
                </button>
              </div>
            </div>
          </section>

          <section className="mt-16 grid border-y border-[#E2E8F0] sm:grid-cols-2 xl:grid-cols-[1.15fr_.8fr_.8fr_1.25fr]">
            <Metric label="Active keys" value={keys.filter(k => k.status === "Active").length} note="1 requires review" />
            <Metric label="Requests · 24h" value="341.7k" note="+8.4% from yesterday" />
            <Metric label="Rejected" value="0.18%" note="612 requests" />
            <Metric label="Next required rotation" value="18 Oct" note="Payments production · 16 days" last />
          </section>

          <div className="mt-16 grid gap-14 xl:grid-cols-[minmax(0,1fr)_300px]">
            <section className="min-w-0">
              <div className="flex flex-col gap-4 border-b border-[#E2E8F0] pb-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="text-[22px] font-semibold tracking-[-0.035em]">Credentials</h2>
                  <p className="mt-1 text-[12px] text-slate-500">{filtered.length} shown</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <label className="relative">
                    <Search size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search keys" className="h-9 w-[210px] border border-[#E2E8F0] bg-white pl-9 pr-3 text-[12px] outline-none placeholder:text-slate-400" />
                  </label>
                  {["All", "Production", "Test"].map(item => (
                    <button key={item} onClick={() => setEnvironment(item)} className={`h-9 border px-3 text-[11px] font-medium transition-colors ${environment === item ? "border-slate-950 bg-slate-950 text-white" : "border-[#E2E8F0] bg-white text-slate-600 hover:text-slate-950"}`}>{item}</button>
                  ))}
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[920px] border-collapse text-left">
                  <thead>
                    <tr className="border-b border-[#E2E8F0] text-[10px] font-semibold uppercase tracking-[0.11em] text-slate-400">
                      <th className="py-3 pr-5 font-semibold">Key</th><th className="px-3 py-3 font-semibold">Environment</th><th className="px-3 py-3 font-semibold">Scope</th><th className="px-3 py-3 font-semibold">Last used</th><th className="px-3 py-3 text-right font-semibold">Requests</th><th className="py-3 pl-3 text-right font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map(key => (
                      <tr key={key.id} className="group border-b border-[#E2E8F0] text-[12px] transition-colors hover:bg-white/70">
                        <td className="py-5 pr-5">
                          <div className="flex items-start gap-3">
                            <div className="mt-0.5 grid size-8 place-items-center border border-[#E2E8F0] bg-white text-slate-500"><Fingerprint size={14} /></div>
                            <div>
                              <div className="flex items-center gap-2 font-semibold text-slate-900">{key.name}{key.status === "Review" && <span className="bg-amber-50 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.08em] text-amber-700">Review</span>}</div>
                              <button onClick={() => setRevealed(revealed === key.id ? null : key.id)} className="mt-1.5 flex items-center gap-1.5 font-mono text-[10px] text-slate-400 hover:text-slate-700">
                                {revealed === key.id ? "sk_demo_51NX9xR9rF8m2K7Q" : key.prefix}
                                {revealed === key.id ? <EyeOff size={11} /> : <Eye size={11} />}
                              </button>
                              <div className="mt-1 text-[10px] text-slate-400">{key.owner} · created {key.created}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-5"><span className="inline-flex items-center gap-1.5 text-[11px] font-medium"><span className={`size-1.5 rounded-full ${key.env === "Production" ? "bg-emerald-500" : "bg-blue-500"}`} />{key.env}</span></td>
                        <td className="px-3 py-5 font-mono text-[10px] text-slate-600">{key.scope}</td>
                        <td className="px-3 py-5 text-slate-600">{key.used}</td>
                        <td className="px-3 py-5 text-right tabular-nums text-slate-700">{key.requests}</td>
                        <td className="py-5 pl-3">
                          <div className="flex justify-end gap-1">
                            <button onClick={() => copyKey(key)} className="grid size-8 place-items-center text-slate-400 hover:bg-slate-100 hover:text-slate-950" aria-label="Copy API key">{copied === key.id ? <Check size={14} /> : <Copy size={14} />}</button>
                            <button onClick={() => setRotateTarget(key)} className="grid size-8 place-items-center text-slate-400 hover:bg-slate-100 hover:text-slate-950" aria-label="Rotate API key"><RefreshCw size={14} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-8 flex items-start gap-3 border-l-2 border-blue-500 pl-4">
                <ShieldCheck size={17} className="mt-0.5 text-blue-600" />
                <div>
                  <p className="text-[12px] font-semibold">Production key policy</p>
                  <p className="mt-1 max-w-2xl text-[11px] leading-5 text-slate-500">Rotate production keys every 90 days. Revoked values stop authorizing new requests immediately.</p>
                </div>
              </div>
            </section>

            <aside className="xl:border-l xl:border-[#E2E8F0] xl:pl-8">
              <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
                <div>
                  <h2 className="text-[17px] font-semibold tracking-[-0.025em]">Live activity</h2>
                  <p className="mt-1 text-[10px] text-slate-400">Last 60 minutes</p>
                </div>
                <span className="flex items-center gap-1.5 text-[10px] font-medium text-emerald-700"><span className="size-1.5 rounded-full bg-emerald-500" />Live</span>
              </div>
              <div>
                {activity.map(([time, key, action, path, region], i) => (
                  <div key={i} className="border-b border-[#E2E8F0] py-4">
                    <div className="flex items-center justify-between text-[10px] text-slate-400"><span>{time}</span><span>{region}</span></div>
                    <p className="mt-2 text-[11px] font-semibold">{key}</p>
                    <p className="mt-1 text-[11px] text-slate-500">{action}</p>
                    <code className="mt-2 block truncate font-mono text-[9px] text-slate-400">{path}</code>
                  </div>
                ))}
              </div>
              <button className="mt-5 inline-flex items-center gap-2 text-[11px] font-semibold text-slate-700 hover:text-slate-950"><Activity size={13} /> View logs</button>

              <div className="mt-16">
                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">Endpoint</p>
                <code className="mt-3 block break-all font-mono text-[10px] leading-5 text-slate-600">https://api.northstar.dev/v1</code>
                <button className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-semibold"><Clipboard size={12} /> Copy endpoint</button>
              </div>
            </aside>
          </div>
        </div>
      </main>

      {rotateTarget && <Modal onClose={() => setRotateTarget(null)} title="Rotate endpoint key">
        <p className="text-[13px] leading-6 text-slate-600">Rotate <strong>{rotateTarget.name}</strong>? The current value will stop authorizing new requests after the new key is issued.</p>
        <div className="mt-7 flex justify-end gap-2">
          <button onClick={() => setRotateTarget(null)} className="h-9 border border-[#E2E8F0] bg-white px-4 text-[11px] font-semibold">Cancel</button>
          <button onClick={rotate} className="h-9 bg-slate-950 px-4 text-[11px] font-semibold text-white">Rotate key</button>
        </div>
      </Modal>}

      {createOpen && <Modal onClose={() => setCreateOpen(false)} title="Create API key">
        <form onSubmit={createKey}>
          <Field label="Key name"><input autoFocus value={newKey.name} onChange={e => setNewKey(v => ({...v, name:e.target.value}))} placeholder="e.g. Billing worker" className="h-10 w-full border border-[#E2E8F0] bg-white px-3 text-[12px] outline-none" /></Field>
          <Field label="Environment"><select value={newKey.env} onChange={e => setNewKey(v => ({...v, env:e.target.value}))} className="h-10 w-full border border-[#E2E8F0] bg-white px-3 text-[12px]"><option>Test</option><option>Production</option></select></Field>
          <Field label="Scope"><select value={newKey.scope} onChange={e => setNewKey(v => ({...v, scope:e.target.value}))} className="h-10 w-full border border-[#E2E8F0] bg-white px-3 text-[12px]"><option>read:all</option><option>payments:write</option><option>webhooks:verify</option><option>reports:read</option></select></Field>
          <div className="mt-7 flex justify-end gap-2"><button type="button" onClick={() => setCreateOpen(false)} className="h-9 border border-[#E2E8F0] bg-white px-4 text-[11px] font-semibold">Cancel</button><button className="h-9 bg-slate-950 px-4 text-[11px] font-semibold text-white">Create key</button></div>
        </form>
      </Modal>}
    </div>
  );
}

function Nav({ icon: Icon, label, active }) {
  return <button className={`flex h-9 w-full items-center gap-2.5 px-2 text-left font-medium ${active ? "bg-slate-950 text-white" : "text-slate-500 hover:bg-slate-100 hover:text-slate-950"}`}><Icon size={14} />{label}</button>;
}
function Metric({ label, value, note, last }) {
  return <div className={`px-0 py-5 sm:px-5 xl:px-6 ${!last ? "xl:border-r xl:border-[#E2E8F0]" : ""}`}><p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">{label}</p><p className="mt-3 text-[28px] font-medium tracking-[-0.045em] text-slate-950">{value}</p><p className="mt-1 text-[10px] text-slate-400">{note}</p></div>;
}
function Modal({ title, onClose, children }) {
  return <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/25 p-4 backdrop-blur-[2px]" onMouseDown={e => e.target === e.currentTarget && onClose()}>
    <div role="dialog" aria-modal="true" aria-label={title} className="w-full max-w-[460px] border border-[#E2E8F0] bg-[#F8FAFC] p-6 shadow-2xl shadow-slate-950/10">
      <div className="mb-6 flex items-center justify-between border-b border-[#E2E8F0] pb-4"><h3 className="text-[19px] font-semibold tracking-[-0.03em]">{title}</h3><button onClick={onClose} aria-label="Close dialog" className="grid size-8 place-items-center text-slate-400 hover:bg-slate-100 hover:text-slate-950"><X size={16} /></button></div>
      {children}
    </div>
  </div>;
}
function Field({label, children}) {
  return <label className="mb-5 block"><span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.1em] text-slate-500">{label}</span>{children}</label>;
}

createRoot(document.getElementById("root")).render(<React.StrictMode><App /></React.StrictMode>);
