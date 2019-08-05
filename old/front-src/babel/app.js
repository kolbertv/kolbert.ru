"use strict";

let navbar__button = document.getElementById("logo-btn");
if (navbar__button) {
  navbar__button.onclick = () => {
    let toggleClass = "mm_hidden";
    let navbarMenu = document.getElementById("navbar__collapse");
    let menuClassArr = navbarMenu.className.split(" ");
    let indexClass = menuClassArr.indexOf(toggleClass);

    if (indexClass >= 0) {
      menuClassArr.splice(indexClass, 1);
    } else {
      menuClassArr.push(toggleClass);
    }
    navbarMenu.className = menuClassArr.join(" ");
  };
}

let contact_p = document.getElementById("p");
if (contact_p) {
  contact_p.addEventListener("click", function(event) {
    let p_id = contact_p.getElementsByTagName("*");
    for (let i = 0; i < p_id.length; i++) {
      if (p_id[i].id === event.target.id) {
        p_id[i].style.color = "white";
        switch (p_id[i].id) {
          case "p_1":
            p_id[i].innerHTML = "kolbert" + "@" + "yandex" + "." + "ru";
            break;
          case "p_2":
            p_id[i].innerHTML = "+7" + "-999" + "-998" + "-78" + "-78";
            break;
          case "p_3":
            p_id[i].innerHTML =
              '<a href="https://telegram.me/' +
              "kolbert" +
              '">@' +
              "kolbert</a>";
            break;
        }
      } else {
        if (p_id[i].id) {
          p_id[i].innerHTML = "ПОКАЗАТЬ";
          p_id[i].style.color = "dimgray";
        }
      }
    }
  });
}
