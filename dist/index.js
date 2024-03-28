require("chart.js/auto");
var $jntyt$chartjs = require("chart.js");

class $b2af54847256eaf0$export$3eeff3660b57051b {
    constructor(timeout = 2000){
        this.timeout = timeout;
        this.element = document.createElement("p");
        this.element.setAttribute("role", "alert"); // For accessibility
        this.timeoutRef = null; // Store timeout reference
    }
    showSuccessMessage = (message)=>{
        this.prepareToast();
        this.show("toastr-success-message", message);
    };
    showErrorMessage = (message)=>{
        this.prepareToast();
        this.show("toastr-error-message", message);
    };
    prepareToast = ()=>{
        if (document.body.contains(this.element)) this.element.remove();
        this.element.className = ""; // Reset classes
        if (this.timeoutRef) clearTimeout(this.timeoutRef); // Clear existing timeout
    };
    show = (className, message)=>{
        document.body.append(this.element);
        this.element.classList.add(className);
        this.element.textContent = message;
        this.timeoutRef = setTimeout(()=>{
            // Set and store the new timeout
            this.hideMessage();
        }, this.timeout);
    };
    hideMessage = ()=>{
        this.element.classList.remove("toastr-success-message", "toastr-error-message");
        this.element.remove();
    };
}


async function $d904c97f2f6d99c6$export$8134c072fddab6a5(url, data) {
    const response = await fetch(url, {
        method: "POST",
        body: data
    });
    const result = await response.json();
    return result; // parses JSON response into native JavaScript object
}
async function $d904c97f2f6d99c6$export$7a171f172be0782e(url) {
    const response = await fetch(url, {
        method: "GET"
    });
    return response.json(); // parses JSON response into native JavaScript object
}


const $e4e578276a9b8761$var$errorMessage = {
    empty: "Polje ne smije biti prazno",
    notNumber: "Dozvoljeni samo brojevi",
    alphanumeric: "Dozvoljeni samo slova, brojevi i razmak"
};
const $e4e578276a9b8761$var$generateError = (input, key)=>{
    input.style.borderColor = "#a94442";
    input.classList.remove("h-100");
    input.parentElement.querySelector(".registration-form__error").innerHTML = $e4e578276a9b8761$var$errorMessage[key];
};
const $e4e578276a9b8761$var$isInputEmpty = (input)=>{
    if (input.value !== "" || input.getAttribute("disabled") === "true") return true;
    $e4e578276a9b8761$var$generateError(input, "empty");
    return false;
};
const $e4e578276a9b8761$var$isNumeric = (input)=>{
    let isNumber = !isNaN(input.value);
    if (isNumber || input.getAttribute("disabled") === "true") return true;
    $e4e578276a9b8761$var$generateError(input, "notNumber");
    return false;
};
const $e4e578276a9b8761$var$isAlphanumeric = (input)=>{
    const validChars = /^[a-zA-Z\p{L}0-9\s]+$/;
    if (validChars.test(input.value)) return true;
    $e4e578276a9b8761$var$generateError(input, "alphanumeric");
    return false;
};
const $e4e578276a9b8761$var$isValidInput = (validation_type, input)=>{
    let valid;
    switch(validation_type){
        case "not-empty":
            valid = $e4e578276a9b8761$var$isInputEmpty(input);
            break;
        case "number":
            valid = $e4e578276a9b8761$var$isNumeric(input);
            break;
        case "alphanumeric":
            valid = $e4e578276a9b8761$var$isAlphanumeric(input);
            break;
        default:
            valid = true;
    }
    return valid;
};
const $e4e578276a9b8761$export$1ea939691cdc45b8 = (form)=>{
    const inputs = form.querySelectorAll("input, select, textarea");
    let valid = true;
    for (const input of inputs){
        const input_validation_array = input.getAttribute("data-validation")?.split(" ") || [];
        for (const validation_type of input_validation_array){
            if ($e4e578276a9b8761$var$isValidInput(validation_type, input)) continue;
            valid = false;
            break;
        }
    }
    return valid;
};


