import { AddCategoryParamsType } from "@repo/db";

interface AddCategoryProps {
  categoryData: AddCategoryParamsType;
}
export async function AddCategory({ categoryData }: AddCategoryProps) {
  try {
    await db?.category.create({
      data: { ...categoryData },
    });
    return { msg: "Category Created Successfully" };
  } catch (error) {
    throw new Error((error as Error).message ?? "INTERNAL_SERVER_ERROR");
  }
}
