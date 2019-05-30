const moodsEndPoint = 'http://localhost:3000/api/v1/moods'
const cocktailsEndPoint = 'http://localhost:3000/api/v1/cocktails'
const likesEndPoint = 'http://localhost:3000/api/v1/likes'
const commentsEndPoint = 'http://localhost:3000/api/v1/comments'
const cocktailContainer = document.querySelector("#cocktail-container")
const mainWrapper = document.querySelector("#main-wrapper")
const mainBtnContainer = document.querySelector("#main-btn-container")
const mainBtns = document.querySelectorAll("button")
const cocktailWrapper = document.querySelector("#cocktail-wrapper")
const welcomeDiv = document.querySelector("#welcome")
const allCocktails = []
const allComments = []
const video = document.querySelector("#video")
const soundButtonContainer = document.querySelector("#sound-btn-container")





//renders sound button
function renderSoundButton(){
  const soundButton = document.createElement("button")
  soundButton.id = "sound-btn"
  soundButton.className = "sound-btn"
  soundButton.innerText = "Sound"
  soundButtonContainer.appendChild(soundButton)
}// end of sound button function

//renders cocktails by moodName
function renderCocktails(cocktails,moodName){
  cocktailWrapper.innerHTML = ""
  cocktails.forEach(function(cocktail){
    if (cocktail.mood.name === moodName) {
      renderCocktail(cocktail)
    }
  })
}

// moves main buttons to bottom right of screen
function moveButtonsAside(){
  mainBtnContainer.className = "main-btn-container move-aside"
  mainBtns.forEach(function(btn){
    btn.className = "mood-btn side"
  })
}

//removes welcome div
function removeWelcome(){
  const welcomeDiv = document.querySelector("#welcome")
  if (welcomeDiv) {
    welcomeDiv.remove()
  }
}

// changes welcome message to choose mood prompt
function choosePrompt(){
  let welcomeDiv = document.querySelector("#welcome")
  welcomeDiv.remove()
  welcomeDiv = document.createElement('div')
  welcomeDiv.className = "welcome"
  welcomeDiv.id = "welcome"
  mainWrapper.appendChild(welcomeDiv)
  welcomeDiv.innerHTML = `
  <h2>Please select a mood</h2>
  `
}

//timer for welcome message
setTimeout(choosePrompt,1800)

// fetches all cocktails and stores them in allCocktails variable
function renderCocktail(cocktail){

  cocktailWrapper.innerHTML +=
  `

    <div id="${cocktail.id}" class="cocktail-container">

      <div id="cocktail-image-container" class="cocktail-image-container">
        <img src="${cocktail.img_url}">
        <div class="name-btn-wrapper">
          <div class="cocktail-name">
            <h2>${cocktail.name}</h2>
          </div>
          <div id="cocktail-btn-container" class="cocktail-btn-container">
            <div class="like-num">
              <span id="like-btn" class="like-btn-cont"> ${cocktail.likes.length} Like(s)</span>
            </div>
            <div class="recipe-btn">
              <span id="recipe-btn" class="recipe-btn-cont" type="button" name="recipe">View More</span>
            </div>
            <div class="comment-num">
              <span id="comment-btn">${cocktail.comments.length} Comment(s)</span>
            </div>
          </div>
        </div>

      </div>


      <div id="recipe-comment-container" class="recipe-comment-container">

        <div id="recipe" class="recipe">
          <div id="cocktail-description" class="cocktail-description">
            <h4>Description</h4>
            <p class="recipe-paragraph">${cocktail.description}</p>
          </div>

        <h4>Recipe</h4>
        <p class="recipe-paragraph">${cocktail.recipe}</p>
      </div>

      <div id="comment-container" class="comment-container">
        <h4>What do you think?</h4>
        <form>
          <input id="username" type="text" name="username" placeholder="Enter Name Here...">
          <input id="content" type="text" name="content" placeholder="Enter Comment Here...">
          <input type="submit" value="Submit">
        </form>
        <ul id="comments-ul" class="comments-ul">
        </ul>

      </div>
    </div>

  `

}//end of render Cocktail function


function renderComment(comment){
  commentsUl.innerHTML += `
  <li><span style="font-weight: bold; text-decoration: none;">${comment.username}</span> <span>${comment.content}</span></li>
  `
}

