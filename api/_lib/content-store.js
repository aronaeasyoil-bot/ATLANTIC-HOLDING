import { get, put } from "@vercel/blob";
import { defaultSiteContent } from "../../assets/js/data.js";

const CONTENT_PATHNAME = "cms/site-content.json";

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

function sanitizeFilename(filename) {
  return String(filename || "asset")
    .normalize("NFKD")
    .replace(/[^\w.-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

export async function readPublishedContent() {
  try {
    const result = await get(CONTENT_PATHNAME, { access: "public" });
    if (!result || result.statusCode !== 200 || !result.stream) {
      return cloneContent(defaultSiteContent);
    }

    const text = await new Response(result.stream).text();
    if (!text.trim()) {
      return cloneContent(defaultSiteContent);
    }

    const parsed = JSON.parse(text);
    return mergeContent(defaultSiteContent, parsed);
  } catch {
    return cloneContent(defaultSiteContent);
  }
}

export async function writePublishedContent(content) {
  const normalizedContent = mergeContent(defaultSiteContent, content);
  await put(CONTENT_PATHNAME, JSON.stringify(normalizedContent, null, 2), {
    access: "public",
    allowOverwrite: true,
    addRandomSuffix: false,
    contentType: "application/json",
    cacheControlMaxAge: 60
  });

  return normalizedContent;
}

export async function uploadPublishedAsset(file, folder = "images") {
  const safeName = sanitizeFilename(file?.name || "asset");
  const pathname = `cms/${folder}/${Date.now()}-${safeName}`;

  return put(pathname, file, {
    access: "public",
    addRandomSuffix: false,
    contentType: file?.type || undefined,
    cacheControlMaxAge: 31536000
  });
}
