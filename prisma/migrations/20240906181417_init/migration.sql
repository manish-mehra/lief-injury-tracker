-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "email" TEXT,
    "role" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "InjuryReport" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "reporterName" TEXT NOT NULL,
    "injuryDateTime" DATETIME NOT NULL,
    "reportDateTime" DATETIME NOT NULL,
    "bodyMap" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Injury" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "reportId" INTEGER NOT NULL,
    "label" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "encircleId" TEXT NOT NULL,
    CONSTRAINT "Injury_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "InjuryReport" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
