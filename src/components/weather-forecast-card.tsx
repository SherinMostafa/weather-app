import { ForecastData } from "@/api/types";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Droplet, Wind } from "lucide-react";
import { ArrowDown } from "lucide-react";
import { ArrowUp } from "lucide-react";

interface DailyForecastProps {
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

export default function WeatherForecastCard({ data }: { data: ForecastData }) {
  const dailyForecasts = data.list.reduce((accumulator, forecast) => {
    const date = format(new Date(forecast.dt * 1000), "yyyy-MM-dd");

    if (!accumulator[date]) {
      accumulator[date] = {
        temp_min: forecast.main.temp_min,
        temp_max: forecast.main.temp_max,
        humidity: forecast.main.humidity,
        wind: forecast.wind.speed,
        weather: forecast.weather[0],
        date: forecast.dt,
      };
    } else {
      accumulator[date].temp_min = Math.min(
        accumulator[date].temp_min,
        forecast.main.temp_min
      );
      accumulator[date].temp_max = Math.max(
        accumulator[date].temp_max,
        forecast.main.temp_max
      );
    }

    return accumulator;
  }, {} as Record<string, DailyForecastProps>);

  const nextDays = Object.values(dailyForecasts).slice(1, 6);

  const formatTemp = (temp: number) => `${Math.round(temp)}°`;

  return (
    <Card data-testid="weather-forecast-card">
      <CardHeader>
        <CardTitle>5-Day Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6">
          {nextDays.map((day) => (
            <div
              key={day.date}
              className="flex flex-col gap-4 rounded-lg border p-4"
            >
              <div>
                <p className="font-medium">
                  {format(new Date(day.date * 1000), "EEE, MMM d")}
                </p>
                <p className="text-sm text-muted-foreground capitalize">
                  {day.weather.description}
                </p>
              </div>

              <div className="flex justify-between flex-wrap gap-4">
                <div className="flex justify-center gap-4">
                  <span className="flex items-center text-blue-500">
                    <ArrowDown className="mr-1 h-4 w-4" />
                    {formatTemp(day.temp_min)}
                  </span>
                  <span className="flex items-center text-red-500">
                    <ArrowUp className="mr-1 h-4 w-4" />
                    {formatTemp(day.temp_max)}
                  </span>
                </div>

                <div className="flex justify-end gap-4">
                  <span className="flex items-center gap-1">
                    <Droplet className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">{day.humidity}%</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Wind className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">{day.wind}m/s</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
