"use client";

import Link from "next/link";
import { City } from "@/types";
import { useGetWeather } from "@/hooks/useGetWeather";
import { Loader } from "@/components/Loader";
import { AppError } from "@/components/AppError";
import styles from "./CityCard.module.scss";

interface Props {
  city: City;
  onRemove: (id: number) => void;
}

export function CityCard({ city, onRemove }: Props) {
  const {
    data: weather,
    loading,
    error,
    refetch,
  } = useGetWeather(city.lat, city.lon, true);

  function handleRefresh() {
    refetch();
  }

  function handleRemove() {
    onRemove(city.id);
  }

  if (loading) {
    return (
      <div className={styles.card}>
        <Loader size="small" message="" />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.card}>
        <div className={styles.header}>
          <h3 className={styles.cityName}>{city.name}</h3>
          <button
            type="button"
            className={styles.removeBtn}
            onClick={handleRemove}
            aria-label="Remove city"
          >
            ✕
          </button>
        </div>
        <AppError
          message={error}
          onRetry={() => refetch()}
          retryLabel="Try again"
        />
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
        <button
          type="button"
          className={styles.removeBtn}
          onClick={handleRemove}
          aria-label="Remove city"
        >
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

      <button
        type="button"
        className={styles.refreshBtn}
        onClick={handleRefresh}
      >
        Refresh
      </button>
    </Link>
  );
}
