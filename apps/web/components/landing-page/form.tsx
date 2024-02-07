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
  Label,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Form,
  FormField,
  DialogTrigger,
  DialogContent,
  Dialog,
} from "@repo/ui/components";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";

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
          <Tabs defaultValue="account" className="w-[500px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="account">Search With Text</TabsTrigger>
              <TabsTrigger value="password">Search With Image</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>Search With Text</CardTitle>
                  <CardDescription>
                    Search Product with Product Name, UPC, SKU, EAN, ISBN.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="product name"></Label>
                    <Input id="product-name" defaultValue="ToothPaste" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="password">
              <Card>
                <CardHeader>
                  <CardTitle>Search With Image</CardTitle>
                  <CardDescription>
                    Upload Product Image for Searching the Product.
                  </CardDescription>{" "}
                </CardHeader>
                <CardContent className="space-y-2">
                  <Form {...sellerForm}>
                    <form
                      onSubmit={sellerForm.handleSubmit((data) => {})}
                      className="w-full space-y-3"
                    >
                      <FormField
                        control={sellerForm.control}
                        name="product"
                        render={({ field }) => <Input {...field} type="file" />}
                      />
                    </form>
                  </Form>
                </CardContent>
                <CardFooter>
                  <Button>Save changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  );
}
