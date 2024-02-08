import React from "react";
import Link from "next/link";
import { Button } from "@repo/ui/components";
import { Icons } from "@repo/ui/icons";
import { cn } from "@repo/ui/cn";
import Script from "next/script";

export const HeroSection = () => {
  return (
    <section className="flex items-center justify-center">
      <div className="flex max-w-[64rem] flex-col items-center gap-5 pt-20 text-center">
        Landing Page
      </div>
    </section>
  );
};

// <div className="grid gap-6 items-center">
//   <div className="flex flex-col justify-center space-y-8 text-center">
//     <div className="space-y-2">
//       {/* todo: use taiwind variables instead fo hard coded colors */}
//       <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl md:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
//         Digitization of Catalogs for Sellers
//       </h1>
//       <p className="max-w-[600px] text-muted-foreground mx-auto ">
//         Headache-Free Application for Sellers: Embracing the Automated
//         Filled Details of Seller's Product.
//       </p>
//     </div>
//     <div className="w-full max-w-full space-y-4 mx-auto">
//       <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-8">
//         <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
//           <div className="p-2 bg-background  bg-opacity-50 rounded-full">
//             <Icons.billing />
//           </div>
//           <h2 className="text-base md:text-xl font-bold text-white">
//             Modern Catalogs
//           </h2>
//           <p className="text-sm md:text-base text-muted-foreground">
//             Seamless start with minimal setup for Turborepo powered with
//             Prisma, TRPC, Next.js, App Router, easy server-side
//             rendering, and Shadcn UI.
//           </p>
//         </div>
//         <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
//           <div className="p-2 bg-background  bg-opacity-50 rounded-full">
//             <Icons.check />
//           </div>
//           <h2 className="text-base md:text-xl font-bold text-white">
//             Type Safety & Auto-completion
//           </h2>
//           <p className="text-sm md:text-base text-muted-foreground">
//             {`Type safe development, streamlined workflow via TurboRepo,
//             and TypeScript's and TRPC and Zod for extreme type safety
//             assurance.`}
//             {/* ' is not allowed by eslint */}
//           </p>
//         </div>
//         <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
//           <div className="p-2 bg-background  bg-opacity-50 rounded-full">
//             <Icons.wallet />
//           </div>
//           <h2 className="text-base md:text-xl font-bold text-white">
//             Scalable & Secure Web Apps
//           </h2>
//           <p className="text-sm md:text-base text-muted-foreground">
//             Building secure, scalable web apps with modern tech, like
//             TypeScript, Zod, TRPC, ensuring reliability and performance.
//           </p>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>
// <div className="flex justify-center mt-8">
//   <Button asChild size={"lg"} className="text-xl" variant={"default"}>
//     <Link href={"/create"}>Start Creating, its free</Link>
//   </Button>
// </div>
