import { Vehicle, Location, Asset, DashboardMetrics } from "../types/index";

// Mock Vehicles/Assets
export const mockVehicles: Vehicle[] = [
  {
    id: "VEH001",
    name: "Truck Alpha",
    companyName: "Northline Logistics",
    image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=160&q=80",
    type: "vehicle",
    status: "online",
    latitude: 40.7128,
    longitude: -74.006,
    speed: 65,
    heading: 45,
    lastUpdated: new Date(),
    destination: "Warehouse B",
    assignedLocationId: "LOC002",
    currentAddress: "Canal Street, New York, NY",
    eta: new Date(Date.now() + 45 * 60000), // 45 minutes
    driver: "John Smith",
  },
  {
    id: "VEH002",
    name: "Van Beta",
    companyName: "Urban Drop Co.",
    image: "https://images.unsplash.com/photo-1616432043562-3671ea2e5242?auto=format&fit=crop&w=160&q=80",
    type: "vehicle",
    status: "online",
    latitude: 40.7489,
    longitude: -73.968,
    speed: 35,
    heading: 180,
    lastUpdated: new Date(),
    destination: "Downtown Hub",
    assignedLocationId: "LOC003",
    currentAddress: "East 43rd Street, New York, NY",
    eta: new Date(Date.now() + 25 * 60000), // 25 minutes
    driver: "Sarah Johnson",
  },
  {
    id: "VEH003",
    name: "Truck Gamma",
    companyName: "Prime Haulage",
    image: "https://images.unsplash.com/photo-1556122071-e404eaedb77f?auto=format&fit=crop&w=160&q=80",
    type: "vehicle",
    status: "idle",
    latitude: 40.7549,
    longitude: -73.984,
    speed: 0,
    heading: 0,
    lastUpdated: new Date(),
    destination: "Main Depot",
    assignedLocationId: "LOC001",
    currentAddress: "Bryant Park, New York, NY",
    driver: "Mike Davis",
  },
  {
    id: "VEH004",
    name: "Delivery Bike",
    companyName: "Swift Courier",
    image: "https://images.unsplash.com/photo-1558980394-4c7c9299fe96?auto=format&fit=crop&w=160&q=80",
    type: "vehicle",
    status: "online",
    latitude: 40.7614,
    longitude: -73.9776,
    speed: 20,
    heading: 90,
    lastUpdated: new Date(Date.now() - 5 * 60000),
    destination: "East Side Depot",
    assignedLocationId: "LOC004",
    currentAddress: "Central Park South, New York, NY",
    eta: new Date(Date.now() + 15 * 60000), // 15 minutes
    driver: "Alex Chen",
  },
  {
    id: "ASSET001",
    name: "Equipment Unit 1",
    companyName: "BuildRight Services",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=160&q=80",
    type: "equipment",
    status: "offline",
    latitude: 40.7505,
    longitude: -73.9972,
    speed: 0,
    heading: 0,
    lastUpdated: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    destination: "Distribution Center",
    assignedLocationId: "LOC005",
    currentAddress: "Penn Station, New York, NY",
  },
  {
    id: "ASSET002",
    name: "Cold Chain Van",
    companyName: "FreshRoute Foods",
    image: "https://images.unsplash.com/photo-1592838064575-70ed626d3a0e?auto=format&fit=crop&w=160&q=80",
    type: "vehicle",
    status: "idle",
    latitude: 40.744,
    longitude: -73.99,
    speed: 0,
    heading: 20,
    lastUpdated: new Date(Date.now() - 12 * 60000),
    destination: "Warehouse B",
    assignedLocationId: "LOC002",
    currentAddress: "Madison Square Park, New York, NY",
    driver: "Nora Adeyemi",
  },
];

// Mock Locations
export const mockLocations: Location[] = [
  {
    id: "LOC001",
    name: "Main Depot",
    address: "123 Main Street, New York, NY 10001",
    latitude: 40.7128,
    longitude: -74.006,
    type: "depot",
    isFavorite: true,
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "LOC002",
    name: "Warehouse B",
    address: "456 Industrial Ave, New York, NY 10002",
    latitude: 40.7489,
    longitude: -73.968,
    type: "destination",
    isFavorite: true,
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "LOC003",
    name: "Downtown Hub",
    address: "789 Broadway, New York, NY 10003",
    latitude: 40.7549,
    longitude: -73.984,
    type: "checkpoint",
    isFavorite: false,
    createdAt: new Date("2024-01-20"),
  },
  {
    id: "LOC004",
    name: "East Side Depot",
    address: "321 Park Avenue, New York, NY 10022",
    latitude: 40.7614,
    longitude: -73.9776,
    type: "depot",
    isFavorite: false,
    createdAt: new Date("2024-02-01"),
  },
  {
    id: "LOC005",
    name: "Distribution Center",
    address: "555 5th Avenue, New York, NY 10017",
    latitude: 40.7505,
    longitude: -73.9972,
    type: "depot",
    isFavorite: true,
    createdAt: new Date("2024-02-05"),
  },
];

// Mock Dashboard Metrics
export const getMockDashboardMetrics = (): DashboardMetrics => {
  return {
    totalAssets: mockVehicles.length,
    assetsInMotion: mockVehicles.filter((v) => v.status === "online").length,
    offlineAssets: mockVehicles.filter((v) => v.status === "offline").length,
    totalLocations: mockLocations.length,
    alertCount: 2,
  };
};

// Utility function to calculate distance between two coordinates (Haversine formula)
export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number => {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// Utility function to estimate ETA based on speed and distance
export const estimateETA = (distanceKm: number, speedKmh: number): Date => {
  const minutes = (distanceKm / speedKmh) * 60;
  return new Date(Date.now() + minutes * 60000);
};
