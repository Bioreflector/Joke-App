import {searchInput} from "./selectors" 
import {enableGetJokeBtn,disableGetJokeBtn} from "./helpers"
 
export const urlCategory = 'https://api.chucknorris.io/jokes/categories'

export let url = 'https://api.chucknorris.io/jokes/random'

export function getUrlFromCategories(category) {
    url = `https://api.chucknorris.io/jokes/random?category=${category.value}`
}
export function getUrlFromRandom() {
    url = 'https://api.chucknorris.io/jokes/random'
}
export function getUrlFronInput() {
    let valueFromInput = searchInput.value
    url = `https://api.chucknorris.io/jokes/search?query=${valueFromInput}`
    if (searchInput.value.length >= 3) {
        enableGetJokeBtn()
    }
    else {
        disableGetJokeBtn()
    }
}