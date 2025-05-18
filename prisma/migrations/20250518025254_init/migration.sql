-- CreateTable
CREATE TABLE "Customer" (
    "customerID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "birthDate" DATETIME NOT NULL,
    "moneySpent" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "Product" (
    "productID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "category" TEXT NOT NULL,
    "price" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "Employees" (
    "employeeID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "birthDate" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Orders" (
    "orderID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "customerID" INTEGER NOT NULL,
    "employeeID" INTEGER NOT NULL,
    "productID" INTEGER NOT NULL,
    "orderTotal" REAL NOT NULL,
    "orderDate" DATETIME NOT NULL,
    CONSTRAINT "Orders_customerID_fkey" FOREIGN KEY ("customerID") REFERENCES "Customer" ("customerID") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Orders_employeeID_fkey" FOREIGN KEY ("employeeID") REFERENCES "Employees" ("employeeID") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Orders_productID_fkey" FOREIGN KEY ("productID") REFERENCES "Product" ("productID") ON DELETE CASCADE ON UPDATE CASCADE
);
