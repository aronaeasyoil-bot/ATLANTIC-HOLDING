import { defaultSiteContent } from "./data.js";

const SESSION_ENDPOINT = "/api/admin/session";
const LOGIN_ENDPOINT = "/api/admin/login";
const LOGOUT_ENDPOINT = "/api/admin/logout";
const CONTENT_ENDPOINT = "/api/admin/content";
const UPLOAD_ENDPOINT = "/api/admin/upload";

const SECTION_ORDER = [
  ["siteShell", "Structure du site"],
  ["pages", "Pages"],
  ["stats", "Indicateurs"],
  ["sectorCards", "Pôles"],
  ["companyCards", "Marques"],
  ["countries", "Pays"],
  ["missionPillars", "Mission"],
  ["projectFamilies", "Projets"],
  ["investorPillars", "Investisseurs"],
  ["investmentFormats", "Formats d'investissement"],
  ["resources", "Documentation"],
  ["contactDetails", "Coordonnées"],
  ["ceoProfile", "CEO"]
];

const state = {
  configured: true,
  authenticated: false,
  checking: true,
  saving: false,
  uploading: "",
  statusType: "neutral",
  statusMessage: "Connexion à l'espace privé...",
  content: cloneValue(defaultSiteContent)
};

const root = document.querySelector("[data-admin-root]");

function cloneValue(value) {
  return typeof structuredClone === "function"
    ? structuredClone(value)
    : JSON.parse(JSON.stringify(value));
}

function isObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function formatLabel(key) {
  return String(key)
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function slugify(value) {
  return String(value)
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .toLowerCase();
}

function getValueAtPath(rootValue, path) {
  return path.reduce((current, key) => current?.[key], rootValue);
}

function setValueAtPath(rootValue, path, nextValue) {
  let cursor = rootValue;
  for (let index = 0; index < path.length - 1; index += 1) {
    cursor = cursor[path[index]];
  }
  cursor[path[path.length - 1]] = nextValue;
}

function removeValueAtPath(rootValue, path) {
  const parent = getValueAtPath(rootValue, path.slice(0, -1));
  const key = path[path.length - 1];

  if (Array.isArray(parent)) {
    parent.splice(Number(key), 1);
    return;
  }

  delete parent[key];
}

function createEmptyShape(sample) {
  if (Array.isArray(sample)) return [];
  if (isObject(sample)) {
    return Object.fromEntries(
      Object.entries(sample).map(([key, value]) => [key, createEmptyShape(value)])
    );
  }
  if (typeof sample === "number") return 0;
  if (typeof sample === "boolean") return false;
  return "";
}

function createArrayTemplate(path, currentValue) {
  const defaultValue = getValueAtPath(defaultSiteContent, path);
  const sample = Array.isArray(defaultValue) && defaultValue.length
    ? defaultValue[0]
    : currentValue.length
      ? currentValue[currentValue.length - 1]
      : "";

  return createEmptyShape(sample);
}

function isImageValue(value) {
  return /\.(png|jpe?g|webp|gif|svg)(\?.*)?$/i.test(String(value || ""));
}

function isPdfValue(value) {
  return /\.pdf(\?.*)?$/i.test(String(value || ""));
}

function isVideoValue(value) {
  return /\.(mp4|webm|mov|m4v)(\?.*)?$/i.test(String(value || ""));
}

function getMediaFieldType(key, value) {
  if (typeof value !== "string") return "";

  if (["image", "logo", "poster", "backgroundImage"].includes(key) || isImageValue(value)) {
    return "image";
  }

  if (key === "video" || isVideoValue(value)) {
    return "video";
  }

  if ((key === "href" || key === "downloadUrl") && isPdfValue(value)) {
    return "pdf";
  }

  return "";
}

function setStatus(message, type = "neutral") {
  state.statusMessage = message;
  state.statusType = type;
  updateStatusNode();
}

function updateStatusNode() {
  const node = document.querySelector("[data-admin-status]");
  if (!node) return;

  node.textContent = state.statusMessage;
  node.className = `admin-status admin-status--${state.statusType}`;
}

async function requestJson(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    }
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload?.error || "Operation impossible.");
  }

  return payload;
}

