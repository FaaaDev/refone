-- CreateTable
CREATE TABLE "product_gallery" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "productId" UUID NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "product_gallery_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "product_gallery" ADD CONSTRAINT "product_gallery_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
