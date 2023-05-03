const key = process.env.SECRET_KEY;

export const api = {
  current: `http://api.weatherapi.com/v1/current.json?key=${key}&q=Posadas&aqi=yes`,
  current_local: `http://localhost:3000/api/hello`,
};
