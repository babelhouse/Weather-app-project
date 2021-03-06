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

function formatDay(timestamp){
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days =["Mon", "Tues", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return days[day]
}


function displayForecast(response){
 
  let forecast = response.data.daily;
  let forecastElement=document.querySelector ("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function(forecastDay, index){
if(index < 6){
  
  forecastHTML = forecastHTML +`
 
  <div class="col-2">
    <div class="weather-forecast-date">
    ${formatDay(forecastDay.dt)}
  </div>
    <img src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" 
    alt="" 
    width="42"
    />
    <div class="weather-forecast-temperatures">
      <span class="weather-forecast-temperature-max">${Math.round(forecastDay.temp.max)}°</span> 
      <span class="weather-forecast-temperature-min">${Math.round(forecastDay.temp.min)}°</span>
    </div>
    
  </div>
`;}
})
forecastHTML = forecastHTML + `</div>`
forecastElement.innerHTML=forecastHTML;
}
function getforecast(coordinates){

  let apiKey="5aac6d0188c6f17d6d2bbe6591b6fef0";
  let apiUrl=`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast)
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

getforecast(response.data.coord);
}

function search(city){
  let apiKey = "5aac6d0188c6f17d6d2bbe6591b6fef0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTempreture);
}

function searchLocation(position) {
  let apiKey = "5aac6d0188c6f17d6d2bbe6591b6fef0";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTempreture);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", getCurrentLocation);


function manageSubmit(event){
  event.preventDefault();
  let cityElement = document.querySelector("#find-city")
  search(cityElement.value)
}

function displayFahrenheitTemp(event){
event.preventDefault();
let temperatureElement = document.querySelector("#temperature");

celsiuslink.classList.remove("active")
fahrenheitlink.classList.add("active")
let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemp(event){
  event.preventDefault();

  celsiuslink.classList.add("active")
  fahrenheitlink.classList.remove("active")
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