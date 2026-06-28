import {
  buildSessionCookie,
  createSessionToken,
  isAdminConfigured,
  jsonResponse,
  validatePassword
} from "../_lib/auth.js";

export async function POST(request) {
  if (!isAdminConfigured()) {
    return jsonResponse(
      {
        error: "L'administration n'est pas encore configuree."
      },
      { status: 503 }
    );
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return jsonResponse({ error: "Requete invalide." }, { status: 400 });
  }

  if (!validatePassword(payload?.password)) {
    return jsonResponse({ error: "Mot de passe invalide." }, { status: 401 });
  }

  const headers = new Headers();
  headers.append("Set-Cookie", buildSessionCookie(request, createSessionToken()));

  return jsonResponse(
    {
      ok: true
    },
    { headers }
  );
}