async function checkSession() {
  try {
    const response = await fetch(SESSION_ENDPOINT, { cache: "no-store" });
    const payload = await response.json().catch(() => ({}));

    state.configured = payload?.configured !== false;
    state.authenticated = Boolean(payload?.authenticated);
    state.checking = false;

    if (!state.configured) {
      setStatus("L'administration n'est pas encore configuree cote serveur.", "error");
      renderApp();
      return;
    }

    if (state.authenticated) {
      setStatus("Session admin active.", "success");
      await loadContent();
      return;
    }

    setStatus("Connectez-vous pour modifier le site.", "neutral");
    renderApp();
  } catch {
    state.checking = false;
    state.authenticated = false;
    setStatus("Impossible de verifier la session d'administration.", "error");
    renderApp();
  }
}

async function loadContent() {
  try {
    const content = await requestJson(CONTENT_ENDPOINT, {
      method: "GET",
      headers: {}
    });
    state.content = content;
    renderApp();
  } catch (error) {
    setStatus(error.message, "error");
    renderApp();
  }
}

async function handleLoginSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const password = String(formData.get("password") || "");

  try {
    setStatus("Connexion en cours...", "neutral");
    await requestJson(LOGIN_ENDPOINT, {
      method: "POST",
      body: JSON.stringify({ password })
    });
    state.authenticated = true;
    setStatus("Connexion reussie. Chargement du contenu...", "success");
    await loadContent();
  } catch (error) {
    state.authenticated = false;
    setStatus(error.message, "error");
    renderApp();
  }
}

async function handleLogout() {
  try {
    await requestJson(LOGOUT_ENDPOINT, {
      method: "POST",
      body: JSON.stringify({ ok: true })
    });
  } catch {
    // Even if logout API fails, the local UI should return to the login state.
  }

  state.authenticated = false;
  state.content = cloneValue(defaultSiteContent);
  setStatus("Session fermee.", "neutral");
  renderApp();
}

async function handleSave() {
  try {
    state.saving = true;
    renderToolbarButtons();
    setStatus("Enregistrement en cours...", "neutral");

    const payload = await requestJson(CONTENT_ENDPOINT, {
      method: "POST",
      body: JSON.stringify(state.content)
    });

    state.content = payload.content;
    setStatus("Le site a ete mis a jour avec succes.", "success");
  } catch (error) {
    setStatus(error.message, "error");
  } finally {
    state.saving = false;
    renderToolbarButtons();
  }
}

async function handleReload() {
  setStatus("Rechargement du contenu publie...", "neutral");
  await loadContent();
  setStatus("Derniere version chargee.", "success");
}

async function optimizeImageFile(file) {
  if (file.type === "image/svg+xml" || file.size <= 4_000_000) {
    return file;
  }

  const imageUrl = URL.createObjectURL(file);
  try {
    const image = await new Promise((resolve, reject) => {
      const imageElement = new Image();
      imageElement.onload = () => resolve(imageElement);
      imageElement.onerror = reject;
      imageElement.src = imageUrl;
    });

    const maxWidth = 2200;
    const scale = Math.min(1, maxWidth / image.width);
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(image.width * scale));
    canvas.height = Math.max(1, Math.round(image.height * scale));

    const context = canvas.getContext("2d");
    context.drawImage(image, 0, 0, canvas.width, canvas.height);

    const blob = await new Promise((resolve) => {
      canvas.toBlob(resolve, "image/jpeg", 0.86);
    });

    if (!blob) return file;

    const optimizedName = file.name.replace(/\.[^.]+$/, "") + ".jpg";
    return new File([blob], optimizedName, { type: "image/jpeg" });
  } finally {
    URL.revokeObjectURL(imageUrl);
  }
}

async function uploadAsset(file, path) {
  const finalFile = file.type.startsWith("image/") ? await optimizeImageFile(file) : file;
  const formData = new FormData();
  formData.append("file", finalFile);

  const response = await fetch(UPLOAD_ENDPOINT, {
    method: "POST",
    body: formData
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload?.error || "Echec de l'upload.");
  }

  setValueAtPath(state.content, path, payload.url);
}

