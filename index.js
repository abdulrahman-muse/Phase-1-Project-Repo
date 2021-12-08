// ## Deliverables
// 1. SEE TITLE/SEARCH BAR UPON LOADING THE PAGE
// 2. SEARCH LOCATION
// 3. SHOW WEATHER INFO, RECS & COMMENTS
// 4. ADD NEW COMMENT WHEN COMMENT FORM IS SUBMITTED

document.addEventListener('DOMContentLoaded', function(){
    fetchCities();
})

const cities = "http://localhost:3000/locations"
const cityName = document.querySelector('h2#city-name')
const lati = document.querySelector('p#latitude')
const longi = document.querySelector('p#longitude')
const searchBar = document.querySelector('#searchbar')
const searchButton = document.querySelector('#search-button')
const weatherReport = document.querySelector('h3#weather-report')
const locationResult = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=weathercode&current_weather=true&timezone=America%2FNew_York`

function fetchCities(){
    fetch (cities)
    .then(resp => resp.json())
    .then(data => displayLocations(data));
    }

function displayLocations(locations) {
    locations.forEach((location) => {
        cityName.textContent = location.name
        lati.textContent = location.lat
        longi.textContent = location.lng
    })
}

searchButton.addEventListener('click', searchFun)

function searchFun() {
    let search = searchBar.value
    if (search.length > 1) {
        console.log('hi!')
        getResults(cities, search)
                }
            }
    
function getResults(list, string) {
    if(typeof string === 'string') {
        for (let x of list) {
            if (x.name === string) {
                console.log(x.name)
            }
        }
    }
        }



    const API = "https://open-meteo.com/en"
    const weatherImage = document.querySelector('img#weather-image')
    const whatToWear = document.querySelector('p#what-to-wear')
    const commentsHeader = document.querySelector('h3#comments-header')
    const commentsList = document.querySelector('ul#comments-list')
    const commentForm = document.querySelector('form#new-comment')
    const commentLabel = document.querySelector('#are-you-here')
    const commentInput = document.querySelector('#comment-input')

    fetch(API)
    .then(resp => resp.json())
    .then(console.log('hi!'))



// 1. receive the name of the city
function isMatch (element) {
    return element.name === searchBar.value
}
// 2. search through cities.json to locate matching city
function matchSearch() {
    let result = cities.find(isMatch)
    console.log(result)
}

// 3. return latitude & longitude (or maybe return entire object?)
// 4. assign lat and long variables
// 5. insert lat and long into locationResult URL




   


        commentsList.innerHTML = ' '
        data.comments.forEach(comment => {
        const li = document.createElement('li')
        li.innerText = comment.content
        commentsList.appendChild(li)
        })

    commentForm.addEventListener('submit', addComment)
    
    function addComment(e) {
        e.preventDefault()
        const li = document.createElement('li')
        li.textContent = commentInput.value
        commentsList.appendChild(li)
        e.target.reset()
    }

    
