"use client";

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Form,
  FormField,
  DialogTrigger,
  DialogContent,
  Dialog,
  TypographyH3,
  FormDescription,
} from "@repo/ui/components";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const dummy = z.object({
  product: z.string(),
  description: z.string(),
});

type dummyType = z.infer<typeof dummy>;
export default function SellerForm() {
  const sellerForm = useForm<dummyType>({
    resolver: zodResolver(dummy),
  });
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
              <Card className="border-none">
                <CardHeader>
                  <CardTitle>Search With Text</CardTitle>
                  <CardDescription>
                    Search Product with Product Name, UPC, SKU, EAN, ISBN.
                  </CardDescription>
                </CardHeader>
                <Form {...sellerForm}>
                  <form
                    onSubmit={sellerForm.handleSubmit((data) => {})}
                    className="w-full space-y-1"
                  >
                    <CardContent className="space-y-2">
                      <FormField
                        control={sellerForm.control}
                        name="product"
                        render={({ field }) => <Input {...field} type="text" />}
                      />
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button>Find Similar Products</Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            className="text-blue-500 text-base font-light"
                          >
                            Add Unlisted Product{" "}
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px]">
                          {/*  */}
                          <AutoPopuByImg></AutoPopuByImg>
                        </DialogContent>
                      </Dialog>
                    </CardFooter>
                  </form>
                </Form>
              </Card>
            </TabsContent>
            <TabsContent value="image">
              <Card className="border-none">
                <CardHeader>
                  <CardTitle>Search With Image</CardTitle>
                  <CardDescription>
                    Upload Product Image for Searching the Product.
                  </CardDescription>
                </CardHeader>
                <Form {...sellerForm}>
                  <form
                    onSubmit={sellerForm.handleSubmit((data) => {})}
                    className="w-full space-y-1"
                  >
                    <CardContent className="space-y-2 ">
                      <FormField
                        control={sellerForm.control}
                        name="product"
                        render={({ field }) => <Input {...field} type="file" />}
                      />
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button>Find Similar Products</Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            className="text-blue-500 text-base font-light"
                          >
                            Add Unlisted Product{" "}
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px]">
                          {/*  */}
                          <AutoPopuByImg></AutoPopuByImg>
                        </DialogContent>
                      </Dialog>
                    </CardFooter>
                  </form>
                </Form>
              </Card>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  );
}

function AutoPopuByImg() {
  const sellerForm = useForm<dummyType>({
    resolver: zodResolver(dummy),
  });
  return (
    <div className="mt-4 space-y-8">
      <div className="space-y-2">
        <TypographyH3>Auto Populate with Image</TypographyH3>
        <FormDescription>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo,
          tenetur.
        </FormDescription>
      </div>
      <Form {...sellerForm}>
        <form
          onSubmit={sellerForm.handleSubmit((data) => {})}
          className="w-full space-y-5 "
        >
          <FormField
            control={sellerForm.control}
            name="product"
            render={({ field }) => <Input {...field} type="file" />}
          />
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or
              </span>
            </div>
          </div>
          <FormField
            control={sellerForm.control}
            name="product"
            render={({ field }) => (
              <Input {...field} type="text" placeholder="Paste Image URL" />
            )}
          />
          <Button className="w-full ">Auto Populate Form</Button>
        </form>
      </Form>
    </div>
  );
}
