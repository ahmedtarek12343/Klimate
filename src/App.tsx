import { Route, Routes } from "react-router";
import MainLayout from "./layout/MainLayout";
import WeatherDashboardPage from "./pages/WeatherDashboardPage";
import CityPage from "./pages/CityPage";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<WeatherDashboardPage />} />
          <Route path="/city/:cityName" element={<CityPage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
