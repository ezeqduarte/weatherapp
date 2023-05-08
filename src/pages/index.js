import { useEffect, useState } from "react";
import { api } from "./api/api";
import functions from "@/functions/functions";
import axios from "axios";
import Header from "@/components/Header";
import { NavBar } from "@/components/NavBar";
import CardSemDay from "@/components/cardSemDay";
import svgs from "@/components/svgs";
import CardDetailsWeather from "@/components/CardDetailsWeather";
import CardHourDay from "@/components/CardHourDay";

export default function Home() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [data, setData] = useState({});

  const {
    getCurrentLocation,
    getInfoHours,
    getConditionsSem,
  } = functions;

  const { forecastPetition } = api;
  const { location, current, forecast } = data;

  const actuallyHour = location?.localtime;

  useEffect(() => {
    getCurrentLocation(setLatitude, setLongitude);
    axios
      .get(
        `${forecastPetition}&q=${latitude},${longitude}&aqi=yes&alerts=yes&days=7`
      )
      .then((response) => setData(response.data));
  }, [latitude, longitude]);

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

            <NavBar location={location}></NavBar>

            {/* header */}

            <Header location={location} current={current}></Header>

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
                <CardDetailsWeather
                  svg={svgs.uvSvg}
                  current={current.uv}
                  text={"UV"}
                />
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
                  <CardHourDay hour={hour} />
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
                {svgs.weatherSvg}
                <p>Weather API</p>
              </a>
              <a
                href="https://github.com/ezeqduarte/weatherapp"
                target="_blank"
                className="flex w-50 w-1/2 cursor-pointer hover:font-semibold flex-col items-center justify-center"
              >
                {svgs.githubSvg}
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
