"use strict";

var app = {};
console.log('Привет из бабеля и файла JS для фронта');

document.getElementById('mobileMenuCheckbox').onclick = function () {
    document.querySelector('body').style.overflow = this.checked ? 'hidden' : 'auto';
};