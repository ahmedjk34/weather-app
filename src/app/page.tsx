"use server";

import { extractWeatherData } from "@/lib/util";
import { formatSunriseSunset } from "./clientUtill";
import { notFound } from "next/navigation";
import styles from "./main.module.scss";
export default async function Home({
  searchParams,
}: {
  searchParams: { city: string | undefined; units: string | undefined };
}) {
  if (!searchParams.city || !searchParams.units) {
    notFound();
  }
  const data = await extractWeatherData(searchParams.city, searchParams.units);
  if (!data.cityData || !data.weatherData) notFound();

  const { sunset, sunrise } = formatSunriseSunset(
    data.cityData.sunrise,
    data.cityData.sunset
  );
  const todaysWeather = data.weatherData[0];

  return (
    <div className={styles.wrapper}>
      <div className={styles.mainComponent}>
        <div className={styles.generalInformation}>
          <h1>
            {data.cityData.name}, {data.cityData.country}
          </h1>
          <h3 className={styles.secondaryText}>{todaysWeather.date}</h3>
        </div>
        <div className={styles.todayWeatherInformation}>
          <div className={styles.mainInformation}>
            <h1>{todaysWeather.temperature}°</h1>
            <h3>{todaysWeather.weather.description}</h3>
            <h4 className={styles.secondaryText}>
              Feels like {todaysWeather.feelsLike}°
            </h4>
            <h4 className={styles.secondaryText}>
              {todaysWeather.windDescription}
            </h4>
          </div>
          <div className={styles.secondaryInformation}></div>
        </div>
        <div className={styles.futureWeatherInformation}></div>
      </div>
    </div>
  );
}
