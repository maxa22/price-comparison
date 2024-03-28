import { cart } from "../classes/Cart";
import { Category } from "../classes/Category";
import { eventObserver } from "../classes/EventObserver";
import { ProductList } from "../classes/ProductList";
import { search } from "../classes/Search";
import { debounce } from "../helpers/debounce";

export async function productsPage() {
  if (window.location.href.indexOf("/products") === -1) return;

  const products = new ProductList();
  products.loadProducts();
  const categories = new Category();
  categories.loadCategories();
  search.setSearch();
  eventObserver.subscribeToScrollEvent(products.loadNextProducts);
  eventObserver.subscribeToClickEvent(categories.handleClick);
  eventObserver.subscribeToInputEvent(debounce(search.productSearch, 200));
  eventObserver.subscribeToUrlUpdateEvent(products.updateProductByCategoryAndName); // prettier-ignore
}