function renderToolbarButtons() {
  const toolbarActions = document.querySelector("[data-admin-toolbar-actions]");
  if (!toolbarActions) return;

  toolbarActions.innerHTML = "";

  const saveButton = document.createElement("button");
  saveButton.className = "admin-button admin-button--primary";
  saveButton.type = "button";
  saveButton.textContent = state.saving ? "Enregistrement..." : "Enregistrer";
  saveButton.disabled = state.saving || Boolean(state.uploading);
  saveButton.addEventListener("click", handleSave);

  const reloadButton = document.createElement("button");
  reloadButton.className = "admin-button admin-button--ghost";
  reloadButton.type = "button";
  reloadButton.textContent = "Recharger";
  reloadButton.disabled = state.saving || Boolean(state.uploading);
  reloadButton.addEventListener("click", handleReload);

  const siteLink = document.createElement("a");
  siteLink.className = "admin-button admin-button--ghost";
  siteLink.href = "index.html";
  siteLink.target = "_blank";
  siteLink.rel = "noopener noreferrer";
  siteLink.textContent = "Voir le site";

  const logoutButton = document.createElement("button");
  logoutButton.className = "admin-button admin-button--danger";
  logoutButton.type = "button";
  logoutButton.textContent = "Deconnexion";
  logoutButton.disabled = state.saving || Boolean(state.uploading);
  logoutButton.addEventListener("click", handleLogout);

  toolbarActions.append(saveButton, reloadButton, siteLink, logoutButton);
}

function createInputField(labelText, value, path) {
  const wrapper = document.createElement("div");
  wrapper.className = "admin-field";

  const label = document.createElement("label");
  label.textContent = labelText;

  const input = document.createElement("input");
  input.className = "admin-input";
  input.type = "text";
  input.value = String(value ?? "");
  input.addEventListener("input", (event) => {
    setValueAtPath(state.content, path, event.currentTarget.value);
  });

  wrapper.append(label, input);
  return wrapper;
}

function createNumberField(labelText, value, path) {
  const wrapper = document.createElement("div");
  wrapper.className = "admin-field";

  const label = document.createElement("label");
  label.textContent = labelText;

  const input = document.createElement("input");
  input.className = "admin-input";
  input.type = "number";
  input.value = String(value ?? 0);
  input.addEventListener("input", (event) => {
    const nextValue = Number(event.currentTarget.value || "0");
    setValueAtPath(state.content, path, nextValue);
  });

  wrapper.append(label, input);
  return wrapper;
}

function createTextareaField(labelText, value, path) {
  const wrapper = document.createElement("div");
  wrapper.className = "admin-field";

  const label = document.createElement("label");
  label.textContent = labelText;

  const textarea = document.createElement("textarea");
  textarea.className = "admin-textarea";
  textarea.value = String(value ?? "");
  textarea.addEventListener("input", (event) => {
    setValueAtPath(state.content, path, event.currentTarget.value);
  });

  wrapper.append(label, textarea);
  return wrapper;
}

function createMediaField(labelText, key, value, path) {
  const type = getMediaFieldType(key, value);
  const wrapper = document.createElement("div");
  wrapper.className = "admin-field";

  const label = document.createElement("label");
  label.textContent = labelText;

  const media = document.createElement("div");
  media.className = "admin-media";

  const preview = document.createElement("div");
  preview.className = "admin-media__preview";
  if (type === "image" && value) {
    const image = document.createElement("img");
    image.src = value;
    image.alt = labelText;
    preview.append(image);
  } else if ((type === "pdf" || type === "video") && value) {
    const link = document.createElement("a");
    link.href = value;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = type === "pdf" ? "Ouvrir le document" : "Ouvrir le media";
    preview.append(link);
  } else {
    preview.textContent = "Aperçu non disponible";
  }

  const controls = document.createElement("div");
  controls.className = "admin-media__controls";

  const urlInput = document.createElement("input");
  urlInput.className = "admin-input";
  urlInput.type = "text";
  urlInput.value = String(value || "");
  urlInput.addEventListener("input", (event) => {
    setValueAtPath(state.content, path, event.currentTarget.value);
  });

  controls.append(urlInput);

  if (type === "image" || type === "pdf") {
    const uploadButton = document.createElement("button");
    uploadButton.type = "button";
    uploadButton.className = "admin-inline-button";
    uploadButton.textContent = state.uploading === path.join(".") ? "Upload..." : "Importer un fichier";
    uploadButton.disabled = Boolean(state.uploading);

    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.className = "admin-hidden";
    fileInput.accept = type === "pdf" ? ".pdf,application/pdf" : "image/*";

    uploadButton.addEventListener("click", () => {
      fileInput.click();
    });

    fileInput.addEventListener("change", async () => {
      const file = fileInput.files?.[0];
      if (!file) return;

      try {
        state.uploading = path.join(".");
        renderToolbarButtons();
        renderApp();
        setStatus("Upload en cours...", "neutral");
        await uploadAsset(file, path);
        state.uploading = "";
        setStatus("Fichier envoye avec succes.", "success");
        renderApp();
      } catch (error) {
        state.uploading = "";
        setStatus(error.message, "error");
        renderApp();
      }
    });

    controls.append(uploadButton, fileInput);
  }

  const help = document.createElement("p");
  help.className = "admin-help";
  help.textContent =
    type === "video"
      ? "Pour la video, collez une URL ou un chemin deja disponible. Les uploads video ne sont pas actives dans cet admin."
      : "Les images lourdes sont automatiquement compressees avant envoi.";

  media.append(preview, controls, help);
  wrapper.append(label, media);
  return wrapper;
}

