

import headerFunc from './header.js';
import productsFunc from './products.js';



// //! add product to localStorage
async function getData() {
  const myJson = await fetch("../js/data.json");
  const data = await myJson.json();

  data ? localStorage.setItem("products", JSON.stringify(data)) : [];
}

getData();

const products = localStorage.getItem("products");
console.log(JSON.parse(products));