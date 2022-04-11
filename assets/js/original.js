var APIKey = 'b7940b8b9a395337b92ee1766b299171';
var city;
var date = moment().format('M/DD/YYYY');
console.log(date)
var storedArray = [];
var buttonList = $('#buttonlist');

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
    city = $('#searchbox').val();
    console.log(city)
    function fetchWeather() {

        var requestURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=b7940b8b9a395337b92ee1766b299171";
    
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
                console.log(data)
                var place = data.name;
                var latitude = data.coord.lat;
                var longitude = data.coord.lon;
                var id = data.id;
                var temperature = data.main.temp + "\xB0 Fahrenheit";
                var wind = data.wind.speed + "mph";
                var humidity = data.main.humidity + "%";
                // var UV = data.uv;
                var icon = data.weather[0].icon;
                console.log(place, latitude, longitude, id) 
                console.log(temperature, wind, humidity, icon)
                var iconURL = 'http://openweathermap.org/img/wn/' + icon + '@2x.png';
                console.log(iconURL);
                var weatherIcon = $(`<span><img id="weatherIcon src="" alt="weather icon"></span>`);
                weatherIcon.attr('src', iconURL);
    
                var todaysWeather = $('#weatherToday')
                todaysWeather.children().eq(0).text(place + ' ' + date + ' ');
                todaysWeather.children().eq(1).text('Temp: ' + temperature);
                todaysWeather.children().eq(2).text('Wind: ' + wind);
                todaysWeather.children().eq(3).text('Humidity: ' + humidity);
                todaysWeather.children().eq(4).text('UV Index: ' + 'TBD');
                todaysWeather.children().eq(0).append(weatherIcon);

                var button = $('<button>');
                button.addClass("col-12 mb-3");
                button.attr('id', place);
                button.text(place);
                buttonList.prepend(button);

                function fetchForecast() {

                    var forecastRequest = "http://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&exclude=minutely,hourly,alerts&units=imperial&appid=" + APIKey;
                    console.log(forecastRequest)
                
                    fetch(forecastRequest)
                        .then(function (response) {
                            if (!response.ok) {
                            throw response.json();
                            } 
                        return response.json();
                        })
                        .then(function(data) {
                            console.log(data);
                
                
                        })
                    }
                
                fetchForecast();

                setLocalStorage();
            })
    }
    fetchWeather();

    function setLocalStorage() {
        var storedPlaces = JSON.parse(localStorage.getItem("places"));
        if (storedPlaces !== null) {
            storedArray = storedPlaces;
        }
        storedArray.push(city);
        localStorage.setItem("places", JSON.stringify(storedArray));
    }
})



buttonList.on("click", function (event) {
    var buttonID = event.target.id;
    city = buttonID;

    function fetchWeather() {

        var requestURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=b7940b8b9a395337b92ee1766b299171";
    
        fetch(requestURL)
            .then(function (response) {
                if (!response.ok) {
                throw response.json();
            }
            return response.json();
            })
            .then(function(data) {
                console.log(data)
                var place = data.name;
                var latitude = data.coord.lat;
                var longitude = data.coord.lon;
                var id = data.id;
                var temperature = data.main.temp + "\xB0 Fahrenheit";
                var wind = data.wind.speed + "mph";
                var humidity = data.main.humidity + "%";
                // var UV = data.uv;
                var icon = data.weather[0].icon;
                console.log(place, latitude, longitude, id) 
                console.log(temperature, wind, humidity, icon)
                var iconURL = 'http://openweathermap.org/img/wn/' + icon + '@2x.png';
                console.log(iconURL);
                var weatherIcon = $(`<span><img id="weatherIcon src="" alt="weather icon"></span>`);
                weatherIcon.attr('src', iconURL);
    
                var todaysWeather = $('#weatherToday')
                todaysWeather.children().eq(0).text(place + ' ' + date + ' ');
                todaysWeather.children().eq(1).text('Temp: ' + temperature);
                todaysWeather.children().eq(2).text('Wind: ' + wind);
                todaysWeather.children().eq(3).text('Humidity: ' + humidity);
                todaysWeather.children().eq(4).text('UV Index: ' + 'TBD');
                todaysWeather.children().eq(0).append(weatherIcon);

            })
    
    
        }
    fetchWeather();    
})