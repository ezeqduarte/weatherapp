import { useEffect, useState } from "react";
import { api } from "./api/api";
import functions from "@/functions/functions";
import axios from "axios";

export default function Home() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [data, setData] = useState({});

  const { current_local: petition_local } = api;
  const {
    getCurrentLocation,
    getDay,
    getMonth,
    getInfoHours,
    getConditionsSem,
  } = functions;
  const { location, current, forecast } = data;

  useEffect(() => {
    getCurrentLocation(setLatitude, setLongitude);
    axios.get(`${petition_local}`).then((response) => setData(response.data));
  }, []);

  console.log(data);

  return (
    <>
      {data.location ? (
        /*  el main es toda mi ventana del navegador */
        <main
          className={`flex bg-gradient-to-r from-cyan-500 to-blue-400 h-screen w-screen flex items-center justify-center p-12 font-sans`}
        >
          {/* este div es mi celular */}

          <div className="celphone relative w-128 bg-white overflow-auto shadow-2xl h-full p-5 border rounded">
            {/* barra del celular */}
            <div className="flex justify-between bg-blue-200 absolute top-0 left-0 px-2 w-full bg-gray-100">
              <div>
                <p className="text-gray-400 font-semibold">
                  {current.last_updated.slice(10, 16)}
                </p>
              </div>
              <div>
                <p className="text-gray-400 font-semibold">72%</p>
              </div>
            </div>
            {/* header */}

            <header className="w-100 mt-5 text-end bg-white pt-5 mb-5">
              <h1 className="text-5xl font-bold truncate">{location.name}</h1>
              <span className="text-3xl truncate font-thin italic font-bold">
                {location.region}, {location.country}
              </span>
              <p className="truncate font-thin font-bold">
                Last updated:
                {` `}
                {getDay(current.is_day)} {current.last_updated.slice(8, 10)} de{" "}
                {``}
                {getMonth(current.last_updated.slice(5, 7))}
                {current.last_updated.slice(10, 16)}
              </p>
            </header>
            {/* primer div con informacion del clima */}
            <div className=" rounded px-5 py-8 bg-sky-50 ">
              <div className="flex items-center">
                <h2 className="text-7xl font-extrabold border-r-2 pr-3">
                  {current.temp_c}º
                </h2>
                <div className="pl-3 flex flex-col font-semibold justify-between text-lg">
                  <p>Max temp {current.temp_c}º</p>
                  <p>Min temp {current.temp_c}º</p>
                </div>
              </div>
              <div className="flex items-center">
                <p className="mt-1 italic">{current.condition.text} </p>
                <img className="w-8 ml-1" src={current.condition.icon}></img>
              </div>
              <p className="italic">Feels like: {current.feelslike_c}º</p>
              <p className="italic">
                Air quality: {current.air_quality["us-epa-index"]}
              </p>
              <p className="italic">Yellow warning for storms </p>
              <hr className="my-5"></hr>
              <div className="w-full flex">
                {forecast.forecastday.map((day) => (
                  <div className="py-3  rounded mx-1 bg-white flex flex-col items-center justify-center w-full">
                    <p className="uppercase font-medium">
                      {getDay(day.date).slice(0, 3)}
                    </p>
                    <img className="w-10" src={day.day.condition.icon}></img>
                    <p>{parseInt(day.day.maxtemp_c)}º</p>
                    <p className="text-gray-400">
                      {parseInt(day.day.mintemp_c)}º
                    </p>
                  </div>
                ))}
              </div>
              <div className="w-full text-sky-900  gap-3 mt-3 flex">
                <div className=" rounded mx-1 bg-white flex flex-col items-center justify-center w-full">
                  <p className=" font-semibold text-xl">
                    H {current.humidity}%
                  </p>
                  <img className="w-10"></img>
                </div>
                <div className=" rounded mx-1 bg-white flex flex-col items-center justify-center w-full">
                  <p className=" font-semibold text-xl">
                    P {current.precip_mm} mmHg
                  </p>
                  <img className="w-10"></img>
                </div>
                <div className="py-2 rounded mx-1 bg-white flex flex-col items-center justify-center w-full">
                  <p className=" font-semibold text-xl">UV {current.uv}</p>
                  <img className="w-10"></img>
                </div>
              </div>
            </div>

            {/* segundo div con informacion del clima */}
            <div className=" rounded px-5 py-8 mt-5 bg-sky-50 ">
              <h2 className="uppercase text-xl font-semibold">
                {getDay(current.is_day)}, {current.last_updated.slice(8, 10)} de{" "}
                {` `}
                {getMonth(current.last_updated.slice(5, 7))}
              </h2>
              <p>Updated now</p>
              <div className="flex flex-col gap-3 mt-3">
                {getConditionsSem(17, forecast.forecastday).map((hour) => (
                  <div className="flex w-100 items-center justify-between bg-white">
                    <p>{getInfoHours(hour.time.slice(10, 13))}</p>

                    <img className="w-8" src={hour.condition.icon}></img>
                    <p>{hour.temp_c}</p>
                    <p>{hour.humidity}%</p>
                    <p>{hour.wind_kph} km/h</p>
                  </div>
                ))}
              </div>
            </div>
            <hr className="my-5"></hr>
            <div className="w-full font-thin  flex justify-around bg-gray-100 h-10">
              <a className="flex cursor-pointer w-1/2  hover:font-semibold flex-col items-center justify-center">
                <img className="w-8 " src={current.condition.icon} />
                <p>Weather API</p>
              </a>
              <a className="flex w-50 w-1/2 cursor-pointer hover:font-semibold flex-col items-center justify-center">
                <img className="w-8 " src={current.condition.icon} />
                <p>Github</p>
              </a>
            </div>
          </div>
        </main>
      ) : (
        <p>Loading... </p>
      )}
    </>
  );
}
