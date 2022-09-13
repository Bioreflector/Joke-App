 import {search , jokesContainer} from "./selectors"
 import {url,urlCategory} from "./getUrl"
 import {randerCategory,rander} from "./radner"
 import {clearJoke,ensureArray} from "./helpers"

 export let jokes

 export async function getCategories(){
    const response = await fetch(urlCategory)
    const categoriesArray = await response.json()
       randerCategory(categoriesArray)
   }
getCategories()

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
        rander()
    }
    else {
        jokes = ensureArray((jokes))
        rander()
    }
}