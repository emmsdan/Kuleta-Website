-- CreateTable
CREATE TABLE "CmsSingleton" (
  "id" TEXT NOT NULL,
  "key" TEXT NOT NULL,
  "value" JSONB NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "CmsSingleton_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CmsCollectionItem" (
  "id" TEXT NOT NULL,
  "collection" TEXT NOT NULL,
  "slug" TEXT,
  "title" TEXT NOT NULL,
  "subtitle" TEXT,
  "body" TEXT,
  "imageUrl" TEXT,
  "linkUrl" TEXT,
  "metadata" JSONB,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "isPublished" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "CmsCollectionItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CmsSingleton_key_key" ON "CmsSingleton"("key");

-- CreateIndex
CREATE INDEX "CmsCollectionItem_collection_sortOrder_idx" ON "CmsCollectionItem"("collection", "sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "CmsCollectionItem_collection_slug_key" ON "CmsCollectionItem"("collection", "slug");
