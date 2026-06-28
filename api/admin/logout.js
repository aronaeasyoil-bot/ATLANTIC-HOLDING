import { buildLogoutCookie, jsonResponse } from "../_lib/auth.js";

export async function POST(request) {
  const headers = new Headers();
  headers.append("Set-Cookie", buildLogoutCookie(request));

  return jsonResponse(
    {
      ok: true
    },
    { headers }
  );
}
