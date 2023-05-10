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
function displayWeather(response) {
  console.log(response.data.main.humidity);
  console.log(response.data.weather[0].main);
  document.querySelector("#h1-city").innerHTML = response.data.name;
  document.querySelector("#number").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
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

let current = document.querySelector(".date");
current.innerHTML = formatDate(new Date());

let cityForm = document.querySelector("#city");
cityForm.addEventListener("submit", changeCity);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", changeFahrenheit);

let celcius = document.querySelector("#celcius");
celcius.addEventListener("click", changeCelcius);

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

let locationButton = document.querySelector("#currentLocation");
locationButton.addEventListener("click", currentLocation);

search("Jerusalem");
