"use client";
import { signOut } from "@repo/auth/react";
import { Button } from "@repo/ui/components";
import { Icons } from "@repo/ui/icons";
import React, { useState } from "react";

export function LogOutButton() {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Button
      disabled={isLoading}
      onClick={async () => {
        setIsLoading(true);
        await signOut({ redirect: true, callbackUrl: "/" });
      }}
    >
      {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
      <Icons.logout className="h-4 w-4 mr-2" />
      Logout
    </Button>
  );
}
