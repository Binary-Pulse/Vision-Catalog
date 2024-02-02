import type { PropsWithChildren } from "react";
import React from "react";
import { ProfileHeader } from "@/components/layout/profile-header";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { VoiceInput } from "@/components/layout/VoiceInput";

export default function LobbyLayout({ children }: PropsWithChildren) {
  return (
    <div className="index min-h-screen flex flex-col justify-between items-center">
      <SiteHeader>
        <ProfileHeader />
        <VoiceInput />
      </SiteHeader>
      <main className="">{children}</main>
      <SiteFooter></SiteFooter>
    </div>
  );
}
