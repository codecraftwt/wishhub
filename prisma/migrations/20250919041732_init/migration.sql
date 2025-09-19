-- CreateTable
CREATE TABLE "Settings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT
);

-- CreateTable
CREATE TABLE "Wishlist" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "customerId" TEXT,
    "productId" TEXT,
    "productTitle" TEXT,
    "shop" TEXT,
    "productImage" TEXT,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "price" REAL,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP
);
