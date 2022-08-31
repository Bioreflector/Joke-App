
const jokesFavouriteColection = []

function FormSerchJoike(form){
const jokesContainer = document.querySelector('.jokes-container')
const categoriesContainer = document.querySelector('.categories-container')
const getJokeBtn = form.querySelector('button')
const categoriesArray = ["animal","career","celebrity","dev","explicit","fashion","food","history","money","movie","music","political","religion","science","sport","travel"]
const {random , categories , search , searchInput} = form
let url = 'https://api.chucknorris.io/jokes/random'

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

    function rander(jokeArr){
        const joke = jokeArr.map((item) =>{
            if(item.categories.length === 0){
                return `<div class = "joke-card">
            <span class="card-joke-id">ID: <a href="https://api.chucknorris.io/jokes/${item.id}">${item.id}</a></span>
            <p class="joke-text">${item.value}</p>
            <div class = "card-box-inf">
            <p class="update-inf-card">Last update:</p>
            </div>
            </div>`  
            }
            else{
                return `<div class = "joke-card">
            <span class="card-joke-id">ID: <a href="https://api.chucknorris.io/jokes/${item.id}">${item.id}</a></span>
            <p class="joke-text">${item.value}</p>
            <div class = "card-box-inf">
            <p class="update-inf-card">Last update:</p>
            <p class ="category-card">${item.categories}</p>
            </div>
            </div>`
            } 
        }).join("")
        jokesContainer.innerHTML = joke
    }

    
    function ansureArray(arr){
        return Array.isArray(arr) ? arr : [arr]
    }
        async function showJoke(event){
        event.preventDefault()
        const jokes = await getFetch(url)
        if(search.checked){
            const {result} = jokes
            rander(result)
        }
        else{
            rander(ansureArray(jokes))
        }  
    }
    
    searchInput.addEventListener('input' , getUrlFronInput)
    categoriesRadio.forEach(item => item.addEventListener('click' , checkedCategories))
    categories.addEventListener('click' , selectCategories)
    random.addEventListener('click' , selectRandom)
    search.addEventListener('click' , selectSearch)
    getJokeBtn.addEventListener('click' , showJoke)
}

const formSearchJoke = FormSerchJoike(document.formSearchJoke)


