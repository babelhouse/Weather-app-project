function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function displayTempreture(response) { 

  let temperatureElement =  document.querySelector("#temperature")
  let cityElement =document.querySelector("#city")
  let desciptionElement = document.querySelector("#description")
  let humidityElement = document.querySelector("#humidity")
  let windElement =document.querySelector("#wind")
  let dateElement =document.querySelector("#date")
  let iconElement = document.querySelector("#icon")

  celsiusTemperature =response.data.main.temp;


  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  desciptionElement.innerHTML =response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
iconElement.setAttribute ("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
iconElement.setAttribute ("alt", response.data.weather[0].description);
}

function search(city){
  let apiKey = "5aac6d0188c6f17d6d2bbe6591b6fef0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTempreture);
}


function manageSubmit(event){
  event.preventDefault();
  let cityElement = document.querySelector("#find-city")
  search(cityElement.value)
}

function displayFahrenheitTemp(event){
event.preventDefault();
let temperatureElement = document.querySelector("#temperature");
let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemp(event){
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature")
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}


let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", manageSubmit);

let fahrenheitlink = document.querySelector("#fahrenheit-link")
fahrenheitlink.addEventListener("click", displayFahrenheitTemp);

let celsiuslink = document.querySelector("#celsius-link")
celsiuslink.addEventListener("click", displayCelsiusTemp);

search("New York");