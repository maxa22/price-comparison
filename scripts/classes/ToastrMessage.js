export class ToastrMessage {
  constructor(timeout = 2000) {
    this.timeout = timeout;
    this.element = document.createElement("p");
    this.element.setAttribute("role", "alert"); // For accessibility
    this.timeoutRef = null; // Store timeout reference
  }

  showSuccessMessage = (message) => {
    this.prepareToast();
    this.show("toastr-success-message", message);
  };

  showErrorMessage = (message) => {
    this.prepareToast();
    this.show("toastr-error-message", message);
  };

  prepareToast = () => {
    if (document.body.contains(this.element)) {
      this.element.remove();
    }
    this.element.className = ""; // Reset classes
    if (this.timeoutRef) {
      clearTimeout(this.timeoutRef); // Clear existing timeout
    }
  };

  show = (className, message) => {
    document.body.append(this.element);
    this.element.classList.add(className);
    this.element.textContent = message;
    this.timeoutRef = setTimeout(() => {
      // Set and store the new timeout
      this.hideMessage();
    }, this.timeout);
  };

  hideMessage = () => {
    this.element.classList.remove(
      "toastr-success-message",
      "toastr-error-message"
    );
    this.element.remove();
  };
}
