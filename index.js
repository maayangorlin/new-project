function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    hour = `0${minutes}`;
  }
  return `${day}  ${hour}:${minutes}`;
}
function getForcast(coords) {
  console.log(coords);
  let key = "53ae0t876604f4933a8a0b01dac8ofa7";
  let URL = `https://api.shecodes.io/weather/v1/forecast?lon=${coords.lon}&lat=${coords.lat}&key=${key}&units=metric`;
  axios.get(URL).then(displayForcast);
  console.log(URL);
}

function displayWeather(response) {
  console.log(response.data.main.humidity);
  document.querySelector("#h1-city").innerHTML = response.data.name;
  document.querySelector("#number").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  getForcast(response.data.coord);
}

function search(city) {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=7603d86f3c96894827d0fc5a3e8ab90b`;
  axios.get(url).then(displayWeather);
}

function changeCity(event) {
  event.preventDefault();
  let city = document.querySelector("#searchcity").value;
  search(city);
}

function changeFahrenheit(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#number");
  let temperature = tempElement.innerHTML * 1.8 + 32;
  tempElement.innerHTML = Math.round(temperature);
}

function changeCelcius(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#number");
  let temperature = tempElement.innerHTML;
  tempElement.innerHTML = 17;
}
function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentpos);
}

function currentpos(position) {
  console.log(position);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=7603d86f3c96894827d0fc5a3e8ab90b&units=metric`;
  axios.get(url).then(displayWeather);
}

function displayForcast(response) {
  console.log(response);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
  let forcastElement = document.querySelector("#forcast");
  let forcastHTML = `<div class = "row">`;
  days.forEach(function (day) {
    forcastHTML =
      forcastHTML +
      `
  <div class="col-2">
            ${day}
            <div class="weather-img">
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAAdVJREFUaN7tmc1thDAQRimBElwCJVBCSvAxR5fgEiiBEiiBErhyIx24A2cc2WhiAf4ZA1rJkZ4UZZPN9/AwHrON1rr5ZJoqUAWqQBWoAlWgxJf++WaAAGZAAdpD2dfM7zDS/yopAGE6YDoIHMLIdK8KQIAWGIAtQ8Bh/r59bQWQjCBILCkSJIF1XVuAA9Jivm9ROd0ukS0AQTtgA7SH+Vn31EoEBSAMA2YUUAHiJDyWcCtBuidIArZEroJewVEpjQSJjiIgMsMbpHdjf53sCcEWSxEYCQKOyZQhkshZBZYkYEtHeLVPQSGJnHIS0QI2/FIo+L+VILTXOUVA3BD+D3Q/pAqoFIEebUxFQQLJN/Ojo0TEqDG/JgBv1hdgeVNAP4CKPSvkCKiCQc1KSMRs2+x902hO/Z4cYFhgWOQHY8zo9hOKgCCGH71BEXcqHjEBKDft5gowypVH4YeLgKE9ZSO10cxz7z7TFJqxOEUgZxyYbPi+0M4uSRuZPYCnCPBA6TwrYCWWyFbJImo/FTMpM6pAG5CYvDO0LDii7x2JNAtdSGxuQyp41Q87UqkHW8NJzYsbw+8d6Y5Hi+7qbw8IyOIPd9HRVD8qUD8fqAJVoApUgSrwqfwCJ6xaZshM+xMAAAAASUVORK5CYII="
                alt=""
              />
            </div>
            <div class="days-temp">
              &deg;${Math.round(
                response.data.daily[0].temperature.maximum
              )} <span class="min">&deg;${Math.round(
        response.data.daily[0].temperature.minimum
      )}</span>
            </div>
          </div>
    `;
  });

  forcastHTML = forcastHTML + `</div>`;
  forcastElement.innerHTML = forcastHTML;
}

let current = document.querySelector(".date");
current.innerHTML = formatDate(new Date());

let cityForm = document.querySelector("#city");
cityForm.addEventListener("submit", changeCity);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", changeFahrenheit);

let celcius = document.querySelector("#celcius");
celcius.addEventListener("click", changeCelcius);

let locationButton = document.querySelector("#currentLocation");
locationButton.addEventListener("click", currentLocation);

search("Jerusalem");

//displayForcast();
