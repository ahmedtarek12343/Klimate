import type { WeatherData } from "@/api/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Compass, Gauge, Sunrise, Sunset } from "lucide-react";

const WeatherDetails = ({ data }: { data: WeatherData }) => {
  return (
    <Card className="xl:basis-1/2 basis-full">
      <CardHeader>
        <CardTitle>Weather Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card className="p-4 hover:shadow-sm hover:shadow-primary transition-all">
            <div className="flex gap-1 items-center">
              <Sunrise className="w-6 h-6 text-orange-500" />
              <CardHeader className="flex-1 gap-0">
                <CardTitle>Sunrise</CardTitle>
                <span className="text-muted-foreground">
                  {new Date(data.sys.sunrise * 1000)
                    .toLocaleTimeString()
                    .slice(0, 4) + " AM"}
                </span>
              </CardHeader>
            </div>
          </Card>
          <Card className="p-4 hover:shadow-sm hover:shadow-primary transition-all">
            <div className="flex gap-1 items-center">
              <Sunset className="w-6 h-6 text-blue-500" />
              <CardHeader className="flex-1 gap-0">
                <CardTitle>Sunset</CardTitle>
                <span className="text-muted-foreground">
                  {new Date(data.sys.sunset * 1000)
                    .toLocaleTimeString()
                    .slice(0, 4) + " PM"}
                </span>
              </CardHeader>
            </div>
          </Card>
          <Card className="p-4 hover:shadow-sm hover:shadow-primary transition-all">
            <div className="flex gap-1 items-center">
              <Compass className="w-6 h-6 text-green-500" />
              <CardHeader className="flex-1 gap-0">
                <CardTitle>Wind Direction</CardTitle>
                <span className="text-muted-foreground">
                  E ({data.wind.deg}°)
                </span>
              </CardHeader>
            </div>
          </Card>
          <Card className="p-4 hover:shadow-sm hover:shadow-primary transition-all">
            <div className="flex gap-1 items-center">
              <Gauge className="w-6 h-6 text-purple-500" />
              <CardHeader className="flex-1 gap-0">
                <CardTitle>Pressure</CardTitle>
                <span className="text-muted-foreground">
                  {data.main.pressure} hPa
                </span>
              </CardHeader>
            </div>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherDetails;
