
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
const srcLikeBtn = "images/like.png"
const srcLikeBtnActive = 'images/like-active.png'
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
    // target.classList.toggle('like-active')
    if (dublikateCheck(id)){
        addJokeToFavourite(id)
    } 
    else{
        removeJokeFromFavourite(id)
    }
    clearJoke(jokesContainer)
    rander(ensureArray(jokes))
    
}
// target.classList.contains('like-active')

function dublikateCheck(idJoke){
    const dublikate = []
    if(jokesFavouriteColection.length === 0){
        dublikate.push(true)
    }
    else{
        jokesFavouriteColection.forEach((item) =>{
            if(item.id == idJoke) {
                dublikate.push(false)
             }
        })
    }
    
    return dublikate.includes(false) ? false : true
}

function addJokeToFavourite(idJoke) {
    if (search.checked) {
        const joke = jokes.filter(item => item.id === idJoke)
        jokesFavouriteColection.push(joke[0])
        
    } else {
        jokesFavouriteColection.push(jokes)
    }
    saveToMemory()
    clearJoke(jokeFavouriteConteiner)
    randerFavourite(jokesFavouriteColection)

}
function removeFromFavor(event) {
    const { target } = event
    const id = target.dataset.id
    removeJokeFromFavourite(id)
    clearJoke(jokesContainer)
    rander(ensureArray(jokes))
}

function removeJokeFromFavourite(idJoke) {
    jokesFavouriteColection = jokesFavouriteColection.filter((item) => {
        if (item.id !== idJoke) {
            return item
        }
    })
    saveToMemory()
    clearJoke(jokeFavouriteConteiner)
    randerFavourite(jokesFavouriteColection)
}

function getTimeLastUpdate(timeLastUpdate) {
    const timeUpdate = new Date(timeLastUpdate)
    const time = new Date()
    const timeDifference = time.getTime() - timeUpdate.getTime()
    const hoursAgo = parseInt(timeDifference / (1000 * 60 * 60))
    return hoursAgo
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
         if(dublikateCheck(id)){
            createJokeCard(item, jokesContainer, likeJoke , srcLikeBtn)
        }
        else{
            createJokeCard(item, jokesContainer, likeJoke , srcLikeBtnActive)
        }
        
    }) 
}
function randerFavourite(jokeArr) {
    jokeArr.forEach(item => createJokeCard(item, jokeFavouriteConteiner, removeFromFavor ,srcLikeBtnActive))
}
function clearJoke(container) {
    container.innerHTML = ''
}

function ensureArray(arr) {
    return Array.isArray(arr) ? arr : [arr]
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
        rander(ensureArray(jokes))

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










