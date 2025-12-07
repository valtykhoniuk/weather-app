"use client";

import { useState, useEffect } from "react";
import { getCurrentWeather } from "@/lib/weatherApi";
import { CurrentWeather } from "@/types";

interface UseGetWeatherReturn {
  data: CurrentWeather | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useGetWeather(
  lat: number | null,
  lon: number | null,
  enabled: boolean = true
): UseGetWeatherReturn {
  const [data, setData] = useState<CurrentWeather | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async () => {
    if (!lat || !lon || !enabled) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const weatherData = await getCurrentWeather(lat, lon);
      setData(weatherData);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch weather data";
      setError(errorMessage);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (enabled && lat !== null && lon !== null) {
      fetchWeather();
    }
  }, [lat, lon, enabled]);

  return {
    data,
    loading,
    error,
    refetch: fetchWeather,
  };
}
