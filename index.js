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
  let key = "53ae0t876604f4933a8a0b01dac8ofa7";
  let URL = `https://api.shecodes.io/weather/v1/forecast?lon=${coords.lon}&lat=${coords.lat}&key=${key}&units=metric`;
  axios.get(URL).then(displayForcast);
}

function displayWeather(response) {
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

function formatDay(timestamp) {
  console.log(timestamp);
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForcast(response) {
  console.log(response.data.daily);
  let forcast = response.data.daily;
  let forcastElement = document.querySelector("#forcast");
  let forcastHTML = `<div class = "row">`;
  forcast.forEach(function (day, index) {
    console.log(day);
    if (index < 6) {
      forcastHTML += `
  <div class="col-2">
            ${formatDay(day.time)}
            <div class="weather-img">
              <img
                src=${day.condition.icon_url}
                alt=""
                width=60
              />
            </div>
            <div class="days-temp">
              &deg;${Math.round(
                day.temperature.maximum
              )} <span class="min">&deg;${Math.round(
        day.temperature.minimum
      )}</span>
            </div>
          </div>
    `;
    }
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
