const storedLocation = JSON.parse(localStorage.getItem('weather'));
const display = document.querySelector('.display');
const wrap = document.querySelector('#main');
let searchbox = document.querySelector('.search-box');
let city = document.querySelector('.location .city');
let now = new Date();
let date = document.querySelector('.location .date');
let temp = document.querySelector('.current .temp');
let weather_el = document.querySelector('.current .weather');
let hilow = document.querySelector('.hi-low');
display.style.display = 'none'

const api = {
  key: "ce05ee68f6819ed1b166158de1382127",
  base: "https://api.openweathermap.org/data/2.5/"
}

searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }
}

function getResults(query) {
  if (!query) {
    display.style.display = 'block'

    display.textContent = 'You must enter address in search box ';
    wrap.style.display = 'none';
    return;
  }
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
      return weather.json();
    }).then(displayResults)
}


let cityCountry, todayDate, cityTemp, elem, hilo;
function displayResults(weather) {
  console.log(weather);
  if (!weather.name) {
    display.style.display = 'block'

    display.textContent = 'Invalid city name,could not fetch weather Info';
    wrap.style.display = 'none';
    return;
  } else {
    wrap.style.display = 'block';
    display.style.display = 'none'


    cityCountry = `${weather.name}, ${weather.sys.country}`;
    city.innerText = cityCountry;

    todayDate = dateBuilder(now);
    date.innerText = todayDate

    cityTemp = `${Math.round(weather.main.temp)}<span>°c</span>`;
    temp.innerHTML = cityTemp

    elem = weather.weather[0].main;
    weather_el.innerText = elem;

    hilo = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
    hilow.innerText = hilo

    let storageObj = {
      city: weather.name,
      country: `${weather.name}, ${weather.sys.country}`,
      date: todayDate,
      temp: cityTemp,
      weather: weather.weather[0].main,
      hilo: `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`,
    }
    const storageJson = JSON.stringify(storageObj);
    localStorage.setItem('weather', storageJson);
  }


}

function dateBuilder(d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}

if (storedLocation) {
  console.log(storedLocation);

  searchbox.value = storedLocation.city;
  city.innerText = storedLocation.country;
  date.innerText = storedLocation.date;
  temp.innerHTML = storedLocation.temp;
  weather_el.innerText = storedLocation.weather;
  hilow.innerText = storedLocation.hilo;

}
