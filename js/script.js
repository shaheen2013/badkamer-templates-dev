const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");
const header = document.getElementById("header");
const header_logo = document.getElementById("header-logo");
const originalBgClass = header
  ? Array.from(header.classList).find((cls) => cls.startsWith("bg-"))
  : null;
const headerHasWhiteByDefault = header
  ? header.classList.contains("bg-white")
  : false;
const config = window.siteConfig || { logoLight: "", logoDark: "" }; // Fallback config

// Mobile menu toggle
if (mobileMenuButton && mobileMenu) {
  const toggle = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");

  if (toggle && mobileMenu) {
    toggle.addEventListener("click", () => {
      const isHidden = mobileMenu.classList.contains("hidden");

      if (isHidden) {
        mobileMenu.classList.remove("hidden");
        void mobileMenu.offsetWidth; // force reflow

        mobileMenu.classList.add("flex");
        mobileMenu.classList.remove("opacity-0", "-translate-y-5");
        mobileMenu.classList.add("opacity-100", "translate-y-0");
      } else {
        // Animate out
        mobileMenu.classList.remove("opacity-100", "translate-y-0");
        mobileMenu.classList.add("opacity-0", "-translate-y-5");

        // Wait for transition to complete, then hide
        setTimeout(() => {
          mobileMenu.classList.add("hidden");
          mobileMenu.classList.remove("flex");
        }, 300); // same as your CSS transition duration
      }
    });
  }
}

// Scroll effect
if (header && header_logo && originalBgClass) {
  const menuButton = document.getElementById("mobile-menu-button");
  const mainNav = document.getElementById("main-nav");
  const headerHasWhiteByDefault = header.classList.contains("bg-white");

  window.addEventListener("scroll", () => {
    if (headerHasWhiteByDefault) return;

    const scrolledPast = window.scrollY > 680;
    const hasBgWhite = header.classList.contains("bg-white");

    if (scrolledPast && !hasBgWhite) {
      header.classList.remove(originalBgClass);
      header.classList.add("bg-white");
      header_logo.setAttribute("src", config.logoDark);

      menuButton?.classList.remove("text-white");
      menuButton?.classList.add("text-[#091022]");

      // Set all non-active links to black
      mainNav?.querySelectorAll("a").forEach((link) => {
        const indicator = link.querySelector("#active-indicator");

        if (!link.hasAttribute("aria-current")) {
          link.classList.remove("text-white", "text-[#676B76]");
          link.classList.add("text-[#676B76]");
        } else {
          link.classList.remove("text-white");
          link.classList.add("text-[#091022]");
          if (indicator) {
            indicator.classList.remove("bg-white");
            indicator.classList.add("bg-[#091022]");
          }
        }

        // Update hover indicator for all links
        if (indicator) {
          indicator.classList.remove("bg-white");
          indicator.classList.add("bg-[#676B76]");
        }
      });
    } else if (!scrolledPast && hasBgWhite) {
      header.classList.remove("bg-white");
      header.classList.add(originalBgClass);
      header_logo.setAttribute("src", config.logoLight);

      menuButton?.classList.remove("text-[#091022]");
      menuButton?.classList.add("text-white");

      // Restore non-active links to original color (white or gray)
      mainNav?.querySelectorAll("a").forEach((link) => {
        const indicator = link.querySelector("#active-indicator");

        if (!link.hasAttribute("aria-current")) {
          link.classList.remove("text-[#676B76]");
          link.classList.add("text-white");
        } else {
          link.classList.remove("text-[#091022]");
          link.classList.add("text-white");
          if (indicator) {
            indicator.classList.remove("bg-[#091022]");
            indicator.classList.add("bg-white");
          }
        }
        // Update hover indicator for all links
        if (indicator) {
          indicator.classList.remove("bg-[#091022]");
          indicator.classList.add("bg-white");
        }
      });
    }
  });
}

