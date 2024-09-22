export interface WeatherData {
  date: String;
  temperature: number;
  feelsLike: number;
  weather: {
    main:
      | "Clouds"
      | "Clear"
      | "Rain"
      | "Snow"
      | "Drizzle"
      | "Thunderstorm"
      | "Mist"
      | "Haze"; // Main weather condition
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

export interface Location {
  settlement: string;
  country: string;
}
