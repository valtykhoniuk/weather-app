"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { City } from "@/types";
import { getCurrentWeather } from "@/lib/weatherApi";
import styles from "./CityCard.module.scss";

interface Props {
  city: City;
  onRemove: (id: number) => void;
}

export function CityCard({ city, onRemove }: Props) {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  async function loadWeather() {
    setLoading(true);
    setError(false);
    const data = await getCurrentWeather(city.lat, city.lon);
    if (data) {
      setWeather(data);
    } else {
      setError(true);
    }
    setLoading(false);
  }

  useEffect(() => {
    loadWeather();
  }, [city.lat, city.lon]);

  function handleRefresh(e: React.MouseEvent) {
    e.preventDefault();
    loadWeather();
  }

  function handleRemove(e: React.MouseEvent) {
    e.preventDefault();
    onRemove(city.id);
  }

  if (loading) {
    return (
      <div className={styles.card}>
        <div className={styles.loader}>
          <div className={styles.spinner}></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.card}>
        <div className={styles.header}>
          <h3 className={styles.cityName}>{city.name}</h3>
          <button className={styles.removeBtn} onClick={handleRemove} aria-label="Remove city">
            ✕
          </button>
        </div>
        <p className={styles.error}>Failed to load weather</p>
        <button className={styles.refreshBtn} onClick={handleRefresh}>
          Try again
        </button>
      </div>
    );
  }

  return (
    <Link href={`/city/${city.id}`} className={styles.card}>
      <div className={styles.header}>
        <div>
          <h3 className={styles.cityName}>{city.name}</h3>
          <span className={styles.country}>{city.country}</span>
        </div>
        <button className={styles.removeBtn} onClick={handleRemove} aria-label="Remove city">
          ✕
        </button>
      </div>

      {weather && (
        <>
          <div className={styles.weatherMain}>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0]?.icon}@2x.png`}
              alt="weather"
              className={styles.icon}
            />
            <span className={styles.temp}>{Math.round(weather.temp)}°C</span>
          </div>

          <p className={styles.description}>
            {weather.weather[0]?.description}
          </p>

          <div className={styles.details}>
            <div className={styles.detailItem}>
              <span className={styles.label}>Feels like</span>
              <span className={styles.value}>
                {Math.round(weather.feels_like)}°C
              </span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.label}>Humidity</span>
              <span className={styles.value}>{weather.humidity}%</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.label}>Wind</span>
              <span className={styles.value}>
                {Math.round(weather.wind_speed || 0)} m/s
              </span>
            </div>
          </div>
        </>
      )}

      <button className={styles.refreshBtn} onClick={handleRefresh}>
        Refresh
      </button>
    </Link>
  );
}
