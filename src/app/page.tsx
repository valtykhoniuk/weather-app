"use client";

import { useEffect, useState } from "react";
import { useCitiesStore } from "@/store/useCitiesStore";
import { CityCard } from "@/components/CityCard/CityCard";
import { searchCities } from "@/lib/weatherApi";
import styles from "./page.module.scss";

export default function Home() {
  const { cities, addCity, removeCity } = useCitiesStore();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("cities");
    if (saved) {
      useCitiesStore.setState({ cities: JSON.parse(saved) });
    }
  }, []);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;

    setSearching(true);
    const data = await searchCities(query);
    setResults(data);
    setSearching(false);
  }

  function handleAdd(result: any) {
    addCity({
      id: result.lat + result.lon,
      name: result.name,
      country: result.country,
      lat: result.lat,
      lon: result.lon,
    });
    setResults([]);
    setQuery("");
  }

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1 className={styles.title}>🌤️ Weather App</h1>
        <p className={styles.subtitle}>Check weather in your favorite cities</p>
      </header>

      <section className={styles.searchSection}>
        <form className={styles.form} onSubmit={handleSearch}>
          <input
            className={styles.input}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter city name..."
          />
          <button className={styles.button} disabled={searching}>
            {searching ? "..." : "🔍 Search"}
          </button>
        </form>

        {results.length > 0 && (
          <ul className={styles.results}>
            {results.map((r, i) => (
              <li
                key={i}
                className={styles.resultItem}
                onClick={() => handleAdd(r)}
              >
                <span className={styles.resultName}>{r.name}</span>
                <span className={styles.resultMeta}>
                  {r.state && `${r.state}, `}
                  {r.country}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      {cities.length === 0 ? (
        <div className={styles.empty}>
          <p>You have no cities yet</p>
          <p style={{ color: "var(--color-text-secondary)" }}>
            Use the search above to add cities
          </p>
        </div>
      ) : (
        <div className={styles.citiesGrid}>
          {cities.map((city) => (
            <CityCard key={city.id} city={city} onRemove={removeCity} />
          ))}
        </div>
      )}
    </main>
  );
}
