import { trash } from "../svg/trash";

class Cart {
  constructor() {
    this.cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
    this.container = document.querySelector(".cart-container");
    this.cartQuantity = this.setCartQuantity();
    this.updateCartItemsQuantity();
    this.total = 0;
  }

  displayCartItems = () => {
    for (const item of this.cart) {
      this.container.innerHTML += this.render(item);
    }
  };

  updateCart = (event) => {
    if (event.target.classList.contains("add-to-cart-button")) {
      this.addToCart(event);
    } else if (
      event.type === "input" &&
      event.target.classList.contains("cart-item-quantity")
    ) {
      const cartItem = this.getCartItemById(event.target.dataset.id);
      if (cartItem[0].quantity < parseInt(event.target.value)) {
        this.addToCart(event);
      } else {
        this.decreaseCartItem(event);
      }
    } else if (
      event.type === "click" &&
      event.target.classList.contains("delete-cart-item")
    ) {
      this.removeItemFromCart(event);
    }
  };

  addToCart = (event) => {
    const id = event.target.dataset.id;
    const product = {
      id,
      name: event.target.dataset.name,
      price: event.target.dataset.price,
      image: event.target.dataset.image,
    };
    const results = this.getCartItemById(id);
    if (results.length == 1) {
      this.cart = this.cart.map((p) =>
        p.product.id == id ? { ...p, quantity: p.quantity + 1 } : p
      );
    } else {
      this.cart = [...this.cart, { product, quantity: 1 }];
    }
    this.cartQuantity++;
    this.updateCartItemsQuantity();
    this.saveToDb();
  };

  decreaseCartItem = (event) => {
    const id = event.target.dataset.id;
    this.cart = this.cart.map((prodInCart) =>
      prodInCart.product.id == id
        ? { ...prodInCart, quantity: prodInCart.quantity - 1 }
        : prodInCart
    );
    if (this.isItemEmpty()) {
      this.removeItemFromCart(event);
    }
    this.cartQuantity--;
    this.updateCartItemsQuantity();
    this.saveToDb();
  };

  isItemEmpty = () => {
    const emptyItem = this.cart.filter(
      (prodInCart) => prodInCart.quantity == 0
    );
    if (emptyItem.length === 0) return false;
    return true;
  };

  removeItemFromCart = (event) => {
    const id = event.target.dataset.id;
    this.cart = this.cart.filter((prodInCart) => prodInCart.product.id != id);
    const item = document.querySelector(`.cart-item[data-id="${id}"]`);
    item && item.remove();
    this.saveToDb();
  };

  updateCartItemsQuantity = () => {
    const itemQuantity = document.querySelector(".header-cart-quantity");
    if (itemQuantity) {
      itemQuantity.textContent = this.cartQuantity;
      itemQuantity.style.opacity = this.cartQuantity > 0 ? "1" : "0";
    }
  };

  saveToDb = () => {
    localStorage.setItem("cart", JSON.stringify(this.cart));
  };

  render = (item) => {
    return `
    <div class="cart-item" data-id="${item.product.id}">
      <div class="cart-item-image-container">
        <img class="cart-item-image" 
        src="./uploads/images/${item.product.image}" alt="Product Image">
      </div>
      <h2 class="cart-item-name">${item.product.name}</h2>
      <p class="cart-item-price"> ${item.product.price}KM</p>
      <div class="cart-item-quantity-container">
        <input type="number" value="${item.quantity}" 
        data-id="${item.product.id}" class="cart-item-quantity">
      </div>
      <span class="cart-item-total"> 
        ${(item.quantity * item.product.price).toFixed(2)}KM
      </span>
      <img class="delete-cart-item" 
      data-id=${item.product.id} src="./uploads/images/trash-bin.png">
    </div>`;
  };

  getCartItemById = (id) => {
    const results = this.cart.filter(
      (prodInCart) => prodInCart.product.id == id
    );
    return results;
  };

  getItemQuantity = (id) => {
    for (const item of this.cart) {
      if (item.product.id === id) return item.quantity;
    }
    return 0;
  };

  setCartQuantity = () => {
    let quantity = 0;
    for (const item of this.cart) {
      quantity += Number(item.quantity);
    }
    return quantity;
  };
}

export const cart = new Cart();
