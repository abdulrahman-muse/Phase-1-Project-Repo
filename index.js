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
const searchBar = document.querySelector('#searchbar')
const searchButton = document.querySelector('#search-button')

function fetchCities(){
    fetch (cities)
    .then(resp => resp.json())
    .then(console.log('hi!'));
    }

searchButton.addEventListener('click', (e) => {
    let search = searchBar.value
    if (search.length > 0) {
        getResults(cities, search)
                }
            })

function getResults(array, string) {
    if(typeof string === 'string') {
        let lowerString = string.toLowerCase()
        for (let x of array) {
            if (x.name.toLowerCase().find(lowerString)) {
                console.log(x)
            }
        }    
    }
        }

    const API = "https://open-meteo.com/en"
    const locationResult = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=weathercode&current_weather=true&timezone=America%2FNew_York`
    const weatherImage = document.querySelector('img#weather-image')
    const weatherReport = document.querySelector('h3#weather-report')
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

    
