"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { addProductZI } from "@repo/trpc/server/routers/input-zod-schema";
import { trpc } from "@repo/trpc/trpc/client";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
  useToast,
} from "@repo/ui/components";
import { Icons } from "@repo/ui/icons";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
const zodSchema = addProductZI.omit({ productVitalInfo: true });
export default function AddProductModalForm() {
  const { toast } = useToast();
  const { data, mutate, isLoading, error } =
    trpc.productRouter.addProduct.useMutation();
  const addProductForm = useForm<z.infer<typeof zodSchema>>({
    resolver: zodResolver(addProductZI),
  });
  const { data: brandList, isLoading: brandListLoading } =
    trpc.productRouter.getBrandList.useQuery();
  const { data: categoryList, isLoading: categoryListLoading } =
    trpc.productRouter.getCategoryList.useQuery();
  useEffect(() => {
    if (data) {
      console.log(data);
      toast({ variant: "success", title: "Success", description: data.msg });
    } else if (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Product Not Created",
        description: error?.message,
      });
    }
  }, [data]);

  return (
    // <FormProvider {...addProductForm}>
    <Form {...addProductForm}>
      <form
        onSubmit={addProductForm.handleSubmit((data) => {
          console.log(data);
          mutate({
            brandName: data.brandName,
            categoryName: data.categoryName,
            currency: data.currency,
            pricePerUnit: data.pricePerUnit,
            primaryImageUrl: data.primaryImageUrl,
            productName: data.productName,
          });
        })}
        className="w-full space-y-6"
      >
        <FormField
          control={addProductForm.control}
          name="productName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">Product Name</FormLabel>
              <FormControl>
                <Textarea
                  required
                  className="h-min "
                  placeholder='Lenovo IdeaPad 3 11th Gen Intel Core i3 15.6" FHD Thin & Light Laptop(8GB/512GB SSD/Windows 11/Office 2021/2Yr Warranty/3months Xbox Game Pass/Platinum Grey/1.7Kg), 81X800N2IN'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between items-center">
          <FormField
            control={addProductForm.control}
            name="brandName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Select Brand</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  required
                  {...field}
                >
                  <FormControl>
                    <SelectTrigger className="w-[250px]">
                      <SelectValue placeholder="Select your Brand" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {brandListLoading || !brandList ? (
                      <Icons.spinner className="mr-2 h-4 w-4 animate-spin " />
                    ) : (
                      brandList.map((brand) => {
                        return (
                          <SelectItem key={brand.id} value={brand.name}>
                            {brand.name}
                          </SelectItem>
                        );
                      })
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={addProductForm.control}
            name="categoryName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Select Category</FormLabel>
                <Select
                  required
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-[250px]">
                      <SelectValue placeholder="Select your Category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categoryListLoading ? (
                      <Icons.spinner className="mr-2 h-4 w-4 animate-spin " />
                    ) : (
                      categoryList?.map((category) => {
                        return (
                          <SelectItem key={category.id} value={category.name}>
                            {category.name}
                          </SelectItem>
                        );
                      })
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-between items-center">
          <FormField
            control={addProductForm.control}
            name="currency"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Select Currency</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  required
                  {...field}
                >
                  <FormControl>
                    <SelectTrigger className="w-[250px]">
                      <SelectValue placeholder="Select your Currency" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="INR">INR</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={addProductForm.control}
            name="pricePerUnit"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Selling Price</FormLabel>
                <FormControl>
                  <Input
                    required
                    className="w-[250px]"
                    type="number"
                    step="0.01"
                    {...field}
                    {...addProductForm.register("pricePerUnit", {
                      valueAsNumber: true,
                    })}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={addProductForm.control}
          name="primaryImageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">Primary Image URL</FormLabel>
              <FormControl>
                <Input required type="url" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full" disabled={isLoading} type="submit">
          {!isLoading ? (
            "Add "
          ) : (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin " />
          )}
        </Button>
      </form>
    </Form>
  );
}
