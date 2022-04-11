var APIKey = 'b7940b8b9a395337b92ee1766b299171';
var city;
var date = moment().format('M/DD/YYYY');
console.log(date)

$('#search').on("click", function (event) {
    event.preventDefault();
    city = $('#searchbox').val();
    console.log(city)

    var requestURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIKey;

    function fetchData() {
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
    fetchData();
})

// 5 day 
// var requestURL = "http://api.openweathermap.org/data/2.5/forecast/daily?id=" + id + "&units=imperial&cnt=5&appid=" + APIKey;

// var requestURL = 'http://api.openweathermap.org/data/2.5/forecast/daily?lat=' + latitude + '&lon=' + longitude + '&cnt=5&appid=' + APIKey;

// var requestURL = 'http://api.openweathermap.org/data/2.5/forecast/daily?q=' + place + '&cnt=5&appid=' + APIKey;

