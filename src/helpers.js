import {getJokeBtn , searchInput , categoriesContainer ,favouriteShowBtn , favouriteWrapper ,random, categories, search} from "./selectors"
import {getUrlFromRandom ,getUrlFronInput} from "./getUrl"

export function disableGetJokeBtn() {
    getJokeBtn.disabled = true
    getJokeBtn.classList.add('joke-find__btn_disabled')
}
export function enableGetJokeBtn() {
    getJokeBtn.disabled = false
    getJokeBtn.classList.remove('joke-find__btn_disabled')
}
export function getTimeLastUpdate(timeLastUpdate) {
    const timeUpdate = new Date(timeLastUpdate)
    const time = new Date()
    const timeDifference = time.getTime() - timeUpdate.getTime()
    const hoursAgo = parseInt(timeDifference / (1000 * 60 * 60))
    return hoursAgo
}
export function ensureArray(arr) {
    return Array.isArray(arr) ? arr : [arr]
}
export function selectRandom() {
    searchInput.classList.add('hide-search-field')
    categoriesContainer.classList.add('hide-categories')
    searchInput.value = ''
    getUrlFromRandom()
    enableGetJokeBtn()
}
export function selectCategories() {
    categoriesContainer.classList.remove('hide-categories')
    searchInput.classList.add('hide-search-field')
    enableGetJokeBtn()
    searchInput.value = ''

}
export function selectSearch() {
    categoriesContainer.classList.add('hide-categories')
    searchInput.classList.remove('hide-search-field')
    disableGetJokeBtn()
}
export function showFavourite(){
    favouriteWrapper.classList.toggle('show-favourite')
    favouriteShowBtn.classList.toggle('favourite-show-btn_active')
}

searchInput.addEventListener('input', getUrlFronInput)
categories.addEventListener('click', selectCategories)
random.addEventListener('click', selectRandom)
search.addEventListener('click', selectSearch)
favouriteShowBtn.addEventListener('click', showFavourite)