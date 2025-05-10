import { Coordinates } from "@/api/types";
import { useEffect, useState } from "react";

interface GeoLocationStateProps {
  coordinates: Coordinates | null;
  error: string | null;
  isLoading: boolean;
}

export default function useGeoLocation() {
  const [locationData, setLocationData ] = useState<GeoLocationStateProps>({
    coordinates: null,
    error: null,
    isLoading: true,
  });

  const getLocationData = () => {
    if (!navigator.geolocation) {
      setLocationData((prev) => ({
        ...prev,
        coordinates: null,
        error: "Geolocation not supported.",
        isLoading: false,
      }));

      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocationData({
          coordinates: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
          error: null,
          isLoading: false,
        });
      },
      (error) => {
        let errorMessage: string;

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage =
              "Location permission denied. Please enable location access.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out.";
            break;
          default:
            errorMessage = "An unknown error occurred.";
        }

        setLocationData({
          coordinates: null,
          error: errorMessage,
          isLoading: false,
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  };

  useEffect(() => {
    getLocationData();
  }, []);

  return {
    ...locationData,
    getLocationData,
  };
}
