import { OrderForm as OrderForm } from "./order-form.js";
export class Main {
  static order_out(order, tables) {
    let ordertext = "Reserved " + Object.keys(tables) + " table(s)<p>";
    if (order.length) {
      order.forEach(
        (order) => (ordertext +="<h2>" +order[0] +"</h2> Amount: " +order[1].count +" Total: " +order[1].totalForDish +"$")
      );
    }
    const html = document.querySelector("html");
    html.innerHTML = ordertext;
    let head = document.getElementsByTagName("head")[0];
    let style = window.document.createElement("link");
    style.href = "style.css";
    style.rel = "stylesheet";
    head.appendChild(style);
  }

  static reserve_req() {
    fetch("/reserve", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(OrderForm.order),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        Main.order_out(response, OrderForm.order.tables);
      })
      .catch((err) => console.log(err));
  }
  static restate_main(total, tables) {
    const totalspan = document.getElementsByClassName("total")[0];
    const order_btn = document.getElementsByClassName("order-btn")[0];
    totalspan.hidden = true;
    let all_tables = Object.entries(tables);
    all_tables.forEach((table) => {
      if (!table[1].reserved) {
        const current_table = document.getElementById("table" + table[1].num);
        current_table.className += " free";
      }
    });
    const ftables = document.getElementsByClassName("free");
    for (var i = 0; i < ftables.length; i++) {
      ftables[i].addEventListener("click", function () {
        let table_id = this.id.charAt(5);
        if (this.className.includes("active")) {
          this.className = this.className.replace(" active", "");
          total.decrease(Number(tables[table_id].price));
          delete OrderForm.order.tables[table_id];
          let isAnyTableReserved = !Object.keys(OrderForm.order.tables).length;
          if (isAnyTableReserved)
            order_btn.className = order_btn.className.replace(" active", "");
        } else {
          this.className += " active";
          total.increase(Number(tables[table_id].price));
          totalspan.hidden = false;
          OrderForm.order.tables[table_id] = true;
          let isActive =
            document.getElementsByClassName("order-btn active").length;
          if (!isActive) {
            order_btn.className += " active";
            order_btn.href = "#";
          }
        }
        totalspan.innerText = "Total: " + total.count;
        if (!total.count) totalspan.hidden = true;
      });
    }
    order_btn.addEventListener("click", function () {
      let isActive = document.getElementsByClassName("order-btn active").length;
      if (isActive) Main.reserve_req();
    });
  }
}
