"use server";

import { extractWeatherData } from "@/lib/util";
import { extractSuitableArrow, extractWeatherIcon } from "./clientUtill";
import { notFound } from "next/navigation";
import styles from "./main.module.scss";
import { ReactNode } from "react";
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
            <h1>
              {extractWeatherIcon(todaysWeather.weather.main)}
              {todaysWeather.temperature}°
            </h1>
            <h3>{todaysWeather.weather.description}</h3>
            <h4 className={styles.secondaryText}>
              Feels like {todaysWeather.feelsLike}°
            </h4>
            <h4 className={styles.secondaryText}>
              {todaysWeather.windDescription}
            </h4>
          </div>
          <div className={styles.secondaryInformation}>
            <CreateSecondaryInfo
              title={"Wind"}
              info={todaysWeather.wind.speed}
              unit="km/h"
              icon={extractSuitableArrow(todaysWeather.wind.direction)}
            />
            <CreateSecondaryInfo
              title={"Cloudiness"}
              info={todaysWeather.cloudless}
              unit={"%"}
            />
            <CreateSecondaryInfo
              title={"Chance of Rain"}
              info={todaysWeather.rainPercentage}
              unit={"%"}
            />
            <CreateSecondaryInfo
              title={"Sunrise"}
              info={data.cityData.sunrise}
            />
            <CreateSecondaryInfo title={"Sunset"} info={data.cityData.sunset} />
            <CreateSecondaryInfo
              title={"Humidity"}
              info={todaysWeather.humidity}
              unit={"%"}
            />
          </div>
        </div>
        <div className={styles.futureWeatherInformation}></div>
      </div>
    </div>
  );
}

type SecondaryInfoProps = {
  title: string;
  info: string | number;
  unit?: string;
  icon?: ReactNode | null;
};

function CreateSecondaryInfo({ title, info, unit, icon }: SecondaryInfoProps) {
  return (
    <div>
      <h4 className={styles.secondaryText}>{title}</h4>
      <h3>
        {icon}
        {info}
        {unit}
      </h3>
    </div>
  );
}
