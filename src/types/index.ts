export interface City {
  id: number;
  name: string;
  country: string;
  lat: number;
  lon: number;
}

export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface CurrentWeather {
  temp: number;
  feels_like: number;
  humidity: number;
  pressure: number;
  wind_speed: number;
  visibility: number;
  weather: WeatherCondition[];
}

export interface GeocodingResult {
  name: string;
  state?: string;
  country: string;
  lat: number;
  lon: number;
}

export interface HourlyForecastItem {
  dt: number;
  temp: number;
  icon: string;
  description: string;
}

export interface OpenWeatherMapCurrentResponse {
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  wind?: {
    speed: number;
  };
  visibility?: number;
  weather: WeatherCondition[];
}

export interface OpenWeatherMapGeocodingResponse {
  name: string;
  state?: string;
  country: string;
  lat: number;
  lon: number;
}

export interface OpenWeatherMapForecastResponse {
  list: Array<{
    dt: number;
    main: {
      temp: number;
    };
    weather: WeatherCondition[];
  }>;
}
