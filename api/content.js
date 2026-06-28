import { jsonResponse } from "./_lib/auth.js";
import { readPublishedContent } from "./_lib/content-store.js";

export async function GET() {
  const content = await readPublishedContent();

  return jsonResponse(content, {
    headers: {
      "Cache-Control": "no-store"
    }
  });
}
