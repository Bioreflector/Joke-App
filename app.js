
const jokesFavouriteColection = []

function FormSerchJoike(form) {
    const getJokeBtn = form.querySelector('button')
    const { random, categories, search, searchInput } = form
    let joke

    let url = 'https://api.chucknorris.io/jokes/random'

    random.checked = true
    function checkedRandom() {
        if (random.checked) {
            searchInput.classList.add('hide-search-field')
            url = 'https://api.chucknorris.io/jokes/random'
        }
    }
    search.addEventListener('click', () => {
        if (search.checked) {
            searchInput.classList.remove('hide-search-field')

        }
    })

    function getFetch(url) {
        return fetch(url).then(data => data.json())
    }
    async function getJoikes() {
        //    jokesColection.push(await getFetch(url))
        joke = await getFetch(url)
    }

    function rander() {
        const jokeCard = document.createElement('div')
        jokeCard.classList.add('joke-card')
        const jokesText = document.createElement('p')
        jokesText.innerText = `${joke.value}`
        jokeCard.insertAdjacentElement('beforeend', jokesText)
        form.insertAdjacentElement('afterend', jokeCard)

    }

    async function showJoke(event) {
        event.preventDefault()
        await getJoikes()
        rander()


    }

    random.addEventListener('click', checkedRandom)
    getJokeBtn.addEventListener('click', showJoke)
}

const formSearchJoke = FormSerchJoike(document.formSearchJoke)


