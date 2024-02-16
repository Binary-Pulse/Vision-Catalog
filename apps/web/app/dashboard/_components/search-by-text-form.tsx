"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { searchByTextZI } from "@repo/trpc/server/routers/input-zod-schema";
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

export function SearchByTextForm() {
  const { data, isLoading, mutate } =
    trpc.productSearchRouter.searchByText.useMutation();
  const searchByTextForm = useForm<z.infer<typeof searchByTextZI>>({
    resolver: zodResolver(searchByTextZI),
  });
  return (
    <Form {...searchByTextForm}>
      <form
        onSubmit={searchByTextForm.handleSubmit((data) => {
          mutate({ text: data.text });
        })}
        className="w-full space-y-1"
      >
        <Card className="border-none">
          <CardHeader>
            <CardTitle>Search With Text</CardTitle>
            <CardDescription>
              Search Product with Product Name, UPC, SKU, EAN, ISBN.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <FormField
              control={searchByTextForm.control}
              name="text"
              render={({ field }) => <Input {...field} type="text" />}
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
