import React from "react";
import functions from "@/functions/functions";
import CardHourDay from "./CardHourDay";
const { getInfoHours, getConditionsSem } = functions;

export default function ListHoursDay({ actuallyHour, forecast }) {
  return (
    <div className=" rounded px-5 py-8 mt-5 bg-sky-50 ">
      <h2 className="uppercase text-xl font-semibold">
        The history up to {getInfoHours(actuallyHour)} at{" "}
        {getInfoHours(
          getConditionsSem(actuallyHour, forecast.forecastday)[12].time.slice(
            11,
            13
          )
        )}
      </h2>
      <p>Updated now</p>
      <div className="flex flex-col gap-3">
        <div className="grid px-3 mt-3 justify-items-center grid-cols-5 ">
          <p>Hora</p>
          <p>Clima</p>
          <p>ºC</p>
          <p>H</p>
          <p>Viento</p>
        </div>
        {getConditionsSem(actuallyHour, forecast.forecastday).map((hour) => (
          <CardHourDay hour={hour} />
        ))}
      </div>
    </div>
  );
}
