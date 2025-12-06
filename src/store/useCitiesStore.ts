import { create } from "zustand";
import { City } from "@/types";

interface CitiesStore {
  cities: City[];
  addCity: (city: City) => void;
  removeCity: (id: number) => void;
}

export const useCitiesStore = create<CitiesStore>((set, get) => ({
  cities: [],

  addCity: (city) => {
    const cities = [...get().cities, city];
    set({ cities });
    localStorage.setItem("cities", JSON.stringify(cities));
  },

  removeCity: (id) => {
    const cities = get().cities.filter((c) => c.id !== id);
    set({ cities });
    localStorage.setItem("cities", JSON.stringify(cities));
  },
}));
