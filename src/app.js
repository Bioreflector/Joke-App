import {getJokeBtn,jokesContainer,jokeFavouriteConteiner,random, categories, search, searchInput} from "./selectors"
import {selectRandom , selectCategories, selectSearch ,getTimeLastUpdate ,clearJoke} from "./helpers"
import {isFavourite} from "./check"
import {getUrlFronInput} from "./getUrl"
import {showJoke,jokes} from "./async"
import {rander ,randerFavourite} from "./radner"


export let jokesFavouriteColection = JSON.parse(localStorage.getItem('jokesFavouriteColection'))
if(jokesFavouriteColection === null){
    jokesFavouriteColection = []
}

export const srcImgLike = "images/like.png"
export const srcImgLikeActive = "images/like-active.png"

randerFavourite()

export function likeJoke(id) {
    if (isFavourite(id)){
        removeJoke(id)
    } 
    else{
        addJokeToFavourite(id)
    }
    jokesContainer.innerHTML = ""
    rander(jokes)
    
}
function addJokeToFavourite(idJoke) {
    if (search.checked) {
        const joke = jokes.filter(item => item.id === idJoke)
        jokesFavouriteColection.push(...joke)
        
    } else {
        jokesFavouriteColection.push(...jokes)
    }
    saveToMemory()
    jokeFavouriteConteiner.innerHTML = ""
    randerFavourite()

}

function removeJoke(idJoke) {
    jokesFavouriteColection = jokesFavouriteColection.filter((item) => {
        if (item.id !== idJoke) {
            return item
        }
    })
    saveToMemory()
    jokeFavouriteConteiner.innerHTML = ""
    randerFavourite()
}





searchInput.addEventListener('input', getUrlFronInput)
categories.addEventListener('click', selectCategories)
random.addEventListener('click', selectRandom)
search.addEventListener('click', selectSearch)
getJokeBtn.addEventListener('click', showJoke)

function saveToMemory() {
    localStorage.setItem('jokesFavouriteColection', JSON.stringify(jokesFavouriteColection))
}










