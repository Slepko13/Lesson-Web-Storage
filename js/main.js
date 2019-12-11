document.addEventListener("DOMContentLoaded", refreshWeather);

function refreshWeather() {
    let cities = ["London", "Kyiv", "Paris",
        "Madrid", "Rome", "Amsterdam",
        "Lviv", "Berlin", "Tokyo", "Pekin", "Ivano-Frankivsk"
    ];
    cities.forEach(city => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2a73a6a9ca12442dd9df3f07c7a5a95b`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                let temp = data.main.temp - 273.15;
                let weather = data.weather[0].icon;
                document.getElementById(city).innerHTML = `${temp.toFixed(1)} &deg;C 
            <img src = "http://openweathermap.org/img/wn/${weather}.png">`;
                console.log(data);

            })
            .catch(error => console.log(error));
    });


}