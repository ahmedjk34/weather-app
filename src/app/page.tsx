"use server";

import { extractWeatherData } from "@/lib/util";
import { extractSuitableArrow, extractWeatherIcon } from "./clientUtill";
import { notFound } from "next/navigation";
import styles from "./main.module.scss";
import { ReactNode } from "react";
import { Units } from "@/Types";
export default async function Home({
  searchParams,
}: {
  searchParams: { city: string | undefined; units: Units | undefined };
}) {
  if (!searchParams.city || !searchParams.units)
    throw new Error("City & Units parameters can't be empty");
  const data = await extractWeatherData(searchParams.city, searchParams.units);
  if (!data.cityData || !data.weatherData) notFound();

  const todaysWeather = data.weatherData[0];
  const futureWeatherConditions = data.weatherData.slice(1); // Get the next 4 days

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
              {searchParams.units == "metric" ? "C" : "F"}
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
              unit={searchParams.units == "metric" ? "km/h" : "mph"}
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
      </div>
      <div className={styles.futureWeatherInformation}>
        <h2>Future forecast</h2>
        {futureWeatherConditions.map((dayWeather, index) => (
          <CreateFutureWeatherInformation
            key={index}
            day={dayWeather.date}
            temperature={dayWeather.temperature}
            feelsLike={dayWeather.feelsLike}
            weatherMain={dayWeather.weather.main}
            windSpeed={dayWeather.wind.speed}
            windDirection={dayWeather.wind.direction}
          />
        ))}
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

type FutureWeatherInformationProps = {
  day: string;
  temperature: number;
  feelsLike: number;
  weatherMain: string;
  windSpeed: number;
  windDirection: string;
};

function CreateFutureWeatherInformation({
  day,
  temperature,
  feelsLike,
  weatherMain,
  windSpeed,
  windDirection,
}: FutureWeatherInformationProps) {
  return (
    <div>
      <h3>{day.split(" ")[0]}</h3>
      <h3>
        {extractWeatherIcon(weatherMain)}
        {temperature}°
      </h3>
      <h3> {feelsLike}°</h3>
      <h3>
        {extractSuitableArrow(windDirection)}
        {windSpeed}
      </h3>
    </div>
  );
}
