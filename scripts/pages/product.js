import { Product } from "../classes/Product";
import { ProductPriceHistory } from "../classes/ProductPriceHistory";

export async function productPage() {
  if (window.location.href.indexOf("/product?") === -1) return;

  const product = new Product();
  product.loadProductData();
  const productPriceHistory = new ProductPriceHistory();
  await productPriceHistory.loadHistory();
}
