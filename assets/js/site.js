import { defaultSiteContent } from "./data.js";

const CONTENT_API = "/api/content";

let siteContent = cloneContent(defaultSiteContent);

function cloneContent(value) {
  return typeof structuredClone === "function"
    ? structuredClone(value)
    : JSON.parse(JSON.stringify(value));
}

function isObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function mergeContent(base, override) {
  if (override === undefined) {
    return cloneContent(base);
  }

  if (Array.isArray(override)) {
    return override.map((item) => cloneContent(item));
  }

  if (isObject(override)) {
    const result = isObject(base) ? cloneContent(base) : {};
    Object.keys(override).forEach((key) => {
      result[key] = mergeContent(base?.[key], override[key]);
    });
    return result;
  }

  return override;
}

async function loadSiteContent() {
  try {
    const response = await fetch(CONTENT_API, { cache: "no-store" });
    if (!response.ok) return;

    const remoteContent = await response.json();
    siteContent = mergeContent(defaultSiteContent, remoteContent);
  } catch {
    siteContent = cloneContent(defaultSiteContent);
  }
}

function getContentValue(path) {
  if (!path) return undefined;

  return path.split(".").reduce((current, key) => current?.[key], siteContent);
}

function formatLabel(key) {
  return key
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function escapeAttribute(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function renderHeader() {
  const header = document.querySelector("[data-site-header]");
  if (!header) return;

  const currentPage = document.body.dataset.page || "";
  const navLinks = siteContent.siteShell.navigation
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
      <a class="brand-mark" href="index.html" aria-label="${escapeAttribute(siteContent.siteShell.brand.name)}">
        <span class="brand-mark__name">${siteContent.siteShell.brand.name}</span>
      </a>
      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-menu" aria-label="Ouvrir le menu">
        <span>Menu</span>
      </button>
      <nav class="nav-links" id="site-menu" aria-label="Navigation principale">
        <div class="nav-links__panel">
          <p class="nav-links__eyebrow">Navigation</p>
          ${navLinks}
          <a class="button button--light nav-cta" href="${siteContent.siteShell.primaryCta.href}">
            ${siteContent.siteShell.primaryCta.label}
          </a>
        </div>
      </nav>
    </div>
  `;
}

function renderFooter() {
  const footer = document.querySelector("[data-site-footer]");
  if (!footer) return;

  const navLinks = siteContent.siteShell.navigation
    .map((item) => `<a href="${item.href}">${item.label}</a>`)
    .join("");

  const contactLinks = siteContent.contactDetails
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
        <p class="footer-eyebrow">${siteContent.siteShell.brand.eyebrow}</p>
        <h2 class="footer-brand">${siteContent.siteShell.brand.name}</h2>
        <p class="footer-copy">${siteContent.siteShell.brand.statement}</p>
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
      <p>&copy; <span data-current-year></span> ATLANTIC HOLDING. Tous droits reserves.</p>
      <p>Structure de contenu centralisee pour une future version anglaise.</p>
    </div>
  `;
}

function bindContentFields() {
  document.querySelectorAll("[data-content-text]").forEach((node) => {
    const value = getContentValue(node.dataset.contentText);
    if (value !== undefined) {
      node.textContent = value;
    }
  });

  document.querySelectorAll("[data-content-html]").forEach((node) => {
    const value = getContentValue(node.dataset.contentHtml);
    if (value !== undefined) {
      node.innerHTML = value;
    }
  });

  document.querySelectorAll("[data-content-src]").forEach((node) => {
    const value = getContentValue(node.dataset.contentSrc);
    if (value) {
      node.setAttribute("src", value);
    }
  });

  document.querySelectorAll("[data-content-alt]").forEach((node) => {
    const value = getContentValue(node.dataset.contentAlt);
    if (value) {
      node.setAttribute("alt", value);
    }
  });

  document.querySelectorAll("[data-content-poster]").forEach((node) => {
    const value = getContentValue(node.dataset.contentPoster);
    if (value) {
      node.setAttribute("poster", value);
    }
  });

  document.querySelectorAll("[data-content-video]").forEach((node) => {
    const value = getContentValue(node.dataset.contentVideo);
    if (!value) return;

    node.setAttribute("src", value);
    const video = node.closest("video");
    video?.load();
  });

  document.querySelectorAll("[data-content-href]").forEach((node) => {
    const value = getContentValue(node.dataset.contentHref);
    if (value) {
      node.setAttribute("href", value);
    }
  });

  document.querySelectorAll("[data-content-placeholder]").forEach((node) => {
    const value = getContentValue(node.dataset.contentPlaceholder);
    if (value) {
      node.setAttribute("placeholder", value);
    }
  });

  document.querySelectorAll("[data-content-bg]").forEach((node) => {
    const value = getContentValue(node.dataset.contentBg);
    if (value) {
      node.style.backgroundImage = `url("${value}")`;
    }
  });

  renderContactSelects();
}

function renderContactSelects() {
  const countrySelect = document.querySelector("[data-contact-country-options]");
  const partnershipSelect = document.querySelector("[data-contact-partnership-options]");
  const formPanel = siteContent.pages.contact.formPanel;

  if (countrySelect) {
    const placeholder = formPanel.fields.countryPlaceholder || "Selectionner";
    countrySelect.innerHTML = [
      `<option value="">${placeholder}</option>`,
      ...formPanel.countryOptions.map((option) => `<option>${option}</option>`)
    ].join("");
  }

  if (partnershipSelect) {
    const placeholder = formPanel.fields.partnershipPlaceholder || "Selectionner";
    partnershipSelect.innerHTML = [
      `<option value="">${placeholder}</option>`,
      ...formPanel.partnershipOptions.map((option) => `<option>${option}</option>`)
    ].join("");
  }
}

function renderStats() {
  document.querySelectorAll("[data-stat-grid]").forEach((container) => {
    container.innerHTML = siteContent.stats
      .map(
        (item, index) => `
          <article class="info-card stat-card reveal">
            <div class="info-card__media card-media">
              <img src="${item.image}" alt="${item.label}" loading="lazy">
            </div>
            <div class="info-card__body stat-card__body">
              <p class="info-card__eyebrow">Indicateur</p>
              <span class="stat-value">${item.value}</span>
              <h3 class="info-card__title stat-label">${item.label}</h3>
              ${
                item.counterValue
                  ? `
                    <div class="stat-counter">
                      <strong data-stat-counter="${index}" data-counter-target="${item.counterValue}">0 FCFA</strong>
                      <span>${item.counterLabel || "Chiffres du projet"}</span>
                    </div>
                  `
                  : ""
              }
              <p class="info-card__copy stat-note">${item.note}</p>
            </div>
          </article>
        `
      )
      .join("");
  });
}

function renderSectorCards() {
  document.querySelectorAll("[data-sector-grid]").forEach((container) => {
    container.innerHTML = siteContent.sectorCards
      .map(
        (item) => `
          <article class="info-card sector-card reveal">
            <div class="info-card__media sector-card__image">
              <img src="${item.image}" alt="${item.title}" loading="lazy">
            </div>
            <div class="info-card__body sector-card__body">
              <p class="info-card__eyebrow">${item.eyebrow}</p>
              <h3 class="info-card__title">${item.title}</h3>
              <p class="info-card__copy">${item.copy}</p>
              <a class="info-card__link" href="${item.href}">Explorer le pole</a>
            </div>
          </article>
        `
      )
      .join("");
  });
}

function renderBrandGrid() {
  document.querySelectorAll("[data-brand-grid]").forEach((container) => {
    container.innerHTML = siteContent.companyCards
      .map(
        (item) => `
          <article class="info-card brand-card reveal">
            <div class="info-card__media card-media card-media--short">
              <img src="${item.image}" alt="${item.name}" loading="lazy">
            </div>
            <div class="info-card__body brand-card__body">
              <div class="brand-card__logo">
                <img src="${item.logo}" alt="${item.name}" loading="lazy">
              </div>
              <p class="info-card__eyebrow">${item.role}</p>
              <h3 class="info-card__title">${item.name}</h3>
              <p class="info-card__copy">${item.description}</p>
            </div>
          </article>
        `
      )
      .join("");
  });
}

function renderCountryGrid() {
  document.querySelectorAll("[data-country-grid]").forEach((container) => {
    container.innerHTML = siteContent.countries
      .map(
        (country) => `
          <article class="info-card country-card reveal" style="--country-accent:${country.accent}">
            <div class="info-card__media country-card__media">
              <img src="${country.image}" alt="${country.name}" loading="lazy">
            </div>
            <div class="info-card__body country-card__body">
              <div class="country-card__head">
                <span class="country-badge">${country.code}</span>
                <div>
                  <p class="info-card__eyebrow">${country.label}</p>
                  <h3 class="info-card__title">${country.name}</h3>
                </div>
              </div>
              <p class="info-card__copy country-card__summary">${country.summary}</p>
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
              <p class="info-card__copy country-card__opportunity">${country.opportunity}</p>
            </div>
          </article>
        `
      )
      .join("");
  });
}

function renderCountrySections() {
  document.querySelectorAll("[data-country-sections]").forEach((container) => {
    container.innerHTML = siteContent.countries
      .map(
        (country) => `
          <article class="info-card country-detail reveal" id="${country.slug}" style="--country-accent:${country.accent}">
            <div class="info-card__media country-detail__media">
              <img src="${country.image}" alt="${country.name}" loading="lazy">
            </div>
            <div class="info-card__body country-detail__content">
              <div class="country-card__head">
                <span class="country-badge">${country.code}</span>
                <div>
                  <p class="info-card__eyebrow">${country.label}</p>
                  <h3 class="info-card__title">${country.name}</h3>
                </div>
              </div>
              <p class="info-card__copy">${country.summary}</p>
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
              <p class="info-card__copy country-card__opportunity">${country.opportunity}</p>
            </div>
          </article>
        `
      )
      .join("");
  });
}

function renderMissionPillars() {
  document.querySelectorAll("[data-mission-pillars]").forEach((container) => {
    container.innerHTML = siteContent.missionPillars
      .map(
        (item) => `
          <article class="info-card pillar-card reveal">
            <div class="info-card__media card-media card-media--short">
              <img src="${item.image}" alt="${item.title}" loading="lazy">
            </div>
            <div class="info-card__body pillar-card__body">
              <p class="info-card__eyebrow">Fondation</p>
              <h3 class="info-card__title">${item.title}</h3>
              <p class="info-card__copy">${item.copy}</p>
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
        const project = siteContent.projectFamilies[key];
        if (!project) return "";

        return `
          <article class="info-card project-card reveal" id="${key}">
            <div class="info-card__media project-card__media">
              <img src="${project.image}" alt="${project.title}" loading="lazy">
            </div>
            <div class="info-card__body project-card__body">
              <p class="info-card__eyebrow">${project.eyebrow}</p>
              <h3 class="info-card__title">${project.title}</h3>
              <p class="info-card__copy">${project.intro}</p>
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
    container.innerHTML = siteContent.investorPillars
      .map(
        (item) => `
          <article class="info-card investor-card reveal">
            <div class="info-card__media card-media card-media--short">
              <img src="${item.image}" alt="${item.title}" loading="lazy">
            </div>
            <div class="info-card__body investor-card__body">
              <p class="info-card__eyebrow">Partnerships</p>
              <h3 class="info-card__title">${item.title}</h3>
              <p class="info-card__copy">${item.copy}</p>
            </div>
          </article>
        `
      )
      .join("");
  });
}

function renderInvestmentFormats() {
  document.querySelectorAll("[data-investment-formats]").forEach((container) => {
    container.innerHTML = siteContent.investmentFormats
      .map(
        (item) => `
          <article class="info-card pillar-card reveal">
            <div class="info-card__media card-media card-media--short">
              <img src="${item.image}" alt="${item.title}" loading="lazy">
            </div>
            <div class="info-card__body pillar-card__body">
              <p class="info-card__eyebrow">Format</p>
              <h3 class="info-card__title">${item.title}</h3>
              <p class="info-card__copy">${item.copy}</p>
            </div>
          </article>
        `
      )
      .join("");
  });
}

function renderResources() {
  document.querySelectorAll("[data-resource-grid]").forEach((container) => {
    container.innerHTML = siteContent.resources
      .map(
        (item) => `
          <article class="info-card resource-card reveal">
            <div class="info-card__media card-media card-media--short">
              <img src="${item.image}" alt="${item.title}" loading="lazy">
            </div>
            <div class="info-card__body resource-card__body">
              <p class="info-card__eyebrow">Documentation</p>
              <h3 class="info-card__title">${item.title}</h3>
              <p class="info-card__copy">${item.copy}</p>
              <a class="info-card__link" href="${item.href}" target="_blank" rel="noopener noreferrer">${item.cta}</a>
            </div>
          </article>
        `
      )
      .join("");
  });
}

function renderContactCards() {
  document.querySelectorAll("[data-contact-cards]").forEach((container) => {
    container.innerHTML = siteContent.contactDetails
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
    node.textContent = siteContent.ceoProfile.name;
  });
  document.querySelectorAll("[data-ceo-role]").forEach((node) => {
    node.textContent = siteContent.ceoProfile.role;
  });
  document.querySelectorAll("[data-ceo-quote]").forEach((node) => {
    node.textContent = siteContent.ceoProfile.quote;
  });
}

function normalizePhoneNumber(value) {
  return String(value || "").replace(/[^\d]/g, "");
}

function renderWhatsappButton() {
  if (document.querySelector("[data-whatsapp-float]")) return;

  const phoneNumber = normalizePhoneNumber(siteContent.siteShell.whatsappNumber);
  if (!phoneNumber) return;

  const button = document.createElement("a");
  button.className = "whatsapp-float";
  button.href = `https://wa.me/${phoneNumber}`;
  button.target = "_blank";
  button.rel = "noopener noreferrer";
  button.dataset.whatsappFloat = "true";
  button.setAttribute("aria-label", `Contacter ${siteContent.siteShell.brand.name} sur WhatsApp`);
  button.innerHTML = `
    <svg class="whatsapp-float__icon" viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <path fill="currentColor" d="M19.11 17.42c-.27-.13-1.57-.77-1.81-.86-.24-.09-.41-.13-.59.14-.18.27-.68.86-.84 1.04-.15.18-.31.2-.58.07-.27-.13-1.14-.42-2.18-1.33-.8-.71-1.34-1.58-1.49-1.84-.15-.27-.02-.41.11-.54.12-.12.27-.31.4-.47.13-.16.18-.27.27-.45.09-.18.04-.34-.02-.47-.07-.13-.59-1.42-.81-1.94-.21-.51-.43-.44-.59-.45h-.5c-.18 0-.47.07-.71.34-.24.27-.93.91-.93 2.22s.95 2.57 1.08 2.75c.13.18 1.86 2.84 4.5 3.98.63.27 1.13.43 1.52.55.64.2 1.22.17 1.68.1.51-.08 1.57-.64 1.79-1.26.22-.62.22-1.15.15-1.26-.06-.11-.24-.18-.51-.31z"/>
      <path fill="currentColor" d="M16.02 4.52c-6.35 0-11.5 5.13-11.5 11.46 0 2.02.53 3.99 1.53 5.72L4.46 27.5l5.96-1.56a11.53 11.53 0 0 0 5.6 1.44h.01c6.34 0 11.49-5.13 11.49-11.47 0-3.07-1.2-5.95-3.37-8.12a11.42 11.42 0 0 0-8.13-3.27zm0 20.92h-.01a9.57 9.57 0 0 1-4.87-1.33l-.35-.21-3.54.93.95-3.45-.23-.36a9.45 9.45 0 0 1-1.47-5.04c0-5.24 4.27-9.5 9.53-9.5 2.54 0 4.92.98 6.72 2.77a9.4 9.4 0 0 1 2.79 6.73c0 5.24-4.28 9.46-9.52 9.46z"/>
    </svg>
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

function formatCounterValue(value) {
  const amount = Number(value) || 0;
  return `${new Intl.NumberFormat("en-US").format(Math.round(amount))} FCFA`;
}

function setupStatCounters() {
  const counters = Array.from(document.querySelectorAll("[data-counter-target]"));
  if (!counters.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const node = entry.target;
        const targetValue = Number(node.dataset.counterTarget || "0");
        const duration = 2200;
        const startTime = performance.now();

        const tick = (now) => {
          const progress = Math.min((now - startTime) / duration, 1);
          const eased = 1 - (1 - progress) * (1 - progress);
          node.textContent = formatCounterValue(targetValue * eased);

          if (progress < 1) {
            requestAnimationFrame(tick);
          } else {
            node.textContent = formatCounterValue(targetValue);
          }
        };

        requestAnimationFrame(tick);
        observer.unobserve(node);
      });
    },
    { threshold: 0.45 }
  );

  counters.forEach((counter) => observer.observe(counter));
}

function setupContactForm() {
  const form = document.querySelector("[data-contact-form]");
  const feedback = document.querySelector("[data-contact-feedback]");
  if (!form || !feedback) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const values = Object.fromEntries(formData.entries());
    const recipient = siteContent.pages.contact.formPanel.recipientEmail || siteContent.siteShell.contactEmail;

    const subject = encodeURIComponent(
      `Demande de partenariat - ${values.pays || siteContent.siteShell.brand.name}`
    );
    const body = encodeURIComponent(
      [
        `${formatLabel("nom")} : ${values.nom || ""}`,
        `${formatLabel("email")} : ${values.email || ""}`,
        `${formatLabel("telephone")} : ${values.telephone || ""}`,
        `${formatLabel("pays")} : ${values.pays || ""}`,
        `Type de partenariat : ${values.partenariat || ""}`,
        "",
        "Message :",
        values.message || ""
      ].join("\n")
    );

    feedback.textContent = siteContent.pages.contact.formPanel.sentMessage;
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
    form.reset();
    renderContactSelects();
  });
}

async function init() {
  await loadSiteContent();
  renderHeader();
  renderFooter();
  bindContentFields();
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
  setupStatCounters();
  setupContactForm();
}

init();
