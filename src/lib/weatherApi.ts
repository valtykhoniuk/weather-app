const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;
const BASE_URL = "https://api.openweathermap.org";

export async function getCurrentWeather(lat: number, lon: number) {
  const url = `${BASE_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch current weather data");
  }
  const data = await response.json();
  return {
    temp: data.main.temp,
    feels_like: data.main.feels_like,
    humidity: data.main.humidity,
    weather: data.weather,
  };
}

export async function searchCities(cityName: string) {
  const url = `${BASE_URL}/geo/1.0/direct?q=${cityName}&limit=5&appid=${API_KEY}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch city data");
  }
  return await response.json();
}
