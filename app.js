const apiKey = '7c96e83ba1a69ea794fe885149842e5c';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&';

const searchBox = document.querySelector('.search-section form input');
const searchBtn = document.querySelector('.search-section form button');
const weatherIcon = document.querySelector('.weather .weather-icon');
const favoriteBtn = document.querySelector('.favorite-button');
const favoriteCity1 = document.querySelector('.favorites .f1');
const favoriteCity2 = document.querySelector('.favorites .f2');
const favoriteCity3 = document.querySelector('.favorites .f3');
let favoriteCities = document.querySelectorAll('.f');
const background = document.querySelector('.body');

//
const successCallback = (position) => {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;

  let local =
    apiUrl + 'lat=' + latitude + '&lon=' + longitude + '&appid=' + apiKey;

  fetch(local)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      document.querySelector('.city').innerHTML = data.name;
      document.querySelector('.temp').innerHTML =
        Math.round(data.main.temp) + '°C';
      document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
      document.querySelector('.wind').innerHTML =
        Math.round(data.wind.speed) + ' km/h';

      if (data.weather[0].main == 'Clouds') {
        weatherIcon.src = 'images/clouds.png';
      } else if (data.weather[0].main == 'Clear') {
        weatherIcon.src = 'images/clear.png';
      } else if (data.weather[0].main == 'Rain') {
        weatherIcon.src = 'images/rain.png';
      } else if (data.weather[0].main == 'Drizzle') {
        weatherIcon.src = 'images/drizzle.png';
      } else if (data.weather[0].main == 'Mist') {
        weatherIcon.src = 'images/mist.png';
      }

      if (data.main.temp <= '10') {
        background.classList.add('cold');
        background.classList.remove('medium');
        background.classList.remove('hot');
        console.log('Sub 10 grade');
      }

      if (data.main.temp > '10' && data.main.temp < '20') {
        background.classList.add('medium');
        background.classList.remove('hot');
        background.classList.remove('cold');
        console.log('Intre 10 si 20 grade');
      }

      if (data.main.temp >= '20') {
        background.classList.add('hot');
        background.classList.remove('medium');
        background.classList.remove('cold');
        console.log('Peste 20 grade');
      }
    });

  console.log(position);

  document.querySelector('.error').style.display = 'none';
};

const errorCallback = (error) => {
  console.log(error);
};

navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
//

async function checkWeather(city) {
  const response = await fetch(apiUrl + 'q=' + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    document.querySelector('.error').style.display = 'block';
    document.querySelector('.weather').style.display = 'none';
  } else {
    const data = await response.json();

    console.log(data);

    document.querySelector('.city').innerHTML = data.name;
    document.querySelector('.temp').innerHTML =
      Math.round(data.main.temp) + '°C';
    document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
    document.querySelector('.wind').innerHTML =
      Math.round(data.wind.speed) + ' km/h';

    if (data.weather[0].main == 'Clouds') {
      weatherIcon.src = 'images/clouds.png';
    } else if (data.weather[0].main == 'Clear') {
      weatherIcon.src = 'images/clear.png';
    } else if (data.weather[0].main == 'Rain') {
      weatherIcon.src = 'images/rain.png';
    } else if (data.weather[0].main == 'Drizzle') {
      weatherIcon.src = 'images/drizzle.png';
    } else if (data.weather[0].main == 'Mist') {
      weatherIcon.src = 'images/mist.png';
    }

    if (data.main.temp <= '10') {
      background.classList.add('cold');
      background.classList.remove('medium');
      background.classList.remove('hot');
      console.log('Sub 10 grade');
    }

    if (data.main.temp > '10' && data.main.temp < '20') {
      background.classList.add('medium');
      background.classList.remove('hot');
      background.classList.remove('cold');
      console.log('Intre 10 si 20 grade');
    }

    if (data.main.temp >= '20') {
      background.classList.add('hot');
      background.classList.remove('medium');
      background.classList.remove('cold');
      console.log('Peste 20 grade');
    }

    document.querySelector('.error').style.display = 'none';
    document.querySelector('.weather').style.display = 'flex';
  }
}

searchBtn.addEventListener('click', (event) => {
  event.preventDefault();
  checkWeather(searchBox.value);
});

let index = -1;

function favoriteList() {
  const favCities = [favoriteCity1, favoriteCity2, favoriteCity3];

  index = (index + 1) % favCities.length;

  favoriteCities[index].innerHTML = searchBox.value;

  if (searchBox.value == '') {
    favoriteCities[index].innerHTML = 'Empty';
  }
}

favoriteBtn.addEventListener('click', favoriteList);

for (let i = 0; i < favoriteCities.length; i++) {
  // console.log(favoriteCities[i].innerHTML);

  favoriteCities[i].addEventListener('click', () => {
    checkWeather(favoriteCities[i].innerHTML);
  });
}
