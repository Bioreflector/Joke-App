const favouriteShowBtn =document.querySelector('.favourite-show-btn')
favouriteShowBtn.addEventListener('click', showFavourite)
function showFavourite(){
    const favouriteWrapper = document.querySelector('.favourite-wrapper')
    favouriteWrapper.classList.toggle('show-favourite')
}

const btn = document.querySelector('.test-btn')
btn.addEventListener('click', ()=>{
    console.log('1')
})