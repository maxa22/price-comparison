import { fetchData } from "../helpers/fetch";
import { lazyLoadImages } from "../helpers/imageObserver";
import { hideLoader, showLoader } from "../helpers/loader";

export class ProductList {
  constructor() {
    this.currentItems;
    this.page = 1;
    this.loading = false;
    this.endOfList = false;
    this.container = document.getElementById("grid-view");
  }

  displayProducts = () => {
    if (this.currentItems.length === 0) this.endOfList = true;
    if (this.currentItems.length === 0 && this.page === 1) return this.noProductsFound(); // prettier-ignore
    for (const item of this.currentItems) {
      this.container.innerHTML += this.render(item);
    }
  };

  render = (product) => {
    return `
    <div class="product">
      <div class="product-header">
      <a href="./product?q=${product.id}" 
        class="product-name">
        <img data-src="./uploads/images/small-${product.image}" 
        alt="Munchmallow Family pack 210 g" 
        load="lazy" class="product-image">
        <span> ${product.name} </span>
        </a>
      </div>
      <div class="product-footer">
        <h4 class="product-price">
          ${Number(product.min.price).toFixed(2)} KM
        </h4>
        <img src="./uploads/images/${product.min.storeLogo}" 
        alt="${product.min.store} Logo" class="store-logo">
      </div>
      <div class="add-to-cart-button-container">
        <button class="add-to-cart-button" 
        data-id="${product.id}" 
        data-name="${product.name}" 
        data-price="${product.min.price}"
        data-image="small-${product.image}">Dodaj u korpu</button>
      </div>
    </div>`;
  };

  noProductsFound = () => {
    this.container.innerHTML = `<h2>No products found</h2>`;
  };

  loadProducts = async () => {
    this.loading = true;
    showLoader();
    const urlParams = new URLSearchParams(window.location.search);
    const form = new FormData();
    form.append(
      "data",
      JSON.stringify({
        function: "get_products",
        page: this.page,
        category: urlParams.get("category"),
        name: urlParams.get("name"),
      })
    );
    this.currentItems = await fetchData("./includes/ajax.inc.php", form);
    this.displayProducts();
    lazyLoadImages(".product img[data-src]");
    this.loading = false;
    hideLoader();
  };

  loadNextProducts = () => {
    if (this.endOfList) hideLoader();
    if (this.loading || this.endOfList) return;
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight < scrollHeight - 200) return;
    this.page++;
    this.loadProducts();
  };

  updateProductByCategoryAndName = (e) => {
    this.updateSearchParams();
    this.loadProducts();
  };

  updateSearchParams = () => {
    window.scrollTo(0, 0);

    this.page = 1;
    this.endOfList = false;
    this.container.innerHTML = "";
  };
}
