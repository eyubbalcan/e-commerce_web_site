import headerFunc from "./header.js";
import productsFunc from "./products.js";

//! add product to localStorage start
(async function () {
  const myJson = await fetch("../js/data.json");
  const data = await myJson.json();
  if (data) localStorage.setItem("products", JSON.stringify(data));
  else localStorage.setItem("products", JSON.stringify([]));
  productsFunc();
})();
//! add product to localStorage end

//! add cartItems to localStorage start

const cartItems = document.querySelector(".header-cart-count");

cartItems.innerHTML = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart")).length
  : "0";

//! add cartItems to localStorage end
