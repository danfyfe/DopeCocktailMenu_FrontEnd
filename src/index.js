// javascript is the best!

const moodsEndPoint = 'http://localhost:3000/api/v1/moods'
const cocktailsEndPoint = 'http://localhost:3000/api/v1/cocktails'

fetch(moodsEndPoint)
.then(resp=>resp.json())
.then(function(moods){
  console.log(moods)
})


fetch(cocktailsEndPoint)
.then(resp=>resp.json())
.then(function(cocktails){
  console.log(cocktails)
})

