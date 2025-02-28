let functions
import("./functions.js").then((module) => {
    functions = module.default;
    // console.log(functions);
  });


const $ = (elem) => document.querySelector(elem);
const $$ = (elem) => document.querySelectorAll(elem);


// -----FUNCIÓN MENU HAMBUERGUESA Y VIEWS-----

// FUNCIÓN MENU HAMBUERGUESA Y VIEWS 


const $btnMenu = $('#button-menu');
const $btnMenuClose = $('#button-menu-close');
const $navMenuMobile = $('#div-mobile-nav-list');
const $btnBalance = $('#nav-balance');
const $btnCategories = $('#nav-categorias');
const $btnReports = $('#nav-reportes');
const $btnNewOp = $('#btn-new-operation');
const $sectBalance = $('#sect-balance');
const $sectNewOp = $('#sect-new-opetarion');
const $sectCategories = $('#sect-categories');
const $sectReports = $('#sect-reports');
// ----- CONSTANTES SECCIÓN CATEGORIAS -------
const $divCategoriesContainer = $("#categories-container");
const $formNewCategory = $("#form-category");
// ---- CATEGORIA SELECT ------
const $selectCategory = $("#select-new-op-category");
const $selectCategoryFilter = $("#category-filter")

// ICONO Y VISTA MOBILE MENU
$btnMenu.addEventListener('click', () => {
    $btnMenu.classList.add("hidden");
    $btnMenuClose.classList.remove("hidden")
    $navMenuMobile.classList.remove("hidden")

})

$btnMenuClose.addEventListener('click', () => {
    $btnMenu.classList.remove("hidden");
    $btnMenuClose.classList.add("hidden")
    $navMenuMobile.classList.add("hidden")
})

// VISTAS DE BALANCE, CATEGORÍAS Y REPORTES
$btnCategories.addEventListener('click', () => {
    $sectBalance.classList.add("hidden");
    $sectReports.classList.add("hidden")
    $sectNewOp.classList.add("hidden")
    $sectCategories.classList.remove("hidden")
});

$btnReports.addEventListener('click', () => {
    $sectBalance.classList.add("hidden");
    $sectCategories.classList.add("hidden")
    $sectNewOp.classList.add("hidden")
    $sectReports.classList.remove("hidden")
})

$btnBalance.addEventListener('click', () => {
    $sectCategories.classList.add("hidden");
    $sectReports.classList.add("hidden")
    $sectNewOp.classList.add("hidden")
    $sectBalance.classList.remove("hidden")
})
// VISTA NUEVA OPERACIÓN
$btnNewOp.addEventListener('click', () => {
    $sectBalance.classList.add("hidden");
    $sectCategories.classList.add("hidden")
    $sectReports.classList.add("hidden")
    $sectNewOp.classList.remove("hidden")
})

//----- GUARDAR INFO NUEVA OPERACION -----
const $formNewOp = $('#new-op-form-container')

$formNewOp.addEventListener('submit', (event) => {
    event.preventDefault()

    // console.log("hola");

    const newOp = {
        id: crypto.randomUUID(),
        description: event.target[0].value,
        amount: Number(event.target[1].value),
        type: event.target[2].value,
        category: event.target[3].value,
        date: event.target[4].value
    }

    addOperation(newOp)
})


// -----CATEGORIAS--------

let categories = [{
    id: crypto.randomUUID,
    nameCategory: "Trabajo",
},
{
    id: crypto.randomUUID,
    nameCategory: "Servicios"
}];

// FUNCION MOSTRAR CATEGORIAS 
const showCategories = (arrayCategories) => {

   $divCategoriesContainer.innerHTML = "";

   for (const {id, nameCategory} of arrayCategories) {
    $divCategoriesContainer.innerHTML += `<div class="flex justify-between p-4">
    <ul><li class="border px-2 rounded-lg bg-emerald-100 text-emerald-600">${nameCategory}</li></ul> 
    <div>
       <button class="button-edit px-2 text-sky-700">Editar</button>
       <button class="button-delete px-2 text-sky-700" >Eliminar</button>
    </div>
    </div>
    `
   }

   eventDeleteEdit()

}

const eventDeleteEdit = () => {
    const $$arrayButtonsDelete = $$(".button-delete");
    const $$arrayButtonsEdit = $$(".button-edit")

    for (const button of $$arrayButtonsDelete) {
        console.log(button)
    }
}







// AGREGAR NUEVA CATEGORIA
$formNewCategory.addEventListener("submit", (event) => {
    event.preventDefault();

    // Hago esto para evitar espacios vacios y evitar que se ingrese algo vacio. 
    const category = event.target[0].value.trim();
    if(!category) return;

    const NewCategory = {
        id: crypto.randomUUID(),
        nameCategory: category
    };

    addCategory(NewCategory)

    const data = getData("category");
    showCategories(data)

    // Borrar el contenido del formulario una vez presionado el boton agregar 
    event.target.reset()
})


$selectCategory.addEventListener("click", () =>{
    const dataCategory = getData("category");
    // console.log("dataCategory --->", dataCategory)

    for (const {nameCategory} of dataCategory) {
        $selectCategory.innerHTML += `<option value=${nameCategory} >${nameCategory}</option>`
     }
},{once: true})

$selectCategoryFilter.addEventListener("click", () =>{
    const dataCategoryFilter = getData("category");
    // console.log("dataCategory --->", dataCategory)

    for (const {nameCategory} of dataCategoryFilter) {
        $selectCategoryFilter.innerHTML += `<option value=${nameCategory} >${nameCategory}</option>`
     }
},{once: true})




window.onload = () => {
    const data = getData("category");
    showCategories(data);
}
