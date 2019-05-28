// javascript is the best!

const moodsEndPoint = 'http://localhost:3000/api/v1/moods'
const cocktailsEndPoint = 'http://localhost:3000/api/v1/cocktails'

const mainWrapper = document.querySelector("#main-wrapper")

mainWrapper.addEventListener("click", function(e){
  console.log(e.target)
  if (e.target.id === 'cozy-btn') {

    fetch(cocktailsEndPoint)
    .then(resp => resp.json())
    .then(function(cocktails){
      // console.log(cocktails)

      cocktails.forEach(function(cocktail){
        if (cocktail.mood.name === 'Cozy') {
          console.log(cocktail)
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
