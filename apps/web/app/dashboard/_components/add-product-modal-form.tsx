"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { addProductZI } from "@repo/trpc/server/routers/input-zod-schema";
import { trpc } from "@repo/trpc/trpc/client";
import {
  Button,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from "@repo/ui/components";
import { Icons } from "@repo/ui/icons";
import React from "react";
import { Form, FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
const zodSchema = addProductZI.omit({ productVitalInfo: true });
export default function AddProductModalForm() {
  const { data, mutate, isLoading } =
    trpc.productRouter.addProduct.useMutation();
  const addProductForm = useForm<z.infer<typeof zodSchema>>({
    resolver: zodResolver(addProductZI),
  });
  return (
    <FormProvider {...addProductForm}>
      <Form {...addProductForm}>
        <form
          onSubmit={addProductForm.handleSubmit((data) => {})}
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
                    className="h-min "
                    placeholder="Nuskhe by Paras Ayurvedic Pigmentation Papaya Anti Blemish Cream."
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
                  <FormControl>
                    <Select>
                      <SelectTrigger className="w-[250px]">
                        <SelectValue placeholder="Select your Brand" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="est">
                          Eastern Standard Time (EST)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
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
                  <FormControl>
                    <Select>
                      <SelectTrigger className="w-[250px]">
                        <SelectValue placeholder="Select your Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="est">
                          Eastern Standard Time (EST)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button className="w-full" disabled={isLoading} type="submit">
            {!isLoading ? (
              "Add "
            ) : (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin " />
            )}
          </Button>
        </form>
      </Form>
    </FormProvider>
  );
}
