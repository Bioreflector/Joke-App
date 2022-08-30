
const jokesFavouriteColection = []

function FormSerchJoike(form){
const jokesContainer = document.querySelector('.jokes-container')
const categoriesContainer = document.querySelector('.categories-container')
const getJokeBtn = form.querySelector('button')
const categoriesArray = ["animal","career","celebrity","dev","explicit","fashion","food","history","money","movie","music","political","religion","science","sport","travel"]
const {random , categories , search , searchInput} = form
let url = 'https://api.chucknorris.io/jokes/random'
let joke
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
    async function getJoikes(){
        joke = await getFetch(url)
    }

    function rander(){
            // const jokeCard = document.createElement('div')
            // jokeCard.classList.add('joke-card')
            // const jokesText = document.createElement('p')
            // jokesText.innerText = `${joke.value}`
            // jokeCard.insertAdjacentElement('beforeend' , jokesText)
            // jokesContainer.insertAdjacentElement('afterend' , jokeCard)
            jokesContainer.innerHTML = `<div class = "joke-card">
            <span class="card-joke-id">ID: <a href="https://api.chucknorris.io/jokes/${joke.id}">${joke.id}</a></span>
            <p class="joke-text">${joke.value}</p>
            <div class = "card-box-inf">
            <p class="update-inf-card">Last update:</p>
            <p class ="category-card">${joke.categories}</p>
            </div>
            </div>`
        
    }

    async function showJoke(event){
        event.preventDefault()
        await getJoikes()
        rander() 
    }
    
    categoriesRadio.forEach(item => item.addEventListener('click' , checkedCategories))
    categories.addEventListener('click' , selectCategories)
    random.addEventListener('click' , selectRandom)
    search.addEventListener('click' , selectSearch)
    getJokeBtn.addEventListener('click' , showJoke)
}

const formSearchJoke = FormSerchJoike(document.formSearchJoke)


