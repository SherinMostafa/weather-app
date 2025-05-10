import { API_CONFIG } from "./config";
import { ForecastData, GeocodingResponse, WeatherData } from "./types";

function createURL(endpoint: string, params: Record<string, string | number>) {
  const stringParams: Record<string, string> = {
    appid: String(API_CONFIG.API_KEY),
    ...Object.fromEntries(
      Object.entries(params).map(([k, v]) => [k, String(v)])
    ),
  };

  const searchParams = new URLSearchParams(stringParams);

  return `${endpoint}?${searchParams.toString()}`;
}

async function fetchData<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Weather API request failed: ${response.statusText}`);
  }

  return response.json();
}

export async function getCurrentWeather(
  latitude: number,
  longitude: number
): Promise<WeatherData> {
  const url = createURL(`${API_CONFIG.BASE_URL}/weather`, {
    lat: latitude.toString(),
    lon: longitude.toString(),
    units: API_CONFIG.DEFAULT_PARAMS.units,
  });

  return fetchData<WeatherData>(url);
}

export async function getForecast(
  latitude: number,
  longitude: number
): Promise<ForecastData> {
  const url = createURL(`${API_CONFIG.BASE_URL}/forecast`, {
    lat: latitude.toString(),
    lon: longitude.toString(),
    units: API_CONFIG.DEFAULT_PARAMS.units,
  });

  return fetchData<ForecastData>(url);
}

export async function reverseGeoCode(
  latitude: number,
  longitude: number
): Promise<GeocodingResponse[]> {
  const url = createURL(`${API_CONFIG.GEO}/reverse`, {
    lat: latitude.toString(),
    lon: longitude.toString(),
    limit: "5",
  });

  return fetchData<GeocodingResponse[]>(url);
}

export async function searchLocations(
  query: string
): Promise<GeocodingResponse[]> {
  const url = createURL(`${API_CONFIG.GEO}/direct`, {
    q: query,
    limit: "5",
  });

  return fetchData<GeocodingResponse[]>(url);
}
