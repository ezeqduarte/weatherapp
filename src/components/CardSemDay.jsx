import React from "react";
import functions from "@/functions/functions";
const { getDay } = functions;

export default function CardSemDay({ day }) {
  return (
    <div className="py-3  rounded mx-1 bg-white flex flex-col items-center justify-center w-full">
      <p className="uppercase font-medium">{getDay(day.date).slice(0, 3)}</p>
      <img className="w-10" src={day.day.condition.icon}></img>
      <p>{parseInt(day.day.maxtemp_c)}º</p>
      <p className="text-gray-400">{parseInt(day.day.mintemp_c)}º</p>
    </div>
  );
}
