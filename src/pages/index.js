import { useEffect, useState } from "react";
import { api } from "./api/api";
import functions from "@/functions/functions";
import axios from "axios";

export default function Home() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [data, setData] = useState({});

  const { current_local: petition_local } = api;
  const { getCurrentLocation, getDay } = functions;
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
          className={`flex h-screen w-screen flex items-center justify-center p-12 font-sans`}
        >
          {/* este div es mi celular */}

          <div className="w-128 h-full p-5 border rounded">
            {/* header */}

            <header className="w-100 bg-white pt-5 mb-5">
              <h1 className="text-5xl font-bold truncate">{location.name}</h1>
              <span className="text-3xl truncate font-thin italic font-bold">
                {location.region}, {location.country}
              </span>
            </header>
            {/* primer div con informacion del clima */}
            <div className=" rounded p-3 bg-sky-50 ">
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
                    <p className="uppercase font-medium">{getDay(day.date)}</p>
                    <img className="w-10" src={day.day.condition.icon}></img>
                    <p>{parseInt(day.day.maxtemp_c)}º</p>
                    <p className="text-gray-400">{parseInt(day.day.mintemp_c)}º</p>
                  </div>
                ))}
              </div>
              <div className="w-full text-sky-900  gap-3 mt-3 flex">
                <div className=" rounded mx-1 bg-white flex flex-col items-center justify-center w-full">
                  <p className=" font-semibold text-xl">52%</p>
                  <img className="w-10"></img>
                </div>
                <div className=" rounded mx-1 bg-white flex flex-col items-center justify-center w-full">
                  <p className=" font-semibold text-xl">0 mm</p>
                  <img className="w-10"></img>
                </div>
                <div className="py-2 rounded mx-1 bg-white flex flex-col items-center justify-center w-full">
                  <p className=" font-semibold text-xl">18</p>
                  <img className="w-10"></img>
                </div>
              </div>
            </div>
          </div>
        </main>
      ) : (
        <p>Loading... </p>
      )}
    </>
  );
}
