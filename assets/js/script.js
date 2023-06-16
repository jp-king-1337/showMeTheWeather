// Add the API
var weatherKey = "930b816eb4fa5606fcbc2d95d44231f2";
var latitude = 40.0027;
var longitude = -76.3547;
var url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=imperial&appid=${weatherKey}`;


fetch(url)
    .then(function (weatherData) {
        console.log("weatherTest: ", weatherData);

        // Placeholder numbers until I get the whole array of 40 or whatever
        var forecast = weatherData.list.slice(0, 5);

        forecast.forEach(function (forecast)) {
            var date = forecastEntry.dt_txt;
            var icon = forecastEntry.weather[0].icon;
            var temperature = forecast.main.temp;
            var windSpeed = forecastEntry.wind.windSpeed;
            var humidity = forecastEntry.main.humidity;

            console.log("Date: ", date);
            console.log("icon: ", icon);
            console.log("temperature: ", temperature);
            console.log("windSpeed: ", windSpeed);
            console.log("humidity: ", humidity);
        }



    });
