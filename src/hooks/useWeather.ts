"use client";

import { useQuery } from "@tanstack/react-query";
import { getCurrentWeather, getForecast, reverseGeoCode, searchLocations } from "@/api/weather";
import type { Coordinates } from "@/api/types";

export const WEATHER_KEYS = {
  weather: (coordinates: Coordinates) => ["weather", coordinates],
  forecast: (coordinates: Coordinates) => ["forecast", coordinates],
  location: (coordinates: Coordinates) => ["location", coordinates],
  search: (query: string) => ["location-search", query],
};

export function useWeatherQuery(coordinates: Coordinates | null) {
  return useQuery({
    queryKey: WEATHER_KEYS.weather(coordinates ?? { latitude: 0, longitude: 0 }),
    queryFn: () =>
      coordinates ? getCurrentWeather(coordinates.latitude, coordinates.longitude) : null,
    enabled: !!coordinates,
  });
}

export function useForecastQuery(coordinates: Coordinates | null) {
  return useQuery({
    queryKey: WEATHER_KEYS.forecast(coordinates ?? { latitude: 0, longitude: 0 }),
    queryFn: () =>
      coordinates ? getForecast(coordinates.latitude, coordinates.longitude) : null,
    enabled: !!coordinates,
  });
}

export function useReverseGeocodeQuery(coordinates: Coordinates | null) {
  return useQuery({
    queryKey: WEATHER_KEYS.location(coordinates ?? { latitude: 0, longitude: 0 }),
    queryFn: () =>
      coordinates ? reverseGeoCode(coordinates.latitude, coordinates.longitude) : null,
    enabled: !!coordinates,
  });
}

export function useLocationSearch(query: string) {
  return useQuery({
    queryKey: WEATHER_KEYS.search(query),
    queryFn: () => searchLocations(query),
    enabled: query.length >= 3,
  });
}