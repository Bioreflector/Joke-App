import {checkedCategories ,checkFavouriteJokes} from "./check"
import {categoriesContainer,jokesContainer} from "./selectors"
import {getTimeLastUpdate} from "./helpers"
import {likeJoke,srcImgLike} from "./app"


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
export function randerCategory(categoriesArray) {
    const categoriesList = categoriesArray.map((item) => {
        return createCategory(item)
    })
    categoriesList.forEach(item => categoriesContainer.insertAdjacentElement('beforeend' , item))
}

 export function createJokeCard(item, container, functionFromBtn , likeBtnSrc) {
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