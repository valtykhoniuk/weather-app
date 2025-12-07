"use client";

import styles from "./Loader.module.scss";

interface LoaderProps {
  message?: string;
  size?: "small" | "medium" | "large";
}

export function Loader({
  message = "Loading...",
  size = "medium",
}: LoaderProps) {
  return (
    <div className={styles.container}>
      <div className={`${styles.spinner} ${styles[size]}`}></div>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
}


