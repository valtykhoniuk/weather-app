"use client";

import { useState, useEffect } from "react";
import { City } from "@/types";

const STORAGE_KEY = "cities";

export function useCitiesFromLocalStorage() {
  const [cities, setCitiesState] = useState<City[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsedCities = JSON.parse(saved) as City[];
        setCitiesState(parsedCities);
      } catch (error) {
        console.error("Failed to parse cities from localStorage:", error);
        setCitiesState([]);
      }
    }
  }, []);

  const setCities = (newCities: City[]) => {
    setCitiesState(newCities);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newCities));
  };

  return { cities, setCities };
}
