
const jokesFavouriteColection = []

function FormSerchJoike(form){
const jokesContainer = document.querySelector('.jokes-container')
const categoriesContainer = document.querySelector('.categories-container')
const getJokeBtn = form.querySelector('button')
const categoriesArray = ["animal","career","celebrity","dev","explicit","fashion","food","history","money","movie","music","political","religion","science","sport","travel"]
const {random , categories , search , searchInput} = form
let url = 'https://api.chucknorris.io/jokes/random'
// let joke
random.checked = true

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
    url = 'https://api.chucknorris.io/jokes/random'
    
}
const categoriesRadio = document.querySelectorAll('.radio-categories')
function checkedCategories(){
    categoriesRadio.forEach((radio) =>{
        if(!radio.checked){
            radio.parentElement.classList.remove('active-radio')
            
        }
        else{
            radio.parentElement.classList.add('active-radio')
            url = `https://api.chucknorris.io/jokes/random?category=${radio.value}`
        }
    })
}
function getUrlFronInput(){
    let valueFromInput = searchInput.value
    url = `https://api.chucknorris.io/jokes/search?query=${valueFromInput}`
    
}

function selectCategories(){
        categoriesContainer.classList.remove('hide-categories')
        searchInput.classList.add('hide-search-field')
        checkedCategories()

    }
function selectSearch(){
        categoriesContainer.classList.add('hide-categories')
        searchInput.classList.remove('hide-search-field')
    }


    function getFetch(url){
        return fetch(url).then(data => data.json())
    }
    // async function getJoikes(){
    //     joke = await getFetch(url)
    // }

    function rander(jokes){
            if(jokes.categories.length === 0){
                jokesContainer.innerHTML = `<div class = "joke-card">
            <span class="card-joke-id">ID: <a href="https://api.chucknorris.io/jokes/${jokes.id}">${jokes.id}</a></span>
            <p class="joke-text">${jokes.value}</p>
            <div class = "card-box-inf">
            <p class="update-inf-card">Last update:</p>
            </div>
            </div>`
            }
            else{
                jokesContainer.innerHTML = `<div class = "joke-card">
            <span class="card-joke-id">ID: <a href="https://api.chucknorris.io/jokes/${jokes.id}">${jokes.id}</a></span>
            <p class="joke-text">${jokes.value}</p>
            <div class = "card-box-inf">
            <p class="update-inf-card">Last update:</p>
            <p class ="category-card">${jokes.categories}</p>
            </div>
            </div>`
            }
            
        
    }

    function randerForSearch(jokes){
        const {result} = jokes
        const joke = result.map((item) =>{
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

    

        async function showJoke(event){
        event.preventDefault()
        const jokes = await getFetch(url)
        // await getJoikes()
        if(search.checked){
            randerForSearch(jokes)
        }
        else{
            rander(jokes)
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


