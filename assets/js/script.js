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


function fetchForecastData(url) {
    fetch(url)
        .then(function (res) {
            return res.json();
        })
        .then(function (forecastData) {
            console.log("forecastData: ", forecastData);

            forecastContainerEl.innerHTML = "";

            var forecastEntries = forecastData.list.slice(0, 5);
            // var filteredForecastsByNoon = forecastEntries.filter(function (forecastEntry) {
            //     return forecastEntry.dt_txt.includes("12:00:00")
            // });

            var nextFiveDays = [];

            for (var i = 0; i < forecastEntries.length; i += 8) {
                var forecastEntry = forecastEntries[i];
                var forecastTime = forecastEntry.dt_txt.split(" ")[1];

                if (forecastTime === "12:00:00") {
                    var forecastItem = {
                        date: dayjs(forecastEntry.dt_txt).format("DD/MM/YYYY"),
                        icon: forecastEntry.weather[0].icon,
                        temperature: forecastEntry.main.temp,
                        windSpeed: forecastEntry.wind.speed,
                        humidity: forecastEntry.main.humidity
                    };
                    nextFiveDays.push(forecastItem);
                }
            }

            // filteredForecastsByNoon.slice(0, 5).map(function (forecastEntry) {
            //     return {
            //         date: dayjs(forecastEntry.dt_txt).format("DD/MM/YYYY"),
            //         icon: forecastEntry.weather[0].icon,
            //         temperature: forecastEntry.main.temp,
            //         windSpeed: forecastEntry.wind.speed,
            //         humidity: forecastEntry.main.humidity
            //     };
            // });

            nextFiveDays.forEach(function (forecastEntry) {
                // var forecastDate = dayjs(forecastEntry.dt_txt).format("DD/MM/YYYY");
                // var forecastIcon = forecastEntry.weather[0].icon;
                // var forecastTemperature = forecastEntry.main.temp;
                // var forecastWindSpeed = forecastEntry.wind.speed;
                // var forecastHumidity = forecastEntry.main.humidity;

                var forecastItem = document.createElement("div");
                forecastItem.className = "forecast-item";
                forecastItem.innerHTML = `
                    <div>Date: ${forecastEntry.date}</div>
                    <div><img src="https://openweathermap.org/img/w/${forecastEntry.icon}.png" alt="Weather Icon"></div>
                    <div>Temperature: ${forecastEntry.temperature}°F</div>
                    <div>Wind Speed: ${forecastEntry.windSpeed} mph</div>
                    <div>Humidity: ${forecastEntry.humidity}%</div>`;

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

