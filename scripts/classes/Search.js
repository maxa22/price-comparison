class Search {
  setSearch = () => {
    const urlParams = new URLSearchParams(window.location.search);
    document.querySelector(".product-search").value = urlParams.get("name");
  };
  productSearch = (e) => {
    if (!e.target.classList.contains("product-search")) return;
    const urlParams = new URL(window.location);
    urlParams.searchParams.set("name", e.target.value);
    window.history.pushState({}, "", urlParams.href);
    window.dispatchEvent(new Event("popstate"));
  };
}

export const search = new Search();
