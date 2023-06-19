// Add the API
var weatherKey = "930b816eb4fa5606fcbc2d95d44231f2";
var url;
var forecastUrl;

// Variables for necessary elements
var searchForm = document.getElementById("searchForm");
var cityInput = document.getElementById("cityInput");
var cityNameEl = document.getElementById("cityName");
var dateEl = document.getElementById("date");
var weatherIconEl = document.getElementById("weatherIcon");
var temperatureEl = document.getElementById("temperature");
var humidityEl = document.getElementById("humidity");
var windSpeedEl = document.getElementById("windSpeed");
// Also container to hold forecast
var forecastContainerEl = document.getElementById("forecastContainer");

// Need the searchHistory to be an array
var searchHistoryArray = [];

// In order to use it in localStorage
var savedSearchHistory = localStorage.getItem("searchHistoryArray");
if (savedSearchHistory) {
    searchHistoryArray = JSON.parse(savedSearchHistory);
    displaySearchHistory();
}



searchForm.addEventListener("submit", formSubmit);


function getCurrentDate() {
    return dayjs().format("DD/MM/YYYY");
}


function fetchWeatherData(city) {
    var weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${weatherKey}`;

    fetch(weatherUrl)
        .then(function (res) {
            return res.json();
        })
        .then(function (weatherData) {
            console.log("weatherData: ", weatherData);

            // Clear currentWeather section
            cityNameEl.innerText = "";
            dateEl.innerText = "";
            weatherIconEl.innerHTML = "";
            temperatureEl.textContent = "";
            humidityEl.textContent = "";
            windSpeedEl.textContent = "";

            // Rewrite it
            cityNameEl.innerText = weatherData.name;
            dateEl.innerText = getCurrentDate();
            weatherIconEl.innerHTML = `<img src="https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png" alt="Weather Icon">`;
            temperatureEl.textContent = "Temperature: " + weatherData.main.temp + "°F";
            humidityEl.textContent = "Humidity: " + weatherData.main.humidity + "%";
            windSpeedEl.textContent = "Wind Speed: " + weatherData.wind.speed + " mph";

            forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${weatherKey}`;

            fetchForecastData(forecastUrl);
            addToSearchHistory(city);
        })
        .catch(function (error) {
            console.log(error);
        });
}


function addToSearchHistory(city) {
    if (!searchHistoryArray.includes(city)) {
        searchHistoryArray.push(city);
        localStorage.setItem("searchHistoryArray", JSON.stringify(searchHistoryArray));
        displaySearchHistory();
    }

    localStorage.setItem("searchHistoryArray", JSON.stringify(searchHistoryArray));
}


function fetchForecastData(city) {
    fetch(forecastUrl)
        .then(function (res) {
            return res.json();
        })
        .then(function (forecastData) {
            console.log("forecastData: ", forecastData);

            forecastContainerEl.innerHTML = "";

            var forecastEntries = forecastData.list.slice(0, 5);
            forecastEntries.forEach(function (forecastEntry) {
                var forecastDate = forecastEntry.dt_txt;
                var forecastIcon = forecastEntry.weather[0].icon;
                var forecastTemperature = forecastEntry.main.temp;
                var forecastWindSpeed = forecastEntry.wind.speed;
                var forecastHumidity = forecastEntry.main.humidity;

                var forecastItem = document.createElement("div");
                forecastItem.className = "forecast-item";
                forecastItem.innerHTML = `
                    <div>Date: ${forecastDate}</div>
                    <div><img src="https://openweathermap.org/img/w/${forecastIcon}.png" alt="Weather Icon"></div>
                    <div>Temperature: ${forecastTemperature}°F</div>
                    <div>Wind Speed: ${forecastWindSpeed} mph</div>
                    <div>Humidity: ${forecastHumidity}%</div>`;

                forecastContainerEl.appendChild(forecastItem);
            });
        })
        .catch(function (error) {
            console.log(error);
        });
}


function formSubmit(event) {
    event.preventDefault();
    var city = cityInput.value.trim();

    if (city !== "") {
        fetchWeatherData(city);
    }
}


function displaySearchHistory() {
    var searchHistoryEl = document.getElementById("searchHistory");
    searchHistoryEl.innerHTML = "";

    // Make HTML elements for the previous cities
    for (var i = 0; i < searchHistoryArray.length; i++) {
        var city = searchHistoryArray[i];
        var cityItem = document.createElement("div");
        cityItem.innerText = city;
        cityItem.classList.add("city-item");
        cityItem.addEventListener("click", function () {
            fetchWeatherData(this.innerText);
        });
        searchHistoryEl.appendChild(cityItem);
    }
}

