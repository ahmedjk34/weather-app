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
      return null; // or some default icon if desired
  }
}
