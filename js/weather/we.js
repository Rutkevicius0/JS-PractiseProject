"use stict";
import { appId } from "./vars.js";
const citySelect = document.querySelector("#city");

citySelect.addEventListener("change", (event) => {
  event.preventDefault();
  let city = citySelect.value;

  return city;
});
console.log(city);
// citySelect.addEventListener(
//   "change",
//   function (event) {
//     console.log(event.value);
//     let result = event.returnValue;
//     return result;
//   },
//   false
// );

const url = "/js/weather/sample.json";
let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${appId}`;

const weatherEl = document.querySelector("#weather");
async function getWeatherData() {
  const resp = await fetch(url);
  const data = await resp.json();
  return data;
}

getWeatherData()
  .then((data) => drawWeather(data))
  .catch((err) => console.log(err));

function drawWeather(data) {
  console.log(data);
  const { main, name, wind, weather, sys } = data;
  const weatherDiv = document.createElement("div");
  weatherDiv.className = "weather-box";
  weatherDiv.innerHTML = `<h3 class="location">Location: ${name}</h3>
  <h4 class="temperature">Temperature: ${main.temp} °C</h4>
  <ul class="other__list">
  <li class="list-item .condition">Condition:<img src="http://openweathermap.org/img/wn/${
    weather[0].icon
  }@2x.png" alt""> ${weather[0].description}</li>
    <li class="list-item">Feels like: ${main.feels_like} °C</li>

    <li class="list-item">Temperature low: ${main.temp_min} °C, high: ${
    main.temp_max
  } °C</li>
    <li class="list-item">Wind speed: ${wind.speed} m/s</li>
    <li class="list-item">Sunrise: ${convertTime(
      sys.sunrise
    )} Sunset: ${convertTime(sys.sunset)} </li>
  </ul>`;
  weatherEl.append(weatherDiv);
}

function convertTime(timeStamp) {
  let date = new Date(timeStamp * 1000);
  let hours = date.getHours();
  let minutes = "0" + date.getMinutes();
  var formattedTime = hours + ":" + minutes.substr(-2);

  return formattedTime;
}
