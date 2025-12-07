"use client";

import { ReactNode } from "react";
import { Loader } from "../Loader";
import { AppError } from "../AppError";
import styles from "./AppContainer.module.scss";

interface AppContainerProps {
  children: ReactNode;
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  retryLabel?: string;
  loadingMessage?: string;
  className?: string;
}

export function AppContainer({
  children,
  loading = false,
  error = null,
  onRetry,
  retryLabel,
  loadingMessage,
  className,
}: AppContainerProps) {
  if (loading) {
    return <Loader message={loadingMessage} size="medium" />;
  }

  if (error) {
    return (
      <AppError message={error} onRetry={onRetry} retryLabel={retryLabel} />
    );
  }

  return (
    <div className={`${styles.container} ${className || ""}`}>{children}</div>
  );
}
