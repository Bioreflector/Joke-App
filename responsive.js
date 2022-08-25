const favouriteShowBtn =document.querySelector('.favourite-show-btn')
function showFavourite(){
    const favouriteWrapper = document.querySelector('.favourite-wrapper')
    favouriteWrapper.classList.toggle('show-favourite')
}
favouriteShowBtn.addEventListener('click', showFavourite)