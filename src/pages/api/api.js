const key = process.env.SECRET_KEY;

export const api = {
  current: `http://api.weatherapi.com/v1/current.json?key=${key}&q=Posadas&aqi=yes&alerts=yes`,
  current_local: `http://localhost:3000/api/hello`,

  forecast: `http://api.weatherapi.com/v1/forecast.json?key=${key}&q=Posadas&aqi=yes&alerts=yes`,
  forecast_local: `http://localhost:3000/api/hello`,
};