// Close mobile menu when clicking a link
if (mobileMenu && mobileMenuButton) {
  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("max-h-0", "opacity-0");
      mobileMenu.classList.remove("max-h-96", "opacity-100");
      const icon = mobileMenuButton.querySelector("i");
      if (icon && typeof lucide !== "undefined") {
        icon.setAttribute("data-lucide", "menu");
        lucide.createIcons();
      }
    });
  });
}
const projectsSwiper = new Swiper(".projects-swiper", {
  loop: true,
  slidesPerView: 1,
  navigation: {
    nextEl: "#projects-button-next",
    prevEl: "#projects-button-prev",
  },
});

const reviewSwiper = new Swiper(".reviews-swiper", {
  loop: true,
  slidesPerView: 1,
  spaceBetween: 20,
  navigation: {
    nextEl: "#review-button-next",
    prevEl: "#review-button-prev",
  },
});

document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll(".category-tab");
  const cards = document.querySelectorAll("#trend-cards > div");
  tabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      tabs.forEach((t) => {
        t.classList.remove("bg-[#091022]", "text-white");
        t.classList.add("bg-white", "text-[#091022]");
      });
      this.classList.add("bg-[#091022]", "text-white");
      this.classList.remove("bg-white", "text-[#091022]");
      const cat = this.getAttribute("data-category");
      cards.forEach((card) => {
        if (cat === "all" || card.getAttribute("data-category") === cat) {
          card.style.display = "";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
  const src = getQueryParam("src");
  if (src) {
    const previewImage = document.getElementById("preview-album-image");
    if (previewImage) {
      previewImage.src = src;
    }
  }
});
function getQueryParam(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}
async function initMap() {
  let map;

  const positionList = Array.from({ length: 50 }, (_, i) => {
    const baseLat = 52.3676;
    const baseLng = 4.9041;
    return {
      lat: baseLat + (Math.random() - 0.5) * 0.01, // ±0.005 variation
      lng: baseLng + (Math.random() - 0.5) * 0.01,
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
initMap();

// Chatbot Popup Injection Script
// (function () {
//   // ESC key closes popup
//   document.addEventListener("keydown", function (e) {
//     if (e.key === "Escape" && popup.classList.contains("opacity-100")) {
//       popup.classList.remove("opacity-100", "scale-100");
//       popup.classList.add("opacity-0", "scale-95", "pointer-events-none");
//       setTimeout(() => {
//         popup.style.display = "none";
//         button.style.display = "block";
//       }, 400);
//     }
//   });
//   // --- Chatbot API Integration ---
//   const BASE_API = "http://10.0.0.52:9000";
//   let sessionId = localStorage.getItem("chatbot_session_id");

//   // Helper: create new session
//   async function createSession() {
//     const res = await fetch(`${BASE_API}/session/new`, { method: "POST" });
//     const data = await res.json();
//     if (data.session_id) {
//       localStorage.setItem("chatbot_session_id", data.session_id);
//       sessionId = data.session_id;
//     }
//     return data.session_id;
//   }

//   // Helper: send chat message
//   async function sendMessage(query) {
//     if (!sessionId) await createSession();
//     const res = await fetch(`${BASE_API}/chat/${sessionId}`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ query }),
//     });
//     return await res.json();
//   }

//   // Helper: get chat history
//   async function getHistory() {
//     if (!sessionId) return [];
//     const res = await fetch(`${BASE_API}/session/${sessionId}/history`);
//     const data = await res.json();
//     return data.messages || [];
//   }

//   // --- UI ---
//   const popup = document.createElement("div");
//   popup.id = "chatbot-popup";
//   popup.className =
//     "fixed bottom-6 right-6 z-50 w-80 md:w-[580px] bg-white shadow-xl rounded-lg border border-gray-200 min-h-[530px] transition-all duration-400 ease-in-out opacity-0 scale-95 pointer-events-none";
//   // Initially hidden with transition classes

//   popup.innerHTML = `
//     <div class="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50 rounded-t-lg">
//       <div class="flex items-center gap-2">
//       <img src='/images/chat-bot.svg' alt='Chatbot' class='size-12' />
//         <div>
//         <p class="text-gray-600 text-sm">The team can also help</p>
//         </div>
//       </div>
//       <button id="chatbot-close" class="cursor-pointer text-gray-400 hover:text-gray-700"><svg xmlns='http://www.w3.org/2000/svg' class='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M6 18L18 6M6 6l12 12'/></svg></button>
//     </div>
//     <div id="chatbot-messages" class="p-4 space-y-2 overflow-y-auto h-[400px]"></div>
//     <div class="bg-gray-50 rounded-lg border rounded border-[#C2CEF0] m-4 overflow-hidden flex px-4 py-2">
//       <input id="chatbot-input" type="text" placeholder="Ask a question" class="w-full border-none rounded-lg  focus:outline-none text-sm " />
//       <button id="chatbot-send" class="bg-[#091022] text-white text-sm size-7 rounded-full flex justify-center items-center cursor-pointer hover:scale-110 transition-transform duration-300"><svg width="16" height="16" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.19308 6.41295C2.06275 6.55571 2.07283 6.77708 2.21559 6.90741C2.35835 7.03774 2.57973 7.02766 2.71005 6.8849L6.65156 2.5674L6.65156 12.2489C6.65156 12.4422 6.80826 12.5989 7.00156 12.5989C7.19486 12.5989 7.35156 12.4422 7.35156 12.2489L7.35156 2.56942L11.2912 6.8849C11.4216 7.02766 11.6429 7.03774 11.7857 6.90741C11.9284 6.77708 11.9385 6.55571 11.8082 6.41295L7.38837 1.5715C7.29893 1.47354 7.18166 1.41766 7.06046 1.40386C7.04131 1.40062 7.02163 1.39893 7.00156 1.39893C6.98275 1.39893 6.96429 1.40041 6.94628 1.40327C6.82315 1.41599 6.70368 1.47207 6.61291 1.5715L2.19308 6.41295Z" fill="white"/></svg></button>
//     </div>
//   `;

//   document.body.appendChild(popup);

//   // Create chatbot button
//   const button = document.createElement("button");
//   button.id = "chatbot-open";
//   button.className =
//     "fixed bottom-6 right-6 z-40 bg-[#091022] hover:scale-115 text-white rounded-full shadow-lg size-[56px] flex items-center cursor-pointer transition-transform duration-300";
//   button.innerHTML =
//     "<img src='/images/bot.svg' alt='Chatbot' class='size-full animate-pulse' />";
//   document.body.appendChild(button);

//   // Show popup on button click
//   button.addEventListener("click", async function () {
//     // Animate open
//     popup.style.display = "block";
//     setTimeout(() => {
//       popup.classList.remove("opacity-0", "scale-95", "pointer-events-none");
//       popup.classList.add("opacity-100", "scale-100");
//     }, 10);
//     button.style.display = "none";
//     // Create session if not exists
//     if (!sessionId) await createSession();
//     // Load history
//     const messagesDiv = popup.querySelector("#chatbot-messages");
//     messagesDiv.innerHTML = "";
//     const history = await getHistory();
//     if (history.length === 0) {
//       messagesDiv.innerHTML = `<div class='bg-gray-100 p-3 rounded-md max-w-[80%] w-fit'><div class='font-semibold text-gray-700 mb-1'>Hi there! This is Milly (BadkamerVakmanSocial's AI bot).</div><div class='text-gray-600 text-sm'>I'm here to answer your questions, but you'll always have the option to talk to our team.</div></div><div class='bg-gray-50 p-2 rounded-md text-gray-600 text-sm max-w-[80%] w-fit'>Let me know how can I assist you today?</div>`;
//     } else {
//       history.forEach((msg) => {
//         messagesDiv.innerHTML += `<div class='mb-4 flex justify-end max-w-[80%] w-fit ml-auto flex'>
//         <div class='text-gray-600 bg-gray-100 p-2 rounded-md'>${msg.query}</div>
//         <img src='/images/user.svg' alt='User' class='size-6 my-auto' />
//         </div>`;
//         messagesDiv.innerHTML += `<div class='mb-4 flex justify-start max-w-[80%] w-fit flex'>
//         <img src='/images/chat-bot.svg' alt='Bot' class='size-6 my-auto' />
//         <div class='text-gray-600 bg-gray-50 p-2 rounded-md'>${msg.response}</div>
//         </div>`;
//       });
//     }
//     messagesDiv.scrollTop = messagesDiv.scrollHeight;
//   });

//   // Hide popup on close click
//   popup.querySelector("#chatbot-close").addEventListener("click", function () {
//     // Animate close
//     popup.classList.remove("opacity-100", "scale-100");
//     popup.classList.add("opacity-0", "scale-95", "pointer-events-none");
//     setTimeout(() => {
//       popup.style.display = "none";
//       button.style.display = "block";
//     }, 400); // match transition duration
//   });

//   // Send message
//   popup
//     .querySelector("#chatbot-send")
//     .addEventListener("click", async function () {
//       const input = popup.querySelector("#chatbot-input");
//       const messagesDiv = popup.querySelector("#chatbot-messages");
//       const query = input.value.trim();
//       if (!query) return;
//       // Show user message (right aligned)
//       messagesDiv.innerHTML += `<div class='mb-4 flex justify-end max-w-[80%] w-fit ml-auto flex'>
//       <div class='text-gray-600 bg-gray-100 p-2 rounded-md'>${query}</div>
//       <img src='/images/user.svg' alt='User' class='size-6 my-auto' />
//         </div>`;
//       messagesDiv.scrollTop = messagesDiv.scrollHeight;
//       input.value = "";
//       // Typing effect for bot response (left aligned)
//       const botContainer = document.createElement("div");
//       botContainer.className =
//         "mb-4 flex justify-start max-w-[80%] w-fit flex";
//       botContainer.innerHTML = `
//     <img src='/images/chat-bot.svg' alt='Bot' class='size-6 my-auto' />
//       <div class='text-gray-600 bg-gray-50 p-2 rounded-md' id='bot-typing'>...</div>
//       `;
//       messagesDiv.appendChild(botContainer);
//       // Send to API
//       botContainer.classList.add("animate-pulse");
//       messagesDiv.scrollTop = messagesDiv.scrollHeight;
//       const res = await sendMessage(query);
//       botContainer.classList.remove("animate-pulse");
//       const botTyping = botContainer.querySelector("#bot-typing");
//       const fullText = res.response || "Sorry, no response.";
//       let i = 0;
//       function typeChar() {
//         if (i <= fullText.length) {
//           botTyping.textContent = fullText.slice(0, i);
//           messagesDiv.scrollTop = messagesDiv.scrollHeight;
//           i++;
//           setTimeout(typeChar, 10); // speed of typing (ms per char)
//         }
//       }
//       typeChar();
//     });

//   // Enter key to send
//   popup
//     .querySelector("#chatbot-input")
//     .addEventListener("keydown", function (e) {
//       if (e.key === "Enter") {
//         popup.querySelector("#chatbot-send").click();
//       }
//     });
// })();
document
  .getElementById("contact-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const submitBtn = document.getElementById("submit-btn");
    const submitText = document.getElementById("submit-text");
    const submitLoading = document.getElementById("submit-loading");
    const successMsg = document.getElementById("form-success");
    const errorMsg = document.getElementById("form-error");

    // Hide previous messages
    successMsg.classList.add("hidden");
    errorMsg.classList.add("hidden");

    // Show loading state
    submitBtn.disabled = true;
    submitText.classList.add("hidden");
    submitLoading.classList.remove("hidden");

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        // Show success message
        successMsg.classList.remove("hidden");
        form.reset();
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      // Show error message
      errorMsg.classList.remove("hidden");
    } finally {
      // Reset button state
      submitBtn.disabled = false;
      submitText.classList.remove("hidden");
      submitLoading.classList.add("hidden");
    }
  });
