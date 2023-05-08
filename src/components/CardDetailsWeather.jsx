import React from "react";

export default function CardDetailsWeather({ svg, current, text }) {
  return (
    <div className="py-2 rounded mx-1 gap-1 bg-white flex items-center justify-center w-full">
      {svg}
      <p className=" font-semibold text-xl">
        {current} {text}
      </p>
    </div>
  );
}
