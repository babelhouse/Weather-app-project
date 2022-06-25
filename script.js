let now = new Date();

let h3 = document.querySelector("h3");
let hours = now.getHours();
if (hours < 10){
  hours = `0${hours}`;

}
let minutes = now.getMinutes();
if (minutes <10){
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
let day = days[now.getDay()];

h3.innerHTML = `${day} ${hours}:${minutes} `;



function showWeather(response){
document.querySelector("#city").innerHTML=response.data.name;
document.querySelector("#temperature").innerHTML=Math.round(response.data.main.temp);
document.querySelector("#humidity").innerHTML=(response.data.main.humidity)
document.querySelector("#wind").innerHTML=(response.data.wind.speed)


}
function search(event){
  event.preventDefault();
  let apiKey ="5aac6d0188c6f17d6d2bbe6591b6fef0";
  let city = document.querySelector("#search-text").value;
  let apiUrl= `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  console.log(apiUrl)
  axios.get(apiUrl).then(showWeather)
}

let form = document.querySelector("#search-form");

form.addEventListener("submit", search);