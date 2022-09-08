import {getJokeBtn , searchInput , categoriesContainer} from "./selectors"
import {getUrlFromRandom} from "./getUrl"

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
export function clearJoke(container) {
    container.innerHTML = ''
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