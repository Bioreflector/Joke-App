import { jokesFavouriteColection } from "./app"
import {getUrlFromCategories} from "./getUrl"

export function checkFavouriteJokes(idJoke){
    const status= [true]
    jokesFavouriteColection.filter((item) =>{
            if(item.id == idJoke) status.push(false)
        })
    return status.includes(false) ? false : true
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