import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { City } from "@/types";
import { getCurrentWeather } from "@/lib/weatherApi";

interface CityCardProps {
  city: City;
  onRemove: (id: number) => void;
}

const CityCard = ({ city, onRemove }: CityCardProps) => {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getCurrentWeather(city.lat, city.lon).then((data) => {
      setWeather(data);
      setLoading(false);
    });
  }, [city.lat, city.lon]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Link href={`/city/${city.id}`}>
      <div style={{ border: "1px solid gray", padding: 16, margin: 8 }}>
        <h3>
          {city.name}, {city.country}
        </h3>
        {weather && (
          <div>
            <p>Temperature: {weather.temp}°C</p>
            <p>Feels Like: {weather.feels_like}°C</p>
            <p>Humidity: {weather.humidity}%</p>
          </div>
        )}
        <button
          onClick={(e) => {
            e.preventDefault();
            onRemove(city.id);
          }}
        >
          Remove
        </button>
      </div>
    </Link>
  );
};

export default CityCard;
