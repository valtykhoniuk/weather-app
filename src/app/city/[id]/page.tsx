"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getCurrentWeather, getHourlyForecast } from "@/lib/weatherApi";
import { HourlyChart } from "@/components/HourlyChart/HourlyChart";
import styles from "./page.module.scss";

export default function CityPage() {
  const params = useParams();
  const cityId = params.id as string;

  const [city, setCity] = useState<any>(null);
  const [weather, setWeather] = useState<any>(null);
  const [hourly, setHourly] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadData(cityData: any) {
    const [weatherData, hourlyData] = await Promise.all([
      getCurrentWeather(cityData.lat, cityData.lon),
      getHourlyForecast(cityData.lat, cityData.lon),
    ]);
    setWeather(weatherData);
    setHourly(hourlyData);
    setLoading(false);
  }

  useEffect(() => {
    const saved = localStorage.getItem("cities");
    if (saved) {
      const cities = JSON.parse(saved);
      const found = cities.find((c: any) => String(c.id) === cityId);
      if (found) {
        setCity(found);
        loadData(found);
      } else {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [cityId]);

  function handleRefresh() {
    if (city) {
      setLoading(true);
      loadData(city);
    }
  }

  if (loading) {
    return (
      <main className={styles.main}>
        <div className={styles.loader}>
          <div className={styles.spinner}></div>
          <p>Loading...</p>
        </div>
      </main>
    );
  }

  if (!city) {
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

  return (
    <main className={styles.main}>
      <Link href="/" className={styles.backLink}>
        ← Back
      </Link>

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
              <span className={styles.temp}>{Math.round(weather.temp)}°C</span>
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
              <span className={styles.detailValue}>{weather.humidity}%</span>
            </div>
            <div className={styles.detailCard}>
              <span className={styles.detailLabel}>💨 Wind</span>
              <span className={styles.detailValue}>
                {Math.round(weather.wind_speed || 0)} m/s
              </span>
            </div>
            <div className={styles.detailCard}>
              <span className={styles.detailLabel}>🌡️ Pressure</span>
              <span className={styles.detailValue}>{weather.pressure} hPa</span>
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
    </main>
  );
}