fetch(cocktailsEndPoint)
.then(resp => resp.json())
.then(function(cocktails){
  cocktails.forEach(function(cocktail){
      allCocktails.push(cocktail)
  }) // END OF FOR EACH ITERATION
}) // END OF FETCH for cocktails



mainWrapper.addEventListener("click", function(e){
  e.preventDefault();

  if (e.target.id === 'cozy-btn') {
    video.src = "videos/cozy.mp4"
    document.documentElement.scrollTop = 0;
    removeWelcome();
    renderCocktails(allCocktails,"Cozy");
    moveButtonsAside();
    renderSoundButton();
  }  // END OF COZY BTN

  if (e.target.id === 'soph-btn') {
    video.src = "videos/soph.mp4"
    document.documentElement.scrollTop = 0;
    removeWelcome();
    moveButtonsAside();
    renderCocktails(allCocktails,"Sophisticated")
    renderSoundButton();
  }  // END OF SOPH BTN

  if (e.target.id === 'fun-btn') {
    video.src = "videos/fun.mp4"

    document.documentElement.scrollTop = 0;
    removeWelcome();
    renderCocktails(allCocktails,"Fun");
    moveButtonsAside();
    renderSoundButton();
  }  // END OF fun BTN

  if (e.target.id === 'classic-btn') {
    video.src = "videos/classic.mp4"
    document.documentElement.scrollTop = 0;
    removeWelcome();
    renderCocktails(allCocktails,"Classic");
    moveButtonsAside();
    renderSoundButton();
  }  // END OF classic BTN

  // RECIPE BTN
  if (e.target.id === "recipe-btn") {
    // debugger
    const recipe = e.target.parentElement.parentElement.parentElement.parentElement.nextElementSibling

    const commentsUl = recipe.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling

    const cocktail = document.getElementById(e.target.parentElement.parentElement.parentElement.parentElement.parentElement.id)

    if (recipe.style.display === "block") {
      recipe.style.display = "none"
      commentsUl.innerHTML = " "
    }else {
      recipe.style.display = "block"
      fetch(commentsEndPoint)
      .then(resp=>resp.json())
      .then(function(comments){
        comments.forEach(function(comment){
            if (comment.cocktail.id === parseInt(cocktail.id)) {
              commentsUl.innerHTML += `
              <li><span>${comment.username}</span> <span>${comment.content}</span></li>
              `
              }
            })
      })//end fetch for comments
    }
  }// end recipe button target

  // LIKE BTN
  if (e.target.id === "like-btn") {


    const cocktail = e.target.parentElement.parentElement.parentElement.parentElement.parentElement


    let likeNum = parseInt(e.target.innerText)
    ++likeNum
    e.target.innerText = `${likeNum} Like(s)`

    fetch(likesEndPoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept":"application/json"
      },
      body: JSON.stringify({
        cocktail_id: parseInt(cocktail.id)
      })
    })
  }//end of like button target

  if (e.target.value === "Submit") {
    const form = e.target.parentElement
    const userNameInput = form.firstElementChild
    const contentInput = userNameInput.nextElementSibling
    const cocktail = form.parentElement.parentElement.parentElement
    const commentsUl = form.parentElement.firstElementChild.nextElementSibling.nextElementSibling
    const commentSpan = cocktail.querySelector("#comment-btn")
      fetch(commentsEndPoint,{
        method:"POST",
        headers: {
          "Content-Type": "application/json",
          "Accept":"application/json"
        },
        body: JSON.stringify({
          username: userNameInput.value,
          content: contentInput.value,
          cocktail_id: parseInt(cocktail.id)
        })
      }).then(resp=>resp.json())
      .then(function(comment){
        commentsUl.innerHTML += `
        <li><span style="font-weight: bold; text-decoration: none;">${comment.username}</span> <span>${comment.content}</span></li>
        `
        let commentNum = parseInt(commentSpan.innerText)
        ++commentNum
        commentSpan.innerText = `${commentNum} Comment(s)`
      })
    form.reset()
  }// end of submit target


if (e.target.id === "sound-btn") {
  if (video.muted === true) {
    video.muted = false
  }else if(video.muted === false) {
    video.muted = true
  }
}// end of sound button






}) // END OF CLICK EVENT LISTENER
// work
