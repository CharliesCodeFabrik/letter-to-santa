-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Letter" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "userId" INTEGER NOT NULL DEFAULT -1,
    CONSTRAINT "Letter_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Letter" ("createdAt", "description", "id", "url", "userId") SELECT "createdAt", "description", "id", "url", "userId" FROM "Letter";
DROP TABLE "Letter";
ALTER TABLE "new_Letter" RENAME TO "Letter";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
