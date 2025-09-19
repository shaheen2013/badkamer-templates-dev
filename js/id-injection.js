document.addEventListener("DOMContentLoaded", function () {
  const IGNORED_SECTIONS = [
    "referenties-001",
    "referenties-002",
    "referenties-003",
    "referenties-004",
    "referenties-005",
    "referenties-006",
  ];

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
      // Check if element is inside an ignored section
      const parentSection = el.closest("section[id]");
      if (parentSection && IGNORED_SECTIONS.includes(parentSection.id)) {
        return; // Skip this element
      }

      const badge = document.createElement("p");
      badge.textContent = el.id;
      badge.style.cssText =
        "margin-left:8px;padding:2px 6px;font-size:11px;background:#F25C3C;color:#fff;border-radius:8px;vertical-align:middle;width:fit-content;max-height:40px;";
      const parent = el.parentElement;
      if (el.getAttribute("data-show-label") === "false") {
        return;
      } else if (el.tagName.toLowerCase() === "img") {
        parent.classList.add("relative");
        badge.style.position = "absolute";
        badge.style.top = "8px";
        badge.style.right = "8px";
        badge.style.zIndex = "10";
        parent.appendChild(badge);
        return;
      } else {
        const container = document.createElement("div");
        container.appendChild(el.cloneNode(true));
        container.appendChild(badge);
        el.replaceWith(container);
        container.classList.add(
          "flex",
          "gap-2",
          "items-center",
          "justify-center"
        );
      }
    });
  });
});
