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
const $editFormNewOp = $("#edit-op-form-container");
const $divFormNewOp = $('#div-new-operation');
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


const showOperations = (arrayOperations) => {
    const $sectOpNone = $('#div-show-operations-none');
    $sectOpNone.classList.add("hidden");
    
    // const dataNewOperations = getData("operation")
    $sectOperations.innerHTML = "";

    if (arrayOperations.length === 0) {
        $sectOpNone.classList.remove("hidden");
    }

    // {id, description, amount, category, date}
    for (const operation of arrayOperations) {
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
                <p class="w-2/5">${operation.description}</p>
                <p class="w-2/5">${operation.category}</p>
                <p class="w-2/5">${operation.date}</p>
                <p class="w-2/5">${operation.amount}</p>
                <div class="w-2/5">
                    <button id="${operation.id}" class="button-edit-op px-2 text-sky-700" >Editar</button>
                    <button id="${operation.id}" class="button-delete-op px-2 text-sky-700">Eliminar</button>
                </div>
            </div>
             </div>`
    }

    eventDeleteEditOperation();
}




// -----CATEGORIAS--------



// FUNCION MOSTRAR CATEGORIAS 
const showCategories = (arrayCategories) => {

    $divCategoriesContainer.innerHTML = "";

    for (const { id, nameCategory } of arrayCategories) {
        $divCategoriesContainer.innerHTML += `<div class="flex justify-between p-4">
    <ul><li class="border px-2 rounded-lg bg-emerald-100 text-emerald-600">${nameCategory}</li></ul> 
    <div class="w-2/5">
       <button id="${id}" class="button-edit px-2 text-sky-700">Editar</button>
       <button id="${id}" class="button-delete px-2 text-sky-700" >Eliminar</button>
    </div>
    </div>
    `
    }

    eventDeleteEditCategory()
    reloadCategories()
}

const eventDeleteEditCategory = () => {
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

const eventDeleteEditOperation = () => {
    const $$arrayButtonsDelete = $$(".button-delete-op");
    const $$arrayButtonsEdit = $$(".button-edit-op")

    for (const button of $$arrayButtonsDelete) {
        button.addEventListener("click", (e) => {
            const newArray = deleteData(e.target.id)
            showOperations(newArray)
        })
    }

    for (const button of $$arrayButtonsEdit) {
        button.addEventListener("click", (e) => {
            $sectBalance.classList.add("hidden");
            $sectReports.classList.add("hidden")
            $sectNewOp.classList.remove("hidden")
            $divFormNewOp.classList.add("hidden")
            $formNewOp.classList.add("hidden")
            $formEditOp.classList.remove("hidden")
            $formNewCategory.classList.add("hidden")
            $sectCategories.classList.add("hidden");
            $formCategoryEdit.classList.add("hidden")

            const data = getData("operation")
            const findOperation = data.find(elem => elem.id === e.target.id);

            $editFormNewOp.value = findOperation.description
            $editFormNewOp.value = findOperation.type
            $editFormNewOp.value = findOperation.category
            $editFormNewOp.value = findOperation.date
            $editFormNewOp.value = findOperation.amount
            
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


    const newOp = {
        
        id: crypto.randomUUID(),
        description: event.target[0].value,
        amount: Number(event.target[1].value),
        type: event.target[2].value,
        category: event.target[3].value,
        date: event.target[4].value,
    }

    addOperation(newOp)
    const data = getData("operation");
    showOperations(data)
    event.target.reset()
})



// ReloadCategories reduce a una función la actualización de categorias de agregar, editar y eliminar en los selects de balance, se solucionan errores y se agrega la función reloadCategories a la línea 162 y 101 para que funcione correctamente en agregar,editar y eliminar.
const reloadCategories = () => {
    const dataCategoryFilter = getData("category");
    $selectCategoryFilter.innerHTML = `<option value="all">Todos</option>`
    for (const { nameCategory } of dataCategoryFilter) {
        $selectCategoryFilter.innerHTML += `<option value=${nameCategory} >${nameCategory}</option>`
    }
    const dataCategory = getData("category");
    $selectCategory.innerHTML = ""
    for (const { nameCategory } of dataCategory) {
        $selectCategory.innerHTML += `<option value=${nameCategory} >${nameCategory}</option>`
    }
}

// --------- SECCIÓN FILTROS --------------
// filtrar por tipo: ganancia o gastos
$("#type-filter").addEventListener("input", (e) => {
    const data = getData("operation");
    
    if(e.target.value !== "all"){
        const filterType = data.filter( operation => operation.type === e.target.value);
        // console.log("aca muestra la data filtrada", filterType)
        showOperations(filterType)
    } else {
        showOperations(data)
    }
    // console.log(e.target.value)
    // console.log(data)
})

// filtrar por categoria 
$("#category-filter").addEventListener("input", (e) => {
    const dataOperation = getData("operation");

    if(e.target.value !== "all"){
        const filterCategory = dataOperation.filter(operation => operation.category === e.target.value)
        showOperations(filterCategory)
    } else {
        showOperations(dataOperation)
    }

    // console.log('categoria filtrada', filterCategory)
    
})

// filtrar desde x fecha 
$("#date-filter").addEventListener("input", (e) => {
    const data = getData("operation");

    const filterDate = data.filter(operation => operation.date >= e.target.value);
    showOperations(filterDate)
});

// ordenar por 
$("#order-filter").addEventListener("input", (e) => {
    const data = getData("operation");
    let dataDup = [...data]

    // console.log(e.target.value)    
    if(e.target.value === "more-recent"){
        const filterMoreRecent = dataDup.sort((a,b) => b.date - a.date)
        return showOperations(filterMoreRecent);
    } else if(e.target.value === "less-recent"){
        const filterLessRecent = dataDup.sort((a,b) => a.date - b.date);
        return showOperations(filterLessRecent)
    } else if(e.target.value === "bigger-amount"){
        const filterBiggerAmount = dataDup.sort((a,b) => b.amount - a.amount) ;
        return showOperations(filterBiggerAmount)
    } else if(e.target.value === "smaller-amount"){
        const filterSmallerAmount = dataDup.sort((a,b) => a.amount - b.amount) ;
        return showOperations(filterSmallerAmount)
    } else if(e.target.value === "a-z"){
        const filterAZ = dataDup.sort((a,b) => a.description.localeCompare(b.description));
        return showOperations(filterAZ)
    } else if(e.target.value === "z-a"){
        const filterZA = dataDup.sort((a,b) => b.description.localeCompare(a.description));
        return showOperations(filterZA)
    }
})

window.onload = () => {
    const data = getData("category");
    showCategories(data); 
    const operations = getData("operation"); 
    showOperations(operations); 
}