function $519a908a27bb123b$export$de4f09346a474704() {
    if (window.location.href.indexOf("/reset_password") === -1) return;
    const password = document.querySelector(".new_password");
    const confirmPassword = document.querySelector(".repeat_new_password");
    const url = new URL(window.location.href);
    const id = url.searchParams.get("id");
    const token = url.searchParams.get("token");
    const form = document.querySelector("form");
    const container = document.querySelector(".form-container");
    form.addEventListener("submit", async (e)=>{
        e.preventDefault();
        //if (!isValid(form)) return; Ovo ovdje je pravilo grešku!
        const toastr = new (0, $b2af54847256eaf0$export$3eeff3660b57051b)();
        if (password.value !== confirmPassword.value) return toastr.showErrorMessage("Passwords must match."); // prettier-ignore
        const formData = new FormData(form);
        formData.append("id", id);
        formData.append("token", token);
        try {
            const response = await (0, $d904c97f2f6d99c6$export$8134c072fddab6a5)("include/reset_forgotten_password.inc.php", formData);
            container.innerHTML = "";
            const message = document.createElement("p");
            Object.assign(message, {
                className: "input-container text-center",
                textContent: "Your password has been successfully changed. You can now sign in with new password. "
            });
            const goBack = document.createElement("a");
            Object.assign(goBack, {
                className: "btn btn-primary w-100 mt-m text-center",
                href: "./login",
                textContent: "OK"
            });
            container.append(message);
            container.append(goBack);
        } catch (e) {
            toastr.showErrorMessage("Something went wrong");
        }
    });
//   password.addEventListener("focus", removeErrorMessage);
//   confirmPassword.addEventListener("focus", removeErrorMessage);
}




function $c8cd89deb9c7e89c$export$a07fa8f0be6939b9() {
    if (window.location.href.indexOf("/forgotten_password") === -1) return;
    const form = document.querySelector("form");
    form.addEventListener("submit", async (e)=>{
        e.preventDefault();
        // if (email.value === "") return showErrorMessage('Field can\'t be empty.'); // prettier-ignore
        document.querySelector(".loader").classList.add("active");
        const formData = new FormData(form);
        try {
            const response = await (0, $d904c97f2f6d99c6$export$8134c072fddab6a5)("include/forgotten_password.inc.php", formData);
            form.innerHTML = "";
            const message = document.createElement("p");
            Object.assign(message, {
                className: "input-form text-center",
                textContent: "Thank you for reaching out! We have sent you an e-mail with the password reset link. "
            });
            const goBack = document.createElement("a");
            Object.assign(goBack, {
                className: "btn btn-primary w-100 mt-m text-center",
                href: "./",
                textContent: "OK"
            });
            form.append(message);
            form.append(goBack);
        } catch (e) {
            const toastr = new (0, $b2af54847256eaf0$export$3eeff3660b57051b)();
            toastr.showErrorMessage("Something went wrong");
        }
        document.querySelector(".loader").classList.remove("active");
    });
}


function $9f78e793d7a2c57f$export$810fe9dc3e3f25b5(container) {
    let errorMessages = container.querySelectorAll(".registration-form__error");
    for (let errorMessage of errorMessages)errorMessage.innerHTML = "";
}
function $9f78e793d7a2c57f$export$31017b9754b0f92f(container, color) {
    let inputs = container.querySelectorAll("input, textarea");
    for (let input of inputs)input.style.borderColor = color;
}
function $9f78e793d7a2c57f$export$26bfffddf80268a1(container = document.body) {
    let inputs = container.querySelectorAll("input, textarea");
    for (let input of inputs)input.value = "";
}
function $9f78e793d7a2c57f$export$9adf5cd6c82e1036(container) {
    let inputs = container.querySelectorAll("input, textarea");
    inputs.forEach((input)=>input.setAttribute("disabled", "true"));
}
function $9f78e793d7a2c57f$export$3ee3cdcb818773b8(inputFieldsArray) {
    let inputValuesArray = [];
    for (let input of inputFieldsArray){
        const value = input.getAttribute("value");
        inputValuesArray.push(value);
    }
    return inputValuesArray;
}
function $9f78e793d7a2c57f$export$9864db2970f1a845(inputFieldsArray, inputValueArray) {
    for(let i = 0; i < inputFieldsArray.length; i++)inputFieldsArray[i].value = inputValueArray[i];
}
function $9f78e793d7a2c57f$export$a9bb9daf4443c76f(e) {
    const container = e.target.parentElement;
    if (!container || container.querySelector(".registration-form__error").innerHTML === "") return;
    container.querySelector(".registration-form__error").innerHTML = "";
    e.target.style.borderColor = window.getComputedStyle(document.body, null).getPropertyValue("background-color") == "rgb(255, 255, 255)" ? "rgba(51, 51, 51, 0.5)" : "rgba(238, 238, 238, 0.5)";
}


