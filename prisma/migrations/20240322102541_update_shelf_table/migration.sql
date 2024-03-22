/*
  Warnings:

  - You are about to drop the column `column` on the `Shelf` table. All the data in the column will be lost.
  - You are about to drop the column `row` on the `Shelf` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Item` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Timeline` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `Items` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[shelfNum]` on the table `Shelf` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `quantity` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_applicationId_fkey";

-- DropForeignKey
ALTER TABLE "Timeline" DROP CONSTRAINT "Timeline_applicationId_fkey";

-- AlterTable
ALTER TABLE "Application" ADD COLUMN     "itemsId" TEXT[],
ADD COLUMN     "quantity" JSONB NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'Pending';

-- AlterTable
ALTER TABLE "Items" ADD COLUMN     "applicationId" TEXT,
ALTER COLUMN "image" DROP NOT NULL,
ALTER COLUMN "image" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Shelf" DROP COLUMN "column",
DROP COLUMN "row";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "created_at",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "Item";

-- DropTable
DROP TABLE "Timeline";

-- CreateIndex
CREATE UNIQUE INDEX "Items_name_key" ON "Items"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Shelf_shelfNum_key" ON "Shelf"("shelfNum");

-- AddForeignKey
ALTER TABLE "Items" ADD CONSTRAINT "Items_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE SET NULL ON UPDATE CASCADE;
