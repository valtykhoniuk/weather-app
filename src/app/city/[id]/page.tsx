"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { HourlyChart } from "@/components/HourlyChart/HourlyChart";
import { Loader } from "@/components/Loader";
import { AppError } from "@/components/AppError";
import { useCitiesFromLocalStorage } from "@/hooks/useCitiesFromLocalStorage";
import { useGetWeather } from "@/hooks/useGetWeather";
import { useGetHourlyForecast } from "@/hooks/useGetHourlyForecast";
import { City } from "@/types";
import styles from "./page.module.scss";

export default function CityPage() {
  const params = useParams();
  const cityId = params.id as string;
  const { cities } = useCitiesFromLocalStorage();
  const [city, setCity] = useState<City | null>(null);

  const {
    data: weather,
    loading: weatherLoading,
    error: weatherError,
    refetch: refetchWeather,
  } = useGetWeather(city?.lat ?? null, city?.lon ?? null, !!city);

  const {
    data: hourly,
    loading: hourlyLoading,
    error: hourlyError,
    refetch: refetchHourly,
  } = useGetHourlyForecast(city?.lat ?? null, city?.lon ?? null, !!city);

  useEffect(() => {
    const found = cities.find((c: City) => String(c.id) === cityId);
    setCity(found || null);
  }, [cityId, cities]);

  const loading = weatherLoading || hourlyLoading;
  const error = weatherError || hourlyError;

  function handleRefresh() {
    if (city) {
      refetchWeather();
      refetchHourly();
    }
  }

  if (!city && !loading) {
    return (
      <main className={styles.main}>
        <div className={styles.notFound}>
          <h1>City not found</h1>
          <Link href="/" className={styles.backLink}>
            ← Back to home
          </Link>
        </div>
      </main>
    );
  }

  if (loading) {
    return (
      <main className={styles.main}>
        <Loader message="Loading weather data..." />
      </main>
    );
  }

  if (error) {
    return (
      <main className={styles.main}>
        <AppError message={error} onRetry={handleRefresh} retryLabel="Retry" />
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <Link href="/" className={styles.backLink}>
        ← Back
      </Link>

      {city && (
        <>
          <header className={styles.header}>
            <h1 className={styles.cityName}>{city.name}</h1>
            <span className={styles.country}>{city.country}</span>
          </header>

          {weather && (
            <>
              <div className={styles.weatherCard}>
                <div className={styles.weatherMain}>
                  <img
                    src={`https://openweathermap.org/img/wn/${weather.weather[0]?.icon}@2x.png`}
                    alt="weather"
                    className={styles.weatherIcon}
                  />
                  <span className={styles.temp}>
                    {Math.round(weather.temp)}°C
                  </span>
                </div>
                <p className={styles.description}>
                  {weather.weather[0]?.description}
                </p>
                <p className={styles.feelsLike}>
                  Feels like {Math.round(weather.feels_like)}°C
                </p>
                <button className={styles.refreshBtn} onClick={handleRefresh}>
                  🔄 Refresh
                </button>
              </div>

              <div className={styles.detailsGrid}>
                <div className={styles.detailCard}>
                  <span className={styles.detailLabel}>💧 Humidity</span>
                  <span className={styles.detailValue}>
                    {weather.humidity}%
                  </span>
                </div>
                <div className={styles.detailCard}>
                  <span className={styles.detailLabel}>💨 Wind</span>
                  <span className={styles.detailValue}>
                    {Math.round(weather.wind_speed || 0)} m/s
                  </span>
                </div>
                <div className={styles.detailCard}>
                  <span className={styles.detailLabel}>🌡️ Pressure</span>
                  <span className={styles.detailValue}>
                    {weather.pressure} hPa
                  </span>
                </div>
                <div className={styles.detailCard}>
                  <span className={styles.detailLabel}>👁️ Visibility</span>
                  <span className={styles.detailValue}>
                    {((weather.visibility || 0) / 1000).toFixed(1)} km
                  </span>
                </div>
              </div>
            </>
          )}

          {hourly.length > 0 && (
            <div className={styles.forecastCard}>
              <HourlyChart data={hourly} />
            </div>
          )}
        </>
      )}
    </main>
  );
}
