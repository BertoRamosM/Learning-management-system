-- CreateTable
CREATE TABLE "Widget" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),

    CONSTRAINT "Widget_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" STRING NOT NULL,
    "userId" STRING NOT NULL,
    "title" STRING NOT NULL,
    "description" STRING,
    "imageUrl" STRING,
    "price" FLOAT8,
    "isPublished" BOOL NOT NULL DEFAULT false,
    "categoryId" STRING,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attachments" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,
    "url" STRING NOT NULL,
    "courseId" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Attachments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Course_categoryId_idx" ON "Course"("categoryId");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE INDEX "Attachments_courseId_idx" ON "Attachments"("courseId");

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attachments" ADD CONSTRAINT "Attachments_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
