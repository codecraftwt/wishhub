import crypto from "crypto";

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

    // Log the data request for compliance
    console.log('GDPR Data Request received for:', {
      shop,
      customer: payload.customer?.id,
      orders_requested: payload.orders_requested
    });

    return new Response("Webhook processed", { status: 200 });
  } catch (error) {
    console.error("❌ Webhook verification failed:", error);
    return new Response("Unauthorized", { status: 401 });
  }
};
