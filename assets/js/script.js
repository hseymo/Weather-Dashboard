var APIKey = 'b7940b8b9a395337b92ee1766b299171';
var city;
var date = moment().format('M/DD/YYYY');
var storedArray = [];
var buttonList = $('#buttonlist');
var forecastCardDiv = $('#forecast')

function getLocalStorage() {
    var downloadedPlaces = JSON.parse(localStorage.getItem("places"));
    if (downloadedPlaces !== null) {
        storedArray = downloadedPlaces;
        for (let i = 0; i < storedArray.length; i++) {
            let currentEl = storedArray[i];
            var button = $('<button>');
            button.addClass("col-12 mb-3");
            button.attr('id', currentEl);
            button.text(currentEl);
            buttonList.append(button);
        }
    }
}
getLocalStorage();

$('#search').on("click", function (event) {
    event.preventDefault();
    city = $('#searchbox').val().trim();
    city=city.charAt(0).toUpperCase() + city.slice(1);
    function fetchLatLon() {
        var requestURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=b7940b8b9a395337b92ee1766b299171";
    
        fetch(requestURL)
            .then(function (response) {
                if (!response.ok) {
                alert('Please enter a valid city.');
                throw response.json();
                // empty name from input field
                } 
            return response.json();
            })

            .then(function(data) {
                var latitude = data.coord.lat;
                var longitude = data.coord.lon;

                function fetchForecast() {

                    var forecastRequest = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&exclude=minutely,hourly,alerts&units=imperial&appid=" + APIKey;
                
                    fetch(forecastRequest)
                        .then(function (response) {
                            if (!response.ok) {
                            throw response.json();
                            } 
                        return response.json();
                        })
                        .then(function(data) {
                            // FOR TODAY
                            var currentTemp = data.current.temp + "\xB0 F";
                            var currentWind = data.current.wind_speed + " MPH";
                            var currentHumidity = data.current.humidity + "%";
                            var currentUVI = data.current.uvi;
                            var iconCode = data.current.weather[0].icon;

                            var iconURL = 'https://openweathermap.org/img/wn/' + iconCode + '@2x.png';
                            
                            var icon = $(`<img id="icon" alt="weather icon">`);
                            icon.attr('src', iconURL);
                            var spanIcon = $('<span>');
                            spanIcon.append(icon);

                            var todaysWeather = $('#weatherToday')
                            todaysWeather.children().eq(0).text(city + ' ' + date + ' ');
                            todaysWeather.children().eq(1).text('Temp: ' + currentTemp);
                            todaysWeather.children().eq(2).text('Wind: ' + currentWind);
                            todaysWeather.children().eq(3).text('Humidity: ' + currentHumidity);

                            var UVbox = $('<span>');
                            if (currentUVI < 3) {
                                UVbox.css("background", "green");
                            } else if (3 <= currentUVI < 8) {
                                UVbox.css("background", "yellow");
                            } else {
                                UVbox.css("background", "red");
                            }
                            UVbox.css("color", "white");
                            UVbox.addClass("p-1");
                            UVbox.text(currentUVI);
                            todaysWeather.children().eq(4).text('UV Index: ');
                            todaysWeather.children().eq(4).append(UVbox);
                            todaysWeather.children().eq(0).append(spanIcon);

                            // 5 DAY FORECAST
                            var dailyForecast = data.daily;
                            forecastCardDiv.empty();
                            for (let i = 1; i < 6; i++) {
                                let currentDay = dailyForecast[i];
                                var unix = currentDay.dt;
                                var forecastedDate = moment.unix(unix).format('M/DD/YYYY');
                                var forecastedTemp = currentDay.temp.day  + "\xB0 F";
                                var forecastedWind = currentDay.wind_speed + " MPH";
                                var forecastedHumidity = currentDay.humidity + " %";
                                var forecastedIcon = currentDay.weather[0].icon;

                                var forecastIconURL = 'https://openweathermap.org/img/wn/' + forecastedIcon + '@2x.png';

                                var iconEl = $(`<img id="icon" alt="weather icon">`);
                                iconEl.attr('src', forecastIconURL);

                                console.log(forecastedDate, forecastedTemp, forecastedWind, forecastedHumidity, forecastedIcon)

                                var forecastCard = $('<div>');
                                forecastCard.addClass("card col-md-2 bg-primary text-white p-3");
                                var forecastDate = $('<h5>');
                                forecastDate.text(forecastedDate);
                                var forecastTemp = $('<p>');
                                forecastTemp.text('Temp: ' + forecastedTemp);
                                var forecastWind = $('<p>');
                                forecastWind.text('Wind: ' + forecastedWind);
                                var forecastHumidity = $('<p>');
                                forecastHumidity.text('Humidity: ' + forecastedHumidity);
                                forecastCard.append(forecastDate);
                                forecastCard.append(iconEl)
                                forecastCard.append(forecastTemp);
                                forecastCard.append(forecastWind);
                                forecastCard.append(forecastHumidity);
                                forecastCardDiv.append(forecastCard);
                            }
                            function setLocalStorage() {
                                var storedPlaces = JSON.parse(localStorage.getItem("places"));
                                if (storedPlaces !== null) {
                                    storedArray = storedPlaces;
                                }
                                storedArray.push(city);
                                localStorage.setItem("places", JSON.stringify(storedArray));
                            }
                            setLocalStorage();
                            
                            var button = $('<button>');
                            button.addClass("col-12 mb-3");
                            button.attr('id', city);
                            button.text(city);
                            buttonList.prepend(button);
                        })
                }
                fetchForecast();
            })
    }
    fetchLatLon();
    $('#searchbox').val('');    
})