function $a98a4eb110e8dbda$export$44163eaf156fe716(result, container = document.body) {
    (0, $9f78e793d7a2c57f$export$810fe9dc3e3f25b5)(container);
    (0, $9f78e793d7a2c57f$export$31017b9754b0f92f)(container, "ced4da");
    $a98a4eb110e8dbda$var$showErrorMessages(result, container);
}
function $a98a4eb110e8dbda$export$dd1bc94b04021eeb(inputs) {
    let errorArray = [];
    for (let input of inputs){
        if (input.id === "default-firm") continue;
        if (input.value == "") {
            input.style.borderColor = "#a94442";
            input.classList.remove("h-100");
            input.parentElement.querySelector(".registration-form__error").innerHTML = "Polje ne smije biti prazno";
            errorArray.push("error");
            continue;
        }
        let body = document.querySelector("body");
        let backgroundColor = window.getComputedStyle(body, null).getPropertyValue("background-color");
        input.style.borderColor = backgroundColor == "rgb(255, 255, 255)" ? "rgba(51, 51, 51, 0.5)" : "rgba(238, 238, 238, 0.5)";
        input.parentElement.querySelector(".registration-form__error").innerHTML = "";
    }
    return errorArray;
}
function $a98a4eb110e8dbda$var$showErrorMessages(result, container = document.body) {
    for (const [key, value] of Object.entries(result)){
        let field = container.querySelector(`input[name="${key}"]`) ? container.querySelector(`input[name="${key}"]`) : container.querySelector(`select[name="${key}"]`) ? container.querySelector(`select[name="${key}"]`) : container.querySelector(`textarea[name="${key}"]`) ? container.querySelector(`textarea[name="${key}"]`) : container.querySelector(`[name="${key}"]`);
        field.style.borderColor = "#a94442";
        field.parentElement.querySelector(".registration-form__error").innerHTML = value;
    }
}





function $6f1789f5283f117a$export$596d806903d1f59e() {
    if (!document.querySelector("#login-button")) return;
    document.addEventListener("input", (0, $9f78e793d7a2c57f$export$a9bb9daf4443c76f));
    const registrationForm = document.querySelector("form");
    registrationForm.addEventListener("submit", async (e)=>{
        e.preventDefault();
        if (!(0, $e4e578276a9b8761$export$1ea939691cdc45b8)(registrationForm)) return;
        let formData = new FormData(registrationForm);
        formData.append("submit", "");
        const result = await (0, $d904c97f2f6d99c6$export$8134c072fddab6a5)("include/login.inc.php", formData);
        if (!result) return location.href = "projects";
        (0, $a98a4eb110e8dbda$export$44163eaf156fe716)(result);
    });
}


