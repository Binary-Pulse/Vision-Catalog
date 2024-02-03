import { AddBrandParamsType } from "@repo/db";

interface AddBrandProps {
  brandData: AddBrandParamsType;
}
export async function AddBrand({ brandData }: AddBrandProps) {
  try {
    await db?.brand.create({
      data: { ...brandData },
    });
    return { msg: "Brand Created Successfully" };
  } catch (error) {
    throw new Error((error as Error).message ?? "INTERNAL_SERVER_ERROR");
  }
}
