"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { searchByImageZI } from "@repo/trpc/server/routers/input-zod-schema";
import { trpc } from "@repo/trpc/trpc/client";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Form,
  FormField,
  Input,
} from "@repo/ui/components";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function SearchByImageForm() {
  const { data, isLoading, mutate } =
    trpc.productSearchRouter.searchByImage.useMutation();
  const searchByImageForm = useForm<z.infer<typeof searchByImageZI>>({
    resolver: zodResolver(searchByImageZI),
  });
  return (
    <Form {...searchByImageForm}>
      <form
        onSubmit={searchByImageForm.handleSubmit((data) => {
          mutate({ imageURL: data.imageURL });
        })}
        className="w-full space-y-1"
      >
        <Card className="border-none">
          <CardHeader>
            <CardTitle>Search With Image</CardTitle>
            <CardDescription>
              Upload Product Image for Searching the Product.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 ">
            <FormField
              control={searchByImageForm.control}
              name="imageURL"
              render={({ field }) => <Input {...field} type="url" />}
            />
          </CardContent>
          <CardFooter>
            <Button>Find Similar Products</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
