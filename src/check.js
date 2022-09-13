import { jokesFavouriteColection } from "./app"
import {getUrlFromCategories} from "./getUrl"

export function isFavourite(idJoke){
    return jokesFavouriteColection.find((favorite) => favorite.id === idJoke);
}

export function checkedCategories() {
    const categoriesRadio = document.querySelectorAll('.radio-categories')
    categoriesRadio.forEach((category) => {
        if (!category.checked) {
            category.parentElement.classList.remove('active-radio')

        }
        else {
            category.parentElement.classList.add('active-radio')
            getUrlFromCategories(category)
        }
    })
}