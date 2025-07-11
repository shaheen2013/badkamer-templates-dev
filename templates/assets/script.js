
console.log("Script loaded successfully!");

async function initToggleMenu() {
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
}

async function initSlider() {
const swiper = new Swiper('.gallery-wrapper', { loop: true });
const reviews = new Swiper('.reviews-swiper', { loop: true,   spaceBetween: 20});

  const swiperButtonPrev = document.getElementById("swiper-button-prev");
  const swiperButtonNext = document.getElementById("swiper-button-next");

  const reviewButtonPrev = document.getElementById("review-button-prev");
  const reviewButtonNext = document.getElementById("review-button-next");

  swiperButtonPrev.addEventListener("click", () => swiper.slidePrev());
  swiperButtonNext.addEventListener("click", () => swiper.slideNext());

  reviewButtonPrev.addEventListener("click", () => reviews.slidePrev());
  reviewButtonNext.addEventListener("click", () => reviews.slideNext());

}

async function initMap() {
  let map;

  const positionList = Array.from({ length: 50 }, (_, i) => {
    const baseLat = 52.3676;
    const baseLng = 4.9041;
    return {
      lat: baseLat + (Math.random() - 0.5) * 0.01, // ±0.005 variation
      lng: baseLng + (Math.random() - 0.5) * 0.01
    };
  });


  // Request needed libraries.
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  // The map, centered at Uluru
  map = new Map(document.getElementById("map"), {
    zoom: 16,
    center: positionList[0],
    mapId: "DEMO_MAP_ID",
    mapTypeId: "terrain", // THIS is the key part
  });

  positionList.forEach((e, index) => {
    new AdvancedMarkerElement({
      map: map,
      position: e,
      title: `Marker ${index + 1}`,
      content: new DOMParser().parseFromString(
        `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15" fill="white" stroke="#E86117" stroke-width="6" />
              </svg>`,
        "image/svg+xml"
      ).documentElement,
    });

  });
}

initToggleMenu();
initSlider();
initMap();
