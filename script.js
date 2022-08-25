const favouriteShowBtn =document.querySelector('.favourite-show-btn')
function showFavourite(){
    const favouriteWrapper = document.querySelector('.favourite-wrapper')
    favouriteWrapper.classList.toggle('show-favourite')
}
favouriteShowBtn.addEventListener('click', showFavourite)

const jokesColection =[]

function FormSerchJoike(form){
    const getJokeBtn = form.querySelector('button')
    const {random , categories , search , searchInput} = form
    let url
    
    function checkedRandom(){
        if(random.checked){
            searchInput.classList.add('hide-search-field')
            url = 'https://api.chucknorris.io/jokes/random'
        }
    }
    search.addEventListener('change' , () =>{
        if(search.checked){
            searchInput.classList.remove('hide-search-field')
        }
    })
    random.addEventListener('change' , checkedRandom)


    function getFetch(url){
        return fetch(url).then(data => data.json())
    }
    async function getCharacters(){
        jokesColection.push(await getFetch(url))
    }

    function rander(){
            console.log(jokesColection)
            // const jokeCard = document.createElement('div')
            // jokeCard.classList.add('joke-card')
            // const jokesText = document.createElement('p')
            // jokesText.innerText = `${item.value}`
            // jokeCard.insertAdjacentElement('beforeend' , jokesText)
            // form.insertAdjacentElement('afterend' , jokeCard)
            
        
    }

    function getJoike(event){
        event.preventDefault()
        getCharacters()
        rander()
    }
    getJokeBtn.addEventListener('click' , getJoike)
}

const formSearchJoke = FormSerchJoike(document.formSearchJoke)


