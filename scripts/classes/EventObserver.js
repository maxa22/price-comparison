import { debounce } from "../helpers/debounce";

class EventObserver {
  constructor() {
    this.scrollObservers = [];
    this.clickObservers = [];
    this.inputObservers = [];
    this.urlObservers = [];
  }

  subscribeToScrollEvent = (sub) => {
    this.scrollObservers.push(sub);
  };

  unsubscribeFromScrollEvent = (sub) => {
    this.scrollObservers = this.scrollObservers.filter(
      (observer) => observer !== sub
    );
  };

  subscribeToClickEvent = (sub) => {
    this.clickObservers.push(sub);
  };

  subscribeToInputEvent = (sub) => {
    this.inputObservers.push(sub);
  };

  subscribeToUrlUpdateEvent = (sub) => {
    this.urlObservers.push(sub);
  };

  notify = (data) => {
    if (data.type === "scroll") {
      this.scrollObservers.forEach((observer) => observer(data));
    } else if (data.type === "click") {
      this.clickObservers.forEach((observer) => observer(data));
    } else if (data.type === "input") {
      this.inputObservers.forEach((observer) => observer(data));
    } else if (data.type === "popstate") {
      this.urlObservers.forEach((observer) => observer(data));
    }
  };
}

const eventObserver = new EventObserver();

export { eventObserver };
