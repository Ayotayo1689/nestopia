import React, { useMemo, useState } from "react";
import { mockLocations, mockVehicles } from "../data/mockData";
import { Building2, Clock, MapPin, Search, SlidersHorizontal } from "lucide-react";

interface AssetsProps {
  onAssetSelect: (assetId: string) => void;
}

const PAGE_SIZE = 5;

const statusClasses: Record<string, string> = {
  online: "bg-green-100 text-green-700",
  idle: "bg-amber-100 text-amber-700",
  offline: "bg-red-100 text-red-700",
  maintenance: "bg-purple-100 text-purple-700",
  "in-motion": "bg-green-100 text-green-700",
};

const Assets: React.FC<AssetsProps> = ({ onAssetSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [companyFilter, setCompanyFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);

  const companies = useMemo(() => {
    return Array.from(
      new Set(
        mockVehicles
          .map((asset) => asset.companyName)
          .filter((company): company is string => Boolean(company)),
      ),
    );
  }, []);

  const filteredAssets = useMemo(() => {
    const query = searchTerm.toLowerCase();

    return mockVehicles.filter((asset) => {
      const assignedLocation = mockLocations.find(
        (location) => location.id === asset.assignedLocationId,
      );
      const matchesSearch =
        asset.name.toLowerCase().includes(query) ||
        asset.id.toLowerCase().includes(query) ||
        asset.companyName?.toLowerCase().includes(query) ||
        assignedLocation?.name.toLowerCase().includes(query);
      const matchesCompany =
        companyFilter === "all" || asset.companyName === companyFilter;
      const matchesLocation =
        locationFilter === "all" || asset.assignedLocationId === locationFilter;
      const matchesStatus =
        statusFilter === "all" || asset.status === statusFilter;

      return (
        matchesSearch && matchesCompany && matchesLocation && matchesStatus
      );
    });
  }, [companyFilter, locationFilter, searchTerm, statusFilter]);

  const pageCount = Math.max(1, Math.ceil(filteredAssets.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const paginatedAssets = filteredAssets.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  return (
    <div className="px-4 py-6 md:px-8 md:py-8">
      <div className="mb-5 flex flex-col justify-between gap-3 rounded-[2rem] bg-[#151229] p-6 text-white shadow-xl shadow-slate-300/40 md:flex-row md:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">
            Asset inventory
          </p>
          <h2 className="mt-2 text-2xl font-bold md:text-3xl">Assets</h2>
          <p className="mt-1 text-sm text-white/55">
            All tracked assets across every location.
          </p>
        </div>
        <div className="rounded-2xl bg-white/10 px-4 py-3 ring-1 ring-white/10">
          <p className="text-xs font-semibold text-white/45">Total found</p>
          <p className="mt-1 text-2xl font-bold">{filteredAssets.length}</p>
        </div>
      </div>

      <div className="mb-4 grid gap-3 rounded-[1.75rem] bg-white p-4 shadow-sm ring-1 ring-slate-200/70 md:grid-cols-[1.4fr_1fr_1fr_0.8fr]">
        <div className="relative flex items-center rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3">
          <Search size={18} className="mr-2 text-slate-400" />
          <input
            value={searchTerm}
            onChange={(event) => {
              setSearchTerm(event.target.value);
              setPage(1);
            }}
            placeholder="Search asset, company, location..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-slate-300"
          />
        </div>

        <select
          value={companyFilter}
          onChange={(event) => {
            setCompanyFilter(event.target.value);
            setPage(1);
          }}
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-600 outline-none"
        >
          <option value="all">All companies</option>
          {companies.map((company) => (
            <option key={company} value={company}>
              {company}
            </option>
          ))}
        </select>

        <select
          value={locationFilter}
          onChange={(event) => {
            setLocationFilter(event.target.value);
            setPage(1);
          }}
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-600 outline-none"
        >
          <option value="all">All locations</option>
          {mockLocations.map((location) => (
            <option key={location.id} value={location.id}>
              {location.name}
            </option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(event) => {
            setStatusFilter(event.target.value);
            setPage(1);
          }}
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-600 outline-none"
        >
          <option value="all">All status</option>
          <option value="online">Online</option>
          <option value="idle">Idle</option>
          <option value="offline">Offline</option>
        </select>
      </div>

      <div className="overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-slate-200/70">
        <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50/80 px-4 py-3 text-sm font-bold text-slate-700">
          <SlidersHorizontal size={17} className="text-[#523f8d]" />
          {filteredAssets.length} assets found
        </div>

        <div className="flex flex-col gap-3 p-3 md:hidden">
          {paginatedAssets.length > 0 ? (
            paginatedAssets.map((asset) => {
              const assignedLocation = mockLocations.find(
                (location) => location.id === asset.assignedLocationId,
              );

              return (
                <button
                  key={asset.id}
                  className="rounded-[1.35rem] border border-slate-100 bg-white p-4 text-left shadow-sm transition hover:border-[#523f8d] hover:bg-[#f5f6ff] hover:shadow-lg"
                  onClick={() => onAssetSelect(asset.id)}
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={asset.image}
                      alt={asset.name}
                      className="h-14 w-14 shrink-0 rounded-2xl object-cover ring-1 ring-slate-100"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-bold text-slate-950">
                            {asset.name}
                          </p>
                          <p className="mt-0.5 text-xs text-slate-400">
                            {asset.id}
                          </p>
                        </div>
                        <span
                          className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                            statusClasses[asset.status] ?? statusClasses.idle
                          }`}
                        >
                          {asset.status === "in-motion" ? "online" : asset.status}
                        </span>
                      </div>

                      <div className="mt-4 grid gap-2 text-xs font-medium text-slate-500">
                        <div className="flex items-center gap-2">
                          <Building2 size={14} className="text-[#523f8d]" />
                          <span className="truncate">{asset.companyName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin size={14} className="text-[#523f8d]" />
                          <span className="truncate">
                            {assignedLocation?.name ?? "Unassigned"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock size={14} className="text-[#523f8d]" />
                          <span>
                            Updated{" "}
                            {asset.lastUpdated.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })
          ) : (
            <div className="rounded-2xl bg-slate-50 px-4 py-10 text-center text-sm text-slate-400">
              No assets match your filters.
            </div>
          )}
        </div>

        <div className="hidden overflow-x-auto md:block">
          <div className="min-w-[860px]">
            <div className="grid grid-cols-[64px_1.1fr_1fr_1fr_0.7fr_0.7fr] gap-4 border-b border-slate-100 bg-slate-50/80 px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-400">
              <span>Image</span>
              <span>Asset</span>
              <span>Company</span>
              <span>Location</span>
              <span>Status</span>
              <span>Updated</span>
            </div>

            {paginatedAssets.length > 0 ? paginatedAssets.map((asset) => {
              const assignedLocation = mockLocations.find(
                (location) => location.id === asset.assignedLocationId,
              );

              return (
                <button
                  key={asset.id}
                  className="grid w-full grid-cols-[64px_1.1fr_1fr_1fr_0.7fr_0.7fr] items-center gap-4 border-b border-slate-100 px-4 py-3 text-left transition hover:bg-[#f5f6ff]"
                  onClick={() => onAssetSelect(asset.id)}
                >
                  <img
                    src={asset.image}
                    alt={asset.name}
                    className="h-12 w-12 rounded-2xl object-cover ring-1 ring-slate-100"
                  />
                  <div>
                    <p className="text-sm font-bold text-slate-950">
                      {asset.name}
                    </p>
                    <p className="text-xs text-slate-400">{asset.id}</p>
                  </div>
                  <p className="text-sm font-medium text-slate-600">{asset.companyName}</p>
                  <p className="text-sm text-slate-500">
                    {assignedLocation?.name ?? "Unassigned"}
                  </p>
                  <span
                    className={`w-fit rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                      statusClasses[asset.status] ?? statusClasses.idle
                    }`}
                  >
                    {asset.status === "in-motion" ? "online" : asset.status}
                  </span>
                  <p className="text-sm text-slate-400">
                    {asset.lastUpdated.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </button>
              );
            }) : (
              <div className="px-4 py-10 text-center text-sm text-gray-400">
                No assets match your filters.
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3 bg-slate-50/70 px-4 py-4 text-sm font-medium text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <span>
            Page {currentPage} of {pageCount}
          </span>
          <div className="flex gap-2">
            <button
              className="rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm disabled:opacity-40"
              disabled={currentPage === 1}
              onClick={() => setPage((value) => Math.max(1, value - 1))}
            >
              Previous
            </button>
            <button
              className="rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm disabled:opacity-40"
              disabled={currentPage === pageCount}
              onClick={() => setPage((value) => Math.min(pageCount, value + 1))}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assets;
