import {
  Page,
  LegacyCard,
  DataTable,
  TextField,
  Button,
  Text,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { json } from "@remix-run/node";
import { useLoaderData, useNavigate, useSearchParams } from "@remix-run/react";
import { useState } from "react";
import db from "../db.server";

export async function loader({ request }) {
  const url = new URL(request.url);
  const shop = url.searchParams.get("shop");
  const search = url.searchParams.get("search");

  const where = {
    ...(shop && { shop }),
    ...(search && {
      OR: [
        { productTitle: { contains: search, mode: "insensitive" } },
        { variantTitle: { contains: search, mode: "insensitive" } },
      ],
    }),
  };

  const total = await db.wishlist.count({ where });
  const wishlists = await db.wishlist.findMany({
    where,
    orderBy: { id: "desc" },
  });

  let totalQuantity = 0;
  let totalNetSales = 0;
  wishlists.forEach((item) => {
    const price = item.price ?? 0;
    const quantity = item.quantity ?? 1;
    totalQuantity += quantity;
    totalNetSales += price * quantity;
  });

  const shops = await db.wishlist
    .findMany({
      select: { shop: true },
      distinct: ["shop"],
    })
    .then((results) => results.map((r) => r.shop));

  return json({
    wishlists,
    total,
    totalQuantity,
    totalNetSales,
    shops,
  });
}

export default function WishlistPage() {
  const { wishlists, total, totalQuantity, totalNetSales, shops } =
    useLoaderData();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") || ""
  );

  const rows = wishlists.map((item) => {
    const price = item.price ?? 0;
    const quantity = item.quantity ?? 1;
    const productTitle = item.productTitle || "Unknown Product";
    const variantTitle = item.variantTitle || "";
    const total = price * quantity;

    return [
      productTitle,
      variantTitle,
      quantity,
      `$${price.toFixed(2)}`,
      `$${total.toFixed(2)}`,
    ];
  });

  const totalsRow = [
    <Text as="span" fontWeight="bold">
      Totals
    </Text>,
    "",
    <Text as="span" fontWeight="bold">
      {totalQuantity}
    </Text>,
    "",
    <Text as="span" fontWeight="bold">
      ${totalNetSales.toFixed(2)}
    </Text>,
  ];

  const rowsWithFooter = [...rows, totalsRow];

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams);
    if (searchValue.trim()) {
      params.set("search", searchValue.trim());
    } else {
      params.delete("search");
    }
    params.delete("page"); // No pagination
    navigate(`?${params.toString()}`);
  };

  return (
    <Page title="Wishlist">
      <TitleBar title="Wishlist" />
      <LegacyCard>
          <div style={{ padding: "16px" }}>
            <div
              style={{
                display: "flex",
                gap: "16px",
                marginBottom: "16px",
                alignItems: "flex-end",
              }}
            >
              <div style={{ flex: 1 }}>
                <TextField
                  label=""
                  value={searchValue}
                  onChange={setSearchValue}
                  placeholder="Search by product or variant title"
                  autoComplete="off"
                />
              </div>
              <Button onClick={handleSearch} primary>
                Search
              </Button>
            </div>

            <DataTable
              columnContentTypes={[
                "text",
                "text",
                "numeric",
                "numeric",
                "numeric",
              ]}
              headings={[
                "Product Title",
                "Variant Title",
                "Quantity",
                "Price",
                "Total",
              ]}
              rows={rowsWithFooter}
            />

            <div
              style={{
                marginTop: "16px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                Showing <strong>{total}</strong> of <strong>{total}</strong>{" "}
                entries
              </div>
             
            </div>
          </div>
      </LegacyCard>
    </Page>
  );
}