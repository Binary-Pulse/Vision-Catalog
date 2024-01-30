"use client";

import * as React from "react";
// import { menComponents,kidComponents, womenComponents, accessoriesComponent } from "@/config/products";

import Link from "next/link";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@repo/ui/components";
import { cn } from "@repo/ui/cn";
import { Icons } from "@repo/ui/icons";

export function MainNav() {
  return (
    <div className="hidden gap-6 lg:flex">
      <a
        aria-label="Home"
        href="/"
        className="hidden items-center space-x-2 lg:flex"
      >
        <Icons.chevronsRight className="h-6 w-6" aria-hidden="true" />
        <span className="hidden font-bold lg:inline-block text-orange-500 text-xl">Build </span>
        <span className="hidden font-bold lg:inline-block text-white text-xl">For </span>
        <span className="hidden font-bold lg:inline-block text-green-500 text-xl">Bharat </span>
      </a>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Languages</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
            
                <ListItem href="/hindi" title="हिन्दी">
                  हिंदी के साथ जारी रखें
                </ListItem>
                <ListItem href="/English" title="English">
                  Continue With English.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
          <Link href="/computers" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Computers
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
