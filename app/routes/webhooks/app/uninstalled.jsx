import { authenticate } from "../../../shopify.server";
import db from "../../../db.server";

export const action = async ({ request }) => {
  try {
    const { topic, shop } = await authenticate.webhook(request);
    console.log(`✅ Verified ${topic} webhook for ${shop}`);

    // Delete session data
    await db.session.deleteMany({ where: { shop } });
    
    return new Response(null, { status: 200 });
  } catch (error) {
    console.error("❌ Webhook verification failed:", error);
    return new Response("Unauthorized", { status: 401 });
  }
};