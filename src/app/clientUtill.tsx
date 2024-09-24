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
  FaCloudSunRain,
  FaCloudShowersHeavy,
  FaCloudBolt,
  FaRegSnowflake,
  FaQuestion,
} from "react-icons/fa6";
import { RiMistFill } from "react-icons/ri";

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
    case "Clear":
      return <FaSun />;
    case "Clouds":
      return <FaCloudSun />;
    case "Drizzle":
      return <FaCloudSunRain />;
    case "Rain":
      return <FaCloudShowersHeavy />;
    case "Thunderstorm":
      return <FaCloudBolt />;
    case "Mist":
      return <RiMistFill />;
    case "Snow":
      return <FaRegSnowflake />;
    default:
      return <FaQuestion />;
  }
}
