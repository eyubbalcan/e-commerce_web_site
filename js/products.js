import { product1 } from "./glide.js";

let products = [];
let cart = [];

cart = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];

function addToCart() {
  const cartItems = document.querySelector(".header-cart-count");
  const buttons = [...document.getElementsByClassName("add-to-cart")]; //spread (...) operatörü  nodelisti arraya dönüşütürür
  buttons.forEach((button) => {
    const inCart = cart.find((item) => item.id === Number(button.dataset.id));
    if (inCart) {
      button.setAttribute("disabled", "disabled"); // setAttribute html içeriğini değiştirir
    } else {
      button.addEventListener("click", function (e) {
        e.preventDefault(); // yeniletmiyor sürekli ekleme yaptırıyor Ozan abi anlattı (hayat kurtarır)
        const id = e.target.dataset.id;
        const findProduct = products.find(
          (product) => product.id === Number(id)
        );
        cart.push({ ...findProduct, quantity: 1 });
        localStorage.setItem("cart", JSON.stringify(cart));
        button.setAttribute("disabled", "disabled");
        cartItems.innerHTML = cart.length;
      });
    }
  });
}

function productRoute() {
  const productLink = document.getElementsByClassName("product-link");
  Array.from(productLink).forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const id = e.target.dataset.id;
      localStorage.setItem("productId", JSON.stringify(id));
      window.location.href="single-product.html";
    });
  });
}

function productsFunc() {
  products = localStorage.getItem("products")
    ? JSON.parse(localStorage.getItem("products"))
    : [];
  const productsContainer = document.getElementById("product-list");

  let results = "";
  products.forEach((item) => {
    results += `
    <li class="product-item glide__slide">
      <div class="product-image">
        <a href="#">
          <img src=${item.img.singleImage} alt="" class="img1">
          <img src=${item.img.thumbs[1]} alt="" class="img2">
        </a>
      </div>
      <div class="product-info">
        <a href="$" class="product-title">${item.name}</a>
        <ul class="product-star">
          <li>
            <i class="bi bi-star-fill"></i>
          </li>
          <li>
            <i class="bi bi-star-fill"></i>
          </li>
          <li>
            <i class="bi bi-star-fill"></i>
          </li>
          <li>
            <i class="bi bi-star-fill"></i>
          </li>
          <li>
            <i class="bi bi-star-half"></i>
          </li>
        </ul>
        <div class="product-prices">
          <strong class="new-price">$${item.price.newPrice.toFixed(2)}</strong>
          <span class="old-price">$${item.price.oldPrice.toFixed(2)}</span>
        </div>
        <span class="product-discount">-${item.discount}%</span>
        <div class="product-links">
          <button class="add-to-cart" data-id=${item.id}>
            <i class="bi bi-basket-fill"></i>
          </button>
          <button>
            <i class="bi bi-heart-fill"></i>
          </button>
          <a href="#" class="product-link" data-id=${item.id}>
            <i class="bi bi-eye-fill"></i>
          </a>
          <a href="#">
            <i class="bi bi-share-fill"></i>
          </a>
        </div>
      </div>
    </li>
    `;

    productsContainer ? (productsContainer.innerHTML = results) : "";
    addToCart();
  });
  product1();

  productRoute();
}

export default productsFunc;

// 1. İlk olarak, `products` ve `cart` adında iki boş dizi tanımlanmıştır. Bu diziler, ürünlerin ve sepetin tutulacağı veri yapılardır.

// 2. `addToCart()` fonksiyonu, "add-to-cart" sınıfına sahip tüm butonlara tıklama olaylarını dinleyen bir olay dinleyici fonksiyondur.

// 3. `document.getElementsByClassName("add-to-cart")` ifadesi, HTML içinde "add-to-cart" sınıfına sahip tüm elemanları seçer ve NodeList türünde bir döner. NodeList, bir diziyi andıran ancak bazı dizi fonksiyonlarına sahip olmayan bir veri yapısıdır.

// 4. `buttons` değişkeni, NodeList'den gerçek bir dizi oluşturmak için spread operatörü (...) kullanılarak dönüştürülür. Böylece forEach gibi dizi fonksiyonları kullanabiliriz.

// 5. `buttons.forEach(...)` ile dizi üzerinde dönüyoruz ve her bir buton için bir tıklama olayı dinleyici ekliyoruz.

// 6. `button.addEventListener("click", function (e) { ... })`, tıklama olayını dinlemek için bir olay dinleyici ekler. Fonksiyon içerisindeki işlemler, butona tıklandığında gerçekleşir.

// 7. `e.preventDefault();`, butona tıklandığında sayfanın yenilenmesini engellemek için kullanılır. Çünkü butona tıklama olayı sayfanın yenilenmesine neden olabilir ve bu durumda sepete eklenen ürünler kaybolur.

// 8. `const id = e.target.dataset.id;`, tıklanan butonun "data-id" özelliğinden ürün kimliğini (id'sini) alırız. Bu özellik, HTML'deki buton etiketinin içine yerleştirilen "data-id" attribut'ü ile sağlanır.

// 9. `const findProduct = products.find((product) => product.id === Number(id));`, `products` dizisinde, tıklanan ürün kimliğine (id) göre ürünü buluruz. `Array.prototype.find()` yöntemi, dizideki bir öğeyi belirli bir koşula göre arar ve bulduğu ilk öğeyi döndürür. Döndürülen ürün, `findProduct` değişkenine atanır.

// 10. `cart.push({ ...findProduct, quantity: 1 });`, sepet dizisine `{ ...findProduct, quantity: 1 }` adında bir nesne eklenir. Bu nesne, bulunan ürünün bir kopyasıdır ve `quantity` özelliği 1 olarak ayarlanır. Bu sayede, her sepete eklenen ürünün ayrı bir kopyası tutulur ve sepete eklenen ürünlerin miktarları tutulur.

// 11. `localStorage.setItem("cart", JSON.stringify(cart));`, `cart` dizisini JSON formatına dönüştürerek "cart" adında bir yerel depolama (localStorage) alanına kaydederiz. Böylece sayfa yenilense bile sepet içeriği korunur ve kullanıcı sepetindeki ürünleri görebilir.

// Bu şekilde `addToCart()` fonksiyonu, tıklanan butonun ürün kimliğini alır, `products` dizisinde bu kimliğe sahip ürünü bulur, sepet dizisine ekler ve sepet içeriğini yerel depolamaya kaydeder. Bu sayede kullanıcı, sepete eklediği ürünleri sayfa yenilenince bile görüntüleyebilir ve ürün miktarları korunur.
