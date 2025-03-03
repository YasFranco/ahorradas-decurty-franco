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
const $formCategoryEdit = $("#form-category-edit")
const $inputEditCategory = $("#input-edit-category")
// ---- CATEGORIA SELECT ------
const $selectCategory = $("#select-new-op-category");
const $selectCategoryFilter = $("#category-filter")
// ----- OPERACIONES
const $formNewOp = $('#new-op-form-container');
const $sectOperations = $('#div-show-operations');
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

$formNewOp.addEventListener('submit', () => {
    $sectNewOp.classList.add("hidden")
    $sectCategories.classList.add("hidden")
    $sectReports.classList.add("hidden")
    $sectBalance.classList.remove("hidden")
})

// ---- MOSTRAR OPERACIONES ----

const showOperations = () => {
    //const dataNewOperations = getData("dataOperations")
    const dataNewOperations = getData("operation")
    $sectOperations.innerHTML = "";

    for (const {id, description, amount, category, date} of dataNewOperations) {
        $sectOperations.innerHTML += ` 
            <div class="flex flex-col mt-8">
                <div class="hidden flex lg:block lg:flex">
                    <p class="w-2/5">Descripción</p>
                    <p class="w-2/5">Categoría</p>
                    <p class="w-2/5">Fecha</p>
                    <p class="w-2/5">Monto</p>
                    <p class="w-2/5">Acciones</p>
                </div>
                <div class="flex">
                <p class="w-2/5">${description}</p>
                <p class="w-2/5">${category}</p>
                <p class="w-2/5">${date}</p>
                <p class="w-2/5">${amount}</p>
                <div class="w-2/5">
                    <button id="${id}" >Editar</button>
                    <button id="${id}" >Eliminar</button>
                </div>
            </div>
             </div>`
    }
}


// -----CATEGORIAS--------



// FUNCION MOSTRAR CATEGORIAS 
const showCategories = (arrayCategories) => {

    $divCategoriesContainer.innerHTML = "";

    for (const { id, nameCategory } of arrayCategories) {
        $divCategoriesContainer.innerHTML += `<div class="flex justify-between p-4">
    <ul><li class="border px-2 rounded-lg bg-emerald-100 text-emerald-600">${nameCategory}</li></ul> 
    <div>
       <button id="${id}" class="button-edit px-2 text-sky-700">Editar</button>
       <button id="${id}" class="button-delete px-2 text-sky-700" >Eliminar</button>
    </div>
    </div>
    `
    }

    eventDeleteEdit()
    reloadCategories()
}

const eventDeleteEdit = () => {
    const $$arrayButtonsDelete = $$(".button-delete");
    const $$arrayButtonsEdit = $$(".button-edit")

    for (const button of $$arrayButtonsDelete) {
        button.addEventListener("click", (e) => {
            const newArray = deleteData(e.target.id)
            showCategories(newArray)
        })
    }

    for (const button of $$arrayButtonsEdit) {
        button.addEventListener("click", (e) => {
            $sectBalance.classList.add("hidden");
            $sectReports.classList.add("hidden")
            $sectNewOp.classList.add("hidden")
            $formNewCategory.classList.add("hidden")
            $sectCategories.classList.remove("hidden");
            $formCategoryEdit.classList.remove("hidden")

            const data = getData("category")
            const findCategory = data.find(elem => elem.id === e.target.id);

            $inputEditCategory.value = findCategory.nameCategory
            $formCategoryEdit.id = findCategory.id
        })
    }
}

$formCategoryEdit.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = getData("category");
    const findCategory = data.find(elem => elem.id === event.target.id);

    const newData = {
        nameCategory: event.target[0].value
    }

    const modifiedData = editData(findCategory.id, newData);

    showCategories(modifiedData)
})


// AGREGAR NUEVA CATEGORIA
$formNewCategory.addEventListener("submit", (event) => {
    event.preventDefault();

    // Hago esto para evitar espacios vacios y evitar que se ingrese algo vacio. 
    const category = event.target[0].value.trim();
    if (!category) return;

    const NewCategory = {
        id: crypto.randomUUID(),
        nameCategory: category
    };

    addCategory(NewCategory)
    reloadCategories()
    const data = getData("category");
    showCategories(data)

    // Borrar el contenido del formulario una vez presionado el boton agregar 
    event.target.reset()
})


//----- GUARDAR INFO NUEVA OPERACION -----


$formNewOp.addEventListener('submit', (event) => {
    event.preventDefault();

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
    showOperations(getData)
    event.target.reset()
})



// ReloadCategories reduce a una función la actualización de categorias de agregar, editar y eliminar en los selects de balance, se solucionan errores y se agrega la función reloadCategories a la línea 162 y 101 para que funcione correctamente en agregar,editar y eliminar.
const reloadCategories = () => {
    const dataCategoryFilter = getData("category");
    $selectCategoryFilter.innerHTML = ""
    for (const { nameCategory } of dataCategoryFilter) {
        $selectCategoryFilter.innerHTML += `<option value=${nameCategory} >${nameCategory}</option>`
    }
    const dataCategory = getData("category");
    $selectCategory.innerHTML = ""
    for (const { nameCategory } of dataCategory) {
        $selectCategory.innerHTML += `<option value=${nameCategory} >${nameCategory}</option>`
    }
}


window.onload = () => {
    const data = getData("category");
    showCategories(data);
    showOperations();
}
