import {
  Dialog,
  DialogContent,
  DialogTrigger,
  TypographyH3,
} from "@repo/ui/components";
import React from "react";
import AddProductModalForm from "./add-product-modal-form";

export function AddProductModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="relative hover:bg-secondary flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
          New Product
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        {/*  */}
        <TypographyH3>Add New Product</TypographyH3>
        <AddProductModalForm></AddProductModalForm>
      </DialogContent>
    </Dialog>
  );
}
