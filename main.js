"use strict";

// const allProducts = [];

class GetProduct {
  constructor(selectSize, quantity, price, name, productId, img) {
    this.size = selectSize;
    this.quantity = quantity;
    this.price = price;
    this.name = name;
    this.productId = productId;
    this.image = img;
  }
}

class AddProductToCart {
  static #allProducts = [];

  static getItems(product) {
    this.#allProducts =
      JSON.parse(localStorage.getItem("allProductsInCart")) || [];
    // check if product is already in cart
    const searchProduct = this.#allProducts.find(
      (el) => el.productId === product.productId && el.size === product.size
    );

    if (searchProduct) {
      // if it and update the product and the price
      searchProduct.quantity += product.quantity;
      searchProduct.price = product.price * searchProduct.quantity;

      //   find product in the array and replace it
      const searchProductIndex = this.#allProducts.findIndex(
        (el) =>
          el.productId === searchProduct.productId &&
          el.size === searchProduct.size
      );

      this.#allProducts[searchProductIndex] = searchProduct;

      //   if product is not in the cart from start add it to the cart
    } else {
      this.#allProducts.push(product);

      console.log(this.#allProducts);
    }
  }

  static save() {
    localStorage.setItem(
      "allProductsInCart",
      JSON.stringify(this.#allProducts)
    );
    console.log(this.#allProducts);
  }
}

export { GetProduct, AddProductToCart };


document
  .querySelector(".submit-add-to-cart")
  ?.addEventListener("click", function (e) {
    const productId = window.location.href.split("/").slice(-1)[0];
    const productType = document.querySelector(".product-type").textContent;
    const productName = document.querySelector(".product-name").textContent;
    const productPrice = +document
      .querySelector(".product-price")
      .textContent.slice(1);
    const selectProductSize = document.querySelector(".select-size").value;
    const productQuantity = +document.querySelector(".product-quantity").value;
    const productImage = document
      .querySelector(".productDetails-image")
      .getAttribute("src")
      .split("/")
      .slice(-1)[0];

    AddProductToCart.getItems(
      new GetProduct(
        selectProductSize,
        productQuantity,
        productPrice,
        productName,
        productId,
        productImage
      )
    );

    AddProductToCart.save();
  });
