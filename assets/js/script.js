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



fetch(url)
    .then(function (res) {
        return res.json();
    })
    .then(function (weatherData) {
        console.log("weatherTest: ", weatherData);

        // Placeholder numbers until I get the whole array of 40 or whatever
        var forecast = weatherData.list.slice(0, 5);

        forecast.forEach(function (forecast) {
            var date = forecastEntry.dt_txt;
            var icon = forecastEntry.weather[0].icon;
            var temperature = forecastEntry.main.temp;
            var windSpeed = forecastEntry.wind.windSpeed;
            var humidity = forecastEntry.main.humidity;

            console.log("Date: ", date);
            console.log("Icon: ", icon);
            console.log("Temperature: ", temperature);
            console.log("Wind Speed: ", windSpeed);
            console.log("Humidity: ", humidity);
        });
    })
    .catch(function (error) {
        console.log(error);
    });


