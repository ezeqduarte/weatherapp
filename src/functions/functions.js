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

const functions = {
  getCurrentLocation,
};

export default functions;
