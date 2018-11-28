"use strict";

var app = {};

console.log('Привет из бабеля и файла JS для фронта');

document.getElementById('mobileMenuCheckbox').onclick = function () {
    document.querySelector('body').style.overflow = this.checked ? 'hidden' : 'auto';
};

// let menuContainer = document.getElementById('menu__container');
//
// menuContainer.addEventListener('mouseover', () => {
//
// // document.getElementsByClassName('menu__link')[0].style.color = '#0000';
//
//     if (event.target.tagName !== 'A') {
//         console.log('ghjk');
//         event.target.style.color = '#5555';
//     }
//
// });

// menuContainer.addEventListener('mouseout', () => {
//     if (event.target.tagName !== 'A') {
//         console.log('ghjk');
//         event.target.style.color = '#5555';
//     }
// });