buttonList.on("click", function (event) {
    var buttonID = event.target.id;
    city = buttonID; 
    function fetchLatLon() {
        var requestURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=b7940b8b9a395337b92ee1766b299171";
    
        fetch(requestURL)
            .then(function (response) {
                if (!response.ok) {
                alert('Please enter a valid city.');
                throw response.json();
                // empty name from input field
                } 
            return response.json();
            })

            .then(function(data) {
                var latitude = data.coord.lat;
                var longitude = data.coord.lon;

                function fetchForecast() {

                    var forecastRequest = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&exclude=minutely,hourly,alerts&units=imperial&appid=" + APIKey;
                
                    fetch(forecastRequest)
                        .then(function (response) {
                            if (!response.ok) {
                            throw response.json();
                            } 
                        return response.json();
                        })
                        .then(function(data) {
                            // FOR TODAY
                            var currentTemp = data.current.temp + "\xB0 F";
                            var currentWind = data.current.wind_speed + " MPH";
                            var currentHumidity = data.current.humidity + "%";
                            var currentUVI = data.current.uvi;
                            var iconCode = data.current.weather[0].icon;

                            var iconURL = 'https://openweathermap.org/img/wn/' + iconCode + '@2x.png';
                            
                            var icon = $(`<img id="icon" alt="weather icon">`);
                            icon.attr('src', iconURL);
                            var spanIcon = $('<span>');
                            spanIcon.append(icon);

                            var todaysWeather = $('#weatherToday')
                            todaysWeather.children().eq(0).text(city + ' ' + date + ' ');
                            todaysWeather.children().eq(1).text('Temp: ' + currentTemp);
                            todaysWeather.children().eq(2).text('Wind: ' + currentWind);
                            todaysWeather.children().eq(3).text('Humidity: ' + currentHumidity);

                            var UVbox = $('<span>');
                            if (currentUVI < 3) {
                                UVbox.css("background", "green");
                            } else if (3 <= currentUVI < 8) {
                                UVbox.css("background", "yellow");
                            } else {
                                UVbox.css("background", "red");
                            }
                            UVbox.css("color", "white");
                            UVbox.addClass("p-1");
                            UVbox.text(currentUVI);
                            todaysWeather.children().eq(4).text('UV Index: ');
                            todaysWeather.children().eq(4).append(UVbox);
                            todaysWeather.children().eq(0).append(spanIcon);

                            // 5 DAY FORECAST
                            var dailyForecast = data.daily;
                            forecastCardDiv.empty();
                            for (let i = 1; i < 6; i++) {
                                let currentDay = dailyForecast[i];
                                var unix = currentDay.dt;
                                var forecastedDate = moment.unix(unix).format('M/DD/YYYY');
                                var forecastedTemp = currentDay.temp.day  + "\xB0 F";
                                var forecastedWind = currentDay.wind_speed + " MPH";
                                var forecastedHumidity = currentDay.humidity + " %";
                                var forecastedIcon = currentDay.weather[0].icon;

                                var forecastIconURL = 'https://openweathermap.org/img/wn/' + forecastedIcon + '@2x.png';

                                var iconEl = $(`<img id="icon" alt="weather icon">`);
                                iconEl.attr('src', forecastIconURL);

                                console.log(forecastedDate, forecastedTemp, forecastedWind, forecastedHumidity, forecastedIcon)

                                var forecastCard = $('<div>');
                                forecastCard.addClass("card col-md-2 bg-primary text-white p-3");
                                var forecastDate = $('<h5>');
                                forecastDate.text(forecastedDate);
                                var forecastTemp = $('<p>');
                                forecastTemp.text('Temp: ' + forecastedTemp);
                                var forecastWind = $('<p>');
                                forecastWind.text('Wind: ' + forecastedWind);
                                var forecastHumidity = $('<p>');
                                forecastHumidity.text('Humidity: ' + forecastedHumidity);
                                forecastCard.append(forecastDate);
                                forecastCard.append(iconEl)
                                forecastCard.append(forecastTemp);
                                forecastCard.append(forecastWind);
                                forecastCard.append(forecastHumidity);
                                forecastCardDiv.append(forecastCard);
                            }
                        })
                }
                fetchForecast();
            })
    }
    fetchLatLon()
})    