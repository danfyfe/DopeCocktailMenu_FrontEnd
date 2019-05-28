// javascript is the best!

const moodsEndPoint = 'http://localhost:3000/api/v1/moods'
const cocktailsEndPoint = 'http://localhost:3000/api/v1/cocktails'
const cocktailContainer = document.querySelector("#cocktail-container")
const mainWrapper = document.querySelector("#main-wrapper")
const cocktailWrapper = document.querySelector("#cocktail-wrapper")

mainWrapper.addEventListener("click", function(e){
  console.log(e.target)
  if (e.target.id === 'cozy-btn') {

    fetch(cocktailsEndPoint)
    .then(resp => resp.json())
    .then(function(cocktails){
      // console.log(cocktails)

      cocktails.forEach(function(cocktail){
        if (cocktail.mood.name === 'Cozy') {
          // debugger
          cocktailWrapper.innerHTML +=
          `
          <div id="cocktail-container-${cocktail.id}" class="cocktail-container">
              <div id="cocktail-image-container" class="cocktail-image-container">
              <img src="${cocktail.img_url}">
                <div id="cocktail-btn-container" class="cocktail-btn-container">

                  <button id="like-btn" type="button" name="like">Like</button>
                  <button id="comment-btn" type="button" name="comment">Comment</button>
                  <button id="recipe-btn" type="button" name="recipe">Recipe</button>

                </div>
              </div>
              <div id="cocktail-description" class="cocktail-description">
                <p>${cocktail.description}</p>
              </div>
          </div>
          `

        }
      })
    })
  }

  if (e.target.id === 'sophisticated-btn') {

  }

  if (e.target.id === 'fun-btn') {

  }

  if (e.target.id === 'classic-btn') {

  }
})

// // FETCH EACH MOOD
// fetch(moodsEndPoint)
// .then(resp=>resp.json())
// .then(function(moods){
//   console.log(moods)
// })
//
//

// })
