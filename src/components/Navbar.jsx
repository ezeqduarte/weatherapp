export function NavBar({ location }) {
  return (
    <div className="flex justify-between bg-blue-200 absolute top-0 left-0 px-2 w-full bg-gray-100">
      <div className="flex items-center justify-center gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon icon-tabler icon-tabler-clock"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="#2c3e50"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <circle cx="12" cy="12" r="9" />
          <polyline points="12 7 12 12 15 15" />
        </svg>
        <p className="text-gray-400 font-semibold">
          {location.localtime.slice(11, 16)}
        </p>
      </div>
      <div className="flex items-center justify-center ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon rotate-[270deg]  icon-tabler icon-tabler-battery-3"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="#2c3e50"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M6 7h11a2 2 0 0 1 2 2v.5a0.5 .5 0 0 0 .5 .5a0.5 .5 0 0 1 .5 .5v3a0.5 .5 0 0 1 -.5 .5a0.5 .5 0 0 0 -.5 .5v.5a2 2 0 0 1 -2 2h-11a2 2 0 0 1 -2 -2v-6a2 2 0 0 1 2 -2" />
          <line x1="7" y1="10" x2="7" y2="14" />
          <line x1="10" y1="10" x2="10" y2="14" />
          <line x1="13" y1="10" x2="13" y2="14" />
        </svg>
        <p className="text-gray-400 font-semibold">72%</p>
      </div>
    </div>
  );
}
