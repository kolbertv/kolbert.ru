"use strict";

var app = {};

console.log('Привет из бабеля и файла JS для фронта');

// document.getElementById('mobileMenuCheckbox').onclick = function () {
//     document.querySelector('body').style.overflow = this.checked ? 'hidden' : 'auto';
// };

document.getElementById('navbar__button').onclick = function () {

    document.getElementById('navbar__container').classList.toggle('container_toggle');
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJhcHAiLCJjb25zb2xlIiwibG9nIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsIm9uY2xpY2siLCJjbGFzc0xpc3QiLCJ0b2dnbGUiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBLElBQUlBLE1BQU0sRUFBVjs7QUFFQUMsUUFBUUMsR0FBUixDQUFZLHdDQUFaOztBQUVBO0FBQ0E7QUFDQTs7QUFFQUMsU0FBU0MsY0FBVCxDQUF3QixnQkFBeEIsRUFBMENDLE9BQTFDLEdBQW9ELFlBQU07O0FBRXRERixhQUFTQyxjQUFULENBQXdCLG1CQUF4QixFQUE2Q0UsU0FBN0MsQ0FBdURDLE1BQXZELENBQThELGtCQUE5RDtBQUVILENBSkQ7O0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcclxuXHJcbmxldCBhcHAgPSB7fTtcclxuXHJcbmNvbnNvbGUubG9nKCfQn9GA0LjQstC10YIg0LjQtyDQsdCw0LHQtdC70Y8g0Lgg0YTQsNC50LvQsCBKUyDQtNC70Y8g0YTRgNC+0L3RgtCwJyk7XHJcblxyXG4vLyBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9iaWxlTWVudUNoZWNrYm94Jykub25jbGljayA9IGZ1bmN0aW9uICgpIHtcclxuLy8gICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS5zdHlsZS5vdmVyZmxvdyA9IHRoaXMuY2hlY2tlZCA/ICdoaWRkZW4nIDogJ2F1dG8nO1xyXG4vLyB9O1xyXG5cclxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25hdmJhcl9fYnV0dG9uJykub25jbGljayA9ICgpID0+IHtcclxuXHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmF2YmFyX19jb250YWluZXInKS5jbGFzc0xpc3QudG9nZ2xlKCdjb250YWluZXJfdG9nZ2xlJyk7XHJcblxyXG59XHJcblxyXG5cclxuLy8gbGV0IG1lbnVDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWVudV9fY29udGFpbmVyJyk7XHJcbi8vXHJcbi8vIG1lbnVDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgKCkgPT4ge1xyXG4vL1xyXG4vLyAvLyBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtZW51X19saW5rJylbMF0uc3R5bGUuY29sb3IgPSAnIzAwMDAnO1xyXG4vL1xyXG4vLyAgICAgaWYgKGV2ZW50LnRhcmdldC50YWdOYW1lICE9PSAnQScpIHtcclxuLy8gICAgICAgICBjb25zb2xlLmxvZygnZ2hqaycpO1xyXG4vLyAgICAgICAgIGV2ZW50LnRhcmdldC5zdHlsZS5jb2xvciA9ICcjNTU1NSc7XHJcbi8vICAgICB9XHJcbi8vXHJcbi8vIH0pO1xyXG5cclxuLy8gbWVudUNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsICgpID0+IHtcclxuLy8gICAgIGlmIChldmVudC50YXJnZXQudGFnTmFtZSAhPT0gJ0EnKSB7XHJcbi8vICAgICAgICAgY29uc29sZS5sb2coJ2doamsnKTtcclxuLy8gICAgICAgICBldmVudC50YXJnZXQuc3R5bGUuY29sb3IgPSAnIzU1NTUnO1xyXG4vLyAgICAgfVxyXG4vLyB9KTsiXX0=
