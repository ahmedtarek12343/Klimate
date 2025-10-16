"use client";

import type { ForecastData } from "@/api/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { format } from "date-fns";
import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

interface DailyForecast {
  date: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
  wind: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  };
}

const WeatherForecast = ({ data }: { data: ForecastData }) => {
  const dailyForecasts = data.list.reduce((acc, item) => {
    const date = format(new Date(item.dt * 1000), "yyyy-MM-dd");
    if (!acc[date]) {
      acc[date] = {
        temp_min: item.main.temp_min,
        temp_max: item.main.temp_max,
        humidity: item.main.humidity,
        wind: item.wind.speed,
        weather: item.weather[0],
        date: item.dt,
      };
    } else {
      acc[date].temp_min = Math.min(acc[date].temp_min, item.main.temp_min);
      acc[date].temp_max = Math.max(acc[date].temp_max, item.main.temp_max);
    }
    return acc;
  }, {} as Record<string, DailyForecast>);

  const nextDays = Object.values(dailyForecasts).slice(0, 5);
  const formatTemp = (temp: number) => `${Math.round(temp)}°`;

  const [selectedDay, setSelectedDay] = useState<DailyForecast | null>(null);
  const [open, setOpen] = useState(false);

  const handleDayClick = (day: DailyForecast) => {
    setSelectedDay(day);
    setOpen(true);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {selectedDay &&
                format(new Date(selectedDay.date * 1000), "EEEE, MMMM d, yyyy")}
            </DialogTitle>
          </DialogHeader>

          {selectedDay && (
            <div className="grid gap-4 py-4 text-center sm:text-left">
              {/* Weather Icon & Description */}
              <div className="flex flex-col items-center gap-2">
                <img
                  src={`https://openweathermap.org/img/wn/${selectedDay.weather.icon}@2x.png`}
                  alt={selectedDay.weather.description}
                  className="w-20 h-20"
                />
                <p className="capitalize text-lg font-medium">
                  {selectedDay.weather.description}
                </p>
              </div>

              {/* Temp Range */}
              <div className="flex justify-center gap-6">
                <div className="flex flex-col items-center">
                  <ArrowDown className="h-5 w-5 text-blue-500" />
                  <span className="text-blue-500 font-medium">
                    {formatTemp(selectedDay.temp_min)}
                  </span>
                  <span className="text-xs text-muted-foreground">Min</span>
                </div>
                <div className="flex flex-col items-center">
                  <ArrowUp className="h-5 w-5 text-red-500" />
                  <span className="text-red-500 font-medium">
                    {formatTemp(selectedDay.temp_max)}
                  </span>
                  <span className="text-xs text-muted-foreground">Max</span>
                </div>
              </div>

              {/* Humidity & Wind */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="flex items-center justify-center gap-2">
                  <Droplets className="h-4 w-4 text-blue-500" />
                  <span>{selectedDay.humidity}%</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Wind className="h-4 w-4 text-blue-500" />
                  <span>{selectedDay.wind} m/s</span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Card className="xl:basis-1/2 basis-full">
        <CardHeader>
          <CardTitle>5-Day Forecast</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Animate the grid container */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            className="grid gap-10"
          >
            {nextDays.map((item) => (
              <motion.div
                key={item.date}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleDayClick(item)}
                className="flex justify-between items-center rounded-lg ring-1 ring-transparent p-3 hover:ring-ring transition-all cursor-pointer bg-card"
              >
                <div>
                  <p>{format(new Date(item.date * 1000), "yyyy-MM-dd")}</p>
                  <p className="text-sm text-muted-foreground capitalize">
                    {item.weather.description}
                  </p>
                </div>
                <div className="flex justify-center gap-4">
                  <span className="flex items-center text-blue-500">
                    <ArrowDown className="mr-1 h-4 w-4" />
                    {formatTemp(item.temp_min)}
                  </span>
                  <span className="flex items-center text-red-500">
                    <ArrowUp className="mr-1 h-4 w-4" />
                    {formatTemp(item.temp_max)}
                  </span>
                </div>
                <div className="justify-end gap-4 hidden md:flex">
                  <span className="flex items-center gap-1">
                    <Droplets className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">{item.humidity}%</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Wind className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">{item.wind}m/s</span>
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </CardContent>
      </Card>
    </>
  );
};

export default WeatherForecast;
