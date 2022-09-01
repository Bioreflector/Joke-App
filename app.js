
const jokesFavouriteColection = []
const jokesContainer = document.querySelector('.jokes-container')
const categoriesContainer = document.querySelector('.categories-container')
const categoriesArray = ["animal","career","celebrity","dev","explicit","fashion","food","history","money","movie","music","political","religion","science","sport","travel"]
const jokeFavouriteConteiner = document.querySelector('.favourite-container')
const form = document.formSearchJoke
const {random , categories , search , searchInput} = form
const getJokeBtn = document.querySelector('.joke-find__btn')


let url = 'https://api.chucknorris.io/jokes/random'
let jokes

random.checked = true

function disableGetJokeBtn(){
    getJokeBtn.disabled = true
    getJokeBtn.classList.add('joke-find__btn_disabled')
}
function enableGetJokeBtn(){
    getJokeBtn.disabled = false
    getJokeBtn.classList.remove('joke-find__btn_disabled')
}

function randerCategory(categoriesArray){
    const categoriesList = categoriesArray.map((item) =>{
        if(categoriesArray.indexOf(item) === 0){
            return `<label for="${item}" class = "categories-lable"><input type = "radio" id ="${item}" name = "categoriesRadio" value = "${item}" class = "radio-categories" checked>${item}</label>`
        }
        else{
            return `<label for="${item}" class = "categories-lable"><input type = "radio" id ="${item}" name = "categoriesRadio" value = "${item}" class = "radio-categories">${item}</label>`
        }
        
    }).join('')
    categoriesContainer.innerHTML = categoriesList
}
randerCategory(categoriesArray)

function selectRandom(){
    searchInput.classList.add('hide-search-field')
    categoriesContainer.classList.add('hide-categories')
    getUrlFromRandom()
    enableGetJokeBtn()
}
function selectCategories(){
    categoriesContainer.classList.remove('hide-categories')
    searchInput.classList.add('hide-search-field')
    enableGetJokeBtn()

}
function selectSearch(){
    categoriesContainer.classList.add('hide-categories')
    searchInput.classList.remove('hide-search-field')
    disableGetJokeBtn()
}

const categoriesRadio = document.querySelectorAll('.radio-categories')

function checkedCategories(){
    categoriesRadio.forEach((category) =>{
        if(!category.checked){
            category.parentElement.classList.remove('active-radio')
            
        }
        else{
            category.parentElement.classList.add('active-radio')
            getUrlFromCategories(category)
        }
    })
}
function getUrlFromCategories(category){
    url = `https://api.chucknorris.io/jokes/random?category=${category.value}`
}
function getUrlFromRandom(){
    url = 'https://api.chucknorris.io/jokes/random'
}
function getUrlFronInput(){
    let valueFromInput = searchInput.value
    url = `https://api.chucknorris.io/jokes/search?query=${valueFromInput}`
    if(searchInput.value.length >= 3){
        enableGetJokeBtn()
    }
    else{
        disableGetJokeBtn()
    }
}
    function getFetch(url){
        return fetch(url).then(data => data.json())
    }

    function addJokeToFavourite(event){
        const {target} = event
        const id = target.dataset.id
        if(search.checked){
            const {result} = jokes
            const joke = result.filter(item => item.id === id)
            jokesFavouriteColection.push(joke[0])
        }else{
            jokesFavouriteColection.push(jokes)
        }
        clearJoke(jokeFavouriteConteiner)
        randerFavourite(jokesFavouriteColection)

    }
    function removeJokeToFavourite(event){
        const {target} = event
        const id = target.dataset.id
        let indexElement
        jokesFavouriteColection.forEach((item , index) =>{
            if(item.id == id) indexElement = index
        })
        jokesFavouriteColection.splice(indexElement , 1)
        clearJoke(jokeFavouriteConteiner)
        randerFavourite(jokesFavouriteColection)
    }
    
    function insertElement(perentElement , position , element){
        perentElement.insertAdjacentElement(position , element)
    }
    function createJokeCard(item , container , functionFromBtn){
        const jokeCard = document.createElement('div')
        jokeCard.classList.add('joke-card')
        const id = document.createElement('span')
        id.classList.add('card-joke-id')
        id.innerText = 'ID: '
        const link = document.createElement('a')
        link.href = `https://api.chucknorris.io/jokes/${item.id}`
        link.innerText = item.id
        const likeBtn =document.createElement('button')
        likeBtn.dataset.id = item.id 
        likeBtn.classList.add('like-btn')
        likeBtn.addEventListener('click', functionFromBtn)
        likeBtn.innerText = 'testbtn'
        const joke = document.createElement('p')
        joke.classList.add('joke-text')
        joke.innerText = item.value
        const boxInf = document.createElement('div')
        boxInf.classList.add('card-box-inf')
        const update = document.createElement('p')
        update.classList.add('update-inf-card')
        update.innerText = 'Last update:'
        if(item.categories.length !== 0){
            const category = document.createElement('p')
            category.classList.add('category-card')
            category.innerText = item.categories
            insertElement(boxInf , "beforeend" , category)
        }
        insertElement(id , "beforeend" , link)
        insertElement(jokeCard , "afterbegin" , id)
        insertElement(jokeCard , "beforeend" , likeBtn)
        insertElement(jokeCard , "beforeend" , joke)
        insertElement(boxInf , "afterbegin" , update)
        insertElement(jokeCard , "beforeend" , boxInf)
        insertElement(container , "beforeend" , jokeCard)
    }

    function rander(jokeArr){
       jokeArr.forEach(item => createJokeCard(item , jokesContainer , addJokeToFavourite))
    }
    function randerFavourite(jokeArr){
        jokeArr.forEach(item => createJokeCard(item , jokeFavouriteConteiner ,removeJokeToFavourite))
     }
    function clearJoke(container){
        container.innerHTML = ''
    }

    
    function ensureArray(arr){
        return Array.isArray(arr) ? arr : [arr]
    }
        async function showJoke(event){
        event.preventDefault()
        jokes = await getFetch(url)
        clearJoke(jokesContainer)
        if(search.checked){
            const {result} = jokes
            rander(result)
        }
        else{
            rander(ensureArray(jokes))

        }  
    }
    
    searchInput.addEventListener('input' , getUrlFronInput)
    categoriesRadio.forEach(item => item.addEventListener('click' , checkedCategories))
    categories.addEventListener('click' , selectCategories)
    random.addEventListener('click' , selectRandom)
    search.addEventListener('click' , selectSearch)
    getJokeBtn.addEventListener('click' , showJoke)