class $ac2b68be98ad12eb$var$Cart {
    constructor(){
        this.cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
        this.container = document.querySelector(".cart-container");
        this.cartQuantity = this.setCartQuantity();
        this.updateCartItemsQuantity();
    }
    displayCartItems = ()=>{
        for (const item of this.cart)this.container.innerHTML += this.render(item);
    };
    updateCart = (event)=>{
        if (event.target.classList.contains("add-to-cart-button")) this.addToCart(event);
        else if (event.target.classList.contains("add-cart-item")) {
            this.addToCart(event);
            this.updateItemQuantity(event);
        } else if (event.target.classList.contains("remove-cart-item")) {
            this.removeFromCart(event);
            this.updateItemQuantity(event);
        }
    };
    addToCart = (event)=>{
        const id = event.target.dataset.id;
        const product = {
            id: id,
            name: event.target.dataset.name,
            price: event.target.dataset.price
        };
        const results = this.cart.filter((prodInCart)=>prodInCart.product.id == id);
        if (results.length == 1) this.cart = this.cart.map((p)=>p.product.id == id ? {
                ...p,
                quantity: p.quantity + 1
            } : p);
        else this.cart = [
            ...this.cart,
            {
                product: product,
                quantity: 1
            }
        ];
        this.cartQuantity++;
        this.updateCartItemsQuantity();
        this.saveToDb();
    };
    removeFromCart = (event)=>{
        const id = event.target.dataset.id;
        this.cart = this.cart.map((prodInCart)=>prodInCart.product.id == id ? {
                ...prodInCart,
                quantity: prodInCart.quantity - 1
            } : prodInCart);
        this.cart = this.cart.filter((prodInCart)=>prodInCart.quantity != 0);
        this.cartQuantity--;
        this.updateCartItemsQuantity();
        this.saveToDb();
    };
    updateItemQuantity = (event)=>{
        const id = event.target.dataset.id;
        event.target.parentElement.querySelector(".cart-quantity").textContent = this.getItemQuantity(id);
    };
    updateCartItemsQuantity = ()=>{
        const itemQuantity = document.querySelector(".header-cart-quantity");
        if (itemQuantity) {
            itemQuantity.textContent = this.cartQuantity;
            itemQuantity.style.opacity = this.cartQuantity > 0 ? "1" : "0";
            console.log({
                itemQuantity: itemQuantity
            });
        }
    };
    saveToDb = ()=>{
        localStorage.setItem("cart", JSON.stringify(this.cart));
    };
    render = (item)=>{
        return `
    <div class="cart-item">
        <img src="./uploads/images/small-placeholder.png" alt="Product Image">
        <h2 class="cart-item-name">${item.product.name}</h2>
        <p class="cart-item-price">Price: ${item.product.price}KM</p>
        <div class="cart-item-quantity">
            <span class="remove-cart-item" data-id="${item.product.id}">-</span>
            <p>Quantity: <span class="cart-quantity"> ${item.quantity} </span></p>
            <span class="add-cart-item" data-id="${item.product.id}">+</span>
        </div>
        <button class="remove-button"></button>
    </div>`;
    };
    getItemQuantity = (id)=>{
        for (const item of this.cart){
            if (item.product.id === id) return item.quantity;
        }
        return 0;
    };
    setCartQuantity = ()=>{
        let quantity = 0;
        for (const item of this.cart)quantity += Number(item.quantity);
        return quantity;
    };
}
const $ac2b68be98ad12eb$export$e79499a77ba07702 = new $ac2b68be98ad12eb$var$Cart();



class $44736923299aa24d$export$3a8840c5b2ecf003 {
    constructor(){
        this.categories;
        this.container = document.querySelector(".sidebar-list");
        this.activeCategory = this.getActiveCategory();
    }
    displayCategories = ()=>{
        this.container.innerHTML += `
    <li class="sidebar-item">
       <a href="" data-category="" class="sidebar-link"> All </a>
    </li>`;
        for (const category of this.categories)this.container.innerHTML += `
    <li class="sidebar-item">
       <a href="" data-category="${category.id}" class="sidebar-link"> ${category.name} </a>
    </li>`;
        this.setActiveCategory();
    };
    loadCategories = async ()=>{
        const form = new FormData();
        form.append("data", JSON.stringify({
            function: "get_categories"
        }));
        this.categories = await (0, $d904c97f2f6d99c6$export$8134c072fddab6a5)("./includes/ajax.inc.php", form);
        this.displayCategories();
    };
    setActiveCategory = ()=>{
        const categories = document.querySelectorAll(".sidebar-item");
        for(let i = 0; i < categories.length; i++)if (this.activeCategory == i) categories[i].classList.add("active");
        else categories[i].classList.remove("active");
    };
    getActiveCategory = ()=>{
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get("category") ?? 0;
    };
    handleClick = (e)=>{
        if (!e.target.classList.contains("sidebar-link")) return;
        e.stopPropagation();
        e.preventDefault();
        this.activeCategory = e.target.dataset.category;
        const urlParams = new URL(window.location);
        urlParams.searchParams.set("category", this.activeCategory);
        this.setActiveCategory();
        window.history.pushState({}, "", urlParams.href);
        window.dispatchEvent(new Event("popstate"));
    };
}


