import { isAdminConfigured, isAuthenticatedRequest, jsonResponse } from "../_lib/auth.js";
import { readPublishedContent, writePublishedContent } from "../_lib/content-store.js";

export async function GET(request) {
  if (!isAdminConfigured()) {
    return jsonResponse({ error: "Administration non configuree." }, { status: 503 });
  }

  if (!isAuthenticatedRequest(request)) {
    return jsonResponse({ error: "Acces refuse." }, { status: 401 });
  }

  const content = await readPublishedContent();
  return jsonResponse(content, { headers: { "Cache-Control": "no-store" } });
}

export async function POST(request) {
  if (!isAdminConfigured()) {
    return jsonResponse({ error: "Administration non configuree." }, { status: 503 });
  }

  if (!isAuthenticatedRequest(request)) {
    return jsonResponse({ error: "Acces refuse." }, { status: 401 });
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return jsonResponse({ error: "Contenu JSON invalide." }, { status: 400 });
  }

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return jsonResponse({ error: "Format de contenu invalide." }, { status: 400 });
  }

  const content = await writePublishedContent(payload);
  return jsonResponse({ ok: true, content });
}
