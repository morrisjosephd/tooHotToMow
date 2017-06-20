const config = require('./dev-env');

module.exports = function getCurrentWeather() {
  console.log(config.darkSkyApi);
}();