import {
  Dialog,
  DialogContent,
  DialogTrigger,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  TypographyH3,
} from "@repo/ui/components";
import React from "react";
import { SearchByTextForm } from "./search-by-text-form";
import { SearchByImageForm } from "./search-by-image-form";

export function SearchCatalogModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="relative hover:bg-secondary flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
          Similar Product
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        {/*  */}
        <TypographyH3>Search in Vision Catalog</TypographyH3>
        <Tabs defaultValue="text" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="text">Search With Text</TabsTrigger>
            <TabsTrigger value="image">Search With Image</TabsTrigger>
          </TabsList>
          <TabsContent value="text">
            <SearchByTextForm></SearchByTextForm>
          </TabsContent>
          <TabsContent value="image">
            <SearchByImageForm></SearchByImageForm>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
