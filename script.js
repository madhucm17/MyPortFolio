(() => {
  const root = document.documentElement;
  const themeToggleButton = document.getElementById("theme-toggle");
  const storedTheme = localStorage.getItem("theme");

  function applyTheme(theme) {
    if (theme === "light") {
      root.classList.add("theme-light");
    } else {
      root.classList.remove("theme-light");
    }
  }

  applyTheme(storedTheme);

  if (themeToggleButton) {
    themeToggleButton.addEventListener("click", () => {
      const isLight = root.classList.toggle("theme-light");
      localStorage.setItem("theme", isLight ? "light" : "dark");
      themeToggleButton.textContent = isLight ? "☀️" : "🌙";
    });
  }

  // Mobile navigation
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });
    navMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Project filters
  const filterChips = document.querySelectorAll(".filters .chip");
  const projectCards = document.querySelectorAll(".project-card");
  function setActiveChip(target) {
    filterChips.forEach(chip => chip.classList.remove("is-active"));
    target.classList.add("is-active");
  }
  function filterProjects(tag) {
    projectCards.forEach(card => {
      const tags = (card.getAttribute("data-tags") || "").split(/\s+/);
      const show = tag === "all" || tags.includes(tag);
      card.style.display = show ? "grid" : "none";
    });
  }
  filterChips.forEach(chip => {
    chip.addEventListener("click", () => {
      const tag = chip.getAttribute("data-filter") || "all";
      setActiveChip(chip);
      filterProjects(tag);
    });
  });

  // Footer year
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = String(new Date().getFullYear());
  }

  // Scroll reveal animations
  const revealElements = Array.from(document.querySelectorAll(
    ".section, .skill-card, .project-card, .timeline li, .contact-form, .hero-content, .hero-art"
  ));
  revealElements.forEach(el => el.classList.add("reveal"));

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!prefersReduced && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, { root: null, rootMargin: "0px 0px -10% 0px", threshold: 0.15 });

    revealElements.forEach(el => observer.observe(el));
  } else {
    // Fallback: show immediately
    revealElements.forEach(el => el.classList.add("is-visible"));
  }

  // Contact form: basic success UX for Formspree
  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", async (e) => {
      try {
        const formEl = e.currentTarget;
        if (!(formEl instanceof HTMLFormElement)) return;
        e.preventDefault();
        const submitBtn = formEl.querySelector("button[type=submit]");
        if (submitBtn) submitBtn.disabled = true;
        const data = new FormData(formEl);
        const res = await fetch(formEl.action, { method: formEl.method, body: data, headers: { Accept: "application/json" } });
        if (res.ok) {
          formEl.reset();
          alert("Thank you! I'll get back to you soon.");
        } else {
          alert("Sorry, something went wrong. Please try again later.");
        }
      } catch (_) {
        alert("Network error. Please try again.");
      } finally {
        const submitBtn = form.querySelector("button[type=submit]");
        if (submitBtn) submitBtn.disabled = false;
      }
    });
  }
})();


