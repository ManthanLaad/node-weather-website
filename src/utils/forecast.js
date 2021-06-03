const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.weatherapi.com/v1/forecast.json?key=335cbff63711438b86a142017210206&q=${encodeURIComponent(
    latitude
  )},${encodeURIComponent(longitude)}&days=2`;
  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback(`Unable to connect to weather services.`);
    } else if (body.error) {
      callback(`No matching location found.`);
    } else {
      callback(
        undefined,
        `It is currently ${body.current.temp_c}°C in ${body.location.name}, it feels like ${body.current.feelslike_c}°C .The weather is ${body.current.condition.text}. `
      );
    }
  });
};

module.exports = forecast;