function createPrimitiveEditor(key, value, path) {
  const label = formatLabel(key);
  const mediaType = getMediaFieldType(key, value);

  if (mediaType) {
    return createMediaField(label, key, value, path);
  }

  if (typeof value === "number") {
    return createNumberField(label, value, path);
  }

  if (typeof value === "string" && (value.length > 100 || /\n/.test(value) || ["copy", "quote", "statement", "description", "intro"].includes(key))) {
    return createTextareaField(label, value, path);
  }

  return createInputField(label, value, path);
}

function buildEditorTree(key, value, path, depth = 0) {
  if (Array.isArray(value)) {
    const arrayBlock = document.createElement("div");
    arrayBlock.className = "admin-array";

    const header = document.createElement("div");
    header.className = "admin-array__header";

    const title = document.createElement("p");
    title.className = "admin-array__title";
    title.textContent = `${formatLabel(key)} (${value.length})`;

    const actions = document.createElement("div");
    actions.className = "admin-array__actions";

    const addButton = document.createElement("button");
    addButton.type = "button";
    addButton.className = "admin-inline-button";
    addButton.textContent = "Ajouter";
    addButton.addEventListener("click", () => {
      getValueAtPath(state.content, path).push(createArrayTemplate(path, value));
      renderApp();
    });

    actions.append(addButton);
    header.append(title, actions);
    arrayBlock.append(header);

    value.forEach((item, index) => {
      const itemPath = [...path, index];
      const itemWrapper = document.createElement("details");
      itemWrapper.className = "admin-array-item";
      itemWrapper.open = depth < 1 || index === 0;

      const summary = document.createElement("summary");
      summary.textContent = `${formatLabel(key)} ${index + 1}`;

      const body = document.createElement("div");
      body.className = "admin-array-item__body";

      const removeButton = document.createElement("button");
      removeButton.type = "button";
      removeButton.className = "admin-inline-button admin-inline-button--danger";
      removeButton.textContent = "Supprimer";
      removeButton.addEventListener("click", () => {
        removeValueAtPath(state.content, itemPath);
        renderApp();
      });

      body.append(removeButton);

      if (isObject(item) || Array.isArray(item)) {
        const grid = document.createElement("div");
        grid.className = "admin-grid";
        if (Array.isArray(item)) {
          grid.append(buildEditorTree(String(index), item, itemPath, depth + 1));
        } else {
          Object.entries(item).forEach(([childKey, childValue]) => {
            grid.append(buildEditorTree(childKey, childValue, [...itemPath, childKey], depth + 1));
          });
        }
        body.append(grid);
      } else {
        body.append(createPrimitiveEditor(String(index), item, itemPath));
      }

      itemWrapper.append(summary, body);
      arrayBlock.append(itemWrapper);
    });

    return arrayBlock;
  }

  if (isObject(value)) {
    const details = document.createElement("details");
    details.className = "admin-object";
    details.open = depth < 2;

    const summary = document.createElement("summary");
    summary.textContent = formatLabel(key);

    const body = document.createElement("div");
    body.className = "admin-object__body";

    const grid = document.createElement("div");
    grid.className = "admin-grid";
    Object.entries(value).forEach(([childKey, childValue]) => {
      grid.append(buildEditorTree(childKey, childValue, [...path, childKey], depth + 1));
    });

    body.append(grid);
    details.append(summary, body);
    return details;
  }

  return createPrimitiveEditor(key, value, path);
}

