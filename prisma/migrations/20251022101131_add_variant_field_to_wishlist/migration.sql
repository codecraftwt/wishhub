/*
  Warnings:

  - You are about to drop the `Wishlist` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Wishlist";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "wishlists" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "customerId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "variantId" TEXT,
    "shop" TEXT NOT NULL,
    "productTitle" TEXT NOT NULL,
    "variantTitle" TEXT,
    "quantity" INTEGER NOT NULL,
    "price" REAL NOT NULL,
    "productImage" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "wishlists_customerId_productId_variantId_shop_key" ON "wishlists"("customerId", "productId", "variantId", "shop");
