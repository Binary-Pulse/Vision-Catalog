import React from "react";
import Link from "next/link";
import { authOptions, getServerSession } from "@repo/auth/server";
import { buttonVariants } from "@repo/ui/components";
import { UserProfileDropdown } from "./user-profile-dropdown";
import { LogIn } from "@repo/ui/icons";

export const ProfileHeader = async () => {
  const data = await getServerSession(authOptions);
  const user = data?.user;
  const initials = `${user?.name?.charAt(0) ?? ""}`;
  return (
    <>
      {user ? (
        <>
          <Link href={"/dashboard"}>
            <div
              className={buttonVariants({
                size: "sm",
                variant: "outline",
              })}
            >
              Go to Dashboard
            </div>
          </Link>
          <UserProfileDropdown
            data={data}
            initials={initials}
          ></UserProfileDropdown>
        </>
      ) : (
        <Link href={"/sign-in"}>
          <div
            className={buttonVariants({
              size: "sm",
            })}
          >
            Sign In <LogIn />
            <span className="sr-only">Sign In</span>
          </div>
        </Link>
      )}
    </>
  );
};
