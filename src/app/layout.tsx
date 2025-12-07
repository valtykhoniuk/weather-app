import type { Metadata } from "next";
import "./global.scss";

export const metadata: Metadata = {
  title: "Weather App - app for checking weather in different cities",
  description:
    "App to check current weather in various cities around the world",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
