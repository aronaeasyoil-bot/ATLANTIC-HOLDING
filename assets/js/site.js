import {
  ceoProfile,
  companyCards,
  contactDetails,
  countries,
  investmentFormats,
  investorPillars,
  missionPillars,
  projectFamilies,
  resources,
  sectorCards,
  siteShell,
  stats
} from "./data.js";

function renderHeader() {
  const header = document.querySelector("[data-site-header]");
  if (!header) return;

  const currentPage = document.body.dataset.page || "";
  const navLinks = siteShell.navigation
    .map(
      (item) => `
        <a class="nav-link ${item.slug === currentPage ? "is-active" : ""}" href="${item.href}">
          ${item.label}
        </a>
      `
    )
    .join("");

  header.innerHTML = `
    <div class="site-nav">
      <a class="brand-mark" href="index.html" aria-label="Atlantic Holding">
        <span class="brand-mark__name">${siteShell.brand.name}</span>
      </a>
      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-menu" aria-label="Ouvrir le menu">
        <span>Menu</span>
      </button>
      <nav class="nav-links" id="site-menu" aria-label="Navigation principale">
        <div class="nav-links__panel">
          <p class="nav-links__eyebrow">Navigation</p>
          ${navLinks}
          <a class="button button--light nav-cta" href="${siteShell.primaryCta.href}">
            ${siteShell.primaryCta.label}
          </a>
        </div>
      </nav>
    </div>
  `;
}

function renderFooter() {
  const footer = document.querySelector("[data-site-footer]");
  if (!footer) return;

  const navLinks = siteShell.navigation
    .map((item) => `<a href="${item.href}">${item.label}</a>`)
    .join("");

  const contactLinks = contactDetails
    .map(
      (item) => `
        <a href="${item.href}">
          <span>${item.label}</span>
          <strong>${item.value}</strong>
        </a>
      `
    )
    .join("");

  footer.innerHTML = `
    <div class="section-shell footer-grid">
      <div>
        <p class="footer-eyebrow">${siteShell.brand.eyebrow}</p>
        <h2 class="footer-brand">${siteShell.brand.name}</h2>
        <p class="footer-copy">${siteShell.brand.statement}</p>
      </div>
      <div class="footer-links">
        <h3>Navigation</h3>
        <div class="footer-links__list">${navLinks}</div>
      </div>
      <div class="footer-links">
        <h3>Contacts</h3>
        <div class="footer-links__list footer-links__list--contacts">${contactLinks}</div>
      </div>
    </div>
    <div class="section-shell footer-base">
      <p>© <span data-current-year></span> ATLANTIC HOLDING. Tous droits réservés.</p>
      <p>Structure de contenu centralisée pour une future version anglaise.</p>
    </div>
  `;
}

function renderStats() {
  document.querySelectorAll("[data-stat-grid]").forEach((container) => {
    container.innerHTML = stats
      .map(
        (item) => `
          <article class="stat-card reveal">
            <div class="card-media">
              <img src="${item.image}" alt="${item.label}" loading="lazy">
            </div>
            <div class="stat-card__body">
              <span class="stat-value">${item.value}</span>
              <h3 class="stat-label">${item.label}</h3>
              <p class="stat-note">${item.note}</p>
            </div>
          </article>
        `
      )
      .join("");
  });
}

function renderSectorCards() {
  document.querySelectorAll("[data-sector-grid]").forEach((container) => {
    container.innerHTML = sectorCards
      .map(
        (item) => `
          <article class="sector-card reveal">
            <div class="sector-card__image" style="background-image: linear-gradient(180deg, rgba(7, 18, 36, 0.1), rgba(7, 18, 36, 0.85)), url('${item.image}')"></div>
            <div class="sector-card__body">
              <p class="eyebrow eyebrow--soft">${item.eyebrow}</p>
              <h3>${item.title}</h3>
              <p>${item.copy}</p>
              <a class="button button--ghost" href="${item.href}">Explorer le pôle</a>
            </div>
          </article>
        `
      )
      .join("");
  });
}

