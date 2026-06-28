import crypto from "node:crypto";

const COOKIE_NAME = "atlantic_admin_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

function getConfiguredPassword() {
  return process.env.ATLANTIC_ADMIN_PASSWORD || "";
}

function getSessionSecret() {
  return process.env.ATLANTIC_ADMIN_SESSION_SECRET || getConfiguredPassword();
}

function safeEqual(left, right) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(leftBuffer, rightBuffer);
}

function signValue(value) {
  return crypto.createHmac("sha256", getSessionSecret()).update(value).digest("base64url");
}

function parseCookies(request) {
  const header = request.headers.get("cookie") || "";
  const cookies = {};

  header.split(/;\s*/).forEach((entry) => {
    if (!entry) return;
    const separatorIndex = entry.indexOf("=");
    if (separatorIndex < 0) return;

    const key = entry.slice(0, separatorIndex);
    const value = entry.slice(separatorIndex + 1);
    cookies[key] = value;
  });

  return cookies;
}

function isHttpsRequest(request) {
  try {
    return new URL(request.url).protocol === "https:";
  } catch {
    return false;
  }
}

export function isAdminConfigured() {
  return Boolean(getConfiguredPassword() && getSessionSecret());
}

export function createSessionToken() {
  const payload = {
    role: "admin",
    exp: Date.now() + SESSION_MAX_AGE_SECONDS * 1000
  };
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = signValue(encodedPayload);
  return `${encodedPayload}.${signature}`;
}

export function verifySessionToken(token) {
  if (!token || !isAdminConfigured()) return false;

  const [encodedPayload, signature] = token.split(".");
  if (!encodedPayload || !signature) return false;
  if (!safeEqual(signature, signValue(encodedPayload))) return false;

  try {
    const payload = JSON.parse(Buffer.from(encodedPayload, "base64url").toString("utf8"));
    return payload?.role === "admin" && Number(payload?.exp || 0) > Date.now();
  } catch {
    return false;
  }
}

export function isAuthenticatedRequest(request) {
  const cookies = parseCookies(request);
  return verifySessionToken(cookies[COOKIE_NAME]);
}

export function buildSessionCookie(request, token) {
  const secureFlag = isHttpsRequest(request) ? "; Secure" : "";
  return `${COOKIE_NAME}=${token}; Max-Age=${SESSION_MAX_AGE_SECONDS}; Path=/; HttpOnly; SameSite=Lax${secureFlag}`;
}

export function buildLogoutCookie(request) {
  const secureFlag = isHttpsRequest(request) ? "; Secure" : "";
  return `${COOKIE_NAME}=; Max-Age=0; Path=/; HttpOnly; SameSite=Lax${secureFlag}`;
}

export function validatePassword(password) {
  if (!isAdminConfigured()) return false;
  return safeEqual(String(password || ""), getConfiguredPassword());
}

export function jsonResponse(body, init = {}) {
  const headers = new Headers(init.headers || {});
  headers.set("Content-Type", "application/json; charset=utf-8");
  return new Response(JSON.stringify(body), { ...init, headers });
}
