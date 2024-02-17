import {
  Button,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@repo/ui/components";
import { SearchCatalogModal } from "./search-catalog-modal";
import { AddProductModal } from "./add-product-modal";

export default function SellerForm() {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="focus-visible:ring-0 pointer-events-auto"
            size="sm"
          >
            Add Product By
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Choose Method</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild className="cursor-pointer">
            <SearchCatalogModal></SearchCatalogModal>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="cursor-pointer">
            <AddProductModal></AddProductModal>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
