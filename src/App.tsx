import { ReactNode } from "react";
import { Navigate, Route, Routes, useNavigate, useParams } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Dashboard from "./pages/Dashboard";
import Assets from "./pages/Assets";
import Locations from "./pages/Locations";
import Map from "./pages/Map";
import Settings from "./pages/Settings";
import LoginPage from "./pages/Login";

const AdminPage = (): ReactNode => (
  <div className="p-4 md:p-8">
    <h2 className="text-xl font-bold text-gray-900">Admin</h2>
    <p className="mt-2 text-sm text-gray-500">Admin tools will be added later.</p>
  </div>
);

const LocationsRoute = (): ReactNode => {
  const navigate = useNavigate();

  return <Locations onAssetSelect={(assetId) => navigate(`/map/${assetId}`)} />;
};

const AssetsRoute = (): ReactNode => {
  const navigate = useNavigate();

  return <Assets onAssetSelect={(assetId) => navigate(`/map/${assetId}`)} />;
};

const MapRoute = (): ReactNode => {
  const navigate = useNavigate();
  const { assetId } = useParams();

  return (
    <Map
      selectedAssetId={assetId ?? null}
      onAssetSelect={(nextAssetId) => navigate(`/map/${nextAssetId}`)}
    />
  );
};

function App(): ReactNode {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/locations" element={<LocationsRoute />} />
        <Route path="/assets" element={<AssetsRoute />} />
        <Route path="/map" element={<MapRoute />} />
        <Route path="/map/:assetId" element={<MapRoute />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </AppLayout>
  );
}

export default App;
