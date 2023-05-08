import { useEffect, useState } from "react";
import { api } from "./api/api";
import functions from "@/functions/functions";
import axios from "axios";
import Header from "@/components/Header";
import { NavBar } from "@/components/NavBar";
import Footer from "@/components/Footer";
import ListHoursDay from "@/components/ListHoursDay";
import InformationDay from "@/components/InformationDay";
const { getCurrentLocation } = functions;
const { forecastPetition } = api;

export default function Home() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [data, setData] = useState({});

  const { location, current, forecast } = data;

  const actuallyHour = location?.localtime.slice(11, 13);
  const actuallyDay = forecast?.forecastday[0];

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
        <main
          className={`flex bg-gradient-to-r from-cyan-500 to-blue-400 h-screen w-screen flex items-center justify-center p-12 font-sans`}
        >
          <main className="celphone relative w-128 bg-white overflow-auto shadow-2xl h-full p-5 border rounded">
            <NavBar location={location}></NavBar>
            <Header location={location} current={current}></Header>
            <InformationDay
              actuallyDay={actuallyDay}
              current={current}
              forecast={forecast}
              actuallyHour={actuallyHour}
            />
            <ListHoursDay actuallyHour={actuallyHour} forecast={forecast} />
            <hr className="my-5"></hr>
            <Footer />
          </main>
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
