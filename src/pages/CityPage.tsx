import { useLocation, useParams } from "react-router";
import type { Coordinates } from "../api/types";
import { useForecastQuery, useWeatherQuery } from "@/hooks/UseWeather";
import CurrentWeather from "@/components/CurrentWeather";
import WeatherForecast from "@/components/WeatherForecast";
import HourlyTemprature from "@/components/HourlyTemprature";
import WeatherDetails from "@/components/WeatherDetails";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";

const CityPage = () => {
  const { cityName } = useParams();
  const { search } = useLocation();

  const queryParams = new URLSearchParams(search);
  const lat = +queryParams.get("lat")!;
  const lon = +queryParams.get("lon")!;
  const coords = { lat: lat, lon: lon } as Coordinates;
  const { data: weatherData, isLoading } = useWeatherQuery(coords);
  const { data: forecastData } = useForecastQuery(coords);

  if (isLoading) return <LoadingSkeleton />;
  if (!weatherData || !forecastData) return <p>City not found</p>;
  return (
    <div className="grid gap-6">
      <Link to="/">
        <h1 className="text-2xl font-bold tracking-tight">
          <div className="flex items-center gap-2 transition-all hover:text-primary">
            <ArrowLeft></ArrowLeft> Back to home
          </div>
        </h1>
      </Link>
      <h2 className="text-3xl font-bold tracking-tight">{cityName}</h2>
      <div className="flex flex-col lg:flex-row gap-6">
        <CurrentWeather data={weatherData} />
        <HourlyTemprature data={forecastData} />
      </div>
      <div className="flex lg:items-start gap-6 flex-col lg:flex-row">
        <WeatherDetails data={weatherData} />
        <WeatherForecast data={forecastData} />
      </div>
    </div>
  );
};

export default CityPage;
