import { GeocodingResponse, WeatherData } from "@/api/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ArrowDown, ArrowUp, Droplets, MapPin, Wind } from "lucide-react";
import { format } from "date-fns";
import Image from "next/image";

export default function CurrentWeatherCard({
  data,
  locationData,
}: {
  data: WeatherData;
  locationData?: GeocodingResponse;
}) {
  const {
    weather: [currentWeather],
    main: { temp, feels_like, temp_min, temp_max, humidity },
    wind: { speed },
  } = data;

  const formatTemp = (temp: number) => `${Math.round(temp)}°`;

  return (
    <Card data-testid="current-weather-card">
      <CardHeader className="flex gap-2">
        <MapPin className="size-5 text-violet-800" />
        <div>
          <CardTitle className="flex items-center gap-2 text-violet-800 text-sm">
            {locationData?.name}
          </CardTitle>
          <CardDescription className="text-xs text-muted-foreground">
            {locationData?.state} {locationData?.country}
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row gap-8 justify-between">
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                {format(new Date(), "EEEE")}
              </h2>
              <p className="text-sm text-muted-foreground">
                {format(new Date(), "MMM d, yyyy")}
              </p>
            </div>

            <div className="flex items-center justify-between gap-4">
              <p className="text-7xl font-bold tracking-tighter">
                {formatTemp(temp)}
              </p>

              <div className="flex flex-col justify-center items-center gap-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Feels like {formatTemp(feels_like)}
                </p>
                <div className="flex gap-2 text-sm font-medium">
                  <span className="flex items-center gap-1 text-blue-500">
                    <ArrowDown className="h-3 w-3" />
                    {formatTemp(temp_min)}
                  </span>
                  <span className="flex items-center gap-1 text-red-500">
                    <ArrowUp className="h-3 w-3" />
                    {formatTemp(temp_max)}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Droplets className="h-4 w-4 text-blue-500" />
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">Humidity</p>
                  <p className="text-sm text-muted-foreground">{humidity}%</p>
                </div>
              </div>
              <div className="flex items-center justify-between gap-2">
                <Wind className="h-4 w-4 text-blue-500" />
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">Wind Speed</p>
                  <p className="text-sm text-muted-foreground">{speed} m/s</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">
            <div className="relative flex aspect-square w-full max-w-[240px] items-center justify-center">
              <Image
                src={`https://openweathermap.org/img/wn/${currentWeather.icon}@4x.png`}
                alt={currentWeather.description}
                className="h-full w-full object-contain"
                width={240}
                height={240}
                priority
              />
              <div className="absolute bottom-0 text-center">
                <p className="text-sm font-medium capitalize">
                  {currentWeather.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
