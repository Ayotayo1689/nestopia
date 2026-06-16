import { useState } from "react";
import { ArrowRight, Eye, EyeOff, Radar, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

const truckImage =
  "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1600&q=90";

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setTimeout(() => navigate("/dashboard"), 900);
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-white text-white md:h-screen md:flex-row">
      <section
        className="relative min-h-[320px] w-full overflow-hidden bg-cover bg-center p-5 md:h-screen md:min-h-0 md:w-[56%] md:flex-none md:p-8 lg:p-10"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(21,18,41,0.94) 0%, rgba(21,18,41,0.72) 45%, rgba(82,63,141,0.42) 100%), url(${truckImage})`,
        }}
      >
        <div className="absolute inset-0  " />
        <div className="absolute inset-5 rounded-[2rem] border border-white/10 md:inset-8 md:rounded-[2.5rem]" />
        <div className="relative z-10 flex h-full min-h-[280px] flex-col justify-between rounded-[2rem] bg-black/10 p-5 ring-1 ring-white/10 backdrop-blur-[2px] md:min-h-full md:rounded-[2.5rem] md:p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e09b11] text-[#151229]">
              <Radar size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Nestopia</h1>
              <p className="text-sm text-white/50">Asset Intelligence</p>
            </div>
          </div>

          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-white/60">
              <ShieldCheck size={14} />
              Secure operations
            </div>
            <h2 className="max-w-xl text-3xl font-bold tracking-tight md:text-5xl">
              Truck and fleet visibility from one command center.
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-6 text-white/65">
              Track assigned locations, route status, offline assets, and live
              movement across field operations.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              ["Live", "Tracking"],
              ["Route", "Insights"],
              ["Signal", "Alerts"],
            ].map(([top, bottom]) => (
              <div key={top} className="rounded-3xl bg-white/8 p-4 ring-1 ring-white/10">
                <p className="text-lg font-bold">{top}</p>
                <p className="text-xs text-white/45">{bottom}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="flex w-full items-center justify-center  px-4 py-10 md:h-screen md:flex-1 md:bg-white">
        <div className="w-full max-w-md   bg-white p-6 text-slate-950   md:p-8 md:shadow-none md:ring-0">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#523f8d]">
              Welcome back
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">
              Sign in to your workspace
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Continue monitoring live assets and route activity.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#523f8d] focus:bg-white"
                required
              />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label htmlFor="password" className="block text-xs font-bold uppercase tracking-wide text-slate-500">
                  Password
                </label>
                <a href="#" className="text-xs font-semibold text-[#523f8d]">
                  Forgot?
                </a>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 pr-12 text-sm text-slate-900 outline-none transition focus:border-[#523f8d] focus:bg-white"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-[#523f8d]"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm font-medium text-slate-500">
              <input type="checkbox" className="h-4 w-4 rounded accent-[#523f8d]" />
              Keep me signed in
            </label>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#523f8d] py-3 text-sm font-bold text-white shadow-lg shadow-[#523f8d]/20 transition hover:bg-[#443276] disabled:opacity-70"
            >
              {isLoading ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <>
                  Sign in
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
