import crypto from "crypto";
import db from "../../../db.server";

async function verifyShopifyWebhook(request) {
  const body = await request.arrayBuffer();
  const bodyBuffer = Buffer.from(body);
  const hmacHeader = request.headers.get("X-Shopify-Hmac-Sha256");
  const generatedHmac = crypto
    .createHmac("sha256", process.env.SHOPIFY_API_SECRET)
    .update(bodyBuffer)
    .digest("base64");

  if (generatedHmac !== hmacHeader) {
    throw new Error("Invalid HMAC signature");
  }

  return JSON.parse(new TextDecoder().decode(body));
}

export const action = async ({ request }) => {
  try {
    const payload = await verifyShopifyWebhook(request);
    const topic = request.headers.get("X-Shopify-Topic");
    const shop = request.headers.get("X-Shopify-Shop-Domain");

    console.log(`✅ Verified ${topic} webhook for ${shop}`);

    // Assuming session is retrieved separately or handled differently
    // Since we removed authenticate.webhook, we need to handle session retrieval
    // For now, keeping the logic but note that session might need adjustment
    // You may need to implement session retrieval based on shop domain

    return new Response("Webhook processed", { status: 200 });
  } catch (error) {
    console.error("❌ Webhook verification failed:", error);
    return new Response("Unauthorized", { status: 401 });
  }
};
