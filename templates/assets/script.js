
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


// Initialize and add the map
let map;

async function initMap() {
  // The location of Uluru
  const position = { lat: -25.344, lng: 131.031 };

const positionList = [
  { lat: 52.5200, lng: 13.4050 }, // Berlin
  { lat: 52.5163, lng: 13.3777 }, // Brandenburg Gate
  { lat: 52.4986, lng: 13.4034 }, // Checkpoint Charlie
  { lat: 52.5246, lng: 13.4105 }, // Museum Island
  { lat: 52.5006, lng: 13.4316 }  // East Side Gallery
];



  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  // The map, centered at Uluru
  map = new Map(document.getElementById("map"), {
    zoom: 13,
    center: positionList[0],
    mapId: "DEMO_MAP_ID",
  });

  positionList.forEach((e, index) => {
      const marker = new AdvancedMarkerElement({
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

  // The marker, positioned at Uluru
  // const marker = new AdvancedMarkerElement({
  //   map: map,
  //   position: position,
  //   title: "Uluru",
  //   content: new DOMParser().parseFromString(
  //   `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36">
  //     <circle cx="18" cy="18" r="15" fill="white" stroke="#E86117" stroke-width="6" />
  //   </svg>`,
  //   "image/svg+xml"
  // ).documentElement,
  // });
}

initMap();