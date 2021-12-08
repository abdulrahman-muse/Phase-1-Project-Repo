// ## Deliverables
// 1. SEE TITLE/SEARCH BAR UPON LOADING THE PAGE
// 2. SEARCH LOCATION
// 3. SHOW WEATHER INFO, RECS & COMMENTS
// 4. ADD NEW COMMENT WHEN COMMENT FORM IS SUBMITTED

var cities = {};
document.addEventListener("DOMContentLoaded", function () {
  cities = fetchCities();
});

const cityName = document.querySelector("h2#city-name");
const searchBar = document.querySelector("#searchbar");
const searchButton = document.querySelector("#search-button");
const commentsHeader = document.querySelector("h3#comments-header");
const commentLabel = document.querySelector("#are-you-here");

function fetchCities() {
  return fetch("http://localhost:3000/locations").then((resp) => resp.json());
}

function searchFun() {
  let search = searchBar.value;
  if (search.length > 1) {
    getResults(cities, search);
  }
}

searchButton.addEventListener("click", searchFun);

function getResults(list, string) {
    // list = fetch("http://localhost:3000/locations").then((resp) => resp.json())
    list.then((listResult) => {
        if (typeof string === "string") {
          for (let x of listResult) {
            if (x.name.toLowerCase() === string.toLowerCase()) {
                cityName.textContent = x.name;
                commentsHeader.textContent = `What are people wearing in ${x.name}?`;
                commentLabel.textContent = `Are you in ${x.name}? Is it cold?`
              return x
            }
          }
        }
    }).then((match) => {
      fetchWeather(match)
    })
}

function fetchWeather(obj) {
    const locationResult = `https://api.open-meteo.com/v1/forecast?latitude=${obj.lat}&longitude=${obj.lng}&daily=weathercode&current_weather=true&timezone=America%2FNew_York`;
    console.log(locationResult)
    fetch(locationResult)
    .then((resp) => resp.json())
    .then((data) => displayWeather(data, weatherTypes))
}

const weatherTypes = [
    {code: 0, description: "Clear Sky"},
    {code: 1, description: "Mainly Clear"},
    {code: 2, description: "Partly Cloudy"},
    {code: 3, description: "Overcast"},
    {code: 45, description: "Fog"},
    {code: 48, description: "Depositing Rime Fog"},
    {code: 51, description: "Light Drizzle"},
    {code: 53, description: "Moderate Drizzle"},
    {code: 55, description: "Dense Drizzle"},
    {code: 56, description: "Light Freezing Drizzle"},
    {code: 57, description: "Dense Freezing Drizzle"},
    {code: 61, description: "Slight Rain"},
    {code: 63, description: "Moderate Rain"},
    {code: 65, description: "Heavy Rain"},
    {code: 66, description: "Light Freezing Rain"},
    {code: 67, description: "Heavy Freezing Rain"},
    {code: 71, description: "Slight Snow Fall"},
    {code: 73, description: "Moderate Snow Fall"},
    {code: 75, description: "Heavy Snow Fall"},
    {code: 77, description: "Snow Grains"},
    {code: 80, description: "Slight Rain Showers"},
    {code: 81, description: "Moderate Rain Showers"},
    {code: 82, description: "Violent Rain Showers"},
    {code: 85, description: "Slight Snow Showers"},
    {code: 86, description: "Heavy Snow Showers"},
    {code: 95, description: "Thunderstorm"},
    {code: 96, description: "Thunderstorm With Slight Hail"},
    {code: 99, description: "Thunderstorm With Heavy Hail"},
]

function displayWeather(location, array) {
  let weatherReport = document.querySelector("h3#weather-report");
    let code = location.daily.weathercode[0];
    for (const item of array) {
        if (item.code === code) {
            weatherReport.textContent = item.description
            if (weatherReport.textContent.includes("snow")) {
              weatherImage.src = "https://www.collinsdictionary.com/images/full/snow_306991961.jpg"
            }
        }
    }
}

const weatherImage = document.querySelector("img#weather-image");
const whatToWear = document.querySelector("p#what-to-wear");
const commentsList = document.querySelector("ul#comments-list");
const commentForm = document.querySelector("form#new-comment");
const commentInput = document.querySelector("#comment-input");

commentForm.addEventListener("submit", addComment);

function addComment(e) {
  e.preventDefault();
  const li = document.createElement("li");
  li.textContent = commentInput.value;
  commentsList.appendChild(li);
  e.target.reset();
}
