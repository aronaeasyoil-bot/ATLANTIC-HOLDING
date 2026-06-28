import { isAdminConfigured, isAuthenticatedRequest, jsonResponse } from "../_lib/auth.js";
import { uploadPublishedAsset } from "../_lib/content-store.js";

const ALLOWED_CONTENT_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
  "application/pdf"
]);

function resolveFolder(file) {
  if (file.type === "application/pdf") {
    return "docs";
  }

  return "images";
}

export async function POST(request) {
  if (!isAdminConfigured()) {
    return jsonResponse({ error: "Administration non configuree." }, { status: 503 });
  }

  if (!isAuthenticatedRequest(request)) {
    return jsonResponse({ error: "Acces refuse." }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return jsonResponse({ error: "Aucun fichier recu." }, { status: 400 });
  }

  if (!ALLOWED_CONTENT_TYPES.has(file.type)) {
    return jsonResponse(
      {
        error: "Format non autorise. Utilisez JPG, PNG, WEBP, GIF, SVG ou PDF."
      },
      { status: 415 }
    );
  }

  const blob = await uploadPublishedAsset(file, resolveFolder(file));

  return jsonResponse({
    ok: true,
    url: blob.url,
    pathname: blob.pathname,
    downloadUrl: blob.downloadUrl
  });
}
