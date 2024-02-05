import { AddProductVitalInfoParamsType, Id } from "@repo/db";

interface AddNewProductOrVariantProps {
  productVitalInfo: AddProductVitalInfoParamsType;
  userId: Id;
  brandId: Id;
  categoryId: Id;
  addVariantByParentId?: Id;
}
export async function AddNewProductOrVariant({
  productVitalInfo,
  userId,
  brandId,
  categoryId,
  addVariantByParentId,
}: AddNewProductOrVariantProps) {
  try {
    await db?.product.create({
      data: {
        ...productVitalInfo,
        brand: { connect: { id: brandId } },
        category: { connect: { id: categoryId } },
        user: { connect: { id: userId } },
        variant: addVariantByParentId
          ? { connect: { id: addVariantByParentId } }
          : undefined,
      },
    });
    return { msg: "New Product Added Successfully" };
  } catch (error) {
    throw new Error((error as Error).message ?? "INTERNAL_SERVER_ERROR");
  }
}
interface UpdateProductVitalInfoProps {
  productId: Id;
  updatedProductVitalInfo: AddNewProductOrVariantProps;
}
export async function UpdateProductVitalInfo({
  productId,
  updatedProductVitalInfo,
}: UpdateProductVitalInfoProps) {
  try {
    const existingProduct = await db?.product.findUnique({
      where: { id: productId },
    });

    if (!existingProduct) {
      throw new Error("PRODUCT_NOT_FOUND");
    }

    await db?.product.update({
      where: { id: productId },
      data: { ...updatedProductVitalInfo },
    });

    return { msg: "Product Vital Information Updated Successfully" };
  } catch (error) {
    throw new Error((error as Error).message ?? "INTERNAL_SERVER_ERROR");
  }
}

export async function DeleteProductAndReferences(productId: Id) {
  try {
    const product = await db?.product.findUnique({
      where: { id: productId },
      include: { variants: true },
    });
    if (!product) {
      throw new Error("PRODUCT_NOT_FOUND");
    }
    if (product?.variants) {
      for (const variant of product?.variants) {
        await db?.product.delete({ where: { id: variant.id } });
      }
    }
    return { msg: "Product and References Deleted Successfully" };
  } catch (error) {
    throw new Error((error as Error).message ?? "INTERNAL_SERVER_ERROR");
  }
}

interface UpdateProductCategoryProps {
  productId: Id;
  categoryId: Id;
}

export async function UpdateProductCategory({
  productId,
  categoryId,
}: UpdateProductCategoryProps) {
  try {
    const existingProduct = await db?.product.findUnique({
      where: { id: productId },
    });

    if (!existingProduct) {
      throw new Error("PRODUCT_NOT_FOUND");
    }

    await db?.product.update({
      where: { id: productId },
      data: { category: { connect: { id: categoryId } } },
    });

    return { msg: "Category Updated Successfully" };
  } catch (error) {
    throw new Error((error as Error).message ?? "INTERNAL_SERVER_ERROR");
  }
}

interface UpdateProductBrandProps {
  productId: Id;
  brandId: Id;
}

export async function UpdateProductBrand({
  productId,
  brandId,
}: UpdateProductBrandProps) {
  try {
    const existingProduct = await db?.product.findUnique({
      where: { id: productId },
    });

    if (!existingProduct) {
      throw new Error("PRODUCT_NOT_FOUND");
    }

    await db?.product.update({
      where: { id: productId },
      data: {
        brand: { connect: { id: brandId } },
      },
    });

    return { msg: "Brand Updated Successfully" };
  } catch (error) {
    throw new Error((error as Error).message ?? "INTERNAL_SERVER_ERROR");
  }
}
