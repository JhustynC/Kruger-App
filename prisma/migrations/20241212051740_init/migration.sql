/*
  Warnings:

  - You are about to drop the column `firstName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `User` table. All the data in the column will be lost.
  - Added the required column `names` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `surnames` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "firstName",
DROP COLUMN "lastName",
ADD COLUMN     "names" TEXT NOT NULL,
ADD COLUMN     "surnames" TEXT NOT NULL,
ADD COLUMN     "user" TEXT NOT NULL;
