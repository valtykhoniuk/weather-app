"use client";

import { useEffect, useState } from "react";
import { useCitiesStore } from "@/store/useCitiesStore";
import CityCard from "@/components/CityCard/CityCard";
import { searchCities } from "@/lib/weatherApi";

export default function Home() {
  const { cities, addCity, removeCity } = useCitiesStore();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    const storedCities = localStorage.getItem("cities");
    if (storedCities) {
      const parsedCities = JSON.parse(storedCities);
      parsedCities.forEach((city: any) => addCity(city));
    }
  }, []);

  async function handleSearch() {
    if (!query.trim()) return;
    try {
      const data = await searchCities(query);
      setResults(data);
    } catch (error) {
      console.error("Error searching cities:", error);
    }
  }

  function handleAddCity(result: any) {
    addCity({
      id: Date.now(),
      name: result.name,
      country: result.country,
      lat: result.lat,
      lon: result.lon,
    });
    setResults([]);
    setQuery("");
  }
  return (
    <main style={{ padding: 16 }}>
      <h1>Weather App</h1>
      <div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a city"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div>
        {results.map((result) => (
          <div key={`${result.lat}-${result.lon}`} style={{ marginTop: 8 }}>
            {result.name}, {result.country}{" "}
            <button onClick={() => handleAddCity(result)}>Add</button>
          </div>
        ))}
      </div>
      <h2>Saved Cities</h2>
      <div>
        {cities.map((city) => (
          <CityCard key={city.id} city={city} onRemove={removeCity} />
        ))}
      </div>
    </main>
  );
}
