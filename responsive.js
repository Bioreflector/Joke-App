const favouriteShowBtn =document.querySelector('.favourite-show-btn')
const favouriteWrapper = document.querySelector('.favourite-wrapper')
function showFavourite(){
    favouriteWrapper.classList.toggle('show-favourite')
    favouriteShowBtn.classList.toggle('favourite-show-btn_active')
}
favouriteShowBtn.addEventListener('click', showFavourite)