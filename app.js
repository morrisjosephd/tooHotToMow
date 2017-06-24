const request = require('request');
let {darkSkyUrl, darkSkyApi} = require('./dev-env');

let lat = '39.866873';
let lng = '-73.989308';

request(buildRequest(), (err, res, body) => {
  let weather = JSON.parse(body);

  console.log(getDownPoint(weather));
  console.log(futureHourlyDewpoint(weather));
});


function buildRequest() {
  return `${darkSkyUrl}/${darkSkyApi}/${lat},${lng}`;
}

function getDownPoint(weather) {
  return weather.currently.dewPoint;
}

function futureHourlyDewpoint(weather) {
  let futureDewpoints = {};
  futureDewpoints.aggregateData= {};
  futureDewpoints.aggregateData.temperature = 0;
  futureDewpoints.aggregateData.dewPoint = 0;
  futureDewpoints.hourlyData = [];

  weather.hourly.data.forEach((dataPoint, i) => {
    let data = {};
    let temperature = dataPoint.temperature;
    let dewPoint = dataPoint.dewPoint;

    data.hour = i;
    data.temperature = temperature;
    data.dewPoint = dewPoint;

    futureDewpoints.aggregateData.temperature += temperature;
    futureDewpoints.aggregateData.dewPoint += dewPoint;
    futureDewpoints.hourlyData.push(data);
  });

  return futureDewpoints;
}
