// Add the API
var weatherKey = "930b816eb4fa5606fcbc2d95d44231f2";
var latitude = "";
var longitude = "";
var url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=imperial&appid=${weatherKey}`;


fetch(url)
    .then(weatherData)