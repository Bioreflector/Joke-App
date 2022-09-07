import { jokesFavouriteColection } from "./app"
export function checkFavouriteJokes(idJoke){
    const status= [true]
    jokesFavouriteColection.filter((item) =>{
            if(item.id == idJoke) status.push(false)
        })
    return status.includes(false) ? false : true
}