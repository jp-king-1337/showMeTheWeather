// Add the API
var weatherKey = "930b816eb4fa5606fcbc2d95d44231f2";
var latitude = 40.0027;
var longitude = -76.3547;
var url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=imperial&appid=${weatherKey}`;


fetch(url)
    .then(function(weatherData) {
        console.log("weatherTest: ", weatherData);


    })