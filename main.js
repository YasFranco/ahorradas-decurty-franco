const $ = (elem) => document.querySelector(elem);
const $$ = (elem) => document.querySelectorAll(elem);

const $btnMenu = $('#button-menu');
const $btnMenuClose = $('#button-menu-close');
const $navMenuMobile = $('#div-mobile-nav-list');

$btnMenu.addEventListener('click', () => {
    $btnMenu.classList.add('hidden');
    $btnMenuClose.classList.remove('hidden');

});

