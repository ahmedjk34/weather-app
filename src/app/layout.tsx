import type { Metadata } from "next";
import "../styles/global-rules.scss";
import Nav from "@/components/Nav/Nav";
import Footer from "@/components/Footer/Footer";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Forecastly - Accurate Weather Forecasts",
  description:
    "Stay prepared with real-time weather updates, forecasts, and alerts for your location.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Suspense fallback={<div>Loading...</div>}>
          <Nav />
        </Suspense>
        {children}
        <Footer />
      </body>
    </html>
  );
}
