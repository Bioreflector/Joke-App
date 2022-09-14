import {jokesContainer,jokeFavouriteConteiner, search,} from "./selectors"
import {isFavourite} from "./check"
import {jokes} from "./async"
import {rander ,randerFavourite} from "./radner"
export let jokesFavouriteColection = JSON.parse(localStorage.getItem('jokesFavouriteColection'))
if(jokesFavouriteColection === null){
    jokesFavouriteColection = []
}

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

function saveToMemory() {
    localStorage.setItem('jokesFavouriteColection', JSON.stringify(jokesFavouriteColection))
}










