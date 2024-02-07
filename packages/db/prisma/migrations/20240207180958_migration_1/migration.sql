-- CreateEnum
CREATE TYPE "CURRENCY" AS ENUM ('USD', 'INR');

-- CreateEnum
CREATE TYPE "ProductStatus" AS ENUM ('Published', 'Private');

-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "primaryImageUrl" TEXT NOT NULL,
    "url" TEXT[],

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "street" TEXT,
    "city" TEXT,
    "state" TEXT,
    "zip" TEXT,
    "country" TEXT,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification_tokens" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Price" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "regularPrice" DOUBLE PRECISION,
    "discountedPrice" DOUBLE PRECISION,
    "discountPercentage" DOUBLE PRECISION,
    "currency" "CURRENCY" NOT NULL,
    "tax" DOUBLE PRECISION,
    "shippingCost" DOUBLE PRECISION,
    "handlingFee" DOUBLE PRECISION,
    "ppu" DOUBLE PRECISION,

    CONSTRAINT "Price_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "brandId" TEXT NOT NULL,
    "variantId" TEXT,
    "categoryId" TEXT NOT NULL,
    "UPC" TEXT,
    "EAN" TEXT,
    "ISBN" TEXT,
    "SKU" TEXT,
    "productName" TEXT NOT NULL,
    "description" TEXT,
    "bulletPoints" TEXT[],
    "legalDisclaimer" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "keywords" TEXT,
    "targetAudience" TEXT,
    "searchTerms" TEXT[],
    "modelNumber" TEXT,
    "catalogNumber" TEXT,
    "color" TEXT,
    "size" TEXT,
    "eachUnitCount" INTEGER,
    "numberOfItems" INTEGER,
    "status" "ProductStatus" DEFAULT 'Private',
    "isDiscontinuedByManufacturer" BOOLEAN,
    "usage" TEXT,
    "safetyWarning" TEXT,
    "vectorImageObjId" TEXT,
    "vectorTextObjId" TEXT,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MoreDetails" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "launchDate" TIMESTAMP(3),
    "releaseDate" TIMESTAMP(3),
    "targetGender" TEXT,
    "targetAudienceDetails" TEXT,
    "usage" TEXT[],
    "displayWeight" TEXT,
    "packageWeight" TEXT,
    "shippingWeight" TEXT,
    "containsLiquid" BOOLEAN,
    "isFragile" BOOLEAN,
    "itemForm" TEXT,
    "itemType" TEXT,
    "materialType" TEXT,
    "hairType" TEXT,
    "skinType" TEXT,
    "fabricType" TEXT,

    CONSTRAINT "MoreDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Brand" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Brand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dimension" (
    "id" TEXT NOT NULL,
    "moreDetailsId" TEXT NOT NULL,
    "productLength" DOUBLE PRECISION,
    "productWidth" DOUBLE PRECISION,
    "productHeight" DOUBLE PRECISION,
    "packageLength" DOUBLE PRECISION,
    "packageWidth" DOUBLE PRECISION,
    "packageHeight" DOUBLE PRECISION,
    "displayLenght" DOUBLE PRECISION,
    "displayWidth" DOUBLE PRECISION,
    "parameter" TEXT,

    CONSTRAINT "Dimension_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "accounts_userId_idx" ON "accounts"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_providerAccountId_key" ON "accounts"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_sessionToken_key" ON "sessions"("sessionToken");

-- CreateIndex
CREATE INDEX "sessions_userId_idx" ON "sessions"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Image_productId_key" ON "Image"("productId");

-- CreateIndex
CREATE INDEX "Image_id_idx" ON "Image"("id");

-- CreateIndex
CREATE INDEX "Address_userId_idx" ON "Address"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "verification_tokens_token_key" ON "verification_tokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "verification_tokens_identifier_token_key" ON "verification_tokens"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "Price_productId_key" ON "Price"("productId");

-- CreateIndex
CREATE INDEX "Price_id_idx" ON "Price"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE INDEX "Product_userId_idx" ON "Product"("userId");

-- CreateIndex
CREATE INDEX "Product_variantId_idx" ON "Product"("variantId");

-- CreateIndex
CREATE INDEX "Product_brandId_idx" ON "Product"("brandId");

-- CreateIndex
CREATE INDEX "Product_categoryId_idx" ON "Product"("categoryId");

-- CreateIndex
CREATE UNIQUE INDEX "MoreDetails_productId_key" ON "MoreDetails"("productId");

-- CreateIndex
CREATE INDEX "MoreDetails_id_idx" ON "MoreDetails"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Brand_name_key" ON "Brand"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Dimension_moreDetailsId_key" ON "Dimension"("moreDetailsId");
