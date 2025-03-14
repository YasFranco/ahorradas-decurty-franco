let functions
import("./functions.js").then((module) => {
    functions = module.default;
    // console.log(functions);
});


const $ = (elem) => document.querySelector(elem);
const $$ = (elem) => document.querySelectorAll(elem);

// ------------------ CONSTANTES DOM --------------------
const $btnMenu = $('#button-menu')
const $btnMenuClose = $('#button-menu-close');
const $navMenuMobile = $('#div-mobile-nav-list');
const $sectBalance = $('#sect-balance');
const $sectNewOp = $('#sect-new-opetarion');
const $sectCategories = $('#sect-categories');
const $sectReports = $('#sect-reports');
// categorias
const $divCategoriesContainer = $("#categories-container");
const $formNewCategory = $("#form-category");
const $formCategoryEdit = $("#form-category-edit")
const $selectCategory = $("#select-new-op-category");
const $selectCategoryFilter = $("#category-filter")
// operaciones
const $formNewOp = $('#new-op-form-container');
const $sectOperations = $('#div-show-operations');
const $editFormNewOp = $("#edit-op-form-container");


// --------------BOTONES VISTAS -----------------------
$btnMenu.addEventListener('click', () => {
    showElement([$btnMenuClose, $navMenuMobile])
    hideElement([$btnMenu])
})

$btnMenuClose.addEventListener('click', () => {
    showElement([$btnMenu])
    hideElement([$btnMenuClose, $navMenuMobile])
})

$('#nav-categorias').addEventListener('click', () => {
    showElement([$sectCategories])
    hideElement([$sectBalance, $sectReports, $sectNewOp])
});

$('#nav-reportes').addEventListener('click', () => {
    showElement([$sectReports])
    hideElement([$sectNewOp, $sectCategories, $sectBalance])
})

$('#nav-balance').addEventListener('click', () => {
    showElement([$sectBalance]);
    hideElement([$sectCategories, $sectReports, $sectNewOp])
})

$('#btn-new-operation').addEventListener('click', () => {
    showElement([$sectNewOp]);
    hideElement([$sectBalance, $sectCategories, $sectReports])
})

// -------------- SECCION OPERACIONES ---------------------


