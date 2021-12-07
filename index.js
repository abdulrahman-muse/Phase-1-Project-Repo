// ## Deliverables
// 1. SEE TITLE/SEARCH BAR UPON LOADING THE PAGE
//      2. SEARCH LOCATION
//      3. SHOW WEATHER INFO, RECS & COMMENTS
//      4. ADD NEW COMMENT WHEN COMMENT FORM IS SUBMITTED

document.addEventListener('DOMContentLoaded', () => {
    const API = "https://open-meteo.com/en"
    const locationResult = `https://www.metaweather.com/api/location/${woeid}`
    const searchBar = document.querySelector('#searchbar')
    const cityName = document.querySelector('h2#city-name')
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
    //.then(data => {
    //    cityName.textContent = data.title
    //    weatherImage.src = data.image

    const places = [
        {name: "New York",
        woeid: 2459115},
        {name: "Los Angeles",
        woeid: 2442047},
        {name: "Toronto",
        woeid: 4118}
    ]

   searchBar.addEventListener('input', (e) => {
        let value = e.target.value
        if (value && value.trim().length > 0) {
            value = value.trim().toLowerCase();
            renderWeather(places.filter(place => {
                return place.name.includes(value)
            }))
        }
    })

    function renderWeather(locations) {
        for (const item of locations) {
            cityName.textContent = item.name
        }
    }


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

    

})