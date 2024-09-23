import moment from "moment";
//we'll walk with the arrows starting from down,clock wise
import {
  FiArrowDown,
  FiArrowDownLeft,
  FiArrowLeft,
  FiArrowUpLeft,
  FiArrowUp,
  FiArrowUpRight,
  FiArrowRight,
  FiArrowDownRight,
} from "react-icons/fi";

import {
  FaSun,
  FaCloudSun,
  FaCloud,
  FaCloudSunRain,
  FaCloudShowersHeavy,
  FaCloudBolt,
  FaRegSnowflake,
} from "react-icons/fa6";
import { RiMistFill } from "react-icons/ri";

export function formatSunriseSunset(sunrise: number, sunset: number) {
  const formattedSunrise = moment.unix(sunrise).format("H:mm");
  const formattedSunset = moment.unix(sunset).format("H:mm");

  return {
    sunrise: formattedSunrise,
    sunset: formattedSunset,
  };
}

export function extractSuitableArrow(direction: string) {
  switch (direction) {
    case "N":
      return <FiArrowUp />;
    case "NE":
      return <FiArrowUpRight />;
    case "E":
      return <FiArrowRight />;
    case "SE":
      return <FiArrowDownRight />;
    case "S":
      return <FiArrowDown />;
    case "SW":
      return <FiArrowDownLeft />;
    case "W":
      return <FiArrowLeft />;
    case "NW":
      return <FiArrowUpLeft />;
    default:
      return null;
  }
}

export function extractWeatherIcon(condition: string) {
  switch (condition) {
    case "clear sky":
      return <FaSun />;
    case "few clouds":
      return <FaCloudSun />;
    case "scattered clouds":
      return <FaCloud />;
    case "broken clouds":
      return <FaCloud />;
    case "shower rain":
      return <FaCloudSunRain />;
    case "rain":
      return <FaCloudShowersHeavy />;
    case "thunderstorm":
      return <FaCloudBolt />;
    case "mist":
      return <RiMistFill />;
    case "snow":
      return <FaRegSnowflake />;
    default:
      return null;
  }
}
