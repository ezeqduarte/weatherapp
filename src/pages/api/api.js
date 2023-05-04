import axios from "axios";

const key = process.env.SECRET_KEY;

export const api = {
  current: `http://api.weatherapi.com/v1/current.json?key=${key}&q=Posadas&aqi=yes&alerts=yes`,
  current_local: `http://localhost:3000/api/hello`,

  forecastPetition: (lat, long) =>
    axios.get(
      `http://api.weatherapi.com/v1/forecast.json?key=${key}&q=${lat},${long}&aqi=yes&alerts=yes`
    ),
  forecast_local: `http://localhost:3000/api/hello`,
};
