"use client";

import { useState } from "react";
import { searchCities } from "@/lib/weatherApi";
import { GeocodingResult } from "@/types";

interface UseGetCitiesReturn {
  data: GeocodingResult[];
  loading: boolean;
  error: string | null;
  search: (query: string) => Promise<void>;
  reset: () => void;
}

export function useGetCities(): UseGetCitiesReturn {
  const [data, setData] = useState<GeocodingResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = async (query: string) => {
    if (!query.trim()) {
      setData([]);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const cities = await searchCities(query);
      setData(cities);
      if (cities.length === 0) {
        setError("City not found. Try another name.");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Search failed. Try again.";
      setError(errorMessage);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setData([]);
    setError(null);
    setLoading(false);
  };

  return {
    data,
    loading,
    error,
    search,
    reset,
  };
}
