## Basic Idea

A weather application where users can search for and view real-time weather data, including temperature, humidity, wind speed, and forecasts. The app will allow users to input a city name or use their current location to get weather details. Data will be fetched from the OpenWeatherAPI, providing accurate and up-to-date weather conditions, forecasts, and additional metrics like UV index, air quality, and weather maps. The app will also feature an autocomplete function that suggests city names using the Google Places API as the user types.

## Tech Used

- NextJS for creating dynamic, responsive user interfaces.
- **OpenWeatherAPI** for fetching real-time weather data, forecasts, and additional weather-related information.
- **Google Places API** for providing autocomplete suggestions for city names as users type.
- **Axios** for making API requests and handling responses.
- **Geolocation API** to fetch the user's current location for localized weather data.
- **Moment.js** for formatting date and time data.

## Features

- **Search Weather by City**: Allows users to enter a city name and get real-time weather data and forecasts, with autocomplete suggestions.
- **Current Location Weather**: Uses the browser's Geolocation API to fetch and display weather data for the user's current location.
- **5-Day Forecast**: Displays a 5-day weather forecast including highs, lows, and weather conditions for each day.
- **Weather Metrics**: Shows additional data like humidity, wind speed, UV index, and pressure.
- **Unit Conversion**: Allows users to toggle between Celsius and Fahrenheit.
- **Responsive Design**: Optimized for mobile, tablet, and desktop viewing.
