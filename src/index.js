const moodsEndPoint = 'http://localhost:3000/api/v1/moods'
const cocktailsEndPoint = 'http://localhost:3000/api/v1/cocktails'
const likesEndPoint = 'http://localhost:3000/api/v1/likes'
const commentsEndPoint = 'http://localhost:3000/api/v1/comments'
const cocktailContainer = document.querySelector("#cocktail-container")
const mainWrapper = document.querySelector("#main-wrapper")
const mainBtnContainer = document.querySelector("#main-btn-container")
const mainBtns = document.querySelectorAll("button")
// const mainBtns = document.getElementsByClassName("mood-btn")
console.log(mainBtns)
const cocktailWrapper = document.querySelector("#cocktail-wrapper")

const allCocktails = []
const allComments = []








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
          <p>${cocktail.recipe}</p>
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
    mainBtnContainer.className = "main-btn-container move-aside"
    mainBtns.forEach(function(btn){
      btn.className = "mood-btn side"
    })

    cocktailWrapper.innerHTML = ""
    allCocktails.forEach(function(cocktail){
      if (cocktail.mood.name === "Cozy") {
        renderCocktail(cocktail)
      }
    })
  }  // END OF COZY BTN

  if (e.target.id === 'soph-btn') {
    mainBtnContainer.className = "main-btn-container move-aside"
    mainBtns.forEach(function(btn){
      btn.className = "mood-btn side"
    })
    cocktailWrapper.innerHTML = ""
    allCocktails.forEach(function(cocktail){
      if (cocktail.mood.name === "Sophisticated") {
        renderCocktail(cocktail)
      }
    })
  }  // END OF SOPH BTN

  if (e.target.id === 'fun-btn') {
    mainBtnContainer.className = "main-btn-container move-aside"
    mainBtns.forEach(function(btn){
      btn.className = "mood-btn side"
    })
    cocktailWrapper.innerHTML = ""
    allCocktails.forEach(function(cocktail){
      if (cocktail.mood.name === "Fun") {
        renderCocktail(cocktail)
      }
    })
  }  // END OF fun BTN

  if (e.target.id === 'classic-btn') {
    mainBtnContainer.className = "main-btn-container move-aside"
    mainBtns.forEach(function(btn){
      btn.className = "mood-btn side"
    })
    cocktailWrapper.innerHTML = ""
    allCocktails.forEach(function(cocktail){
      if (cocktail.mood.name === "Classic") {
        renderCocktail(cocktail)
      }
    })
  }  // END OF classic BTN




  // RECIPE BTN
  if (e.target.id === "recipe-btn") {
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







}) // END OF CLICK EVENT LISTENER
// work
