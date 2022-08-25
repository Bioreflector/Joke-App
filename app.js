const jokesColection =[]
const jokesFavouriteColection = []

function FormSerchJoike(form){
    const getJokeBtn = form.querySelector('button')
    const {random , categories , search , searchInput} = form

    let url = 'https://api.chucknorris.io/jokes/random'

    random.checked = true
    

    function checkedRandom(){
        if(random.checked){
            searchInput.classList.add('hide-search-field')
            url = 'https://api.chucknorris.io/jokes/random'
        }
    }
    
    search.addEventListener('change' , () =>{
        if(search.checked){
            searchInput.classList.remove('hide-search-field')
            url ='https://api.chucknorris.io/jokes/dpk2_epftfgo0cgpfqcpgq' 
        }
    })
    


    function getFetch(url){
        return fetch(url).then(data => data.json())
    }
    async function getCharacters(){
       jokesColection.push(await getFetch(url))
    }

    function rander(){
            item = jokesColection[jokesColection.length-1]
            // console.log(item)
            const jokeCard = document.createElement('div')
            jokeCard.classList.add('joke-card')
            const jokesText = document.createElement('p')
            jokesText.innerText = `${item.value}`
            jokeCard.insertAdjacentElement('beforeend' , jokesText)
            form.insertAdjacentElement('afterend' , jokeCard)
            
            
            
        
    }

    function getJoike(event){
        event.preventDefault()
        getCharacters()
        setTimeout((rander), 1000)
    }

    random.addEventListener('change' , checkedRandom)
    getJokeBtn.addEventListener('click' , getJoike)
}

const formSearchJoke = FormSerchJoike(document.formSearchJoke)
console.log(jokesColection)


