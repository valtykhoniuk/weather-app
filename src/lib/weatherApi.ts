import {
  CurrentWeather,
  GeocodingResult,
  HourlyForecastItem,
  OpenWeatherMapCurrentResponse,
  OpenWeatherMapGeocodingResponse,
  OpenWeatherMapForecastResponse,
} from "@/types";

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;
const BASE_URL = "https://api.openweathermap.org";

export async function getCurrentWeather(
  lat: number,
  lon: number
): Promise<CurrentWeather> {
  const url = `${BASE_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch current weather data");
  }
  const data: OpenWeatherMapCurrentResponse = await response.json();
  return {
    temp: data.main.temp,
    feels_like: data.main.feels_like,
    humidity: data.main.humidity,
    pressure: data.main.pressure,
    wind_speed: data.wind?.speed || 0,
    visibility: data.visibility || 0,
    weather: data.weather,
  };
}

export async function searchCities(
  cityName: string
): Promise<GeocodingResult[]> {
  const url = `${BASE_URL}/geo/1.0/direct?q=${cityName}&limit=5&appid=${API_KEY}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch city data");
  }
  const data: OpenWeatherMapGeocodingResponse[] = await response.json();
  return data.map((item) => ({
    name: item.name,
    state: item.state,
    country: item.country,
    lat: item.lat,
    lon: item.lon,
  }));
}

export async function getHourlyForecast(
  lat: number,
  lon: number
): Promise<HourlyForecastItem[]> {
  const url = `${BASE_URL}/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;

  const response = await fetch(url);
  if (!response.ok) return [];

  const data: OpenWeatherMapForecastResponse = await response.json();

  return data.list.slice(0, 8).map((item) => ({
    dt: item.dt,
    temp: item.main.temp,
    icon: item.weather[0]?.icon || "",
    description: item.weather[0]?.description || "",
  }));
}
