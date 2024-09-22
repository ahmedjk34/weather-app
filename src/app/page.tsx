"use server";

import { extractWeatherData } from "@/lib/util";

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
  return <div></div>;
}