function createLoginView() {
  const panel = document.createElement("section");
  panel.className = "admin-panel admin-auth";

  if (!state.configured) {
    panel.innerHTML = `
      <p class="admin-eyebrow">Administration privée</p>
      <h1 class="admin-title">ATLANTIC HOLDING CMS</h1>
      <p class="admin-copy">
        Le mot de passe d'administration n'est pas encore configure sur Vercel. Une fois les variables en place, cette page deviendra operative.
      </p>
      <div class="admin-actions">
        <a class="admin-button admin-button--ghost" href="index.html">Retour au site</a>
      </div>
      <div class="admin-status admin-status--${state.statusType}" data-admin-status>${state.statusMessage}</div>
    `;
    return panel;
  }

  panel.innerHTML = `
    <p class="admin-eyebrow">Administration privée</p>
    <h1 class="admin-title">ATLANTIC HOLDING CMS</h1>
    <p class="admin-copy">
      Cet espace vous permet de modifier les textes, les images, les cartes pays, les indicateurs et les sections des pages sans toucher au code.
    </p>
    <form class="admin-auth__form" data-admin-login-form>
      <div class="admin-field">
        <label for="admin-password">Mot de passe</label>
        <input class="admin-input" id="admin-password" name="password" type="password" autocomplete="current-password" required>
      </div>
      <div class="admin-actions">
        <button class="admin-button admin-button--primary" type="submit">Entrer</button>
        <a class="admin-button admin-button--ghost" href="index.html">Retour au site</a>
      </div>
    </form>
    <div class="admin-status admin-status--${state.statusType}" data-admin-status>${state.statusMessage}</div>
  `;

  panel.querySelector("[data-admin-login-form]").addEventListener("submit", handleLoginSubmit);
  return panel;
}

function createToolbar() {
  const toolbar = document.createElement("section");
  toolbar.className = "admin-panel admin-toolbar";

  const top = document.createElement("div");
  top.className = "admin-toolbar__top";

  const titleBlock = document.createElement("div");
  titleBlock.innerHTML = `
    <p class="admin-eyebrow">Administration privée</p>
    <h1 class="admin-title">Modifier ATLANTIC HOLDING</h1>
    <p class="admin-copy">Les changements enregistrés sont publiés sur le site après sauvegarde.</p>
  `;

  const actions = document.createElement("div");
  actions.className = "admin-toolbar__actions";
  actions.dataset.adminToolbarActions = "true";

  top.append(titleBlock, actions);

  const status = document.createElement("div");
  status.className = `admin-status admin-status--${state.statusType}`;
  status.dataset.adminStatus = "true";
  status.textContent = state.statusMessage;

  toolbar.append(top, status);
  return toolbar;
}

function createEditorView() {
  const shell = document.createElement("div");

  const toolbar = createToolbar();
  shell.append(toolbar);

  const layout = document.createElement("div");
  layout.className = "admin-layout";

  const nav = document.createElement("aside");
  nav.className = "admin-panel admin-nav";
  nav.innerHTML = `
    <p class="admin-eyebrow">Navigation</p>
    <h2 class="admin-section__title">Sections éditables</h2>
    <div class="admin-nav__list">
      ${SECTION_ORDER.map(
        ([key, label]) => `<a href="#section-${slugify(key)}">${label}</a>`
      ).join("")}
    </div>
  `;

  const editor = document.createElement("section");
  editor.className = "admin-panel admin-editor";

  const sectionsHost = document.createElement("div");
  sectionsHost.className = "admin-sections";

  SECTION_ORDER.forEach(([key, label]) => {
    const section = document.createElement("section");
    section.className = "admin-panel admin-section";
    section.id = `section-${slugify(key)}`;

    const title = document.createElement("h3");
    title.className = "admin-section__title";
    title.textContent = label;

    const value = state.content[key];
    section.append(title, buildEditorTree(key, value, [key]));
    sectionsHost.append(section);
  });

  editor.append(sectionsHost);
  layout.append(nav, editor);
  shell.append(layout);
  return shell;
}

function renderApp() {
  root.innerHTML = "";

  if (state.checking) {
    const panel = document.createElement("section");
    panel.className = "admin-panel admin-auth";
    panel.innerHTML = `
      <p class="admin-eyebrow">Administration privée</p>
      <h1 class="admin-title">ATLANTIC HOLDING CMS</h1>
      <div class="admin-status admin-status--neutral" data-admin-status>${state.statusMessage}</div>
    `;
    root.append(panel);
    return;
  }

  if (!state.configured || !state.authenticated) {
    root.append(createLoginView());
    return;
  }

  root.append(createEditorView());
  renderToolbarButtons();
  updateStatusNode();
}

renderApp();
checkSession();
