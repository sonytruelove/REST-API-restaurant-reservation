export class OrderForm {
  static state(total) {
    let dish_price = 0;
    let dish_title = "";
    let isActive = false;
    OrderForm.order = {
      client: { name: "Mr Sony" }, //stub
      dishes: {},
      tables: {},
    };
    const order_form = document.getElementsByClassName("form")[0];
    const cross = document.getElementsByClassName("close-form")[0];
    cross.addEventListener("click", function () {
      order_form.className = order_form.className.replace(" opened", "");
    });
    const background = document.getElementsByClassName("form-background")[0];
    background.addEventListener("click", function () {
      order_form.className = order_form.className.replace(" opened", "");
    });

    const plus = document.getElementsByClassName("btn_plus")[0];
    plus.addEventListener("click", function () {
      const input = document.getElementsByClassName("quantity")[0];
      input.maxcount = 20;
      let count = Number(input.value) + 1;
      count =
        count > Number(input.maxcount) ? Number(input.maxcount) : Number(count);
      input.value = Number(count);
    });
    const minus = document.getElementsByClassName("btn_minus")[0];
    minus.addEventListener("click", function () {
      const input = document.getElementsByClassName("quantity")[0];
      let count = Number(input.value) - 1;
      count = count < 1 ? 1 : count;
      input.value = Number(count);
    });
    const checkmark = document.getElementsByClassName("btn_agree")[0];
    checkmark.addEventListener("click", function () {
      order_form.className = order_form.className.replace(" opened", "");
      OrderForm.count(total);
    });
  }
  static show() {
    const order_form = document.getElementsByClassName("form")[0];
    order_form.className += " opened";
  }
  static count(total) {
    const totalspan = document.getElementsByClassName("total")[0];
    const input = document.getElementsByClassName("quantity")[0];
    let count = Number(input.value);
    if (OrderForm.isActive) {
      let totalForDish = count * Number(OrderForm.dish_price);
      OrderForm.order.dishes[OrderForm.dish_title] = {
        "dish-price": OrderForm.dish_price,
        count: count,
        totalForDish: totalForDish,
      };
      total.increase(totalForDish);
      total.count.toFixed(2);
      totalspan.hidden = false;
      input.value = 1;
    } else {
      total.decrease(OrderForm.order.dishes[OrderForm.dish_title].totalForDish);
      input.value = 1;
      delete OrderForm.order.dishes[OrderForm.dish_title];
    }
    total.count.toFixed(2);
    totalspan.innerText = "Total: " + total.count+"$";
    if (!total.count) totalspan.hidden = true;
  }
}
