import {
  Button,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  DialogTrigger,
  DialogContent,
  Dialog,
  TypographyH3,
} from "@repo/ui/components";
import { SearchByTextForm } from "./search-by-text-form";
import { SearchByImageForm } from "./search-by-image-form";

export default function SellerForm() {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="ml-auto" size="sm">
            Add Product
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px]">
          {/*  */}
          <TypographyH3>Search in Vision Catalogue</TypographyH3>
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
    </>
  );
}