function $da283c3f32bdd5b4$export$61fc7d43ac8f84b0(func, timeout = 300) {
    let timer;
    return (...args)=>{
        clearTimeout(timer);
        timer = setTimeout(()=>{
            func.apply(this, args);
        }, timeout);
    };
}


class $5ef890f95d70132f$var$EventObserver {
    constructor(){
        this.scrollObservers = [];
        this.clickObservers = [];
        this.inputObservers = [];
        this.urlObservers = [];
    }
    subscribeToScrollEvent = (sub)=>{
        this.scrollObservers.push(sub);
    };
    unsubscribeFromScrollEvent = (sub)=>{
        this.scrollObservers = this.scrollObservers.filter((observer)=>observer !== sub);
    };
    subscribeToClickEvent = (sub)=>{
        this.clickObservers.push(sub);
    };
    subscribeToInputEvent = (sub)=>{
        this.inputObservers.push(sub);
    };
    subscribeToUrlUpdateEvent = (sub)=>{
        this.urlObservers.push(sub);
    };
    notify = (data)=>{
        if (data.type === "scroll") this.scrollObservers.forEach((observer)=>observer(data));
        else if (data.type === "click") this.clickObservers.forEach((observer)=>observer(data));
        else if (data.type === "input") this.inputObservers.forEach((observer)=>observer(data));
        else if (data.type === "popstate") this.urlObservers.forEach((observer)=>observer(data));
    };
}
const $5ef890f95d70132f$export$c4fad237f56fdedf = new $5ef890f95d70132f$var$EventObserver();



const $2d042edc49f9d07c$var$imageObserver = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
        if (entry.isIntersecting) {
            const lazyImage = entry.target;
            lazyImage.src = lazyImage.dataset.src;
            $2d042edc49f9d07c$var$imageObserver.unobserve(lazyImage);
        }
    });
});
const $2d042edc49f9d07c$export$3b98fa096e9fc203 = (selector)=>{
    const lazyImages = document.querySelectorAll(selector);
    lazyImages.forEach((img)=>{
        $2d042edc49f9d07c$var$imageObserver.observe(img);
    });
};


const $4e914be1c43e3646$export$56525cbb1fcd885c = ()=>{
    document.querySelector(".loader")?.classList.add("active");
};
const $4e914be1c43e3646$export$5cee2c2772922923 = ()=>{
    document.querySelector(".loader")?.classList.remove("active");
};


