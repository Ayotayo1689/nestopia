import React, { useMemo, useState } from "react";
import { mockLocations, mockVehicles } from "../data/mockData";
import { Location, Vehicle } from "../types";
import { ArrowLeft, Building2, MapPin, Search, Star } from "lucide-react";

interface LocationsProps {
  onAssetSelect: (assetId: string) => void;
}

const statusClasses: Record<string, string> = {
  online: "bg-green-100 text-green-700",
  idle: "bg-amber-100 text-amber-700",
  offline: "bg-red-100 text-red-700",
  maintenance: "bg-purple-100 text-purple-700",
  "in-motion": "bg-green-100 text-green-700",
};

const Locations: React.FC<LocationsProps> = ({ onAssetSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null,
  );

  const locations = useMemo(() => {
    return mockLocations
      .filter((location) => {
        const query = searchTerm.toLowerCase();
        return (
          location.name.toLowerCase().includes(query) ||
          location.address.toLowerCase().includes(query)
        );
      })
      .sort((a, b) => Number(Boolean(b.isFavorite)) - Number(Boolean(a.isFavorite)));
  }, [searchTerm]);

  const locationAssets = useMemo(() => {
    if (!selectedLocation) return [];
    return mockVehicles.filter(
      (asset) => asset.assignedLocationId === selectedLocation.id,
    );
  }, [selectedLocation]);

  const renderAssetRow = (asset: Vehicle) => (
    <button
      key={asset.id}
      className="grid w-full grid-cols-[56px_1.2fr_1fr_0.8fr_0.7fr] items-center gap-4 border-b border-gray-100 px-4 py-3 text-left transition hover:bg-[#f5f6ff]"
      onClick={() => onAssetSelect(asset.id)}
    >
      <img
        src={asset.image}
        alt={asset.name}
        className="h-11 w-11 rounded-lg object-cover"
      />
      <div>
        <p className="text-sm font-semibold text-gray-900">{asset.name}</p>
        <p className="text-xs text-gray-400">{asset.id}</p>
      </div>
      <p className="text-sm text-gray-600">{asset.companyName}</p>
      <p className="text-sm text-gray-500">{selectedLocation?.name}</p>
      <span
        className={`w-fit rounded-full px-3 py-1 text-xs font-semibold capitalize ${
          statusClasses[asset.status] ?? statusClasses.idle
        }`}
      >
        {asset.status === "in-motion" ? "online" : asset.status}
      </span>
    </button>
  );

  return (
    <div className="px-4 py-6 md:px-8 md:py-8">
      <div className="grid gap-4 md:grid-cols-[minmax(260px,25%)_minmax(0,70%)] md:items-start">
        <section className={`min-w-0 ${selectedLocation ? "hidden md:block" : "block"}`}>
          <div className="mb-4 rounded-[1.75rem] bg-[#151229] p-5 text-white shadow-xl shadow-slate-300/40">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">
              Location registry
            </p>
            <h2 className="mt-2 text-2xl font-bold">Locations</h2>
            <p className="mt-1 text-sm text-white/55">
              Favorites are shown first.
            </p>
          </div>

          <div className="relative mb-4 flex items-center rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <Search size={18} className="mr-2 text-slate-400" />
            <input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search locations..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-slate-300"
            />
          </div>

          <div className="flex flex-col gap-3 md:max-h-[calc(100vh-210px)] md:overflow-y-auto md:pr-1">
            {locations.map((location) => {
              const isSelected = selectedLocation?.id === location.id;

              return (
                <button
                  key={location.id}
                  className={`w-full rounded-[1.35rem] border bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-[#d9d3f0] hover:shadow-xl hover:shadow-slate-200/70 ${
                    isSelected
                      ? "border-[#523f8d] shadow-[0_0_0_3px_rgba(82,63,141,0.1)]"
                      : "border-slate-200"
                  }`}
                  onClick={() => setSelectedLocation(location)}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                        <p className="truncate text-sm font-bold text-slate-950">
                          {location.name}
                        </p>
                      <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-400">
                        {location.address}
                      </p>
                    </div>
                    <Star
                      size={18}
                      className={
                        location.isFavorite
                          ? "fill-[#e09b11] text-[#e09b11]"
                          : "text-gray-300"
                      }
                    />
                  </div>

                  <div className="mt-3 flex items-center gap-2 rounded-full bg-slate-50 px-3 py-2 text-xs font-medium text-slate-500">
                    <MapPin size={14} />
                    <span>
                      {location.latitude.toFixed(4)},{" "}
                      {location.longitude.toFixed(4)}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <section className={`min-w-0 ${selectedLocation ? "block" : "hidden md:block"}`}>
          {!selectedLocation ? (
            <div className="flex h-full min-h-[520px] items-center justify-center rounded-[2rem] border border-dashed border-slate-300 bg-white/70 text-center shadow-sm">
              <div>
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-[#eeeaff] text-[#523f8d]">
                  <MapPin size={30} />
                </div>
                <p className="text-sm font-bold text-slate-800">
                  Select a location
                </p>
                <p className="mt-1 text-sm text-slate-400">
                  Assets assigned to that location will show here.
                </p>
              </div>
            </div>
          ) : (
            <div className="overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-slate-200/70">
              <div className="border-b border-slate-100 bg-gradient-to-br from-white to-[#f7f5ff] p-5">
                <button
                  className="mb-4 flex items-center gap-2 rounded-full border border-slate-200 bg-white p-2 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-[#523f8d] hover:text-[#523f8d] md:hidden"
                  onClick={() => setSelectedLocation(null)}
                >
                  <ArrowLeft size={16} />
                </button>

                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#523f8d]">
                      Selected location
                    </p>
                    <h3 className="mt-2 text-2xl font-bold text-slate-950">
                      {selectedLocation.name}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      {selectedLocation.address}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-slate-200">
                    <p className="text-xs font-semibold text-slate-400">Assigned assets</p>
                    <p className="mt-1 text-2xl font-bold text-slate-950">{locationAssets.length}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 p-3 md:hidden">
                {locationAssets.length > 0 ? (
                  locationAssets.map((asset) => (
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
                              {asset.status === "in-motion"
                                ? "online"
                                : asset.status}
                            </span>
                          </div>

                          <div className="mt-4 grid gap-2 text-xs font-medium text-slate-500">
                            <div className="flex items-center gap-2">
                              <Building2 size={14} className="text-[#523f8d]" />
                              <span className="truncate">
                                {asset.companyName}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin size={14} className="text-[#523f8d]" />
                              <span className="truncate">
                                {selectedLocation.name}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="rounded-2xl bg-slate-50 px-4 py-10 text-center text-sm text-slate-400">
                    No assets assigned to this location yet.
                  </div>
                )}
              </div>

              <div className="hidden overflow-x-auto md:block">
                <div className="min-w-[760px]">
                  <div className="grid grid-cols-[56px_1.2fr_1fr_0.8fr_0.7fr] gap-4 border-b border-slate-100 bg-slate-50/80 px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-400">
                    <span>Image</span>
                    <span>Asset</span>
                    <span>Company</span>
                    <span>Location</span>
                    <span>Status</span>
                  </div>

                  {locationAssets.length > 0 ? (
                    locationAssets.map(renderAssetRow)
                  ) : (
                    <div className="px-4 py-10 text-center text-sm text-gray-400">
                      No assets assigned to this location yet.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Locations;
