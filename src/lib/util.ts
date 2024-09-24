"use server";
import { CityData, WeatherData } from "@/Types";
import moment from "moment";

export async function extractWeatherData(
  city: string,
  units: string
): Promise<{
  cityData: CityData | null;
  weatherData: WeatherData[] | null;
}> {
  try {
    const apiResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.OPEN_WEATHER_API_KEY}&units=${units}`
    );

    if (!apiResponse.ok)
      throw new Error(`Error status : ${apiResponse.status}`);

    const apiData = await apiResponse.json();

    const { sunset, sunrise } = formatSunriseSunset(
      apiData.city.sunrise,
      apiData.city.sunset
    );

    const cityData: CityData = {
      name: apiData.city.name,
      country: apiData.city.country,
      sunrise,
      sunset,
    };

    // Get the current time
    const currentMoment = moment();

    // Calculate the hour difference between now and forecast times to find the closest one
    const closestForecastEntry = apiData.list.reduce(
      (closest: any, entry: any) => {
        const entryMoment = moment.unix(entry.dt);
        const closestMoment = moment.unix(closest.dt);

        // Calculate the absolute difference between now and both forecast times
        const diffCurrent = Math.abs(currentMoment.diff(entryMoment));
        const diffClosest = Math.abs(currentMoment.diff(closestMoment));

        // Return the entry with the smaller time difference
        return diffCurrent < diffClosest ? entry : closest;
      }
    );

    // Get the forecast hour that is closest to the current hour
    const closestHour = moment.unix(closestForecastEntry.dt).format("H:00:00");

    // Get the current date and ensure the forecast starts from today
    const today = moment().startOf("day");
    const endDate = today.clone().add(5, "days"); // Five days from today

    // Filter the forecast data to only include entries between today and the end date
    const weatherData: WeatherData[] = apiData.list
      .filter((entry: any) => {
        const entryDate = moment.unix(entry.dt).startOf("day");
        return (
          entryDate.isSameOrAfter(today) &&
          entryDate.isBefore(endDate) &&
          moment.unix(entry.dt).format("H:00:00") === closestHour
        );
      })
      .map((day: any) => ({
        date: moment.unix(day.dt).format("dddd D MMMM YYYY"),
        temperature: day.main.temp,
        feelsLike: day.main.feels_like,
        weather: {
          main: day.weather[0].main,
          description: day.weather[0].description,
        },
        wind: {
          speed: day.wind.speed,
          direction: windDegreeToDirection(day.wind.deg),
        },
        humidity: day.main.humidity,
        rainPercentage: rainAmountToChance(day?.rain?.["3h"] ?? 0),
        windDescription: windSpeedToDescription(day.wind.speed),
        cloudless: day.clouds.all,
        pressure: day.main.pressure,
      }));

    return { cityData, weatherData };
  } catch (error) {
    console.error("Error extracting weather data:", error);
    return { cityData: null, weatherData: null };
  }
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
function windSpeedToDescription(speed: number) {
  if (speed < 1) {
    return "Calm"; // Below 1 km/h
  } else if (speed >= 1 && speed < 12) {
    return "Light Wind"; // 1 to 11.9 km/h
  } else if (speed >= 12 && speed < 24) {
    return "Breeze"; // 12 to 23.9 km/h
  } else if (speed >= 24 && speed < 50) {
    return "Strong Wind"; // 24 to 49.9 km/h
  } else if (speed >= 50 && speed < 75) {
    return "Gale"; // 50 to 74.9 km/h
  } else {
    return "Storm"; // 75 km/h and above
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
