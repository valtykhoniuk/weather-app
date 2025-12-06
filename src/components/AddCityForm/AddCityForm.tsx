"use client";

import { useState } from "react";
import { searchCities } from "@/lib/weatherApi";
import styles from "./AddCityForm.module.scss";

interface City {
  id: string;
  name: string;
  country: string;
  lat: number;
  lon: number;
}

interface Props {
  onAddCity: (city: City) => void;
  cityExists: (lat: number, lon: number) => boolean;
}

export function AddCityForm({ onAddCity, cityExists }: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState("");

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!query.trim()) {
      setError("Enter city name");
      return;
    }

    setSearching(true);
    try {
      const data = await searchCities(query);
      if (data.length === 0) {
        setError("City not found. Try another name.");
      }
      setResults(data);
    } catch {
      setError("Search failed. Try again.");
    }
    setSearching(false);
  }

  function handleSelect(result: any) {
    if (cityExists(result.lat, result.lon)) {
      setError("This city is already in your list");
      return;
    }

    onAddCity({
      id: `${result.lat}-${result.lon}`,
      name: result.name,
      country: result.country,
      lat: result.lat,
      lon: result.lon,
    });

    setResults([]);
    setQuery("");
    setError("");
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSearch}>
        <input
          data-testid="city-search-input"
          className={styles.input}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter city name..."
        />
        <button
          data-testid="city-search-button"
          className={styles.button}
          type="submit"
          disabled={searching}
        >
          {searching ? "..." : "Search"}
        </button>
      </form>

      {error && <p className={styles.error}>{error}</p>}

      {results.length > 0 && (
        <ul className={styles.results}>
          {results.map((result, i) => (
            <li
              key={i}
              className={styles.resultItem}
              onClick={() => handleSelect(result)}
            >
              <span className={styles.name}>{result.name}</span>
              <span className={styles.meta}>
                {result.state && `${result.state}, `}
                {result.country}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

