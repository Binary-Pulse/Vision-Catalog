"use client";
import React from "react";
import { SparklesCore } from "@/components/landing-page/hero";
import { ContainerScroll } from "@/components/landing-page/hero-scroll";
import Particles from "@repo/ui/components/particels";
import { LampContainer } from "@/components/landing-page/Lamp";
import { motion } from "framer-motion";

import {
  ArrowLeft,
  ArrowUpNarrowWide,
  Github,
  Icons,
  Star,
} from "@repo/ui/icons";
import Link from "next/link";
import { TextGenerateEffect } from "@/components/landing-page/text-generate-effect";
import { MacbookScroll } from "@/components/layout/mac-book-scroll";

export const HeroSection = () => {
  return (
    // <section className="flex flex-col items-center justify-center">
    //   {/* <HeroParallax products={products} /> */}
    //   <Particles
    //     className="absolute inset-0 -z-10 animate-fade-in"
    //     quantity={100}
    //   />
    //   <div className="h-[40rem] w-full bg-background flex flex-col items-center justify-center overflow-hidden rounded-md">
        
    //     <h1 className="md:text-5xl text-3xl lg:text-8xl font-bold text-center text-white relative z-20">
    //       Vision Catalog
    //     </h1>
    //     <div className="w-[40rem] h-40 relative">
    //       {/* Gradients */}
    //       <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
    //       <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
    //       <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
    //       <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

    //       {/* Core component */}
    //       <SparklesCore
    //         background="transparent"
    //         minSize={0.4}
    //         maxSize={1}
    //         particleDensity={1200}
    //         className="w-full h-full"
    //         particleColor="#FFFFFF"
    //       />

    //       {/* Radial Gradient to prevent sharp edges */}
    //       <div className="absolute inset-0 w-full h-full bg-background [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
    //     </div>
    //     <div className="flex items-center justify-between w-1/4">
    //     <Link
    //       href={"https://github.com/Binary-Pulse/Vision-Catalog"}
    //       target="_blank"
    //     >
    //       <button className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block">
    //         <span className="absolute inset-0 overflow-hidden rounded-full">
    //           <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    //         </span>
    //         <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 p-4 ring-1 ring-white/10 ">
    //           <span className="text-lg -mr-2">Start For Free</span>
    //           <svg
    //             fill="none"
    //             height="22"
    //             viewBox="0 0 24 24"
    //             width="22"
    //             xmlns="http://www.w3.org/2000/svg"
    //           >
    //             <path
    //               d="M10.75 8.75L14.25 12L10.75 15.25"
    //               stroke="currentColor"
    //               strokeLinecap="round"
    //               strokeLinejoin="round"
    //               strokeWidth="1.5"
    //             />
    //           </svg>
    //         </div>
    //         <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
    //       </button>
    //     </Link>
    //     <Link
    //       href={"https://github.com/Binary-Pulse/Vision-Catalog"}
    //       target="_blank"
    //     >
    //       <button className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
    //         STAR ON GITHUB <Github className="w-6 h-6 ml-2" />
    //       </button>
    //     </Link>
    //     </div>
    //   </div>
    //   {/* <TextGenerateEffect words="A Catalog Digitization Application, Headache-Free Application." /> */}
    //   <div className="flex flex-col overflow-hidden">
    //     <ContainerScroll />
    //   </div>
    //   <LampContainer>
    //     <motion.h1
    //       initial={{ opacity: 0.5, y: 100 }}
    //       whileInView={{ opacity: 1, y: 0 }}
    //       transition={{
    //         delay: 0.3,
    //         duration: 0.8,
    //         ease: "easeInOut",
    //       }}
    //       className="mt-8 bg-gradient-to-br from-cyan-300 to-[#10395D] py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
    //     >
    //       Get Started in <br /> 4 Easy Steps
    //     </motion.h1>
    //   </LampContainer>
    // </section>
    <>
      <MacbookScroll />
    </>
  );
};
