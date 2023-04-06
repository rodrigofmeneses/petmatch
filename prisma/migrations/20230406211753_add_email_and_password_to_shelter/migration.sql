/*
  Warnings:

  - Added the required column `email` to the `Shelter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Shelter` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Shelter" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "avatar" TEXT,
    "phone" TEXT,
    "city" TEXT,
    "about" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Shelter" ("avatar", "city", "createdAt", "id", "name", "phone", "updatedAt") SELECT "avatar", "city", "createdAt", "id", "name", "phone", "updatedAt" FROM "Shelter";
DROP TABLE "Shelter";
ALTER TABLE "new_Shelter" RENAME TO "Shelter";
CREATE UNIQUE INDEX "Shelter_email_key" ON "Shelter"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
