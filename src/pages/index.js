import { useEffect, useState } from "react";
import { api } from "./api/api";
import functions from "@/functions/functions";
import axios from "axios";

export default function Home() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [data, setData] = useState({});

  const { current_local: petition_local } = api;
  const { getCurrentLocation } = functions;
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

          <div className="w-96 h-full p-5 border rounded">
            {/* header */}

            <header className="w-100 bg-white pt-5 mb-5">
              <h1 className="text-5xl font-bold truncate">{location.name}</h1>
              <span className="text-3xl truncate font-thin italic font-bold">
                {location.region}, {location.country}
              </span>
            </header>
            {/* primer div con informacion del clima */}
            <div className=" rounded p-5 bg-sky-50 ">
              <div className="flex">
                <h2 className="text-5xl font-extrabold border-r-2 pr-3">
                  {current.temp_c}º
                </h2>
                <div className="pl-3 text-medium">
                  <p>{current.temp_c}º</p>
                  <p>{current.temp_c}º</p>
                </div>
              </div>
              <div className="flex w-8 items-center">
                <p>{current.condition.text}</p>
                <img src={current.condition.icon}></img>
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
