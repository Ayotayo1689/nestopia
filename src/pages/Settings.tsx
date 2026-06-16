import React, { useState } from "react";
import { Lock, LogOut, Settings as SettingsIcon } from "lucide-react";

interface AppSettings {
  autoRefresh: boolean;
  refreshInterval: number;
}

const Settings: React.FC = () => {
  const [settings, setSettings] = useState<AppSettings>({
    autoRefresh: true,
    refreshInterval: 5,
  });

  const handleSettingChange = (
    key: keyof AppSettings,
    value: boolean | number,
  ) => {
    setSettings({
      ...settings,
      [key]: value,
    });
  };

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      console.log("Logging out...");
    }
  };

  return (
    <div className="px-4 py-6 md:px-8 md:py-8">
      <h2 className="mb-4 text-xl font-bold text-gray-900">Settings</h2>

      <section className="mb-5 rounded-2xl bg-white p-5 shadow-sm">
        <div className="mb-5 flex items-center gap-3 border-b border-gray-100 pb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#eef2ff] text-[#523f8d]">
            <SettingsIcon size={20} />
          </div>
          <h3 className="text-base font-semibold text-gray-900">
            Auto-Refresh
          </h3>
        </div>

        <div className="flex items-center justify-between gap-4 py-3">
          <div>
            <p className="text-sm font-semibold text-gray-900">
              Enable Auto-Refresh
            </p>
            <p className="mt-1 text-sm text-gray-400">
              Automatically refresh asset data.
            </p>
          </div>

          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              checked={settings.autoRefresh}
              onChange={(event) =>
                handleSettingChange("autoRefresh", event.target.checked)
              }
              className="peer sr-only"
            />
            <span className="h-7 w-12 rounded-full bg-gray-200 transition peer-checked:bg-[#523f8d]"></span>
            <span className="absolute left-1 h-5 w-5 rounded-full bg-white shadow transition peer-checked:translate-x-5"></span>
          </label>
        </div>

        {settings.autoRefresh && (
          <div className="mt-4 flex flex-col gap-4 border-t border-gray-100 pt-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-900">
                Refresh Interval
              </p>
              <p className="mt-1 text-sm text-gray-400">
                How often to fetch new data.
              </p>
            </div>

            <div className="flex items-center gap-4 md:w-80">
              <input
                type="range"
                min="3"
                max="60"
                value={settings.refreshInterval}
                onChange={(event) =>
                  handleSettingChange(
                    "refreshInterval",
                    parseInt(event.target.value),
                  )
                }
                className="h-2 flex-1 cursor-pointer accent-[#523f8d]"
              />
              <span className="w-12 rounded-full bg-[#f5f6ff] px-3 py-1 text-center text-sm font-semibold text-[#523f8d]">
                {settings.refreshInterval}s
              </span>
            </div>
          </div>
        )}
      </section>

      <section className="rounded-2xl bg-white p-5 shadow-sm">
        <div className="mb-5 flex items-center gap-3 border-b border-gray-100 pb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-red-50 text-red-600">
            <Lock size={20} />
          </div>
          <h3 className="text-base font-semibold text-gray-900">Account</h3>
        </div>

        <button
          className="flex items-center gap-2 rounded-full bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
          onClick={handleLogout}
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </section>
    </div>
  );
};

export default Settings;
