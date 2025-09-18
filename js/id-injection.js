document.addEventListener("DOMContentLoaded", function () {
  const tags = [
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "p",
    "img",
    "blockquote",
    "li",
  ];
  tags.forEach((tag) => {
    document.querySelectorAll(tag + "[id]").forEach((el) => {
      const badge = document.createElement("span");
      badge.textContent = el.id;
      badge.style.cssText =
        "margin-left:8px;padding:2px 6px;font-size:11px;background:#F25C3C;color:#fff;border-radius:8px;vertical-align:middle;width:fit-content;max-height:40px;";
      if (el.getAttribute("data-show-label") === "false") {
        return;
      } else if (el.tagName.toLowerCase() === "img") {
        const parent = el.parentElement;
        parent.classList.add("relative");
        badge.style.position = "absolute";
        badge.style.top = "8px";
        badge.style.right = "8px";
        badge.style.zIndex = "10";
        parent.appendChild(badge);
        return;
      }
      el.innerHTML += badge.outerHTML;
    });
  });
});
