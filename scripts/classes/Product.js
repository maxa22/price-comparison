import { fetchData } from "../helpers/fetch";
import { hideLoader, showLoader } from "../helpers/loader";

export class Product {
  constructor() {
    this.container = document.querySelector(".single-product-container");
    this.item;
    this.minPrice = 1000;
    const urlParams = new URLSearchParams(window.location.search);
    this.id = urlParams.get("q");
  }

  render = () => {
    this.container.innerHTML = `
    <div class="single-product">
      <div class="single-product-image-container">
        <img src="./uploads/images/${
          this.item[0].image
        }" class="single-product-image">
      </div>
      <div class="single-product-info">
        <h2 class="single-product-heading">
        ${this.item[0].name}
        </h2>
        <div class="single-product-footer">
          ${this.renderPrices(this.item[0].product_details)}
          <button class="add-to-cart-button" 
          data-id="${this.item[0].id}" 
          data-name="${this.item[0].name}" 
          data-price="${this.minPrice}"
          data-image="small-${this.item[0].image}"> Dodaj u korpu </button>
        </div>
      </div>
    </div>`;
  };

  renderPrices = (details) => {
    const prices = JSON.parse(details);
    let priceList = "";
    for (const detail of prices) {
      if (detail.price < this.minPrice) this.minPrice = detail.price;
      priceList += `
      <div class="product-footer">
        <h4 class="product-price">
          ${Number(detail.price).toFixed(2)} KM
        </h4>
        <img src="./uploads/images/${detail.storeLogo}" 
        alt="${detail.store} Logo" class="store-logo">
      </div>`;
    }
    return priceList;
  };

  loadProductData = async () => {
    showLoader();
    const form = new FormData();
    form.append(
      "data",
      JSON.stringify({
        function: "get_product",
        id: this.id,
      })
    );
    this.item = await fetchData("./includes/ajax.inc.php", form);
    this.render();
    this.loading = false;
    hideLoader();
  };
}
