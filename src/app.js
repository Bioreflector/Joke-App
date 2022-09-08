import {getJokeBtn,jokesContainer,jokeFavouriteConteiner,random, categories, search, searchInput} from "./selectors"
import {selectRandom , selectCategories, selectSearch ,getTimeLastUpdate ,clearJoke} from "./helpers"
import {checkFavouriteJokes} from "./check"
import {getUrlFronInput} from "./getUrl"
import {showJoke,jokes} from "./async"

export let jokesFavouriteColection = JSON.parse(localStorage.getItem('jokesFavouriteColection'))
if(jokesFavouriteColection === null){
    jokesFavouriteColection = []
}

const srcImgLike = {
    imgLike: "images/like.png",
    ImgLikeActive: "images/like-active.png"
}

randerFavourite(jokesFavouriteColection)

function likeJoke(event) {
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

function createJokeCard(item, container, functionFromBtn , likeBtnSrc) {
    const jokeCard = document.createElement('div')
    jokeCard.classList.add('joke-card')
    jokeCard.innerHTML =
        `<div class = "box-card-icon"><img src="images/message.png" alt="icon"></div>
        <span class = "card-joke-id">ID: 
        <a href="https://api.chucknorris.io/jokes/${item.id}">${item.id}<img src="images/link.png" alt="link"></a>
        </span>
        <p class ="joke-text">${item.value}</p>`
    const likeBtn = document.createElement('img')
    likeBtn.src = likeBtnSrc
    likeBtn.alt = 'like'
    likeBtn.dataset.id = item.id
    likeBtn.classList.add('like-btn')
    likeBtn.addEventListener('click', functionFromBtn)
    const boxInf = document.createElement('div')
    boxInf.classList.add('card-box-inf')
    const update = document.createElement('p')
    update.classList.add('update-inf-card')
    update.innerHTML = `Last update: <b>${getTimeLastUpdate(item.updated_at)} hours ago</b>`
    if (item.categories.length !== 0) {
        const category = document.createElement('p')
        category.classList.add('category-card')
        category.innerText = item.categories
        boxInf.insertAdjacentElement("beforeend", category)
    }
    jokeCard.insertAdjacentElement("beforeend", likeBtn)
    boxInf.insertAdjacentElement("afterbegin", update)
    jokeCard.insertAdjacentElement("beforeend", boxInf)
    container.insertAdjacentElement("beforeend", jokeCard)
}


export function rander(jokeArr) {
    jokeArr.forEach((item) =>{
        const {id} = item
         if(checkFavouriteJokes(id)){
            createJokeCard(item, jokesContainer, likeJoke , srcImgLike.imgLike)
        }
        else{
            createJokeCard(item, jokesContainer, likeJoke , srcImgLike.ImgLikeActive)
        }
        
    }) 
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










