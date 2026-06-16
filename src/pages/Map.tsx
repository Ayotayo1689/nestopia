import React, { useMemo, useState } from "react";
import {
  calculateDistance,
  mockLocations,
  mockVehicles,
} from "../data/mockData";
import { Location, Vehicle } from "../types";
import { MapPin, Navigation, Search } from "lucide-react";

interface MapProps {
  selectedAssetId: string | null;
  onAssetSelect: (assetId: string) => void;
}

const statusClasses: Record<string, string> = {
  online: "bg-green-100 text-green-700",
  idle: "bg-amber-100 text-amber-700",
  offline: "bg-red-100 text-red-700",
  maintenance: "bg-purple-100 text-purple-700",
  "in-motion": "bg-green-100 text-green-700",
};

const getPinPosition = (latitude: number, longitude: number) => {
  const x = ((longitude + 74.02) / 0.08) * 100;
  const y = ((40.78 - latitude) / 0.09) * 100;

  return {
    left: `${Math.min(88, Math.max(8, x))}%`,
    top: `${Math.min(84, Math.max(10, y))}%`,
  };
};

const Map: React.FC<MapProps> = ({ selectedAssetId, onAssetSelect }) => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null,
  );
  const [assetSearch, setAssetSearch] = useState("");

  const selectedAsset = useMemo(
    () => mockVehicles.find((asset) => asset.id === selectedAssetId) ?? null,
    [selectedAssetId],
  );

  const assignedLocation = useMemo(() => {
    if (!selectedAsset) return null;
    return (
      mockLocations.find(
        (location) => location.id === selectedAsset.assignedLocationId,
      ) ?? null
    );
  }, [selectedAsset]);

  const locationAssets = useMemo(() => {
    if (!selectedLocation) return [];
    const query = assetSearch.toLowerCase();
    return mockVehicles.filter((asset) => {
      const belongsToLocation = asset.assignedLocationId === selectedLocation.id;
      const matchesSearch =
        asset.name.toLowerCase().includes(query) ||
        asset.companyName?.toLowerCase().includes(query) ||
        asset.id.toLowerCase().includes(query);

      return belongsToLocation && matchesSearch;
    });
  }, [assetSearch, selectedLocation]);

  const distance =
    selectedAsset && assignedLocation
      ? calculateDistance(
          selectedAsset.latitude,
          selectedAsset.longitude,
          assignedLocation.latitude,
          assignedLocation.longitude,
        )
      : 0;

  const showSidePanel = Boolean(selectedAsset || selectedLocation);

  const handleLocationClick = (location: Location) => {
    setSelectedLocation(location);
    setAssetSearch("");
  };

  const renderMapPins = () => {
    if (selectedAsset && assignedLocation) {
      return (
        <>
          <div
            className="absolute h-1 origin-left rounded-full bg-[#523f8d]/50"
            style={{
              left: getPinPosition(
                selectedAsset.latitude,
                selectedAsset.longitude,
              ).left,
              top: getPinPosition(
                selectedAsset.latitude,
                selectedAsset.longitude,
              ).top,
              width: "26%",
              transform: "rotate(-18deg)",
            }}
          />
          <div
            className="absolute z-[2] flex -translate-x-1/2 -translate-y-1/2 items-center gap-1 rounded-full border-[3px] border-white bg-[#e09b11] px-3 py-2 text-xs font-bold text-white shadow-[0_10px_24px_rgba(17,24,39,0.2)]"
            style={getPinPosition(selectedAsset.latitude, selectedAsset.longitude)}
          >
            <Navigation size={16} />
            <span>Current</span>
          </div>
          <div
            className="absolute z-[2] flex -translate-x-1/2 -translate-y-1/2 items-center gap-1 rounded-full border-[3px] border-white bg-[#523f8d] px-3 py-2 text-xs font-bold text-white shadow-[0_10px_24px_rgba(17,24,39,0.2)]"
            style={getPinPosition(
              assignedLocation.latitude,
              assignedLocation.longitude,
            )}
          >
            <MapPin size={16} />
            <span>Assigned</span>
          </div>
        </>
      );
    }

    return mockLocations.map((location) => (
      <button
        key={location.id}
        className="absolute z-[2] flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[3px] border-white bg-[#523f8d] text-white shadow-[0_10px_24px_rgba(82,63,141,0.25)] transition hover:scale-110 hover:shadow-[0_14px_28px_rgba(82,63,141,0.32)]"
        style={getPinPosition(location.latitude, location.longitude)}
        onClick={() => handleLocationClick(location)}
        title={location.name}
      >
        <MapPin size={18} />
      </button>
    ));
  };

  const renderSidePanel = () => {
    if (selectedAsset && assignedLocation) {
      return (
        <aside className="rounded-[2rem] bg-white p-4 shadow-sm ring-1 ring-slate-200/70">
          <img
            src={selectedAsset.image}
            alt={selectedAsset.name}
            className="h-36 w-full rounded-3xl object-cover"
          />
          <div className="mt-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#523f8d]">
              Focused asset
            </p>
            <h3 className="mt-2 text-xl font-bold text-slate-950">
              {selectedAsset.name}
            </h3>
            <p className="text-sm text-slate-400">{selectedAsset.id}</p>
          </div>

          <div className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between gap-4 border-b border-gray-100 pb-3">
              <span className="text-slate-400">Company</span>
              <strong className="max-w-[58%] text-right font-semibold text-slate-900">{selectedAsset.companyName}</strong>
            </div>
            <div className="flex justify-between gap-4 border-b border-gray-100 pb-3">
              <span className="text-slate-400">Status</span>
              <strong
                className={`rounded-full px-3 py-1 text-xs capitalize ${
                  statusClasses[selectedAsset.status] ?? statusClasses.idle
                }`}
              >
                {selectedAsset.status === "in-motion"
                  ? "online"
                  : selectedAsset.status}
              </strong>
            </div>
            <div className="flex justify-between gap-4 border-b border-gray-100 pb-3">
              <span className="text-slate-400">Current location</span>
              <strong className="max-w-[58%] text-right font-semibold text-slate-900">{selectedAsset.currentAddress}</strong>
            </div>
            <div className="flex justify-between gap-4 border-b border-gray-100 pb-3">
              <span className="text-slate-400">Assigned location</span>
              <strong className="max-w-[58%] text-right font-semibold text-slate-900">{assignedLocation.name}</strong>
            </div>
            <div className="flex justify-between gap-4 border-b border-gray-100 pb-3">
              <span className="text-slate-400">Distance</span>
              <strong className="max-w-[58%] text-right font-semibold text-slate-900">{distance.toFixed(2)} km</strong>
            </div>
            <div className="flex justify-between gap-4 border-b border-gray-100 pb-3">
              <span className="text-slate-400">Coordinates</span>
              <strong className="max-w-[58%] text-right font-semibold text-slate-900">
                {selectedAsset.latitude.toFixed(4)},{" "}
                {selectedAsset.longitude.toFixed(4)}
              </strong>
            </div>
          </div>
        </aside>
      );
    }

    if (!selectedLocation) return null;

    return (
      <aside className="rounded-[2rem] bg-white p-4 shadow-sm ring-1 ring-slate-200/70">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#523f8d]">
          Location assets
        </p>
        <h3 className="mt-2 text-xl font-bold text-slate-950">
          {selectedLocation.name}
        </h3>
        <p className="mt-1 text-sm text-slate-400">{selectedLocation.address}</p>

        <div className="mt-4 flex items-center rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3">
          <Search size={17} className="mr-2 text-slate-400" />
          <input
            value={assetSearch}
            onChange={(event) => setAssetSearch(event.target.value)}
            placeholder="Search assets..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-slate-300"
          />
        </div>

        <div className="mt-4 flex flex-col gap-3">
          {locationAssets.length > 0 ? (
            locationAssets.map((asset: Vehicle) => (
              <button
                key={asset.id}
                className="flex items-center gap-3 rounded-2xl border border-slate-100 p-3 text-left shadow-sm transition hover:border-[#523f8d] hover:bg-[#f5f6ff]"
                onClick={() => onAssetSelect(asset.id)}
              >
                <img
                  src={asset.image}
                  alt={asset.name}
                  className="h-12 w-12 rounded-2xl object-cover ring-1 ring-slate-100"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-slate-950">
                    {asset.name}
                  </p>
                  <p className="truncate text-xs text-slate-400">
                    {asset.companyName}
                  </p>
                </div>
                <span
                  className={`rounded-full px-2 py-1 text-xs capitalize ${
                    statusClasses[asset.status] ?? statusClasses.idle
                  }`}
                >
                  {asset.status === "in-motion" ? "online" : asset.status}
                </span>
              </button>
            ))
          ) : (
            <p className="rounded-2xl bg-slate-50 p-6 text-center text-sm text-slate-400">
              No assets found for this location.
            </p>
          )}
        </div>
      </aside>
    );
  };

  return (
    <div className="p-4 md:p-8">
      <div className="mb-5 rounded-[2rem] bg-[#151229] p-6 text-white shadow-xl shadow-slate-300/40">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">
          Spatial command
        </p>
        <h2 className="mt-2 text-2xl font-bold md:text-3xl">Map Intelligence</h2>
        <p className="mt-1 max-w-2xl text-sm text-white/55">
          View all location pins or focus on one asset route from current
          position to assigned destination.
        </p>
      </div>
      <div
        className={`grid gap-4 ${
          showSidePanel ? "md:grid-cols-[3fr_1fr]" : "md:grid-cols-1"
        }`}
      >
        <section className="relative min-h-[620px] overflow-hidden rounded-[2rem] bg-[#e8edf0] shadow-sm ring-1 ring-slate-200/70">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(82,63,141,0.1)_1px,transparent_1px),linear-gradient(rgba(82,63,141,0.1)_1px,transparent_1px)] bg-[size:54px_54px]" />
          <div className="absolute inset-x-0 top-1/3 h-10 rotate-[-8deg] bg-white/70" />
          <div className="absolute inset-y-0 left-1/2 w-12 rotate-[18deg] bg-white/70" />
          <div className="absolute bottom-20 left-10 h-16 w-[70%] rotate-[4deg] rounded-full bg-[#d5e7df]" />
          <div className="absolute left-5 top-5 rounded-2xl bg-white/90 px-4 py-3 text-sm font-bold text-slate-700 shadow-lg backdrop-blur">
            Live map layer
          </div>

          {renderMapPins()}
        </section>

        {renderSidePanel()}
      </div>
    </div>
  );
};

export default Map;
