"use client";
import { useMounted } from "@/lib/hooks/use-mounted";
import { signOut } from "@repo/auth/react";
import { Icons } from "@repo/ui/icons";
import React, { useState } from "react";

export function LogOutButton() {
  const isMounted = useMounted();
  const [isLoading, setIsLoading] = useState(false);
  if (!isMounted) {
    return null;
  }
  return (
    <div
      className="cursor-pointer"
      onClick={async () => {
        setIsLoading(true);
        await signOut();
      }}
    >
      {isLoading ? (
        <div className="items-center w-full flex justify-center my-2">
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin " />
        </div>
      ) : (
        <div className="flex m-2 items-center">
          <Icons.logout className="h-4 w-4 mr-2" />
          Logout
        </div>
      )}
    </div>
  );
}
