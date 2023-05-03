const getCurrentLocation = (setLatitude, setLongitude) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
};

function getDay(date) {
    const diasDeLaSemana = [
      "domingo",
      "lunes",
      "martes",
      "miércoles",
      "jueves",
      "viernes",
      "sábado",
    ];
    const newDate = new Date(date);
    const dia = newDate.getDay();
    return diasDeLaSemana[dia].slice(0,3);
  }

const functions = {
  getCurrentLocation, getDay
};

export default functions;
