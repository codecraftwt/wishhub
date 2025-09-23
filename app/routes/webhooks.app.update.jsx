import { authenticate } from "../shopify.server";
import db from "../db.server";

export const action = async ({ request }) => {
  try {
    const { payload, session, topic, shop } = await authenticate.webhook(request);

    console.log(`Verified ${topic} webhook for ${shop}`);

    if (session) {
      await db.session.update({
        where: { id: session.id },
        data: { shopInfo: JSON.stringify(payload) },
      });
    }

    return new Response("Webhook verified", { status: 200 });
  } catch (err) {
    console.error("Webhook verification failed:", err);
    return new Response("Invalid webhook", { status: 401 });
  }
};
