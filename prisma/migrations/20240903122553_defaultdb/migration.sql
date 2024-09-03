/*
  Warnings:

  - You are about to drop the `Attachments` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Attachments" DROP CONSTRAINT "Attachments_courseId_fkey";

-- DropTable
DROP TABLE "Attachments";

-- CreateTable
CREATE TABLE "Attachment" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,
    "url" STRING NOT NULL,
    "courseId" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Attachment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Attachment_courseId_idx" ON "Attachment"("courseId");

-- AddForeignKey
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
