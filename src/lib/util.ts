"use server";
import { CityData, WeatherData } from "@/Types";
import moment from "moment";

type Units = "metric" | "imperial";

export async function extractWeatherData(
  city: string,
  units: Units
): Promise<{
  cityData: CityData | null;
  weatherData: WeatherData[] | null;
}> {
  try {
    const apiResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.OPEN_WEATHER_API_KEY}&units=imperial`
    );

    if (!apiResponse.ok)
      throw new Error(`Error status : ${apiResponse.status}`);

    const apiData = await apiResponse.json();

    const cityData = formatCityData(apiData.city);
    const closestHour = getClosestHour(apiData.list);
    const weatherData = filterAndConvertWeatherData(
      apiData.list,
      closestHour,
      units
    );

    return { cityData, weatherData };
  } catch (error) {
    console.error("Error extracting weather data:", error);
    return { cityData: null, weatherData: null };
  }
}

function formatCityData(city: any): CityData {
  const { sunset, sunrise } = formatSunriseSunset(city.sunrise, city.sunset);

  return {
    name: city.name,
    country: city.country,
    sunrise,
    sunset,
  };
}
//Since OpenWeather API gives us the data on 3 hour intervals, this chooses the interval closest to current time (relative to local time not actual city time, might fix later however since this is just an API mockup not very necessary)
function getClosestHour(weatherList: any[]): string {
  const currentMoment = moment();

  const closestForecastEntry = weatherList.reduce(
    (closest: any, entry: any) => {
      const entryMoment = moment.unix(entry.dt);
      const closestMoment = moment.unix(closest.dt);
      const diffCurrent = Math.abs(currentMoment.diff(entryMoment));
      const diffClosest = Math.abs(currentMoment.diff(closestMoment));

      return diffCurrent < diffClosest ? entry : closest;
    }
  );

  return moment.unix(closestForecastEntry.dt).format("H:00:00");
}

function filterAndConvertWeatherData(
  weatherList: any[],
  closestHour: string,
  units: Units
): WeatherData[] {
  const today = moment().startOf("day");
  const endDate = today.clone().add(5, "days");

  return weatherList
    .filter((entry: any) => {
      const entryDate = moment.unix(entry.dt).startOf("day");
      return (
        entryDate.isSameOrAfter(today) &&
        entryDate.isBefore(endDate) &&
        moment.unix(entry.dt).format("H:00:00") === closestHour
      );
    })
    .map((day: any) => convertWeatherData(day, units));
}

function convertWeatherData(day: any, units: Units): WeatherData {
  const temperature =
    units === "metric" ? fahrenheitToCelsius(day.main.temp) : day.main.temp;
  const feelsLike =
    units === "metric"
      ? fahrenheitToCelsius(day.main.feels_like)
      : day.main.feels_like;
  const windSpeed =
    units === "metric" ? milesToKm(day.wind.speed) : day.wind.speed;

  return {
    date: moment.unix(day.dt).format("dddd D MMMM YYYY"),
    temperature,
    feelsLike,
    weather: {
      main: day.weather[0].main,
      description: day.weather[0].description,
    },
    wind: {
      speed: windSpeed,
      direction: windDegreeToDirection(day.wind.deg),
    },
    humidity: day.main.humidity,
    rainPercentage: rainAmountToChance(day?.rain?.["3h"] ?? 0),
    windDescription: windSpeedToDescription(windSpeed, units),
    cloudless: day.clouds.all,
    pressure: day.main.pressure,
  };
}

function fahrenheitToCelsius(fahrenheit: number): number {
  return parseFloat((((fahrenheit - 32) * 5) / 9).toFixed(1));
}

function milesToKm(miles: number): number {
  return parseFloat((miles * 1.60934).toFixed(1));
}

function windDegreeToDirection(degrees: number): string {
  if (degrees >= 337.5 || degrees < 22.5) {
    return "N";
  } else if (degrees >= 22.5 && degrees < 67.5) {
    return "NE";
  } else if (degrees >= 67.5 && degrees < 112.5) {
    return "E";
  } else if (degrees >= 112.5 && degrees < 157.5) {
    return "SE";
  } else if (degrees >= 157.5 && degrees < 202.5) {
    return "S";
  } else if (degrees >= 202.5 && degrees < 247.5) {
    return "SW";
  } else if (degrees >= 247.5 && degrees < 292.5) {
    return "W";
  } else if (degrees >= 292.5 && degrees < 337.5) {
    return "NW";
  } else {
    return "Invalid input";
  }
}

function windSpeedToDescription(speed: number, units: Units) {
  let adjustedSpeed = speed;

  if (units === "imperial") {
    adjustedSpeed = milesToKm(speed);
  }

  if (adjustedSpeed < 1) {
    return "Calm";
  } else if (adjustedSpeed >= 1 && adjustedSpeed < 12) {
    return "Light Wind";
  } else if (adjustedSpeed >= 12 && adjustedSpeed < 24) {
    return "Breeze";
  } else if (adjustedSpeed >= 24 && adjustedSpeed < 50) {
    return "Strong Wind";
  } else if (adjustedSpeed >= 50 && adjustedSpeed < 75) {
    return "Gale";
  } else {
    return "Storm";
  }
}

function rainAmountToChance(rainInMm: number): number {
  // Define thresholds
  const noRainThreshold = 0; // 0 mm (0% chance)
  const noticeableRainThreshold = 0.1; // 0.1 mm (10% chance)
  const lightRainThreshold = 0.5; // 0.5 mm (20% chance)
  const moderateRainThreshold = 1.0; // 1 mm (50% chance)
  const heavyRainThreshold = 5.0; // 5 mm (75% chance)
  const veryHeavyRainThreshold = 10.0; // 10 mm (100% chance)

  if (rainInMm <= noRainThreshold) {
    return 0; // No chance of rain
  } else if (rainInMm <= noticeableRainThreshold) {
    return 10; // 10% chance
  } else if (rainInMm <= lightRainThreshold) {
    return 20; // 20% chance
  } else if (rainInMm <= moderateRainThreshold) {
    return 50; // 50% chance
  } else if (rainInMm <= heavyRainThreshold) {
    return 75; // 75% chance
  } else if (rainInMm <= veryHeavyRainThreshold) {
    return 100; // 100% chance
  } else {
    return 100; // Considered very heavy rain as 100% chance
  }
}

function formatSunriseSunset(sunrise: number, sunset: number) {
  const formattedSunrise = moment.unix(sunrise).format("H:mm");
  const formattedSunset = moment.unix(sunset).format("H:mm");

  return {
    sunrise: formattedSunrise,
    sunset: formattedSunset,
  };
}
