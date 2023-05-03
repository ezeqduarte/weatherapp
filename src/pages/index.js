import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import { useEffect, useState } from "react";
import { api } from "./api/api";
import axios from "axios";

console.log(process.env.NEXT_PUBLIC_SECRET_KEY);

export default function Home() {
  const { current_local: petition_local } = api;
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [data, setData] = useState({});

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    getCurrentLocation();
    axios.get(`${petition_local}`).then((response) => setData(response.data));
  }, []);

  console.log(latitude, longitude, data);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <p>Hola soy un parrafo</p>
    </main>
  );
}
