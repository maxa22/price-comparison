import { cart } from "../classes/Cart";
import { eventObserver } from "../classes/EventObserver";

export async function cartPage() {
  if (window.location.href.indexOf("/cart") === -1) return;

  cart.displayCartItems();
  eventObserver.subscribeToInputEvent(cart.updateCart);
}
