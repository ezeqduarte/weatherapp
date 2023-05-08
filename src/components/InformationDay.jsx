import React from "react";
import CardSemDay from "./cardSemDay";
import CardDetailsWeather from "./CardDetailsWeather";
import svgs from "./svgs";

export default function InformationDay({
  actuallyDay,
  current,
  forecast,
  actuallyHour,
}) {
  return (
    <div className=" rounded px-5 py-8 bg-sky-50 ">
      <div className="flex items-center">
        <h2 className="text-7xl font-extrabold border-r-2 pr-3">
          {actuallyDay.hour[actuallyHour].temp_c}º
        </h2>
        <div className="pl-3 flex flex-col font-semibold justify-between text-lg">
          <p>Max temp {actuallyDay.day.maxtemp_c}º</p>
          <p>Min temp {actuallyDay.day.mintemp_c}º</p>
        </div>
      </div>
      <div className="flex mt-3 items-center">
        <p className=" italic">{current.condition.text} </p>
        <img className="w-8 ml-2" src={current.condition.icon}></img>
      </div>
      <p className="italic">Feels like: {current.feelslike_c}º</p>
      <p className="italic">
        Air quality: {current.air_quality["us-epa-index"]}
      </p>
      <hr className="my-5"></hr>
      <div className="w-full flex">
        {forecast.forecastday.map((day) => (
          <CardSemDay day={day} />
        ))}
      </div>
      <div className="w-full text-sky-900  gap-3 mt-3 flex">
        <CardDetailsWeather
          svg={svgs.humiditySvg}
          current={current.humidity}
          text={"%"}
        />
        <CardDetailsWeather
          svg={svgs.rainSvg}
          current={current.precip_mm}
          text={"mmHg"}
        />
        <CardDetailsWeather svg={svgs.uvSvg} current={current.uv} text={"UV"} />
      </div>
    </div>
  );
}
