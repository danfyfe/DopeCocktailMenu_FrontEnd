// javascript is the best!

const moodsEndPoint = 'http://localhost:3000/api/v1/moods'
const cocktailsEndPoint = 'http://localhost:3000/api/v1/cocktails'
const likesEndPoint = 'http://localhost:3000/api/v1/likes'
const commentsEndPoint = 'http://localhost:3000/api/v1/comments'
const cocktailContainer = document.querySelector("#cocktail-container")
const mainWrapper = document.querySelector("#main-wrapper")
const mainBtnContainer = document.querySelector("#main-btn-container")
const cocktailWrapper = document.querySelector("#cocktail-wrapper")

mainWrapper.addEventListener("click", function(e){
  // console.log(e.target)
  e.preventDefault();
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
                <div class="comment-num"><span id="comment-btn">${cocktail.comments.length} Comment(s)</span></div>
              </div>
            </div>

            <div id="cocktail-description" class="cocktail-description">
            <p>${cocktail.description}</p>
            </div>
            <div id="recipe-comment-container" class="recipe-comment-container">

              <div id="recipe" class="recipe">
                <h4>Recipe</h4>
                <p>${cocktail.recipe}</p>
              </div>

              <div id="comment-container" class="comment-container">

                <h4>Add Comment</h4>

                <form>
                <input id="username" type="text" name="username" placeholder="Enter Name Here...">
                <input id="content" type="text" name="content" placeholder="Enter Comment Here...">
                <input type="submit" value="Submit">
                </form>

                <ul id="comments-ul" class="comments-ul">

                </ul>

              </div>

            </div>

          </div>
          `

        } // END OF IF STATEMENT
      }) // END OF FOR EACH ITERATION
    }) // END OF FETCH
  }  // END OF COZY BTN

  // RECIPE BTN
  if (e.target.id === "recipe-btn") {
    const recipe = e.target.parentElement.parentElement.parentElement.parentElement.querySelector("#recipe-comment-container")
    const commentsUl = recipe.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling
    const cocktail = document.getElementById(e.target.parentElement.parentElement.parentElement.parentElement.id)

    if (recipe.style.display === "block") {
      recipe.style.display = "none"
    }else {
      recipe.style.display = "block"
    }

    fetch(commentsEndPoint)
    .then(resp=>resp.json())
    .then(function(comments){
      comments.forEach(function(comment){
        if (comment.cocktail.id === parseInt(cocktail.id)) {
          commentsUl.innerHTML = `
          <li>
            <span style="font-weight: bold; text-decoration: none;">${comment.username}</span> <span>${comment.content}</span>
          </li>
          `
        }
      })
    })

  }

  // LIKE BTN
  if (e.target.id === "like-btn") {

    const cocktail = document.getElementById(e.target.parentElement.parentElement.parentElement.parentElement.id)

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
      })
    form.reset()
  }// end of submit target






  if (e.target.id === 'sophisticated-btn') {

  }// end of sophisticated button target

  if (e.target.id === 'fun-btn') {

  }// end of fun button target

  if (e.target.id === 'classic-btn') {

  }//end of classic button target
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
