import functions from "@/functions/functions";

const { getDay, getMonth } = functions;

export default function Header({ location, current }) {
  return (
    <header className="w-100 mt-5 text-end bg-white pt-5 mb-5">
      <h1 className="text-5xl font-bold truncate">{location.name}</h1>
      <span className="text-3xl truncate font-thin italic font-bold">
        {location.region}, {location.country}
      </span>
      <p className="truncate font-thin font-bold">
        Last updated:
        {` `}
        {getDay(current.is_day)} {current.last_updated.slice(8, 10)} de {``}
        {getMonth(current.last_updated.slice(5, 7))}
        {current.last_updated.slice(10, 16)}
      </p>
    </header>
  );
}
