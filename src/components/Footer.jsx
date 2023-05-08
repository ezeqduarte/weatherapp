import React from "react";
import svgs from "./svgs";

export default function Footer() {
  return (
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
  );
}
