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
  useToast,
} from "@repo/ui/components";
import { Icons } from "@repo/ui/icons";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function SearchByTextForm() {
  const { data, isLoading, mutate } =
    trpc.productSearchRouter.searchByText.useMutation();
  const searchByTextForm = useForm<z.infer<typeof searchByTextZI>>({
    resolver: zodResolver(searchByTextZI),
  });
  const { toast } = useToast();

  useEffect(() => {
    if (data) {
      console.log(data);
      if (data.length < 1) {
        toast({
          variant: "default",
          title: "404 NOT FOUND",
          description: "No Similar Products Found.",
        });
      } else {
        toast({
          variant: "success",
          title: "Success",
          description: `Found ${data.length} Similar Products`,
        });
      }
    }
  }, [data]);
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
            <Button className="w-40" disabled={isLoading} type="submit">
              {!isLoading ? (
                "Find Similar Products"
              ) : (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin " />
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}

{
  /* <Button
  onClick={async () => {
    // const a = await textSearchClassCreator();
    // console.log(a);
    // const response = await client.schema
    //   .classDeleter()
    //   .withClassName(SEARCH_BY_TEXT_CLASS)
    //   .do();
  }}
>
  Create Class
</Button> */
}
