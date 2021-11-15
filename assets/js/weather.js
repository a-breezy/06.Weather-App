// api key = 38385dcf555e3ea5e07855383fd6123c
var apiKey = "38385dcf555e3ea5e07855383fd6123c";
// placeholder for searching city/zipcode
var locationInputEl = document.querySelector("#searchCity");

var results = document.querySelector("#results");

// get lat and lon from searching a location
var storeCurrentWeather = function (city) {
  var apiURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    apiKey;

  console.log(apiURL);
  fetch(apiURL).then(function (responses) {
    if (responses.ok) {
      responses.json().then(function (data) {
        DisplayWeather(data.coord.lat, data.coord.lon, city);
      });
    } else {
      console.log("error");
    }
  });
};

// display the weather
function DisplayWeather(lat, lon, city) {
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/onecall?units=imperial&lat=" +
    lat +
    "&lon=" +
    lon +
    "&appid=" +
    apiKey;

  fetch(apiUrl).then(function (responses) {
    if (responses.ok) {
      responses.json().then(function (data) {
        console.log("API data: ", data);
        $("#results").html("");
        todaysWeather(data.current, city);
        fiveDayWeather(data.daily);
      });
    } else {
      console.log("error");
    }
  });
}

// function to call today's weather
function todaysWeather(data, city) {
  var createParentDiv = document.createElement("div");
  createParentDiv.className = "border border-dark";
  results.appendChild(createParentDiv);

  var addCity = document.createElement("h3");
  addCity.textContent = city;
  createParentDiv.appendChild(addCity);

  var addTemp = document.createElement("p");
  addTemp.textContent = "Temperature: " + data.temp + " F";
  createParentDiv.appendChild(addTemp);

  var addWind = document.createElement("p");
  addWind.textContent = "Wind Speed: " + data.wind_speed + " mph";
  createParentDiv.appendChild(addWind);

  var addHumidity = document.createElement("p");
  addHumidity.textContent = "Humidity: " + data.humidity;
  createParentDiv.appendChild(addHumidity);

  var addUv = document.createElement("p");
  addUv.textContent = "UV Index: " + data.uvi;
  createParentDiv.appendChild(addUv);
}

function fiveDayWeather(data) {
  var createContainerDiv = document.createElement("div");
  createContainerDiv.className = "container";
  results.appendChild(createContainerDiv);

  var containerHead = document.createElement("h4");
  containerHead.textContent = "5-Day Forecast";
  createContainerDiv.appendChild(containerHead);

  var rowDiv = document.createElement("div");
  rowDiv.classList = "row";
  createContainerDiv.appendChild(rowDiv);

  for (var i = 0; i < 5; i++) {
    var createParentDiv = document.createElement("div");
    createParentDiv.className = "col-2 mx-1 border border-1 ";
    rowDiv.appendChild(createParentDiv);

    var addTemp = document.createElement("p");
    addTemp.textContent = "Temperature: " + data[i].temp.day + " F";
    createParentDiv.appendChild(addTemp);

    var addWind = document.createElement("p");
    addWind.textContent = "Wind Speed: " + data[i].wind_speed + " mph";
    createParentDiv.appendChild(addWind);

    var addHumidity = document.createElement("p");
    addHumidity.textContent = "Humidity: " + data[i].humidity;
    createParentDiv.appendChild(addHumidity);
  }
}

// append city name, temp, wind, humidity, and uv index to weather box
// function to save past searches and hold then below searchbar

locationInputEl.addEventListener("click", function () {
  var x = $("#searchBar").val();
  storeCurrentWeather(x);
});
