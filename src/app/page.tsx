"use client";

import CurrentWeatherCard from "@/components/current-weather-card";
import FavoriteCitiesList from "@/components/favorite-cities-list";
import HourlyTemperatureCard from "@/components/hourly-temperature-card";
import LoadingSkeleton from "@/components/loading-skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import WeatherDetailsCard from "@/components/weather-details-card";
import WeatherForecastCard from "@/components/weather-forecast-card";
import useGeoLocation from "@/hooks/useGeoLocation";
import {
  useForecastQuery,
  useReverseGeocodeQuery,
  useWeatherQuery,
} from "@/hooks/useWeather";
import { AlertTriangle, LoaderCircle, MapPin, RefreshCw } from "lucide-react";

export default function Home() {
  const {
    coordinates,
    isLoading: isLoadingLocation,
    error: errorLocation,
    getLocationData,
  } = useGeoLocation();

  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);
  const locationQuery = useReverseGeocodeQuery(coordinates);

  function handleRefresh() {
    getLocationData();
    if (coordinates) {
      weatherQuery.refetch();
      forecastQuery.refetch();
      locationQuery.refetch();
    }
  }

  const hasLocation = !!coordinates;

  return (
    <div className="space-y-4">
      <FavoriteCitiesList />

      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-wide">My Location</h2>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full relative"
          onClick={handleRefresh}
          disabled={weatherQuery.isFetching || forecastQuery.isFetching}
        >
          {weatherQuery.isFetching || forecastQuery.isFetching ? (
            <LoaderCircle className="animate-spin size-4" />
          ) : (
            <RefreshCw className="size-4" />
          )}
        </Button>
      </div>

      {!hasLocation || errorLocation ? (
        <Alert variant="destructive">
          <AlertTriangle className="size-6" />
          <AlertTitle>Location Error</AlertTitle>
          <AlertDescription>
            <p>
              {errorLocation ||
                "Please enable location to see your local weather."}
            </p>
            <Button
              variant="ghost"
              onClick={handleRefresh}
              className="w-fit mt-4 hover:text-violet-800"
            >
              <MapPin className="size-4" />
              Enable Location
            </Button>
          </AlertDescription>
        </Alert>
      ) : isLoadingLocation ||
        weatherQuery.isLoading ||
        forecastQuery.isLoading ? (
        <LoadingSkeleton />
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <CurrentWeatherCard
            data={weatherQuery.data!}
            locationData={locationQuery.data?.[0]}
          />
          <HourlyTemperatureCard data={forecastQuery.data!} />
          <WeatherDetailsCard data={weatherQuery.data!} />
          <WeatherForecastCard data={forecastQuery.data!} />
        </div>
      )}
    </div>
  );
}
