"use client";

import { useState, useEffect } from "react";
import { getHourlyForecast } from "@/lib/weatherApi";
import { HourlyForecastItem } from "@/types";

interface UseGetHourlyForecastReturn {
  data: HourlyForecastItem[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useGetHourlyForecast(
  lat: number | null,
  lon: number | null,
  enabled: boolean = true
): UseGetHourlyForecastReturn {
  const [data, setData] = useState<HourlyForecastItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchForecast = async () => {
    if (!lat || !lon || !enabled) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const forecastData = await getHourlyForecast(lat, lon);
      setData(forecastData);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch hourly forecast";
      setError(errorMessage);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (enabled && lat !== null && lon !== null) {
      fetchForecast();
    }
  }, [lat, lon, enabled]);

  return {
    data,
    loading,
    error,
    refetch: fetchForecast,
  };
}
