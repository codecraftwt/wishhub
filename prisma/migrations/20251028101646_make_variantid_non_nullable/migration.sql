-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_wishlists" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "customerId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "variantId" TEXT NOT NULL DEFAULT 'default',
    "shop" TEXT NOT NULL,
    "productTitle" TEXT NOT NULL,
    "variantTitle" TEXT,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "price" REAL NOT NULL,
    "productImage" TEXT
);
INSERT INTO "new_wishlists" ("customerId", "id", "price", "productId", "productImage", "productTitle", "quantity", "shop", "variantId", "variantTitle") SELECT "customerId", "id", "price", "productId", "productImage", "productTitle", "quantity", "shop", coalesce("variantId", 'default') AS "variantId", "variantTitle" FROM "wishlists";
DROP TABLE "wishlists";
ALTER TABLE "new_wishlists" RENAME TO "wishlists";
CREATE UNIQUE INDEX "wishlists_customerId_productId_variantId_shop_key" ON "wishlists"("customerId", "productId", "variantId", "shop");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
