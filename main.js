//import functions from "./functions.js"


const $ = (elem) => document.querySelector(elem);
const $$ = (elem) => document.querySelectorAll(elem);

// FUNCIÓN MENU HAMBUERGUESA Y VIEWS

const $btnMenu = $('#button-menu');
const $btnMenuClose = $('#button-menu-close');
const $navMenuMobile = $('#div-mobile-nav-list');
const btnBalance = $('#nav-balance');
const btnCategories = $('#nav-categorias');
const btnReports = $('#nav-reportes');
const $btnNewOp = $('#btn-new-operation');
const sectBalance = $('#sect-balance');
const sectNewOp = $('#sect-new-opetarion');
const sectCategories = $('#sect-categories');
const sectReports = $('#sect-reports');

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

$btnNewOp.addEventListener('click', () => {
    sectBalance.classList.add("hidden");
    sectCategories.classList.add("hidden")
    sectReports.classList.add("hidden")
    sectNewOp.classList.remove("hidden")
})

btnCategories.addEventListener('click', () => {
    sectBalance.classList.add("hidden");
    sectReports.classList.add("hidden")
    sectNewOp.classList.add("hidden")
    sectCategories.classList.remove("hidden")
});

btnReports.addEventListener('click', () => {
    sectBalance.classList.add("hidden");
    sectCategories.classList.add("hidden")
    sectNewOp.classList.add("hidden")
    sectReports.classList.remove("hidden")
})

btnBalance.addEventListener('click', () => {
    sectCategories.classList.add("hidden");
    sectReports.classList.add("hidden")
    sectNewOp.classList.add("hidden")
    sectBalance.classList.remove("hidden")
})

// GUARDAR INFO NUEVA OPERACION
const $formNewOp = $('#new-op-form-container')
const $btnNewOpAdd = $('#btn-new-op-add')

$btnNewOp.addEventListener('submit', (event) => {
    MediaEncryptedEvent.preventDefault()
})


