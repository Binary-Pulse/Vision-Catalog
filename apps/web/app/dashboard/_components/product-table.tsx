"use client";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components";
import React from "react";
import { trpc } from "@repo/trpc/trpc/client";
import { Icons } from "@repo/ui/icons";

export function ProductTable() {
  const { data, isLoading } = trpc.productRouter.getUserProductList.useQuery();
  const productsArray = data;

  return (
    <Table className="text-base">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[80px]">Image</TableHead>
          <TableHead className="max-w-[150px]">Name</TableHead>
          <TableHead className="hidden md:table-cell">Status</TableHead>
          <TableHead className="hidden md:table-cell">Selling Price</TableHead>
          <TableHead className="hidden md:table-cell">Stock</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Boolean(isLoading) && <TableLoader />}
        {Boolean(!isLoading && (!productsArray || !productsArray[0])) && (
          <TableRow className="hover:bg-transparent items-center w-full text-lg text-muted-foreground justify-between">
            <TableCell colSpan={6}>No products have been created yet</TableCell>
          </TableRow>
        )}
        {Boolean(productsArray && productsArray.length > 0) &&
          productsArray?.map((data) => {
            return (
              <TableRow className="hover:bg-transparent" key={data.id}>
                <TableCell>
                  <img
                    alt="img"
                    src={data.images?.primaryImageUrl as string | undefined}
                  />
                </TableCell>
                <TableCell className="font-medium md:w-[450px]">
                  {data.productName}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {data.status}
                </TableCell>
                <TableCell className="hidden md:table-cell">{`${
                  data.price?.currency === "INR" ? "₹" : "$"
                }${data.price?.ppu} / unit`}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {data.numberOfItems || 0}
                </TableCell>
                <TableCell className="md:flex-row flex flex-col gap-2">
                  <Button className="" variant="outline">
                    Edit
                  </Button>
                  <Button variant="outline">Delete</Button>
                </TableCell>
              </TableRow>
            );
          })}
      </TableBody>
    </Table>
  );
}

export function TableLoader() {
  return (
    <>
      <TableRow className="hover:bg-transparent">
        <TableCell>
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin " />
        </TableCell>
        <TableCell className="font-medium md:w-[450px]">
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin " />
        </TableCell>
        <TableCell className="hidden md:table-cell">
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin " />
        </TableCell>
        <TableCell className="hidden md:table-cell">
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin " />
        </TableCell>
        <TableCell className="hidden md:table-cell">
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin " />
        </TableCell>
        <TableCell className="md:flex-row flex flex-col gap-2">
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin " />
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin " />
        </TableCell>
      </TableRow>
      <TableRow className="hover:bg-transparent">
        <TableCell>
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin " />
        </TableCell>
        <TableCell className="font-medium md:w-[450px]">
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin " />
        </TableCell>
        <TableCell className="hidden md:table-cell">
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin " />
        </TableCell>
        <TableCell className="hidden md:table-cell">
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin " />
        </TableCell>
        <TableCell className="hidden md:table-cell">
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin " />
        </TableCell>
        <TableCell className="md:flex-row flex flex-col gap-2">
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin " />
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin " />
        </TableCell>
      </TableRow>
    </>
  );
}
