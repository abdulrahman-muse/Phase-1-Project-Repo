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

const tempData = document.querySelector("#temperature")
const windData = document.querySelector("#windspeed")



function searchFun() {
  let search = searchBar.value;
  if (search.length > 1) {
    getResults(cities, search);
  }
}

searchButton.addEventListener("click", searchFun);

function getResults(list, string) {
    list = fetch("http://localhost:3000/locations").then((resp) => resp.json())

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
    const locationResult = `https://api.open-meteo.com/v1/forecast?latitude=${obj.lat}&longitude=${obj.lng}&daily=weathercode,temperature_2m_max,temperature_2m_min,windspeed_10m_max&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&timezone=America%2FNew_York`;
    console.log(locationResult)
    fetch(locationResult)
    .then((resp) => resp.json())
    .then((data) => {
      tempData.textContent = `Temperature : ${data.current_weather.temperature} °F`
      windData.textContent = `Windspeed : ${data.current_weather.windspeed} mp\h`
      displayWeather(data, weatherTypes)})
    


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
  let weatherReport = document.querySelector("#weather-report");
    let code = location.daily.weathercode[0];
    for (const item of array) {
        if (item.code === code) {
            weatherReport.textContent = item.description

            if (weatherReport.textContent.includes("Snow")) {
              weatherImage.src = "https://www.collinsdictionary.com/images/full/snow_306991961.jpg";
              }
              if (weatherReport.textContent.includes("Overcast")) {
                weatherImage.src =
                  "https://www.rochesterfirst.com/wp-content/uploads/sites/66/2021/04/sky-1107579_1920.jpg?w=1752&h=769&crop=1";
              }
              if (weatherReport.textContent.includes("Rain" || "Drizzle")) {
                weatherImage.src =
                  "https://www.denverpost.com/wp-content/uploads/2016/05/20160509__CD16WEATHER_AC25750xp1.jpg?w=654";
              }
              if (weatherReport.textContent.includes("Thunderstorm")) {
                weatherImage.src =
                  "https://www.mercurynews.com/wp-content/uploads/2020/08/SJM-L-LIGHTNING-0817-11.jpg?w=810";
              }
              if (weatherReport.textContent.includes("Fog")) {
                weatherImage.src =
                  "https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F603afd08b3400e3d1a7ba156%2FFog-Trucks%2F960x0.jpg%3Ffit%3Dscale";
              }
              if (weatherReport.textContent.includes("Clear")) {
                weatherImage.src =
                  "https://lh3.googleusercontent.com/CnHg3skxcIhFKh5oE_ZV61x-a-tqWKIWC04a4hWkmQymuBRGlp3Kgnr_d3bEj-jgvPZAM1kh4nkpALUr0bDaUJdzPQ=w640-h400-e365-rj-sc0x00ffffff";
              }

              if (weatherReport.textContent.includes("Moderate Rain" || "Heavy Rain")) {
                weatherImage.src =
                  "https://i.guim.co.uk/img/media/8132db117e863456488b553125383608d8c13264/0_265_2366_1419/master/2366.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=a646aa6afdee6cbea9460b4a660743ab";
              }

        }

            accordingToWeather(weatherReport)

        }
    }


const weatherImage = document.querySelector("img#weather-image");
const whatToWear = document.querySelector("p#what-to-wear");
const commentsList = document.querySelector("ul#comments-list");






function accordingToWeather(report) {
  if (report.textContent.includes("Snow")) {
    whatToWear.innerText = "Clothing Recommendation : Make sure you grab your winter boots!"
  } else if (report.textContent.includes("Rain" || "Drizzle" || "Thunderstorm")) {
    whatToWear.innerText = "Clothing Recommendation : Make sure you grab rain coat!"
  } else if (report.textContent.includes("Clear")) {
    whatToWear.innerText = "Clothing Recommendation: Wear your coolest shades"
  } else if (report.textContent.includes("Fog")) {
    whatToWear.innerText = "Recommendaion: If you plan on driving, go slow!"
  } else if (report.textContent.includes("Overcast" || "Cloudy")) {
    whatToWear.innerText = "No sun right now, check back later"
  } 
}


// const whatToWear = document.querySelector("p#what-to-wear");
// const commentsList = document.querySelector("ul#comments-list");

const commentForm = document.querySelector("form#new-comment");
const commentInput = document.querySelector("#comment-input");

commentForm.addEventListener("submit", addComment);

function addComment(e) {
  e.preventDefault();
  const li = document.createElement("li");
  li.textContent = commentInput.value;
  commentsList.appendChild(li);
  e.target.reset();

}}