class $016b1c95860e579a$export$831fdf77aa2a6a18 {
    constructor(){
        this.currentItems;
        this.page = 1;
        this.loading = false;
        this.endOfList = false;
        this.container = document.getElementById("grid-view");
    }
    displayProducts = ()=>{
        if (this.currentItems.length === 0) this.endOfList = true;
        if (this.currentItems.length === 0 && this.page === 1) return this.noProductsFound(); // prettier-ignore
        for (const item of this.currentItems)this.container.innerHTML += this.render(item);
    };
    render = (product)=>{
        return `
    <div class="product">
      <div class="product-header">
        <img data-src="./uploads/images/small-${product.image}" 
        alt="Munchmallow Family pack 210 g" 
        load="lazy" class="product-image">
        <a href="./product?q=${product.id}" 
        class="product-name">${product.name}</a>
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
        data-price="${product.min.price}">Dodaj u korpu</button>
      </div>
    </div>`;
    };
    noProductsFound = ()=>{
        this.container.innerHTML = `<h2>No products found</h2>`;
    };
    loadProducts = async ()=>{
        this.loading = true;
        (0, $4e914be1c43e3646$export$56525cbb1fcd885c)();
        const urlParams = new URLSearchParams(window.location.search);
        const form = new FormData();
        form.append("data", JSON.stringify({
            function: "get_products",
            page: this.page,
            category: urlParams.get("category"),
            name: urlParams.get("name")
        }));
        this.currentItems = await (0, $d904c97f2f6d99c6$export$8134c072fddab6a5)("./includes/ajax.inc.php", form);
        this.displayProducts();
        (0, $2d042edc49f9d07c$export$3b98fa096e9fc203)(".product img[data-src]");
        this.loading = false;
        (0, $4e914be1c43e3646$export$5cee2c2772922923)();
    };
    loadNextProducts = ()=>{
        if (this.endOfList) (0, $4e914be1c43e3646$export$5cee2c2772922923)();
        if (this.loading || this.endOfList) return;
        const { scrollTop: scrollTop, scrollHeight: scrollHeight, clientHeight: clientHeight } = document.documentElement;
        if (scrollTop + clientHeight < scrollHeight - 200) return;
        this.page++;
        this.loadProducts();
    };
    updateProductByCategoryAndName = (e)=>{
        this.updateSearchParams();
        this.loadProducts();
    };
    updateSearchParams = ()=>{
        window.scrollTo(0, 0);
        this.page = 1;
        this.endOfList = false;
        this.container.innerHTML = "";
    };
}


class $a9e29010bf7e996b$var$Search {
    setSearch = ()=>{
        const urlParams = new URLSearchParams(window.location.search);
        document.querySelector(".product-search").value = urlParams.get("name");
    };
    productSearch = (e)=>{
        if (!e.target.classList.contains("product-search")) return;
        const urlParams = new URL(window.location);
        urlParams.searchParams.set("name", e.target.value);
        window.history.pushState({}, "", urlParams.href);
        window.dispatchEvent(new Event("popstate"));
    };
}
const $a9e29010bf7e996b$export$d76128d007d19019 = new $a9e29010bf7e996b$var$Search();



async function $f8bf2acd589a4d0d$export$c0a517f396609983() {
    if (window.location.href.indexOf("/products") === -1) return;
    const products = new (0, $016b1c95860e579a$export$831fdf77aa2a6a18)();
    products.loadProducts();
    const categories = new (0, $44736923299aa24d$export$3a8840c5b2ecf003)();
    categories.loadCategories();
    (0, $a9e29010bf7e996b$export$d76128d007d19019).setSearch();
    (0, $5ef890f95d70132f$export$c4fad237f56fdedf).subscribeToScrollEvent(products.loadNextProducts);
    (0, $5ef890f95d70132f$export$c4fad237f56fdedf).subscribeToClickEvent(categories.handleClick);
    (0, $5ef890f95d70132f$export$c4fad237f56fdedf).subscribeToInputEvent((0, $da283c3f32bdd5b4$export$61fc7d43ac8f84b0)((0, $a9e29010bf7e996b$export$d76128d007d19019).productSearch, 200));
    (0, $5ef890f95d70132f$export$c4fad237f56fdedf).subscribeToUrlUpdateEvent(products.updateProductByCategoryAndName); // prettier-ignore
}





