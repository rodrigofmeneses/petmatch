-- CreateTable
CREATE TABLE "Tutor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "avatar" TEXT,
    "phone" TEXT,
    "city" TEXT,
    "about" TEXT
);

-- CreateTable
CREATE TABLE "Pet" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "age" TEXT,
    "city" TEXT,
    "about" TEXT,
    "image" TEXT,
    "tutorId" TEXT NOT NULL,
    CONSTRAINT "Pet_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "Tutor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Tutor_email_key" ON "Tutor"("email");
