export interface City {
  id: number;
  name: string;
  country: string;
  lat: number;
  lon: number;
}

export interface CurrentWeather {
  temp: number;
  feels_like: number;
  humidity: number;
  weather: {
    description: string;
    icon: string;
  }[];
}

export interface GeocodingResult {
  name: string;
  lat: number;
  lon: number;
  country: string;
}
