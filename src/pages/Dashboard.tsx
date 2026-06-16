import React, { useEffect, useState } from "react";
import { getMockDashboardMetrics, mockVehicles } from "../data/mockData";
import { DashboardMetrics } from "../types";
import {
  AlertTriangle,
  ArrowUpRight,
  MapPin,
  Radio,
  Route,
  ScanLine,
  Search,
  ShieldCheck,
  Truck,
  Zap,
} from "lucide-react";
import MapImg from "../asset/map-img.jpg";

const metricCards = [
  {
    key: "totalAssets",
    label: "Tracked Assets",
    helper: "Fleet and field units",
    icon: Truck,
    tone: "bg-[#eeeaff] text-[#523f8d]",
  },
  {
    key: "assetsInMotion",
    label: "Online",
    helper: "Reporting live signal",
    icon: Zap,
    tone: "bg-emerald-100 text-emerald-700",
  },
  {
    key: "offlineAssets",
    label: "Offline",
    helper: "Needs attention",
    icon: Radio,
    tone: "bg-rose-100 text-rose-700",
  },
  {
    key: "totalLocations",
    label: "Locations",
    helper: "Assigned hubs",
    icon: MapPin,
    tone: "bg-amber-100 text-amber-700",
  },
];

const Dashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<DashboardMetrics>(
    getMockDashboardMetrics(),
  );
  const [recentAlerts, setRecentAlerts] = useState<
    Array<{ id: string; message: string; type: string; time: Date }>
  >([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(getMockDashboardMetrics());
    }, 5000);

    setRecentAlerts([
      {
        id: "1",
        message: "Vehicle VEH004 signal dropped below threshold",
        type: "warning",
        time: new Date(Date.now() - 5 * 60000),
      },
      {
        id: "2",
        message: "Truck Alpha exceeded route speed policy",
        type: "warning",
        time: new Date(Date.now() - 15 * 60000),
      },
      {
        id: "3",
        message: "Downtown Hub geofence breach detected",
        type: "critical",
        time: new Date(Date.now() - 30 * 60000),
      },
    ]);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 60) return `${minutes}m ago`;
    return `${Math.floor(minutes / 60)}h ago`;
  };

  return (
    <div className="space-y-6 px-4 py-6 md:px-8 md:py-8">
      <section className="grid gap-4 lg:grid-cols-[1.45fr_0.95fr]">
        <div
          className="relative min-h-[280px] overflow-hidden rounded-[2rem] bg-cover bg-center p-6 text-white shadow-2xl shadow-[#151229]/10 md:p-8"
          style={{ backgroundImage: `url(${MapImg})` }}
        >
          <div className="absolute inset-0 bg-[#151229]/80" />
          <div className="absolute -right-12 -top-12 h-52 w-52 rounded-full border border-white/15" />
          <div className="absolute bottom-0 right-0 h-40 w-72 bg-[#e09b11]/20 blur-3xl" />

          <div className="relative z-10 flex h-full flex-col justify-between gap-8">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-white/70 ring-1 ring-white/15">
                <ShieldCheck size={14} />
                Live operations
              </div>
              <h2 className="max-w-xl text-3xl font-bold tracking-tight md:text-5xl">
                Track every asset from one operational view.
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-6 text-white/70">
                Monitor movement, assigned locations, offline events, and route
                readiness across your fleet.
              </p>
            </div>

            <div className="max-w-xl rounded-full bg-white p-2 shadow-xl shadow-black/20">
              <div className="flex items-center gap-2">
                <Search size={20} className="ml-2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search location key, asset ID, route..."
                  className="min-w-0 flex-1 bg-transparent px-2 text-sm text-slate-900 outline-none placeholder:text-slate-400"
                />
                <button className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e09b11] text-white shadow-lg shadow-[#e09b11]/25">
                  <ScanLine size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <div className="rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-slate-200/70">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-400">
                  Fleet health
                </p>
                <p className="mt-2 text-3xl font-bold text-slate-950">94%</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                <ShieldCheck size={22} />
              </div>
            </div>
            <div className="mt-5 h-2 rounded-full bg-slate-100">
              <div className="h-2 w-[94%] rounded-full bg-emerald-500" />
            </div>
            <p className="mt-3 text-xs text-slate-400">
              Online assets are reporting within expected intervals.
            </p>
          </div>

          <div className="rounded-[2rem] bg-[#151229] p-5 text-white shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-white/45">
                  Active routes
                </p>
                <p className="mt-2 text-3xl font-bold">
                  {mockVehicles.filter((asset) => asset.destination).length}
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-[#e09b11]">
                <Route size={22} />
              </div>
            </div>
            <button className="mt-5 flex items-center gap-2 text-sm font-semibold text-[#e09b11]">
              View route map <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {metricCards.map(({ key, label, helper, icon: Icon, tone }) => (
          <div
            key={key}
            className="rounded-[1.5rem] bg-white p-4 shadow-sm ring-1 ring-slate-200/70 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-slate-200/70"
          >
            <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-2xl ${tone}`}>
              <Icon size={21} />
            </div>
            <p className="text-2xl font-bold text-slate-950">
              {metrics[key as keyof DashboardMetrics]}
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-700">{label}</p>
            <p className="mt-1 text-xs text-slate-400">{helper}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-[1fr_0.75fr]">
        <div className="rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-slate-200/70">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-950">Recent Alerts</h3>
              <p className="text-sm text-slate-400">Latest operational events</p>
            </div>
            <AlertTriangle className="text-[#e09b11]" size={22} />
          </div>

          <div className="space-y-3">
            {recentAlerts.map((alert) => (
              <div
                key={alert.id}
                className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/70 p-3"
              >
                <div
                  className={`h-10 w-1 rounded-full ${
                    alert.type === "critical" ? "bg-rose-500" : "bg-[#e09b11]"
                  }`}
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-slate-900">
                    {alert.message}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    {formatTime(alert.time)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-slate-200/70">
          <h3 className="text-lg font-bold text-slate-950">Asset Mix</h3>
          <p className="mt-1 text-sm text-slate-400">
            Status distribution across tracked units.
          </p>
          <div className="mt-6 space-y-4">
            {[
              ["Online", metrics.assetsInMotion, "bg-emerald-500"],
              ["Offline", metrics.offlineAssets, "bg-rose-500"],
              [
                "Idle",
                mockVehicles.filter((asset) => asset.status === "idle").length,
                "bg-amber-500",
              ],
            ].map(([label, value, color]) => (
              <div key={label as string}>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="font-semibold text-slate-700">{label}</span>
                  <span className="text-slate-400">{value as number}</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100">
                  <div
                    className={`h-2 rounded-full ${color}`}
                    style={{
                      width: `${Math.max(8, ((value as number) / metrics.totalAssets) * 100)}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
