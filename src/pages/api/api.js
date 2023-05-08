const key = process.env.NEXT_PUBLIC_SECRET_KEY;

export const api = {
  forecastPetition: `http://api.weatherapi.com/v1/forecast.json?key=${key}`,
};
