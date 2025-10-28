import { useEffect } from "react";
import {
  Page,
  Card,
  Text,
  BlockStack,
  InlineStack,
  Button,
  Layout,
  Box,
  Divider,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { motion } from "framer-motion";
import { authenticate } from "../shopify.server";
import { useLoaderData } from "@remix-run/react";

export const loader = async ({ request }) => {
  const { session } = await authenticate.admin(request);

  // const themeEditorUrl = `https://${session.shop}/admin/themes/current/editor?context=apps`;
    const themeEditorUrl = `https://admin.shopify.com/store/wishhub-2/themes/151620616420/editor?context=apps`;

  return { themeEditorUrl };
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Index() {
  const { themeEditorUrl } = useLoaderData();

  useEffect(() => {
    document.title = "WishHub | Dashboard";
  }, []);

  return (
    <Page fullWidth>
      <TitleBar title="WishHub" />

      <BlockStack gap="700">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          style={{ textAlign: "center" }}
        >
          <Box
            background="bg-surface-secondary"
            paddingBlock="1000"
            paddingInline="700"
            borderRadius="400"
            shadow="card"
          >
            <BlockStack align="center" gap="400">
              <Text
                as="h1"
                variant="heading3xl"
                alignment="center"
                style={{
                  fontSize: "2.8rem",
                  fontWeight: 700,
                  color: "#2C1A4C",
                  marginTop: "60px",
                  marginBottom: "16px",
                }}
              >
                Welcome to <span style={{ color: "#7B3AED" }}>WishHub❤️</span>
              </Text>

              <Text
                as="p"
                alignment="center"
                style={{
                  fontSize: "1.15rem",
                  maxWidth: "800px",
                  color: "#5c5c5c",
                  lineHeight: "1.8",
                  marginBottom: "1.8rem",
                }}
              >
                Instantly add a powerful Wishlist system to your Shopify store — no
                coding, setup, or theme editing required. Just install, toggle{" "}
                <b>ON</b>, and let
                <span style={{ color: "#7B3AED", fontWeight: 600 }}> WishHub</span> do
                the magic.
              </Text>

            </BlockStack>
          </Box>
        </motion.div>

        {[
          {
            title: "Why WishHub?",
            content: (
              <>
                <Text
                  as="p"
                  alignment="center"
                  tone="subdued"
                  maxWidth="750px"
                  style={{
                    margin: "0 auto 20px",
                    fontSize: "1.8rem",
                    lineHeight: "1.7",
                  }}
                >
                  Shopify doesn’t offer a built-in wishlist feature. WishHub gives your
                  customers a beautiful, seamless wishlist experience — instantly.
                </Text>

                <Layout>
                  {[
                    {
                      title: "Single-Click Activation",
                      desc: "Enable WishHub with one switch. No coding or setup required.",
                    },
                    {
                      title: "Works Everywhere",
                      desc: "Heart icons appear automatically across your entire store.",
                    },
                    {
                      title: "Smart Customization",
                      desc: "Match your brand with effortless style settings.",
                    },
                  ].map((item, idx) => (
                    <Layout.Section oneThird key={idx}>
                      <Card padding="500" background="bg-surface" shadow="card">
                        <BlockStack gap="200" align="center">
                          <Text
                            variant="headingLg"
                            as="h3"
                            alignment="center"
                            style={{
                              color: "#2C1A4C",
                              fontWeight: 600,
                            }}
                          >
                            {item.title}
                          </Text>
                          <Text
                            alignment="center"
                            style={{
                              color: "#666",
                              fontSize: "1rem",
                              lineHeight: "1.6",
                            }}
                          >
                            {item.desc}
                          </Text>
                        </BlockStack>
                      </Card>
                    </Layout.Section>
                  ))}
                </Layout>
              </>
            ),
          },

          {
            title: "How WishHub Works",
            content: (
              <>
                <Text
                  as="p"
                  alignment="center"
                  tone="subdued"
                  maxWidth="700px"
                  style={{
                    margin: "0 auto 40px",
                    fontSize: "1.1rem",
                    lineHeight: "1.6",
                  }}
                >
                  Activating WishHub is effortless. Just follow these two steps:
                </Text>

                <Layout>
                  {[
                    {
                      step: "1. Install WishHub",
                      desc: "Get WishHub from the Shopify App Store with one click.",
                      img: "/install.png",
                    },
                    {
                      step: "2. Enable Wishlist",
                      desc: "Turn it ON in your admin panel — instantly activates.",
                      img: "/Enable.png",
                    },
                  ].map((step, i) => (
                    <Layout.Section oneHalf key={i}>
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: i * 0.05 }}
                        viewport={{ once: true }}
                        style={{
                          textAlign: "center",
                          padding: "30px 10px",
                        }}
                      >
                        <Card
                          padding="500"
                          background="bg-surface"
                          shadow="card"
                          style={{
                            minHeight: "350px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <BlockStack gap="300" align="center">
                            <Text
                              variant="headingLg"
                              as="h3"
                              style={{
                                color: "#2C1A4C",
                                fontWeight: 600,
                              }}
                            >
                              {step.step}
                            </Text>

                            <Text
                              alignment="center"
                              tone="subdued"
                              style={{
                                fontSize: "1rem",
                                maxWidth: "400px",
                              }}
                            >
                              {step.desc}
                            </Text>

                            <div
                              style={{
                                width: "100%",
                                height: "320px",
                                borderRadius: "12px",
                                overflow: "hidden",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                                marginTop: "20px",
                              }}
                            >
                              <img
                                src={step.img}
                                alt={step.step}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "contain",
                                  transition: "transform 0.4s ease",
                                }}
                                onMouseOver={(e) =>
                                  (e.currentTarget.style.transform = "scale(1.05)")
                                }
                                onMouseOut={(e) =>
                                  (e.currentTarget.style.transform = "scale(1)")
                                }
                              />
                            </div>
                          </BlockStack>
                        </Card>
                      </motion.div>
                    </Layout.Section>
                  ))}
                </Layout>

                <Divider style={{ margin: "40px 0" }} />

                <Text
                  as="p"
                  alignment="center"
                  style={{ fontSize: "4rem", fontWeight: "bold", marginBottom: "20px" }}
                >
                  Once enabled, WishHub automatically:
                </Text>

                <Layout>
                  {[
                    {
                      title: "❤️ Wishlist heart icon",
                      desc: "Appears on all product cards automatically.",
                      img: "/heart.png",
                    },
                    {
                      title: "💖 Wishlist button",
                      desc: "Displayed on every product page instantly.",
                      img: "/button.png",
                    },
                    {
                      title: "🗂️ Wishlist Page",
                      desc: "Automatically creates a beautiful wishlist page.",
                      img: "/page.png",
                    },
                    {
                      title: "🎨 Seamless design",
                      desc: "Blends with any Shopify theme perfectly.",
                      img: "/theme.png",
                    },
                  ].map((f, i) => (
                    <Layout.Section oneThird key={i}>
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.15 }}
                        viewport={{ once: true }}
                      >
                        <Card
                          padding="500"
                          background="bg-surface"
                          shadow="card"
                          style={{
                            height: "340px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "space-between",
                            textAlign: "center",
                          }}
                        >
                          <div>
                            <Text
                              variant="headingMd"
                              as="h3"
                              style={{
                                color: "#2C1A4C",
                                fontWeight: 800,
                                marginBottom: "10px",
                              }}
                            >
                              {f.title}
                            </Text>
                            <Text
                              alignment="center"
                              tone="subdued"
                              style={{
                                fontSize: "2rem",
                                lineHeight: "1.5",
                                marginBottom: "16px",
                              }}
                            >
                              {f.desc}
                            </Text>
                          </div>

                          <div
                            style={{
                              width: "100%",
                              height: "320px",
                              borderRadius: "10px",
                              overflow: "hidden",
                              boxShadow: "0 4px 12px rgba(0,0,0,0.07)",
                            }}
                          >
                            <img
                              src={f.img}
                              alt={f.title}
                              style={{
                                width: "100%",
                                height: "100%",
                                marginTop: "20px",
                                objectFit: "contain",
                                transition: "transform 0.4s ease",
                              }}
                              onMouseOver={(e) =>
                                (e.currentTarget.style.transform = "scale(1.05)")
                              }
                              onMouseOut={(e) =>
                                (e.currentTarget.style.transform = "scale(1)")
                              }
                            />
                          </div>
                        </Card>
                      </motion.div>
                    </Layout.Section>
                  ))}
                </Layout>
              </>
            ),
          },

          {
            title: "Why Your Store Needs WishHub",
            content: (
              <>
                <Text
                  as="p"
                  alignment="center"
                  tone="subdued"
                  maxWidth="700px"
                  style={{
                    margin: "0 auto 20px",
                    fontSize: "1.1rem",
                    lineHeight: "1.7",
                  }}
                >
                  Without a wishlist, shoppers forget items they love or lose interest.
                  WishHub keeps them engaged and brings them back to buy.
                </Text>

                <Layout>
                  {[
                    {
                      title: "Boosts Engagement",
                      desc: "Keeps customers connected to products they love. 🔥",
                    },
                    {
                      title: "Increases Conversions",
                      desc: "Turns interest into sales by bringing shoppers back to purchase. 🚀",
                    },
                  ].map((item, idx) => (
                    <Layout.Section oneHalf key={idx}>
                      <Card padding="500" background="bg-surface" shadow="card">
                        <BlockStack gap="200" align="center">
                          <Text
                            variant="headingLg"
                            as="h3"
                            alignment="center"
                            style={{
                              color: "#2C1A4C",
                              fontWeight: 600,
                            }}
                          >
                            {item.title}
                          </Text>
                          <Text
                            alignment="center"
                            style={{
                              color: "#666",
                              fontSize: "1rem",
                            }}
                          >
                            {item.desc}
                          </Text>
                        </BlockStack>
                      </Card>
                    </Layout.Section>
                  ))}
                </Layout>
              </>
            ),
          },

          {
            title: "Ready to see WishHub in action?",
            content: (
              <>
                <Text
                  as="p"
                  tone="subdued"
                  alignment="center"
                  maxWidth="700px"
                  style={{
                    fontSize: "1.1rem",
                    marginBottom: "20px",
                  }}
                >
                  Activate WishHub now to add a powerful wishlist system across your
                  store in seconds. No code. No complexity. Just magic. ✨
                </Text>

                <InlineStack gap="400" align="center">
                  <Button size="large" variant="primary">
                    Enable Wishlist
                  </Button>
                  <Button size="large" variant="secondary" external>
                    Learn More
                  </Button>
                </InlineStack>
              </>
            ),
          },
        ].map((section, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            style={{
              marginBlockStart: i === 0 ? "40px" : "50px",
            }}
          >
            <Card
              sectioned={false}
              style={{
                borderRadius: "18px",
                boxShadow: "0 6px 25px rgba(0,0,0,0.06)",
                background: "white",
              }}
            >
              <div
                style={{
                  padding: "20px 10px",
                }}
              >
                <BlockStack gap="600" align="center">
                  <Text
                    as="h2"
                    variant="heading2xl"
                    alignment="center"
                    style={{
                      fontSize: "2rem",
                      color: "#2C1A4C",
                      fontWeight: 700,
                      marginTop: "40px",
                      marginBottom: "40px",
                    }}
                  >
                    {section.title}
                  </Text>
                  {section.content}
                </BlockStack>
              </div>
            </Card>
          </motion.div>
        ))}
      </BlockStack>
    </Page>
  );
}
