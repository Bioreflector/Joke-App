import {getJokeBtn,jokesContainer,categoriesContainer,jokeFavouriteConteiner,form} from "./selectors"
import {disableGetJokeBtn , enableGetJokeBtn ,getTimeLastUpdate ,clearJoke,ensureArray} from "./helpers"

let jokesFavouriteColection = JSON.parse(localStorage.getItem('jokesFavouriteColection'))
if(jokesFavouriteColection === null){
    jokesFavouriteColection = []
}
const { random, categories, search, searchInput } = form

const srcImgLike = {
    imgLike: "images/like.png",
    ImgLikeActive: "images/like-active.png"
}
let url = 'https://api.chucknorris.io/jokes/random'
const urlCategory = 'https://api.chucknorris.io/jokes/categories'
let jokes

randerFavourite(jokesFavouriteColection)
getCategories(urlCategory)

async function getCategories(urlCategory){
    const response = await fetch(urlCategory)
    const categoriesArray = await response.json()
       randerCategory(categoriesArray)
   }
   
   function createCategory(category){
    const labelCateegory = document.createElement('label')
    labelCateegory.for = category
    labelCateegory.innerText = category
    labelCateegory.classList.add('categories-lable')
    const inputCategory = document.createElement('input')
    inputCategory.type = 'radio'
    inputCategory.name = 'categoriesRadio'
    inputCategory.id = category
    inputCategory.classList.add('radio-categories')
    inputCategory.addEventListener('click' , checkedCategories)
    inputCategory.value = category
    labelCateegory.insertAdjacentElement('beforeend' , inputCategory)
    return labelCateegory
}

function randerCategory(categoriesArray) {
    const categoriesList = categoriesArray.map((item) => {
        return createCategory(item)
    })
    categoriesList.forEach(item => categoriesContainer.insertAdjacentElement('beforeend' , item))
}


function selectRandom() {
    searchInput.classList.add('hide-search-field')
    categoriesContainer.classList.add('hide-categories')
    searchInput.value = ''
    getUrlFromRandom()
    enableGetJokeBtn()
}
function selectCategories() {
    categoriesContainer.classList.remove('hide-categories')
    searchInput.classList.add('hide-search-field')
    enableGetJokeBtn()
    searchInput.value = ''

}
function selectSearch() {
    categoriesContainer.classList.add('hide-categories')
    searchInput.classList.remove('hide-search-field')
    disableGetJokeBtn()
}


function checkedCategories() {
    const categoriesRadio = document.querySelectorAll('.radio-categories')
    categoriesRadio.forEach((category) => {
        if (!category.checked) {
            category.parentElement.classList.remove('active-radio')

        }
        else {
            category.parentElement.classList.add('active-radio')
            getUrlFromCategories(category)
        }
    })
}

function getUrlFromCategories(category) {
    url = `https://api.chucknorris.io/jokes/random?category=${category.value}`
}
function getUrlFromRandom() {
    url = 'https://api.chucknorris.io/jokes/random'
}
function getUrlFronInput() {
    let valueFromInput = searchInput.value
    url = `https://api.chucknorris.io/jokes/search?query=${valueFromInput}`
    if (searchInput.value.length >= 3) {
        enableGetJokeBtn()
    }
    else {
        disableGetJokeBtn()
    }
}
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
function checkFavouriteJokes(idJoke){
    const status= [true]
    jokesFavouriteColection.filter((item) =>{
            if(item.id == idJoke) status.push(false)
        })
    return status.includes(false) ? false : true
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


function rander(jokeArr) {
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

async function getFetch(urljoke) {
    const resopnse = await fetch(urljoke)
    const joke = await resopnse.json()
    return joke
}

async function showJoke(event) {
    event.preventDefault()
    jokes = await getFetch(url)
    clearJoke(jokesContainer)
    if (search.checked) {
        const { result } = jokes
        jokes = result
        rander(jokes)
        
    }
    else {
        jokes = ensureArray((jokes))
        rander(jokes)


    }
}
searchInput.addEventListener('input', getUrlFronInput)
categories.addEventListener('click', selectCategories)
random.addEventListener('click', selectRandom)
search.addEventListener('click', selectSearch)
getJokeBtn.addEventListener('click', showJoke)

function saveToMemory() {
    localStorage.setItem('jokesFavouriteColection', JSON.stringify(jokesFavouriteColection))
}










