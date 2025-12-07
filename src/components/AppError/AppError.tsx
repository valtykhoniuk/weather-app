"use client";

import styles from "./AppError.module.scss";

interface AppErrorProps {
  message: string;
  onRetry?: () => void;
  retryLabel?: string;
}

export function AppError({
  message,
  onRetry,
  retryLabel = "Try again",
}: AppErrorProps) {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>⚠️</div>
      <p className={styles.message}>{message}</p>
      {onRetry && (
        <button className={styles.retryButton} onClick={onRetry}>
          {retryLabel}
        </button>
      )}
    </div>
  );
}
