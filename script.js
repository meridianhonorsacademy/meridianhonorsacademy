document.documentElement.classList.add("js");

const header = document.querySelector("[data-header]");
const menuButton = document.querySelector("[data-menu-button]");
const nav = document.querySelector("[data-nav]");

const closeMenu = () => {
  if (!menuButton || !nav) return;
  menuButton.setAttribute("aria-expanded", "false");
  nav.classList.remove("is-open");
  document.body.classList.remove("nav-open");
};

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const open = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!open));
    nav.classList.toggle("is-open", !open);
    document.body.classList.toggle("nav-open", !open);
  });

  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
}

const updateHeader = () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 12);
};
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

document.querySelectorAll("[data-accordion] button").forEach((button) => {
  button.addEventListener("click", () => {
    const expanded = button.getAttribute("aria-expanded") === "true";
    const panel = button.closest(".accordion__item")?.querySelector(".accordion__panel");
    button.setAttribute("aria-expanded", String(!expanded));
    if (panel) panel.hidden = expanded;
  });
});

const form = document.querySelector("[data-interest-form]");
const status = document.querySelector("[data-form-status]");

if (form && status) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    let valid = true;
    form.querySelectorAll("[required]").forEach((field) => {
      const fieldValid = field.checkValidity();
      field.setAttribute("aria-invalid", String(!fieldValid));
      if (!fieldValid) valid = false;
    });

    const zip = form.elements.zip;
    if (zip && zip.value && !/^\d{5}$/.test(zip.value)) {
      zip.setAttribute("aria-invalid", "true");
      valid = false;
    }

    if (!valid) {
      status.textContent = "Please review the highlighted fields.";
      const firstInvalid = form.querySelector('[aria-invalid="true"]');
      firstInvalid?.focus();
      return;
    }

    const data = Object.fromEntries(new FormData(form).entries());
    const saved = JSON.parse(localStorage.getItem("meridianInterestList") || "[]");
    saved.push({ ...data, savedAt: new Date().toISOString() });
    localStorage.setItem("meridianInterestList", JSON.stringify(saved));

    status.textContent = "Thank you—your interest was saved in this browser for the website prototype.";
    form.reset();
    form.querySelectorAll("[aria-invalid]").forEach((field) => field.removeAttribute("aria-invalid"));
  });

  form.addEventListener("input", (event) => {
    if (event.target.matches("input, select")) {
      event.target.removeAttribute("aria-invalid");
      status.textContent = "";
    }
  });
}

document.querySelectorAll("[data-year]").forEach((node) => {
  node.textContent = new Date().getFullYear();
});
