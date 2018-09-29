'use strict';

// Select DOM Items ---------------------------------------------
const menuBtn = document.querySelector('.menu__burger__btn'),
      menu = document.querySelector('.menu__burger'),
      navItems = document.querySelectorAll('.menu__burger__item');

// Set Initial State of Menu ---------------------------------------------
let showMenu = false;

menuBtn.addEventListener('click', toggleMenu);

function toggleMenu() {
    if(!showMenu) {
        menuBtn.classList.add('close');
        menu.classList.add('show');
        navItems.forEach(item => item.classList.add('show'));

        // Set Menu State ---------------------------------------------
        showMenu = true;
        
    } else {
        menuBtn.classList.remove('close');
        menu.classList.remove('show');
        navItems.forEach(item => item.classList.remove('show'));

        // Set Menu State ---------------------------------------------
        showMenu = false;  
        }
}