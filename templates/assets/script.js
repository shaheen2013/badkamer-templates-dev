console.log("Script loaded successfully!");

const toggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

toggle.addEventListener("click", () => {
  console.log("Menu toggle clicked");
  if (mobileMenu.classList.contains("hidden")) {
    mobileMenu.classList.remove("hidden");
    mobileMenu.classList.add("animate-slide-down");

    // Remove animation class after it plays so it can replay next time
    setTimeout(() => {
      mobileMenu.classList.remove("animate-slide-down");
    }, 300);
  } else {
    mobileMenu.classList.add("hidden");
  }
});
