"use client";

import { useCitiesFromLocalStorage } from "@/hooks/useCitiesFromLocalStorage";
import { CityCard } from "@/components/CityCard/CityCard";
import { AddCityForm } from "@/components/AddCityForm/AddCityForm";
import { City } from "@/types";
import styles from "./page.module.scss";

export default function Home() {
  const { cities, setCities } = useCitiesFromLocalStorage();

  function handleAddCity(city: City) {
    setCities([...cities, city]);
  }

  function handleRemoveCity(id: number) {
    setCities(cities.filter((c) => c.id !== id));
  }

  function cityExists(lat: number, lon: number): boolean {
    return cities.some((c) => c.lat === lat && c.lon === lon);
  }

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1 className={styles.title}>🌤️ Weather App</h1>
        <p className={styles.subtitle}>Check weather in your favorite cities</p>
      </header>

      <section className={styles.searchSection}>
        <AddCityForm onAddCity={handleAddCity} cityExists={cityExists} />
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
            <CityCard key={city.id} city={city} onRemove={handleRemoveCity} />
          ))}
        </div>
      )}
    </main>
  );
}