function renderBrandGrid() {
  document.querySelectorAll("[data-brand-grid]").forEach((container) => {
    container.innerHTML = companyCards
      .map(
        (item) => `
          <article class="brand-card reveal">
            <div class="card-media card-media--short">
              <img src="${item.image}" alt="${item.name}" loading="lazy">
            </div>
            <div class="brand-card__logo">
              <img src="${item.logo}" alt="${item.name}" loading="lazy">
            </div>
            <div class="brand-card__body">
              <p class="eyebrow eyebrow--soft">${item.role}</p>
              <h3>${item.name}</h3>
              <p>${item.description}</p>
            </div>
          </article>
        `
      )
      .join("");
  });
}

function renderCountryGrid() {
  document.querySelectorAll("[data-country-grid]").forEach((container) => {
    container.innerHTML = countries
      .map(
        (country) => `
          <article class="country-card reveal" style="--country-accent:${country.accent}">
            <div class="country-card__media">
              <img src="${country.image}" alt="${country.name}" loading="lazy">
              <div class="country-card__overlay">
                <span class="country-badge">${country.code}</span>
                <div>
                  <p class="eyebrow eyebrow--soft">${country.label}</p>
                  <h3>${country.name}</h3>
                </div>
              </div>
            </div>
            <div class="country-card__body">
              <p class="country-card__summary">${country.summary}</p>
              <ul class="entity-list">
                ${country.entities
                  .map(
                    (entity) => `
                      <li>
                        <strong>${entity.name}</strong>
                        <span>${entity.detail}</span>
                      </li>
                    `
                  )
                  .join("")}
              </ul>
              <p class="country-card__opportunity">${country.opportunity}</p>
            </div>
          </article>
        `
      )
      .join("");
  });
}

function renderCountrySections() {
  document.querySelectorAll("[data-country-sections]").forEach((container) => {
    container.innerHTML = countries
      .map(
        (country, index) => `
          <article class="country-detail reveal ${index % 2 === 1 ? "country-detail--reverse" : ""}" id="${country.slug}">
            <div class="country-detail__media" style="background-image: linear-gradient(180deg, rgba(5, 14, 30, 0.18), rgba(5, 14, 30, 0.82)), url('${country.image}')">
              <div class="country-detail__overlay">
                <span class="country-badge">${country.code}</span>
                <h3>${country.name}</h3>
                <p>${country.label}</p>
              </div>
            </div>
            <div class="country-detail__content">
              <p class="eyebrow">${country.label}</p>
              <h3>${country.name}</h3>
              <p>${country.summary}</p>
              <ul class="entity-list entity-list--detail">
                ${country.entities
                  .map(
                    (entity) => `
                      <li>
                        <strong>${entity.name}</strong>
                        <span>${entity.detail}</span>
                      </li>
                    `
                  )
                  .join("")}
              </ul>
              <div class="mini-logo-row">
                ${country.logos
                  .map(
                    (logo) => `
                      <span class="mini-logo">
                        <img src="${logo}" alt="" loading="lazy">
                      </span>
                    `
                  )
                  .join("")}
              </div>
              <p class="country-card__opportunity">${country.opportunity}</p>
            </div>
          </article>
        `
      )
      .join("");
  });
}

function renderMissionPillars() {
  document.querySelectorAll("[data-mission-pillars]").forEach((container) => {
    container.innerHTML = missionPillars
      .map(
        (item) => `
          <article class="pillar-card reveal">
            <div class="card-media card-media--short">
              <img src="${item.image}" alt="${item.title}" loading="lazy">
            </div>
            <div class="pillar-card__body">
              <h3>${item.title}</h3>
              <p>${item.copy}</p>
            </div>
          </article>
        `
      )
      .join("");
  });
}

