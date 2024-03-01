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
  useToast,
} from "@repo/ui/components";
import { Icons } from "@repo/ui/icons";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function SearchByImageForm() {
  const { data, isLoading, mutate } =
    trpc.productSearchRouter.searchByImage.useMutation();
  const searchByImageForm = useForm<z.infer<typeof searchByImageZI>>({
    resolver: zodResolver(searchByImageZI),
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
    // const a = await imageSearchClassCreator();
    // console.log(a);
    // const response = await client.schema
    //   .classDeleter()
    //   .withClassName(SEARCH_BY_IMAGE_CLASS)
    //   .do();
  }}
>
  Create Class
</Button> */
}
