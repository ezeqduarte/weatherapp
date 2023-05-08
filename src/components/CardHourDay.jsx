import React from "react";
import functions from "@/functions/functions";
const { getInfoHours } = functions;

export default function CardHourDay({hour}) {
  return (
    <div className="grid items-center justify-center grid-cols-5 px-3 py-2 w-100 justify-items-center bg-white">
      <p>{getInfoHours(hour.time.slice(10, 13))}</p>

      <img className="w-8" src={hour.condition.icon}></img>
      <p>{hour.temp_c}</p>
      <p>{hour.humidity}%</p>
      <p>{hour.wind_kph} km/h</p>
    </div>
  );
}