function renderProjectGrids() {
  document.querySelectorAll("[data-project-grid]").forEach((container) => {
    const keys = (container.dataset.projectGrid || "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    container.innerHTML = keys
      .map((key) => {
        const project = projectFamilies[key];
        if (!project) return "";

        return `
          <article class="project-card reveal" id="${key}">
            <div class="project-card__media">
              <img src="${project.image}" alt="${project.title}" loading="lazy">
            </div>
            <div class="project-card__body">
              <p class="eyebrow">${project.eyebrow}</p>
              <h3>${project.title}</h3>
              <p>${project.intro}</p>
              <ul class="feature-list">
                ${project.features.map((feature) => `<li>${feature}</li>`).join("")}
              </ul>
            </div>
          </article>
        `;
      })
      .join("");
  });
}

function renderInvestorPillars() {
  document.querySelectorAll("[data-investor-pillars]").forEach((container) => {
    container.innerHTML = investorPillars
      .map(
        (item) => `
          <article class="investor-card reveal">
            <div class="card-media card-media--short">
              <img src="${item.image}" alt="${item.title}" loading="lazy">
            </div>
            <div class="investor-card__body">
              <h3>${item.title}</h3>
              <p>${item.copy}</p>
            </div>
          </article>
        `
      )
      .join("");
  });
}

function renderInvestmentFormats() {
  document.querySelectorAll("[data-investment-formats]").forEach((container) => {
    container.innerHTML = investmentFormats
      .map(
        (item) => `
          <article class="pillar-card reveal">
            <div class="card-media card-media--short">
              <img src="${item.image}" alt="${item.title}" loading="lazy">
            </div>
            <div class="pillar-card__body">
              <h3>${item.title}</h3>
              <p>${item.copy}</p>
            </div>
          </article>
        `
      )
      .join("");
  });
}

function renderResources() {
  document.querySelectorAll("[data-resource-grid]").forEach((container) => {
    container.innerHTML = resources
      .map(
        (item) => `
          <article class="resource-card reveal">
            <div class="card-media card-media--short">
              <img src="${item.image}" alt="${item.title}" loading="lazy">
            </div>
            <div class="resource-card__body">
              <p class="eyebrow eyebrow--soft">Documentation</p>
              <h3>${item.title}</h3>
              <p>${item.copy}</p>
              <a class="button button--ghost" href="${item.href}" target="_blank" rel="noopener noreferrer">
                ${item.cta}
              </a>
            </div>
          </article>
        `
      )
      .join("");
  });
}

function renderContactCards() {
  document.querySelectorAll("[data-contact-cards]").forEach((container) => {
    container.innerHTML = contactDetails
      .map(
        (item) => `
          <article class="contact-card reveal">
            <p>${item.label}</p>
            <a href="${item.href}">${item.value}</a>
          </article>
        `
      )
      .join("");
  });
}

function renderCeoSignature() {
  document.querySelectorAll("[data-ceo-name]").forEach((node) => {
    node.textContent = ceoProfile.name;
  });
  document.querySelectorAll("[data-ceo-role]").forEach((node) => {
    node.textContent = ceoProfile.role;
  });
  document.querySelectorAll("[data-ceo-quote]").forEach((node) => {
    node.textContent = ceoProfile.quote;
  });
}

function renderWhatsappButton() {
  if (document.querySelector("[data-whatsapp-float]")) return;

  const button = document.createElement("a");
  button.className = "whatsapp-float";
  button.href = "https://wa.me/22391190615";
  button.target = "_blank";
  button.rel = "noopener noreferrer";
  button.dataset.whatsappFloat = "true";
  button.setAttribute("aria-label", "Contacter ATLANTIC HOLDING sur WhatsApp");
  button.innerHTML = `
    <span class="whatsapp-float__icon">WA</span>
    <span class="whatsapp-float__copy">
      <strong>WhatsApp</strong>
      <span>+223 91 19 06 15</span>
    </span>
  `;
  document.body.append(button);
}

function updateYear() {
  document.querySelectorAll("[data-current-year]").forEach((node) => {
    node.textContent = new Date().getFullYear();
  });
}

function setupHeaderBehavior() {
  const header = document.querySelector("[data-site-header]");
  const toggle = header?.querySelector(".nav-toggle");
  const menu = header?.querySelector(".nav-links");
  const toggleLabel = toggle?.querySelector("span");
  const isHomePage = document.body.dataset.page === "accueil";

  const updateHeader = () => {
    if (!header) return;

    const menuIsOpen = menu?.classList.contains("is-open");
    const headerThreshold = isHomePage ? window.innerHeight * 0.72 : 18;
    header.classList.toggle("is-scrolled", window.scrollY > headerThreshold || menuIsOpen);

    if (isHomePage) {
      document.body.classList.toggle("show-whatsapp", window.scrollY > window.innerHeight * 0.9);
    }
  };

  const setMenuState = (isOpen) => {
    if (!menu || !toggle) return;

    menu.classList.toggle("is-open", isOpen);
    header?.classList.toggle("is-menu-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));

    if (toggleLabel) {
      toggleLabel.textContent = isOpen ? "Fermer" : "Menu";
    }

    updateHeader();
  };

  toggle?.addEventListener("click", () => {
    setMenuState(!menu?.classList.contains("is-open"));
  });

  menu?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      setMenuState(false);
    });
  });

  document.addEventListener("click", (event) => {
    if (!menu?.classList.contains("is-open")) return;
    if (header?.contains(event.target)) return;
    setMenuState(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setMenuState(false);
    }
  });

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
}

