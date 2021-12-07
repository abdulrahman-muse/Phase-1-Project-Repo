<<<<<<< HEAD
// ## Deliverables
//DONE: 1. SEE IMAGE
//      2. SEE IMAGE TITLE
//      3. SEE ALL COMMENTS
//      4. ADD NEW COMMENT WHEN COMMENT FORM IS SUBMITTED
//      5. CLICK ON HEART ICON INCREASES IMAGE LIKES

// ## Bonus:
//DONE:   1. REMOVE COMMENT WHEN CLICKED
//        2. CLICK THE IMAGE TO GET RANDOM DOG IMAGE

document.addEventListener('DOMContentLoaded', () => {
    const imgUrl = "http://localhost:3000/images/1"
    const cityName = document.querySelector('h2#city-name')
    const weatherImage = document.querySelector('img#weather-image')
    const weatherReport = document.querySelector('h3#weather-report')
    const whatToWear = document.querySelector('p#what-to-wear')
    const commentsHeader = document.querySelector('h3#comments-header')
    const commentsList = document.querySelector('ul#comments-list')
    const commentForm = document.querySelector('form#new-comment')
    const commentLabel = document.querySelector('#are-you-here')
    const commentInput = document.querySelector('#comment-input')

    fetch(imgUrl)
    .then(resp => resp.json())
    .then(data => {
        cityName.textContent = data.title
        weatherImage.src = data.image
        cardImage.addEventListener('click', (e) => {
            fetch("https://dog.ceo/api/breeds/image/random")
            .then(res => res.json())
            .then(info => cardImage.src = info.message)
        })
        commentsList.innerHTML = ' '
        data.comments.forEach(comment => {
        const li = document.createElement('li')
        li.innerText = comment.content
        commentsList.appendChild(li)
        li.addEventListener('click', (ev) => {
            ev.target.remove()
        })
    })
    })

    commentForm.addEventListener('submit', addComment)
    
    function addComment(e) {
        e.preventDefault()
        const li = document.createElement('li')
        li.textContent = commentInput.value
        commentsList.appendChild(li)
        li.addEventListener('click', (ev) => {
            ev.target.remove()
        })
        e.target.reset()
    }

    likesSection.addEventListener('click', function(){
        const likeNumbers = likeCount.textContent.replace("likes", "");
        const likez = parseInt(likeNumbers, 10);
        likeCount.textContent = `${likez + 1} likes`;
    })

    })
=======
h1
>>>>>>> 99676509a079801b4732d9c4d224acf7a8f69e69

dhbius