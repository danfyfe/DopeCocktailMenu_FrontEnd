// javascript is the best!

const moodsEndPoint = 'http://localhost:3000/api/v1/moods'
const cocktailsEndPoint = 'http://localhost:3000/api/v1/cocktails'
const likesEndPoint = 'http://localhost:3000/api/v1/likes'
const cocktailContainer = document.querySelector("#cocktail-container")
const mainWrapper = document.querySelector("#main-wrapper")
const mainBtnContainer = document.querySelector("#main-btn-container")
const cocktailWrapper = document.querySelector("#cocktail-wrapper")

mainWrapper.addEventListener("click", function(e){
  // console.log(e.target)
  mainBtnContainer.style.display = 'none'

  if (e.target.id === 'cozy-btn') {

    fetch(cocktailsEndPoint)
    .then(resp => resp.json())
    .then(function(cocktails){
      cocktails.forEach(function(cocktail){
        if (cocktail.mood.name === 'Cozy') {
          cocktailWrapper.innerHTML +=
          `
          <div id="${cocktail.id}" class="cocktail-container">
            <div class="cocktail-name"><h2>${cocktail.name}</h2></div>
            <div id="cocktail-image-container" class="cocktail-image-container">
              <img src="${cocktail.img_url}">
              <div id="cocktail-btn-container" class="cocktail-btn-container">

                <div class="like-num"><span id="like-btn" class="like-btn-cont"> ${cocktail.likes.length} Like(s)</span></div>
                <div class="recipe-btn"><span id="recipe-btn" class="recipe-btn-cont" type="button" name="recipe">View Recipe</span></div>
                <div class="comment-num"><span id="comment-btn">10 Comment(s)</span></div>
              </div>
            </div>

            <div id="cocktail-description" class="cocktail-description">
            <p>${cocktail.description}</p>
            </div>

            <div id="recipe" class="recipe">
              <h4>Recipe</h4>
              <p>${cocktail.recipe}</p>
            </div>
          </div>
          `

        } // END OF IF STATEMENT
      }) // END OF FOR EACH ITERATION
    }) // END OF FETCH
  }  // END OF COZY BTN

  // RECIPE BTN
  if (e.target.id === "recipe-btn") {

    const recipe = e.target.parentElement.parentElement.parentElement.parentElement.querySelector("#recipe")

    if (recipe.style.display === "block") {
      recipe.style.display = "none"
    }else {
      recipe.style.display = "block"
    }
  }

  // LIKE BTN
  if (e.target.id === "like-btn") {

    const cocktail = document.getElementById(e.target.parentElement.parentElement.parentElement.parentElement.id)

    // console.log(parseInt(e.target.innerText))
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

  }

  if (e.target.id) {

  }






  if (e.target.id === 'sophisticated-btn') {

  }

  if (e.target.id === 'fun-btn') {

  }

  if (e.target.id === 'classic-btn') {

  }
}) // END OF CLICK EVENT LISTENER

// // FETCH EACH MOOD
// fetch(moodsEndPoint)
// .then(resp=>resp.json())
// .then(function(moods){
//   console.log(moods)
// })
//
//

// })