const showOperations = (arrayOperations) => {
    const $sectOpNone = $('#div-show-operations-none');
    $sectOpNone.classList.add("hidden");

    $sectOperations.innerHTML = "";

    if (arrayOperations.length === 0) {
        $sectOpNone.classList.remove("hidden");
    }


    for (const operation of arrayOperations) {

        const sign = operation.type === "expenses" ? "-" : "+";
        const colorClass = operation.type === "expenses" ? "text-red-500" : "text-green-500";

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
                <p class="w-2/5 font-bold ${colorClass}">${sign} $${operation.amount}</p>
                <div class="w-2/5">
                    <button id="${operation.id}" class="button-edit-op px-2 text-sky-700" >Editar</button>
                    <button id="${operation.id}" class="button-delete-op px-2 text-sky-700">Eliminar</button>
                </div>
            </div>
             </div>`
  
    }

    eventDeleteEditOperation();
    updateBalance();
}

const eventDeleteEditOperation = () => {
    const $$arrayButtonsDeleteOp = $$(".button-delete-op");
    const $$arrayButtonsEditOp = $$(".button-edit-op")

    for (const button of $$arrayButtonsDeleteOp) {
        button.addEventListener("click", (e) => {
            const newArray = deleteDataOp(e.target.id)

            showOperations(newArray)
        })
    }

    for (const button of $$arrayButtonsEditOp) {
        button.addEventListener("click", (e) => {

            showElement([$sectNewOp, $editFormNewOp, $('#title-edit-operation')]);
            hideElement([$sectCategories, $sectReports, $sectBalance, $formNewOp, $('#title-new-operation')])

            const data = getData("operation")
            const findOperation = data.find(elem => elem.id === e.target.id);

            $editFormNewOp.id = findOperation.id;

            $("#input-edit-op-description").value = findOperation.description
            $("#select-edit-op-type").value = findOperation.type
            $("#select-edit-op-category").value = findOperation.category
            $("#input-edit-op-date").value = findOperation.date
            $("#input-edit-op-amount").value = findOperation.amount

        })
    }
}


$formNewOp.addEventListener('submit', (event) => {
    event.preventDefault();

    showElement([$sectBalance]);
    hideElement([$sectNewOp, $sectCategories, $sectReports])

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

$editFormNewOp.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = getData("operation");
    const findOperation = data.find(elem => elem.id === event.target.id);

    const newData = {
        description: event.target[0].value,
        amount: Number(event.target[1].value),
        type: event.target[2].value,
        category: event.target[3].value,
        date: event.target[4].value
    }

    const modifiedData = editDataOp(findOperation.id, newData);
    showOperations(modifiedData);

    hideElement([$editFormNewOp, $sectNewOp]);
    showElement([$sectBalance])
})


// --------------- SECCIÓN BALANCE ---------------------------

const updateBalance = () => {
    const data = getData("operation");
    const addEarnings = data.filter(operation => operation.type === "earnings").reduce((add, operation) => add + Number(operation.amount), 0);
    const addExpenses = data.filter(operation => operation.type === "expenses").reduce((add, operation) => add + Number(operation.amount), 0);

    const addTotal = addEarnings - addExpenses

    $("#numb-earnings").innerHTML = `+${addEarnings}`;
    $("#numb-expenses").innerHTML = `-${addExpenses}`;
    $("#numb-total").innerHTML = `-${addTotal}`;

}

//---------------- SECCIÓN CATEGORIAS ----------------------- 
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
            
            const dataCat = getData("category");
            const findCategory = dataCat.find(category => category.id === e.target.id)

            if(!findCategory) return;

            const newArray = deleteData(e.target.id)

            if (!newArray) return;

            const dataOp = getData("operation");
            const deleteOp = dataOp.filter(operation => operation.category !== findCategory.nameCategory);
            saveData("operation", deleteOp);

            updateBalance();
            showCategories(newArray)
            showOperations(deleteOp)
        })
    }

    for (const button of $$arrayButtonsEdit) {
        button.addEventListener("click", (e) => {
            showElement([$sectCategories, $formCategoryEdit]);
            hideElement([$sectBalance, $sectReports, $sectNewOp, $formNewCategory])

            const data = getData("category")
            const findCategory = data.find(elem => elem.id === e.target.id);

            $("#input-edit-category").value = findCategory.nameCategory
            $formCategoryEdit.id = findCategory.id
            
        })
    }
}

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
    const dataCategoryEdit = getData("category");
    $("#select-edit-op-category").innerHTML = ""
    for (const { nameCategory } of dataCategoryEdit) {
        $("#select-edit-op-category").innerHTML += `<option value=${nameCategory} >${nameCategory}</option>`
    }
}

$formNewCategory.addEventListener("submit", (event) => {
    event.preventDefault();

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

    event.target.reset()
})

$formCategoryEdit.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = getData("category");
    const findCategory = data.find(elem => elem.id === event.target.id);

    const newData = {
        nameCategory: event.target[0].value
    }

    const modifiedData = editData(findCategory.id, newData);
    showCategories(modifiedData)

    hideElement([$formCategoryEdit]);
    showElement([$formNewCategory])
})


// ---------------- SECCIÓN FILTROS --------------------------

$("#type-filter").addEventListener("input", (e) => {
    const data = getData("operation");

    if (e.target.value !== "all") {
        const filterType = data.filter(operation => operation.type === e.target.value);
        showOperations(filterType)
    } else {
        showOperations(data)
    }
})

$("#category-filter").addEventListener("input", (e) => {
    const dataOperation = getData("operation");

    if (e.target.value !== "all") {
        const filterCategory = dataOperation.filter(operation => operation.category === e.target.value)
        showOperations(filterCategory)
    } else {
        showOperations(dataOperation)
    }
})

$("#date-filter").addEventListener("input", (e) => {
    const data = getData("operation");

    const filterDate = data.filter(operation => operation.date >= e.target.value);
    showOperations(filterDate)
});

$("#order-filter").addEventListener("input", (e) => {
    const data = getData("operation");
    let dataDup = [...data]

    if (e.target.value === "more-recent") {
        const filterMoreRecent = dataDup.sort((a, b) => new Date(b.date) - new Date(a.date))
        return showOperations(filterMoreRecent);
    } else if (e.target.value === "less-recent") {
        const filterLessRecent = dataDup.sort((a, b) => new Date(a.date) - new Date(b.date));
        return showOperations(filterLessRecent)
    } else if (e.target.value === "bigger-amount") {
        const filterBiggerAmount = dataDup.sort((a, b) => b.amount - a.amount);
        return showOperations(filterBiggerAmount)
    } else if (e.target.value === "smaller-amount") {
        const filterSmallerAmount = dataDup.sort((a, b) => a.amount - b.amount);
        return showOperations(filterSmallerAmount)
    } else if (e.target.value === "a-z") {
        const filterAZ = dataDup.sort((a, b) => a.description.localeCompare(b.description));
        return showOperations(filterAZ)
    } else if (e.target.value === "z-a") {
        const filterZA = dataDup.sort((a, b) => b.description.localeCompare(a.description));
        return showOperations(filterZA)
    }
})


// ------------------ FUNCIONES AUXILIARES -----------------------
const showElement = (selectors) => {
    for (const selector of selectors) {
        selector.classList.remove("hidden")
    }
};

const hideElement = (selectors) => {
    for (const selector of selectors) {
        selector.classList.add("hidden")
    }
}

// -------- SECCIÓN REPORTES -------------
const updateReports = () => {
    const data = getData("operation");

    const $divReportsContainer = $('#div-reports-none');
    $divReportsContainer.classList.add("hidden");

    $divReportsContainer.innerHTML = "";

    if (arrayOperations.length === 0) {
        $divCategoriesContainer.classList.remove("hidden");
    }

    //  



}



window.onload = () => {
    const data = getData("category");
    showCategories(data);
    const operations = getData("operation");
    showOperations(operations);
}
