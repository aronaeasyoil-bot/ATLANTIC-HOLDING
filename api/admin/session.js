import { isAdminConfigured, isAuthenticatedRequest, jsonResponse } from "../_lib/auth.js";

export async function GET(request) {
  if (!isAdminConfigured()) {
    return jsonResponse(
      {
        authenticated: false,
        configured: false
      },
      { status: 503 }
    );
  }

  return jsonResponse({
    authenticated: isAuthenticatedRequest(request),
    configured: true
  });
}
