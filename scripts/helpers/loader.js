const showLoader = () => {
  document.querySelector(".loader")?.classList.add("active");
};
const hideLoader = () => {
  document.querySelector(".loader")?.classList.remove("active");
};

export { showLoader, hideLoader };
