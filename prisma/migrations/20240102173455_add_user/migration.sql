/*
  Warnings:

  - You are about to drop the column `name` on the `user` table. All the data in the column will be lost.
  - Added the required column `email` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `first_name` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `middle_name` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "user_id_key";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "name",
ADD COLUMN     "contact_number" VARCHAR(20),
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "department" VARCHAR(100),
ADD COLUMN     "email" VARCHAR(100) NOT NULL,
ADD COLUMN     "faculty" VARCHAR(100),
ADD COLUMN     "first_name" VARCHAR(50) NOT NULL,
ADD COLUMN     "job" VARCHAR(50),
ADD COLUMN     "last_name" VARCHAR(50) NOT NULL,
ADD COLUMN     "middle_name" VARCHAR(50) NOT NULL,
ADD COLUMN     "password" VARCHAR(50) NOT NULL,
ADD COLUMN     "role" VARCHAR(50) NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "username" VARCHAR(50) NOT NULL,
ADD CONSTRAINT "user_pkey" PRIMARY KEY ("id");
