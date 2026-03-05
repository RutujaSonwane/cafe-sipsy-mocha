(() => {
  const bindMobileMenu = () => {
    const menuBtn = document.getElementById("menu-btn");
    const closeMenuBtn = document.getElementById("close-menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    const mobileLinks = document.querySelectorAll(".mobile-link");

    if (!menuBtn || !closeMenuBtn || !mobileMenu) return;
    if (mobileMenu.getAttribute("data-mobile-bound") === "true") return;
    mobileMenu.setAttribute("data-mobile-bound", "true");

    const openMobileMenu = () => {
      mobileMenu.classList.remove("translate-x-full");
      mobileMenu.classList.remove("closed");
      mobileMenu.classList.add("open");
      document.body.style.overflow = "hidden";
      menuBtn.setAttribute("aria-expanded", "true");
      mobileMenu.setAttribute("aria-hidden", "false");
    };

    const closeMobileMenu = () => {
      mobileMenu.classList.remove("open");
      mobileMenu.classList.add("closed");
      mobileMenu.classList.add("translate-x-full");
      document.body.style.overflow = "";
      menuBtn.setAttribute("aria-expanded", "false");
      mobileMenu.setAttribute("aria-hidden", "true");
    };

    menuBtn.addEventListener("click", openMobileMenu);
    closeMenuBtn.addEventListener("click", closeMobileMenu);
    mobileLinks.forEach((link) => link.addEventListener("click", closeMobileMenu));

    mobileMenu.addEventListener("click", (event) => {
      if (event.target === mobileMenu) closeMobileMenu();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && mobileMenu.classList.contains("open")) {
        closeMobileMenu();
      }
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bindMobileMenu);
  } else {
    bindMobileMenu();
  }
})();
