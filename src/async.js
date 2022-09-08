 import {search , jokesContainer} from "./selectors"
 import {ensureArray , clearJoke} from "./helpers"
 import {rander} from "./app"
 import {url,urlCategory} from "./getUrl"
 import {randerCategory} from "./radner"

 export let jokes

 export async function getCategories(urlCategory){
    const response = await fetch(urlCategory)
    const categoriesArray = await response.json()
       randerCategory(categoriesArray)
   }
getCategories(urlCategory)

 async function getFetch(urljoke) {
    const resopnse = await fetch(urljoke)
    const joke = await resopnse.json()
    return joke
}
 export async function showJoke(event) {
    event.preventDefault()
    jokes = await getFetch(url)
    clearJoke(jokesContainer)
    if (search.checked) {
        const { result } = jokes
        jokes = result
        rander(jokes)
    }
    else {
        jokes = ensureArray((jokes))
        rander(jokes)
    }
}