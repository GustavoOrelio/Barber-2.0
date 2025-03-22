/*
  Warnings:

  - Added the required column `imageUrl` to the `BarbershopService` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BarbershopService" ADD COLUMN     "imageUrl" TEXT NOT NULL;