class $8545039ea1c97cf7$export$264ad599d7cef668 {
    constructor(){
        this.container = document.querySelector(".single-product-container");
        this.item;
        this.minPrice = 1000;
        const urlParams = new URLSearchParams(window.location.search);
        this.id = urlParams.get("q");
    }
    render = ()=>{
        this.container.innerHTML = `
    <div class="single-product">
      <div class="single-product-image-container">
        <img src="./uploads/images/${this.item[0].image}" class="single-product-image">
      </div>
      <div class="single-product-info">
        <h2 class="single-product-heading">
        ${this.item[0].name}
        </h2>
        <div class="single-product-footer">
          ${this.renderPrices(this.item[0].product_details)}
          <button class="add-to-cart-button" data-id="${this.item[0].id}" 
        data-name="${this.item[0].name}" 
        data-price="${this.minPrice}"> Dodaj u korpu </button>
        </div>
      </div>
    </div>`;
    };
    renderPrices = (details)=>{
        const prices = JSON.parse(details);
        let priceList = "";
        for (const detail of prices){
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
    loadProductData = async ()=>{
        (0, $4e914be1c43e3646$export$56525cbb1fcd885c)();
        const form = new FormData();
        form.append("data", JSON.stringify({
            function: "get_product",
            id: this.id
        }));
        this.item = await (0, $d904c97f2f6d99c6$export$8134c072fddab6a5)("./includes/ajax.inc.php", form);
        this.render();
        this.loading = false;
        (0, $4e914be1c43e3646$export$5cee2c2772922923)();
    };
}





class $ec00eeec302ad35a$export$9d1442d625f58870 {
    constructor(){
        this.data;
    }
    loadHistory = async ()=>{
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get("q");
        const form = new FormData();
        form.append("data", JSON.stringify({
            function: "get_price_history",
            id: id
        }));
        this.data = await (0, $d904c97f2f6d99c6$export$8134c072fddab6a5)("./includes/ajax.inc.php", form);
        console.log(this.data);
        this.structureDataByStore();
    };
    structureDataByStore = ()=>{
        let stores = [];
        for (const priceRow of this.data){
            const results = stores.filter((store)=>store.name == priceRow.name);
            if (results.length == 1) stores = stores.map((store)=>store.name === priceRow.name ? {
                    name: store.name,
                    prices: [
                        ...store.prices,
                        priceRow.price
                    ]
                } : store);
            else stores.push({
                name: priceRow.name,
                prices: [
                    priceRow.price
                ]
            });
        }
        const colors = [
            "#e6194B",
            "#3cb44b",
            "#ffe119",
            "#4363d8",
            "#f58231",
            "#911eb4",
            "#42d4f4",
            "#f032e6",
            "#bfef45",
            "#fabed4"
        ];
        let datasets = [];
        let i = 0;
        for (const store of stores){
            datasets.push({
                label: "Price history for " + store.name,
                data: store.prices.map((row)=>row),
                fill: false,
                borderColor: colors[i],
                tension: 0.1
            });
            i++;
        }
        new (0, $jntyt$chartjs.Chart)(document.getElementById("priceChart"), {
            type: "line",
            data: {
                labels: this.data.map((row)=>row.date),
                datasets: datasets
            }
        });
    };
}


async function $9a2741f51ef7a10b$export$e313b7bccc03a283() {
    if (window.location.href.indexOf("/product?") === -1) return;
    const product = new (0, $8545039ea1c97cf7$export$264ad599d7cef668)();
    product.loadProductData();
    const productPriceHistory = new (0, $ec00eeec302ad35a$export$9d1442d625f58870)();
    await productPriceHistory.loadHistory();
}




async function $303bf69c32792156$export$bb11a0e3802e9420() {
    if (window.location.href.indexOf("/cart") === -1) return;
    (0, $ac2b68be98ad12eb$export$e79499a77ba07702).displayCartItems();
}


(0, $f8bf2acd589a4d0d$export$c0a517f396609983)();
(0, $9a2741f51ef7a10b$export$e313b7bccc03a283)();
(0, $303bf69c32792156$export$bb11a0e3802e9420)();
(0, $6f1789f5283f117a$export$596d806903d1f59e)();
(0, $c8cd89deb9c7e89c$export$a07fa8f0be6939b9)();
(0, $519a908a27bb123b$export$de4f09346a474704)();
window.addEventListener("scroll", (0, $5ef890f95d70132f$export$c4fad237f56fdedf).notify);
window.addEventListener("click", (0, $5ef890f95d70132f$export$c4fad237f56fdedf).notify);
window.addEventListener("input", (0, $5ef890f95d70132f$export$c4fad237f56fdedf).notify);
window.addEventListener("popstate", (0, $5ef890f95d70132f$export$c4fad237f56fdedf).notify);
(0, $5ef890f95d70132f$export$c4fad237f56fdedf).subscribeToClickEvent((0, $ac2b68be98ad12eb$export$e79499a77ba07702).updateCart);


//# sourceMappingURL=index.js.map
