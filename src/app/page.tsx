"use server";

import { extractWeatherData } from "@/lib/util";
import { formatSunriseSunset } from "./clientUtill";
export default async function Home({
  searchParams,
}: {
  searchParams: { city: string | undefined; units: string | undefined };
}) {
  if (!searchParams.city || !searchParams.units) {
    throw new Error(
      "Invalid search query values: 'city' and 'units' cannot be empty or undefined"
    );
  }
  const data = await extractWeatherData(searchParams.city, searchParams.units);
  if (!data.cityData || !data.weatherData) throw new Error("City not found");

  const { sunset, sunrise } = formatSunriseSunset(
    data.cityData.sunrise,
    data.cityData.sunset
  );

  return <div></div>;
}
