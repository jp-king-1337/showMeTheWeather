// Add the API
var weatherKey = "930b816eb4fa5606fcbc2d95d44231f2";
var latitude = 40.0027;
var longitude = -76.3547;
var url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=imperial&appid=${weatherKey}`;

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
var forecastEl = document.getElementById("forecast");



// fetch(url)
//     .then(function (res) {
//         return res.json();
//     })
//     .then(function (weatherData) {
//         console.log("weatherTest: ", weatherData);

//         // Placeholder numbers until I get the whole array of 40 or whatever
//         var forecast = weatherData.list.slice(0, 5);

//         forecast.forEach(function (forecast) {
//             var date = forecastEntry.dt_txt;
//             var icon = forecastEntry.weather[0].icon;
//             var temperature = forecastEntry.main.temp;
//             var windSpeed = forecastEntry.wind.windSpeed;
//             var humidity = forecastEntry.main.humidity;

//             console.log("Date: ", date);
//             console.log("Icon: ", icon);
//             console.log("Temperature: ", temperature);
//             console.log("Wind Speed: ", windSpeed);
//             console.log("Humidity: ", humidity);
//         });
//     })
//     .catch(function (error) {
//         console.log(error);
//     });

// Function to fetch data based on city
function fetchWeatherData(city) {
    fetch(url)
        .then(function (res) {
            return res.json();
        })
        .then(function (weatherData) {
            console.log("weatherData: ", weatherData);

            cityNameEl.innerText = weatherData.name;
            dateEl.innerText = getCurrentDate();
            weatherIconEl.innerHTML = `<img src="https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png" alt="Weather Icon">`;
            temperatureElement.textContent = "Temperature: " + weatherData.main.temp + "°F";
            humidityElement.textContent = "Humidity: " + weatherData.main.humidity + "%";
            windSpeedElement.textContent = "Wind Speed: " + weatherData.wind.speed + " mph";

            fetchForecastData(city);
        })
        .catch(function (error) {
            console.log(error);
        });
}

function fetchForecastData(city) {
    fetch(forecastUrl)
        .then(function (res) {
            return res.json();
        })
        .then(function (forecastData) {
            console.log("forecastData: ", forecastData);

            forecastEl.innerHTML = "";

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

                forecastEl.appendChild(forecastItem);
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




fetchWeatherData();