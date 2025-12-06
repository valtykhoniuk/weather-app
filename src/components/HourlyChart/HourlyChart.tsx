"use client";

import styles from "./HourlyChart.module.scss";

interface HourlyData {
  dt: number;
  temp: number;
  icon: string;
  description: string;
}

interface Props {
  data: HourlyData[];
}

function formatTime(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function HourlyChart({ data }: Props) {
  if (data.length === 0) {
    return <p>No data</p>;
  }

  const temps = data.map((d) => d.temp);
  const minTemp = Math.min(...temps);
  const maxTemp = Math.max(...temps);
  const range = maxTemp - minTemp || 1;

  const width = data.length * 100;
  const height = 100;
  const padding = 20;

  const points = data.map((item, i) => {
    const x =
      (i / Math.max(data.length - 1, 1)) * (width - padding * 2) + padding;
    const y =
      height -
      padding -
      ((item.temp - minTemp) / range) * (height - padding * 2);
    return { x, y, temp: item.temp };
  });

  const pathD = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>24-hour forecast</h3>

      <div className={styles.chartWrapper}>
        <svg data-testid="hourly-graph" width={width} height={height} className={styles.chart}>
          <path
            d={pathD}
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {points.map((p, i) => (
            <g key={i}>
              <circle
                cx={p.x}
                cy={p.y}
                r="5"
                fill="var(--color-card)"
                stroke="var(--color-accent)"
                strokeWidth="2"
              />
              <text
                x={p.x}
                y={p.y - 10}
                textAnchor="middle"
                className={styles.tempLabel}
              >
                {Math.round(p.temp)}°
              </text>
            </g>
          ))}
        </svg>
      </div>

      <div className={styles.hourCards}>
        {data.map((item, i) => (
          <div key={i} className={styles.hourCard}>
            <img
              src={`https://openweathermap.org/img/wn/${item.icon}.png`}
              alt={item.description}
              width={40}
              height={40}
            />
            <span className={styles.time}>{formatTime(item.dt)}</span>
          </div>
        ))}
      </div>

      <div className={styles.legend}>
        <span>Min: {Math.round(minTemp)}°C</span>
        <span>Max: {Math.round(maxTemp)}°C</span>
      </div>
    </div>
  );
}
