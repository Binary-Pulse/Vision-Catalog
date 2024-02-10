-- AlterTable
ALTER TABLE "Image" ALTER COLUMN "primaryImageUrl" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Price" ALTER COLUMN "currency" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "productName" DROP NOT NULL;
