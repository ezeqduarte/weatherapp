import svgs from "./svgs";

export function NavBar({ location }) {
  return (
    <div className="flex justify-between bg-blue-200 absolute top-0 left-0 px-2 w-full bg-gray-100">
      <div className="flex items-center justify-center gap-1">
        {svgs.clockSvg}

        <p className="text-gray-400 font-semibold">
          {location.localtime.slice(11, 16)}
        </p>
      </div>
      <div className="flex items-center justify-center ">
        {svgs.batterySvg}
        <p className="text-gray-400 font-semibold">72%</p>
      </div>
    </div>
  );
}
