import { SideMenu as SideMenu } from "./side-menu.js";
import { Main as Main } from "./main-image.js";
import { Counter as Counter } from "./counter.js";
let total = new Counter(0);
fetch("/dishes", {
  method: "GET",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
})
  .then((response) => response.json())
  .then((response) => SideMenu.restate_menu(total, response))
  .catch((err) => console.log(err));
fetch("/tables", {
  method: "GET",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
})
  .then((response) => response.json())
  .then((response) => Main.restate_main(total, response))
  .catch((err) => console.log(err));

let btns = document.getElementsByClassName("header-btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function () {
    var current = document.getElementsByClassName("header-btn active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}
