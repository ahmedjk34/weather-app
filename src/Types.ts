export interface CityData {
  name: string;
  country: String;
  sunrise: number;
  sunset: number;
}

export interface WeatherData {
  date: String;
  temperature: number;
  feelsLike: number;
  weather: {
    main:
      | "clear sky"
      | "few clouds"
      | "scattered clouds"
      | "broken clouds"
      | "shower rain"
      | "rain"
      | "thunderstorm"
      | "mist"
      | "snow";
    description: string; // Weather description (e.g., "light rain", "few clouds", "clear sky")
  };
  wind: {
    direction: string; // Wind direction as a string (e.g. 'N', 'NE', 'E', etc.)
    speed: number; // Wind speed in km/h or mph
  };
  humidity: number; // Humidity percentage
  rainPercentage: number; // Rain percentage (to be calculated)
  windDescription:
    | "Calm"
    | "Breeze"
    | "Light Wind"
    | "Strong Wind"
    | "Gale"
    | "Storm"; // Description of wind/weather (to be calculated)
  cloudless: number;
  pressure: number; // In hPa
}
