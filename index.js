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
    minutes = `0${minutes}`;
  }
  console.log(date.getHours());
  console.log(date.getMinutes());
  return `${day}  ${hour}:${minutes}`;
}
function getForcast(coords) {
  let key = "53ae0t876604f4933a8a0b01dac8ofa7";
  let URL = `https://api.shecodes.io/weather/v1/forecast?lon=${coords.longitude}&lat=${coords.latitude}&key=${key}&units=metric`;
  axios.get(URL).then(displayForcast);
}

function displayWeather(response) {
  console.log(response);
  document.querySelector("#h1-city").innerHTML = response.data.city;
  document.querySelector("#number").innerHTML = Math.round(
    response.data.temperature.current
  );
  document.querySelector("#humidity").innerHTML =
    response.data.temperature.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  let image = `
    <span class="weather-img">
      <img
        src="${response.data.condition.icon_url}"
        alt=
        width="80"
      />
    </span>
`;
  document.querySelector("#today-weather-img").innerHTML = image;
  document.querySelector("#description").innerHTML =
    response.data.condition.description;
  getForcast(response.data.coordinates);
}

function search(city) {
  let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=53ae0t876604f4933a8a0b01dac8ofa7`;
  axios.get(url).then(displayWeather);
}

function changeCity(event) {
  event.preventDefault();
  let city = document.querySelector("#searchcity").value;
  search(city);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentpos);
}

function currentpos(position) {
  console.log(position);
  let key = "53ae0t876604f4933a8a0b01dac8ofa7";
  let url = `https://api.shecodes.io/weather/v1/current?lon=${position.coords.longitude}&lat=${position.coords.latitude}&key=${key}&units=metric`;

  axios.get(url).then(displayWeather);
  getForcast(position.coords);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForcast(response) {
  let forcast = response.data.daily;
  let forcastElement = document.querySelector("#forcast");
  let forcastHTML = `<div class = "row">`;
  forcast.forEach(function (day, index) {
    if (index < 6) {
      forcastHTML += `
  <div class="col-2">

            <div class = "weather-forecast-date"> ${formatDay(day.time)}</div>
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

let locationButton = document.querySelector("#currentLocation");
locationButton.addEventListener("click", currentLocation);

search("Jerusalem");
