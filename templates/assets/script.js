
console.log("Script loaded successfully!");

const toggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

toggle.addEventListener("click", () => {
  if (mobileMenu.classList.contains("hidden")) {
    mobileMenu.classList.remove("hidden");
    mobileMenu.classList.add("animate-slide-down");
    mobileMenu.classList.add("flex");

    // Remove animation class after it plays so it can replay next time
    setTimeout(() => {
      mobileMenu.classList.remove("animate-slide-down");
    }, 300);
  } else {
    mobileMenu.classList.add("hidden");
  }
});

const swiper = new Swiper('.swiper', {
  // Optional parameters
  // direction: 'vertical',
  loop: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },
});

const swiperButtonPrev = document.getElementById("swiper-button-prev");
const swiperButtonNext = document.getElementById("swiper-button-next");

swiperButtonPrev.addEventListener("click", () => {
  swiper.slidePrev();
});

swiperButtonNext.addEventListener("click", () => {
  swiper.slideNext();
});

