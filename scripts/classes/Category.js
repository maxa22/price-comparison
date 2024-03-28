import { fetchData } from "../helpers/fetch";

export class Category {
  constructor() {
    this.categories;
    this.container = document.querySelector(".sidebar-list");
    this.activeCategory = this.getActiveCategory();
  }

  displayCategories = () => {
    this.container.innerHTML += `
    <li class="sidebar-item">
       <a href="" data-category="" class="sidebar-link"> All </a>
    </li>`;
    for (const category of this.categories) {
      this.container.innerHTML += `
    <li class="sidebar-item">
       <a href="" data-category="${category.id}" class="sidebar-link"> ${category.name} </a>
    </li>`;
    }
    this.setActiveCategory();
  };

  loadCategories = async () => {
    const form = new FormData();
    form.append("data", JSON.stringify({ function: "get_categories" }));
    this.categories = await fetchData("./includes/ajax.inc.php", form);
    this.displayCategories();
  };

  setActiveCategory = () => {
    const categories = document.querySelectorAll(".sidebar-item");
    for (let i = 0; i < categories.length; i++) {
      if (this.activeCategory == i) categories[i].classList.add("active");
      else categories[i].classList.remove("active");
    }
  };

  getActiveCategory = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("category") ?? 0;
  };

  handleClick = (e) => {
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
