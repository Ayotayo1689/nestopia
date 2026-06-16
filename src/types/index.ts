// Asset tracking types

export interface Vehicle {
  id: string;
  name: string;
  type: "vehicle" | "personnel" | "equipment" | "shipment";
  status: "online" | "in-motion" | "idle" | "offline" | "maintenance";
  latitude: number;
  longitude: number;
  speed: number;
  heading: number;
  lastUpdated: Date;
  destination?: string;
  assignedLocationId?: string;
  currentAddress?: string;
  companyName?: string;
  image?: string;
  eta?: Date;
  driver?: string;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  type: "depot" | "destination" | "checkpoint" | "geofence";
  isFavorite?: boolean;
  createdAt: Date;
}

export interface Asset {
  id: string;
  name: string;
  type: string;
  status: "in-motion" | "idle" | "offline" | "maintenance";
  currentLocation: {
    latitude: number;
    longitude: number;
  };
  destination?: Location;
  eta?: Date;
  lastUpdated: Date;
}

export interface DashboardMetrics {
  totalAssets: number;
  assetsInMotion: number;
  offlineAssets: number;
  totalLocations: number;
  alertCount: number;
}

export interface RouteInfo {
  distance: number; // in km
  duration: number; // in minutes
  polyline?: string;
}
