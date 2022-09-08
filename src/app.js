import {getJokeBtn,jokesContainer,jokeFavouriteConteiner,random, categories, search, searchInput} from "./selectors"
import {selectRandom , selectCategories, selectSearch ,getTimeLastUpdate ,clearJoke} from "./helpers"
import {checkFavouriteJokes} from "./check"
import {getUrlFronInput} from "./getUrl"
import {showJoke,jokes} from "./async"
import {rander ,createJokeCard} from "./radner"

export let jokesFavouriteColection = JSON.parse(localStorage.getItem('jokesFavouriteColection'))
if(jokesFavouriteColection === null){
    jokesFavouriteColection = []
}

export const srcImgLike = {
    imgLike: "images/like.png",
    ImgLikeActive: "images/like-active.png"
}

randerFavourite(jokesFavouriteColection)

export function likeJoke(event) {
    const { target } = event
    const id = target.dataset.id
    if (checkFavouriteJokes(id)){
        addJokeToFavourite(id)
    } 
    else{
        removeJoke(id)
    }
    clearJoke(jokesContainer)
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
    clearJoke(jokeFavouriteConteiner)
    randerFavourite(jokesFavouriteColection)

}
function removeJokeFromFavourite(event) {
    const { target } = event
    const id = target.dataset.id
    removeJoke(id)
    if(jokes !== undefined){
    clearJoke(jokesContainer)
    rander(jokes)
    }
    
}

function removeJoke(idJoke) {
    jokesFavouriteColection = jokesFavouriteColection.filter((item) => {
        if (item.id !== idJoke) {
            return item
        }
    })
    saveToMemory()
    clearJoke(jokeFavouriteConteiner)
    randerFavourite(jokesFavouriteColection)
}


function randerFavourite(jokeArr) {
    jokeArr.forEach(item => createJokeCard(item, jokeFavouriteConteiner, removeJokeFromFavourite , srcImgLike.ImgLikeActive))
}




searchInput.addEventListener('input', getUrlFronInput)
categories.addEventListener('click', selectCategories)
random.addEventListener('click', selectRandom)
search.addEventListener('click', selectSearch)
getJokeBtn.addEventListener('click', showJoke)

function saveToMemory() {
    localStorage.setItem('jokesFavouriteColection', JSON.stringify(jokesFavouriteColection))
}










