
let jokesFavouriteColection = JSON.parse(localStorage.getItem('jokesFavouriteColection'))
if(jokesFavouriteColection === null){
    jokesFavouriteColection = []
}
const jokesContainer = document.querySelector('.jokes-container')
const categoriesContainer = document.querySelector('.categories-container')
const jokeFavouriteConteiner = document.querySelector('.favourite-container')
const form = document.formSearchJoke
const { random, categories, search, searchInput } = form
const getJokeBtn = document.querySelector('.joke-find__btn')

const srcImgLike = "images/like.png"
const srcImgLikeActive = "images/like-active.png"

let url = 'https://api.chucknorris.io/jokes/random'
const urlCategory = 'https://api.chucknorris.io/jokes/categories'
const defaultUrl = 'https://api.chucknorris.io/jokes'

randerFavourite()
getCategories()


async function getCategories(){
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
    inputCategory.addEventListener('click' , сhooseCategory)
    inputCategory.value = category
    labelCateegory.insertAdjacentElement('beforeend' , inputCategory)
    return labelCateegory
}

function randerCategory(categoriesArray) {
    const categoriesList = categoriesArray.map((category) => {
        return createCategory(category)
    })
    categoriesList.forEach(category => categoriesContainer.insertAdjacentElement('beforeend' , category))
}

function disableGetJokeBtn() {
    getJokeBtn.disabled = true
    getJokeBtn.classList.add('joke-find__btn_disabled')
}
function enableGetJokeBtn() {
    getJokeBtn.disabled = false
    getJokeBtn.classList.remove('joke-find__btn_disabled')
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

function сhooseCategory() {
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
    url = `${defaultUrl}/random?category=${category.value}`
}
function getUrlFromRandom() {
    url = `${defaultUrl}/random`
}
function getUrlFronInput() {
    let valueFromInput = searchInput.value
    url = `${defaultUrl}/search?query=${valueFromInput}`
    const minLengthWord = 3
    if (searchInput.value.length >= minLengthWord) {
        enableGetJokeBtn()
    }
    else {
        disableGetJokeBtn()
    }
}
function isFavourite(joke){
    return jokesFavouriteColection.find((favoriteJoke) => favoriteJoke.id === joke.id);
}
function likeJoke(joke) {
    if (isFavourite(joke)){
        removeJoke(joke)
    } 
    else{
        addJokeToFavourite(joke)
    }
    jokesContainer.innerHTML = ""
    rander()
    
}
function addJokeToFavourite(joke) {
    jokesFavouriteColection.push(joke)
    saveToMemory()
    jokeFavouriteConteiner.innerHTML = ""
    randerFavourite()

}

function removeJoke(joke) {
    jokesFavouriteColection = jokesFavouriteColection.filter((favoriteJoke) => {
        if (favoriteJoke.id !== joke.id) {
            return favoriteJoke
        }
    })
    saveToMemory()
    jokeFavouriteConteiner.innerHTML = ""
    randerFavourite()
}

function getTimeLastUpdate(timeLastUpdate) {
    const timeUpdate = new Date(timeLastUpdate)
    const time = new Date()
    const timeDifference = time.getTime() - timeUpdate.getTime()
    const hoursAgo = parseInt(timeDifference / (1000 * 60 * 60))
    return hoursAgo
}

function createJokeCard(joke) {
    const jokeCard = document.createElement('div')
    jokeCard.classList.add('joke-card')
    jokeCard.innerHTML =
        `<div class = "box-card-icon"><img src="images/message.png" alt="icon"></div>
        <span class = "card-joke-id">ID: 
        <a href="https://api.chucknorris.io/jokes/${joke.id}">${joke.id}<img src="images/link.png" alt="link"></a>
        </span>
        <p class ="joke-text">${joke.value}</p>`
    const likeBtn = document.createElement('img')
    likeBtn.src = isFavourite(joke) ? srcImgLikeActive : srcImgLike
    likeBtn.alt = 'like'
    likeBtn.classList.add('like-btn')
    likeBtn.addEventListener('click' , ()=> likeJoke(joke))
    const boxInf = document.createElement('div')
    boxInf.classList.add('card-box-inf')
    const update = document.createElement('p')
    update.classList.add('update-inf-card')
    update.innerHTML = `Last update: <b>${getTimeLastUpdate(joke.updated_at)} hours ago</b>`
    if (joke.categories.length !== 0) {
        const category = document.createElement('p')
        category.classList.add('category-card')
        category.innerText = joke.categories
        boxInf.insertAdjacentElement("beforeend", category)
    }
    jokeCard.insertAdjacentElement("beforeend", likeBtn)
    boxInf.insertAdjacentElement("afterbegin", update)
    jokeCard.insertAdjacentElement("beforeend", boxInf)
    return jokeCard
}

function rander() {
    const jokeList = jokes.map(joke => createJokeCard(joke)) 
    jokeList.forEach(joke => jokesContainer.insertAdjacentElement('beforeend' , joke))       
}

function randerFavourite() {
    const jokeList = jokesFavouriteColection.map(favoriteJoke => createJokeCard(favoriteJoke)) 
    jokeList.forEach(favoriteJoke => jokeFavouriteConteiner.insertAdjacentElement('beforeend' , favoriteJoke)) 
}

function ensureArray(arr) {
    return Array.isArray(arr) ? arr : [arr]
}

async function getJoke(urljoke) {
    const response = await fetch(urljoke)
    const joke = await response.json()
    return joke
}

async function showJoke(event) {
    event.preventDefault()
    jokes = await getJoke(url)
    jokesContainer.innerHTML = ""
    if (search.checked) {
        const { result } = jokes
        jokes = result
        rander()
        
    }
    else {
        jokes = ensureArray((jokes))
        rander()
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










