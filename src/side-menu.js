import {OrderForm as OrderForm} from "./order-form.js"
export class SideMenu{
static post_cards(total,dishes){
    let classdish=dishes[0];
    dishes=Object.entries(dishes[1]);;
  dishes.forEach(function(dish, i) {
    dish=dish[1];
    let parent = document.querySelector('.grid');
    parent.insertAdjacentHTML("beforeend",'<div class="dish-card '+classdish+'"><img src="'+dish.src+'"><center><h4>'+dish.title+'</h4><h5>'+dish.price+'$</h5><h5>'+dish.kcal+' ccal</h5></div>');
   let dishes_cards=document.getElementsByClassName(classdish);
    let totalspan=document.getElementsByClassName("total")[0];
    totalspan.hidden=true;
    dishes_cards[i].addEventListener("click", function () {
      OrderForm.dish_price=dish.price;
      OrderForm.dish_title=dish.title;
      let count=0;
      if (this.className.includes("active")) {
          this.className = this.className.replace(" active", "");
          OrderForm.isActive=false;
          OrderForm.count(total);
        } else {
            OrderForm.isActive=true;
          OrderForm.show();
          this.className += " active";
      }
            
    }); 
  }); 
}
static show_cards(classname){
  let parent = document.querySelector('.grid');
let childs = parent.getElementsByClassName(classname);
  childs=Array.from(childs);
  childs.map(child=>child.hidden=false);
}
static remove_cards(classname){
let parent = document.querySelector('.grid');
let childs = parent.getElementsByClassName("dish-card");
  childs=Array.from(childs);
  childs.map(child=>child.hidden=true);
}

static restate_menu(total,dishes){
 OrderForm.state(total);
const b_btn = document.getElementById("breakfasts");
const l_btn = document.getElementById("lunches");
const d_btn = document.getElementById("drinks");
const breakfasts=Object.entries(dishes)[0];
const lunches=Object.entries(dishes)[1];
const drinks=Object.entries(dishes)[2];
SideMenu.post_cards(total,breakfasts);
SideMenu.post_cards(total,lunches);
SideMenu.post_cards(total,drinks);
  SideMenu.remove_cards();
  SideMenu.show_cards("breakfasts");
b_btn.addEventListener("click", function() {
  SideMenu.remove_cards();
  SideMenu.show_cards("breakfasts");
})
l_btn.addEventListener("click", function() {
  SideMenu.remove_cards();
  SideMenu.show_cards("lunches");
})
d_btn.addEventListener("click", function() {
  SideMenu.remove_cards();
  SideMenu.show_cards("drinks");
})
  
  
  
  
  
  
let btns = document.getElementsByClassName("side-btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("side-btn active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
} 
}
}


