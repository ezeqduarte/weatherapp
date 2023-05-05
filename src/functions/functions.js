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
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
    "Lunes",
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

function getConditionsSem(actuallyHour, forecastArray) {
  let arrayOfConditions = forecastArray[0].hour.slice(
    actuallyHour,
    Number(actuallyHour) + 13
  );

  if (arrayOfConditions.length < 13) {
    arrayOfConditions = [
      ...arrayOfConditions,
      ...forecastArray[1].hour.slice(0, 13 - arrayOfConditions.length),
    ];
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
