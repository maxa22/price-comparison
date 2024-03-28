const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const lazyImage = entry.target;
      lazyImage.src = lazyImage.dataset.src;
      imageObserver.unobserve(lazyImage);
    }
  });
});

export const lazyLoadImages = (selector) => {
  const lazyImages = document.querySelectorAll(selector);
  lazyImages.forEach((img) => {
    imageObserver.observe(img);
  });
};
