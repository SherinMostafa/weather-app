"use client";

import { useParams, useSearchParams } from "next/navigation";
import React from "react";
import CurrentWeatherCard from "@/components/current-weather-card";
import HourlyTemperatureCard from "@/components/hourly-temperature-card";
import LoadingSkeleton from "@/components/loading-skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import WeatherDetailsCard from "@/components/weather-details-card";
import WeatherForecastCard from "@/components/weather-forecast-card";
import {
  useForecastQuery,
  useWeatherQuery,
  useReverseGeocodeQuery,
} from "@/hooks/useWeather";
import { AlertTriangle } from "lucide-react";
import { FavoriteToggle } from "@/components/favorite-toggle";

export default function City() {
  const params = useParams();
  const searchParams = useSearchParams();

  const cityName = decodeURIComponent(params.name as string);
  const latitude = parseFloat(searchParams.get("latitude") || "0");
  const longitude = parseFloat(searchParams.get("longitude") || "0");

  const coordinates = { latitude, longitude };

  const locationQuery = useReverseGeocodeQuery(coordinates);
  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);

  if (
    weatherQuery.error ||
    forecastQuery.error ||
    !cityName ||
    isNaN(latitude) ||
    isNaN(longitude)
  ) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="size-4" />
        <AlertDescription>
          Failed to load weather data. Please check the URL and try again.
        </AlertDescription>
      </Alert>
    );
  }

  if (!weatherQuery.data || !forecastQuery.data || !cityName) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          {cityName}, {weatherQuery.data.sys.country}
        </h1>

        <div className="flex gap-2">
          <FavoriteToggle
            data={{
              ...weatherQuery.data,
              name: cityName,
              coord: { latitude, longitude },
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <CurrentWeatherCard
          data={weatherQuery.data!}
          locationData={locationQuery.data?.[0]}
        />
        <HourlyTemperatureCard data={forecastQuery.data!} />
        <WeatherDetailsCard data={weatherQuery.data!} />
        <WeatherForecastCard data={forecastQuery.data!} />
      </div>
    </div>
  );
}
