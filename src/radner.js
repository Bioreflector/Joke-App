import {checkedCategories} from "./check"
import {categoriesContainer} from "./selectors"

function createCategory(category){
    const labelCateegory = document.createElement('label')
    labelCateegory.for = category
    labelCateegory.innerText = category
    labelCateegory.classList.add('categories-lable')
    const inputCategory = document.createElement('input')
    inputCategory.type = 'radio'
    inputCategory.name = 'categoriesRadio'
    inputCategory.id = category
    inputCategory.classList.add('radio-categories')
    inputCategory.addEventListener('click' , checkedCategories)
    inputCategory.value = category
    labelCateegory.insertAdjacentElement('beforeend' , inputCategory)
    return labelCateegory
}
export function randerCategory(categoriesArray) {
    const categoriesList = categoriesArray.map((item) => {
        return createCategory(item)
    })
    categoriesList.forEach(item => categoriesContainer.insertAdjacentElement('beforeend' , item))
}