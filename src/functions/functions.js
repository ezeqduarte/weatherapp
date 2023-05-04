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
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];
  const newDate = new Date(date);
  const dia = newDate.getDay();
  return diasDeLaSemana[dia];
}

function getMonth(month) {
  const mesesDelAño = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  if (month < 10) {
    month = month.slice(1);
  }
  return mesesDelAño[month - 1];
}

function getInfoHours(hour) {
  if (0 <= hour && hour < 12) {
    return `${hour} AM`;
  }
  if (12 <= hour && hour < 24) {
    return `${hour} PM`;
  }
}

function getConditionsSem(actuallyHour, array) {
  const arrayOfConditions = array[0].hour.filter(
    (hours, index) => index >= actuallyHour
  );

  if (arrayOfConditions.length < 12) {
    array[1].hour.map((hour) => {
      if (arrayOfConditions.length < 12) {
        arrayOfConditions.push(hour);
      }
    });
  }

  console.log(arrayOfConditions);

  return arrayOfConditions;
}

const functions = {
  getCurrentLocation,
  getDay,
  getMonth,
  getInfoHours,
  getConditionsSem,
};

export default functions;
