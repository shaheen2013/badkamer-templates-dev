// Show/hide mega menu on BADKAMERS hover (works even if nav item is not wrapped in .group)
document.addEventListener("DOMContentLoaded", function () {
  const badkamersLink = document.getElementById("BADKAMERS");
  const header = document.querySelector("header");
  if (!badkamersLink || !header) return;
  const megaMenu = document.getElementById("badkamers-megamenu");
  let hideTimeout;
  function showMenu() {
    clearTimeout(hideTimeout);
    megaMenu.classList.remove("h-0", "overflow-hidden");
    megaMenu.classList.add("h-[369px]", "overflow-y-auto", "border-t");
  }
  function hideMenu() {
    hideTimeout = setTimeout(function () {
      megaMenu.classList.remove("h-[369px]", "overflow-y-auto", "border-t");
      megaMenu.classList.add("h-0", "overflow-hidden");
    }, 150);
  }
  badkamersLink.addEventListener("mouseover", showMenu);
  badkamersLink.addEventListener("mouseout", hideMenu);
  megaMenu.addEventListener("mouseover", showMenu);
  megaMenu.addEventListener("mouseout", hideMenu);
});
