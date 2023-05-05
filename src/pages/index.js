import { useEffect, useState } from "react";
import { api } from "./api/api";
import functions from "@/functions/functions";
import axios from "axios";
import Navbar from "@/components/navbar";

export default function Home() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [data, setData] = useState({});

  const {
    getCurrentLocation,
    getDay,
    getMonth,
    getInfoHours,
    getConditionsSem,
  } = functions;

  const { forecastPetition } = api;
  const { location, current, forecast } = data;

  const actuallyHour = location?.localtime;

  useEffect(() => {
    getCurrentLocation(setLatitude, setLongitude);
    const key = process.env.SECRET_KEY;
    axios
      .get(
        `${forecastPetition}&q=${latitude},${longitude}&aqi=yes&alerts=yes&days=7`
      )
      .then((response) => setData(response.data));
  }, [latitude, longitude]);

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

            <Navbar actuallyHour={actuallyHour} />
            
            {/* header */}

            
            {/* primer div con informacion del clima */}
            <div className=" rounded px-5 py-8 bg-sky-50 ">
              <div className="flex items-center">
                <h2 className="text-7xl font-extrabold border-r-2 pr-3">
                  {
                    forecast.forecastday[0].hour[actuallyHour.slice(11, 13)]
                      .temp_c
                  }
                  º
                </h2>
                <div className="pl-3 flex flex-col font-semibold justify-between text-lg">
                  <p>Max temp {forecast.forecastday[0].day.maxtemp_c}º</p>
                  <p>Min temp {forecast.forecastday[0].day.mintemp_c}º</p>
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
                <div className=" rounded mx-1 bg-white flex items-center justify-center w-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon icon-tabler icon-tabler-droplet"
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="#2c3e50"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M6.8 11a6 6 0 1 0 10.396 0l-5.197 -8l-5.2 8z" />
                  </svg>
                  <p className=" font-semibold text-xl">{current.humidity}%</p>
                </div>
                <div className=" rounded gap-1 mx-1 bg-white flex items-center justify-center w-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon icon-tabler icon-tabler-cloud-rain"
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="#2c3e50"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7" />
                    <path d="M11 13v2m0 3v2m4 -5v2m0 3v2" />
                  </svg>
                  <p className=" font-semibold text-xl">
                    {current.precip_mm} mmHg
                  </p>
                </div>
                <div className="py-2 rounded mx-1 gap-1 bg-white flex items-center justify-center w-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon icon-tabler icon-tabler-sunrise"
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="#2c3e50"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M3 17h1m16 0h1m-15.4 -6.4l.7 .7m12.1 -.7l-.7 .7m-9.7 5.7a4 4 0 0 1 8 0" />
                    <line x1="3" y1="21" x2="21" y2="21" />
                    <path d="M12 9v-6l3 3m-6 0l3 -3" />
                  </svg>
                  <p className=" font-semibold text-xl"> {current.uv} UV</p>
                </div>
              </div>
            </div>

            {/* segundo div con informacion del clima */}
            <div className=" rounded px-5 py-8 mt-5 bg-sky-50 ">
              <h2 className="uppercase text-xl font-semibold">
                The history up to {getInfoHours(actuallyHour.slice(11, 13))} at{" "}
                {getInfoHours(
                  getConditionsSem(
                    actuallyHour.slice(11, 13),
                    forecast.forecastday
                  )[12].time.slice(11, 13)
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
                {getConditionsSem(
                  actuallyHour.slice(11, 13),
                  forecast.forecastday
                ).map((hour) => (
                  <div className="grid items-center justify-center grid-cols-5 px-3 py-2 w-100 justify-items-center bg-white">
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
            <div className="w-full font-thin  flex justify-around ">
              <a
                href="https://www.weatherapi.com/"
                target="_blank"
                className="flex cursor-pointer w-1/2  hover:font-semibold flex-col items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-cloud-snow"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="#2c3e50"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7" />
                  <path d="M11 15v.01m0 3v.01m0 3v.01m4 -4v.01m0 3v.01" />
                </svg>
                <p>Weather API</p>
              </a>
              <a
                href="https://github.com/ezeqduarte/weatherapp"
                target="_blank"
                className="flex w-50 w-1/2 cursor-pointer hover:font-semibold flex-col items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-brand-github"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="#2c3e50"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
                </svg>
                <p>Github</p>
              </a>
            </div>
            {}
          </div>
        </main>
      ) : (
        <main
          className={`flex bg-gradient-to-r from-cyan-500 to-blue-400 h-screen w-screen flex items-center justify-center p-12 font-sans`}
        >
          <p>Loading... </p>
        </main>
      )}
    </>
  );
}
