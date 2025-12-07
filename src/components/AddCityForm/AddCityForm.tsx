"use client";

import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useGetCities } from "@/hooks/useGetCities";
import { GeocodingResult, City } from "@/types";
import styles from "./AddCityForm.module.scss";

interface Props {
  onAddCity: (city: City) => void;
  cityExists: (lat: number, lon: number) => boolean;
}

interface FormValues {
  query: string;
}

function validateQuery(value: string): string | undefined {
  if (!value || !value.trim()) {
    return "Enter city name";
  }
  if (value.trim().length < 2) {
    return "City name must be at least 2 characters";
  }
  return undefined;
}

export function AddCityForm({ onAddCity, cityExists }: Props) {
  const {
    data: results,
    loading: searching,
    error: searchError,
    search,
    reset,
  } = useGetCities();
  const [selectionError, setSelectionError] = useState<string>("");

  async function handleSubmit(values: FormValues) {
    setSelectionError("");
    reset();
    await search(values.query);
  }

  function handleSelect(result: GeocodingResult) {
    if (cityExists(result.lat, result.lon)) {
      setSelectionError("This city is already in your list");
      return;
    }

    onAddCity({
      id: Math.round(result.lat * 1000 + result.lon * 1000),
      name: result.name,
      country: result.country,
      lat: result.lat,
      lon: result.lon,
    });

    reset();
    setSelectionError("");
  }

  const displayError = selectionError || searchError;

  return (
    <div className={styles.container}>
      <Formik
        initialValues={{ query: "" }}
        onSubmit={handleSubmit}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({ isSubmitting }) => (
          <Form className={styles.form}>
            <Field
              name="query"
              validate={validateQuery}
              data-testid="city-search-input"
              className={styles.input}
              type="text"
              placeholder="Enter city name..."
            />
            <ErrorMessage
              name="query"
              component="div"
              className={styles.error}
            />
            <button
              data-testid="city-search-button"
              className={styles.button}
              type="submit"
              disabled={isSubmitting || searching}
            >
              {searching ? "..." : "Search"}
            </button>
          </Form>
        )}
      </Formik>

      {displayError && <p className={styles.error}>{displayError}</p>}

      {results.length > 0 && (
        <ul className={styles.results}>
          {results.map((result, i) => (
            <li
              key={i}
              className={styles.resultItem}
              onClick={() => handleSelect(result)}
            >
              <span className={styles.name}>{result.name}</span>
              <span className={styles.meta}>
                {result.state && `${result.state}, `}
                {result.country}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
