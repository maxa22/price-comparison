import { resetPasswordPage } from "./pages/reset_password";
import { forgottenPasswordPage } from "./pages/forgotten_password";
import { login } from "./pages/login";
import { productsPage } from "./pages/products";
import { eventObserver } from "./classes/EventObserver";
import { productPage } from "./pages/product";
import { cart } from "./classes/Cart";
import { cartPage } from "./pages/cart";

productsPage();
productPage();
cartPage();
login();
forgottenPasswordPage();
resetPasswordPage();

window.addEventListener("scroll", eventObserver.notify);
window.addEventListener("click", eventObserver.notify);
window.addEventListener("input", eventObserver.notify);
window.addEventListener("popstate", eventObserver.notify);

eventObserver.subscribeToClickEvent(cart.updateCart);