function setupHeroSlider() {
  const hero = document.querySelector("[data-hero-slider]");
  if (!hero) return;

  const slides = Array.from(hero.querySelectorAll("[data-hero-slide]"));
  const dotsHost = hero.querySelector("[data-hero-dots]");
  if (!slides.length || !dotsHost) return;

  let activeIndex = 0;
  let timerId = 0;

  const activate = (nextIndex) => {
    activeIndex = nextIndex;
    slides.forEach((slide, index) => {
      slide.classList.toggle("is-active", index === activeIndex);
    });
    dotsHost.querySelectorAll("button").forEach((dot, index) => {
      dot.classList.toggle("is-active", index === activeIndex);
      dot.setAttribute("aria-current", index === activeIndex ? "true" : "false");
    });
  };

  const restart = () => {
    window.clearInterval(timerId);
    timerId = window.setInterval(() => {
      activate((activeIndex + 1) % slides.length);
    }, 6000);
  };

  dotsHost.innerHTML = slides
    .map(
      (_, index) => `
        <button type="button" class="hero-dot ${index === 0 ? "is-active" : ""}" aria-label="Afficher la diapositive ${index + 1}" aria-current="${index === 0 ? "true" : "false"}"></button>
      `
    )
    .join("");

  dotsHost.querySelectorAll("button").forEach((button, index) => {
    button.addEventListener("click", () => {
      activate(index);
      restart();
    });
  });

  hero.addEventListener("mouseenter", () => window.clearInterval(timerId));
  hero.addEventListener("mouseleave", restart);

  activate(0);
  restart();
}

function setupRevealAnimations() {
  const items = Array.from(document.querySelectorAll(".reveal"));
  if (!items.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  items.forEach((item) => observer.observe(item));
}

function setupContactForm() {
  const form = document.querySelector("[data-contact-form]");
  const feedback = document.querySelector("[data-contact-feedback]");
  if (!form || !feedback) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const values = Object.fromEntries(formData.entries());

    const subject = encodeURIComponent(
      `Demande de partenariat - ${values.pays || "ATLANTIC HOLDING"}`
    );
    const body = encodeURIComponent(
      [
        `Nom : ${values.nom || ""}`,
        `Email : ${values.email || ""}`,
        `Telephone : ${values.telephone || ""}`,
        `Pays : ${values.pays || ""}`,
        `Type de partenariat : ${values.partenariat || ""}`,
        "",
        "Message :",
        values.message || ""
      ].join("\n")
    );

    feedback.textContent =
      "Votre demande est prête. Votre messagerie va s'ouvrir pour envoyer le message au groupe.";
    window.location.href = `mailto:info@goumalo.com?subject=${subject}&body=${body}`;
    form.reset();
  });
}

function init() {
  renderHeader();
  renderFooter();
  renderStats();
  renderSectorCards();
  renderBrandGrid();
  renderCountryGrid();
  renderCountrySections();
  renderMissionPillars();
  renderProjectGrids();
  renderInvestorPillars();
  renderInvestmentFormats();
  renderResources();
  renderContactCards();
  renderCeoSignature();
  renderWhatsappButton();
  updateYear();
  setupHeaderBehavior();
  setupHeroSlider();
  setupRevealAnimations();
  setupContactForm();
}

init();
