import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Truck,
  MapPin,
  Map,
  Shield,
  Settings,
  Bell,
  Search,
  Activity,
} from "lucide-react";

interface AppLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "locations", label: "Locations", icon: MapPin },
  { id: "assets", label: "Assets", icon: Truck },
  { id: "map", label: "Map", icon: Map },
  { id: "admin", label: "Admin", icon: Shield },
  { id: "settings", label: "Settings", icon: Settings },
];

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const activeTab = location.pathname.split("/")[1] || "dashboard";
  const showAppChrome = activeTab !== "login";

  return (
    <div className="flex h-screen bg-[#eef1f6] text-slate-950">
      {showAppChrome && (
        <aside className="hidden w-64 shrink-0 flex-col bg-[#151229] px-4 py-5 text-white md:flex">
          <div className="mb-8 rounded-3xl bg-white/8 p-4 ring-1 ring-white/10">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#e09b11] text-[#151229] shadow-lg shadow-[#e09b11]/20">
                <Activity size={22} strokeWidth={2.2} />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight">Nestopia</h1>
                <p className="text-xs text-white/55">Asset Intelligence</p>
              </div>
            </div>
          </div>

          <nav className="flex flex-1 flex-col gap-1.5">
            {navItems.map(({ id, label, icon: Icon }) => {
              const isActive = activeTab === id;

              return (
                <button
                  key={id}
                  className={`group flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-white text-[#151229] shadow-xl shadow-black/15"
                      : "text-white/58 hover:bg-white/8 hover:text-white"
                  }`}
                  onClick={() => navigate(`/${id}`)}
                  title={label}
                >
                  <Icon
                    size={20}
                    strokeWidth={1.8}
                    className={isActive ? "text-[#523f8d]" : "text-white/45 group-hover:text-white"}
                  />
                  <span>{label}</span>
                </button>
              );
            })}
          </nav>

          <div className="mt-6 rounded-3xl bg-[#211b3d] p-4 ring-1 ring-white/10">
            <div className="mb-3 flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_16px_rgba(52,211,153,0.7)]" />
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
                Live workspace
              </p>
            </div>
            <p className="text-sm font-semibold text-white">Ayotayo</p>
            <p className="mt-1 text-xs text-white/45">Operations Manager</p>
          </div>
        </aside>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        {showAppChrome && (
          <header className="flex items-center justify-between border-b border-white/70 bg-white/80 px-4 py-4 shadow-sm shadow-slate-200/40 backdrop-blur sm:min-h-[72px] sm:px-6 md:px-8">
            <div className="flex items-center gap-3">
              <img
                src="https://api.dicebear.com/9.x/avataaars-neutral/svg?seed=5"
                alt="User Avatar"
                className="h-11 w-11 rounded-2xl bg-[#f5f6ff] ring-1 ring-slate-200"
              />
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Command Center</div>
                <h1 className="text-lg font-bold text-slate-950 sm:text-2xl">Hello, Ayotayo.</h1>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-400 shadow-sm lg:flex">
                <Search size={16} />
                <span>Search assets, locations...</span>
              </div>
              <button className="relative rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition hover:border-[#523f8d]/30 hover:text-[#523f8d]">
                <Bell className="h-5 w-5 text-slate-700" />
                <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
              </button>
            </div>
          </header>
        )}

        <main className="flex-1 overflow-y-auto pb-[78px] md:pb-0">
          {children}
        </main>

        {showAppChrome && (
          <nav className="fixed bottom-0 left-0 right-0 z-[1000] flex h-[78px] items-stretch justify-around border-t border-slate-200 bg-white/95 shadow-[0_-12px_32px_rgba(15,23,42,0.08)] backdrop-blur md:hidden">
            {navItems.map(({ id, label, icon: Icon }) => {
              const isActive = activeTab === id;

              return (
                <button
                  key={id}
                  className={`flex flex-1 cursor-pointer flex-col items-center justify-center gap-1 border-none py-2 text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? "text-[#523F8D]"
                      : "text-slate-400 hover:text-[#523f8d]"
                  }`}
                  onClick={() => navigate(`/${id}`)}
                  title={label}
                >
                  <span className={`rounded-2xl p-2 ${isActive ? "bg-[#f0ecff]" : ""}`}>
                    <Icon size={20} strokeWidth={1.8} />
                  </span>
                  <span className="text-[0.62rem] leading-none">
                    {label}
                  </span>
                </button>
              );
            })}
          </nav>
        )}
      </div>
    </div>
  );
};

export default AppLayout;
