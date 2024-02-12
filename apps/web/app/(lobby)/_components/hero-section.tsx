"use client";
import React from "react";
import { SparklesCore } from "@/components/landing-page/hero";
import { ContainerScroll } from "@/components/landing-page/hero-scroll";
import Particles from "@repo/ui/components/particels";
import { LampContainer } from "@/components/landing-page/Lamp";
import { motion } from "framer-motion";
import { Button } from "@repo/ui/components";
import { Github } from "@repo/ui/icons";
import Link from "next/link";

export const HeroSection = () => {
  return (
    <section className="flex flex-col items-center justify-center">
      {/* <HeroParallax products={products} /> */}
      <div className="h-[40rem] w-full bg-background flex flex-col items-center justify-center overflow-hidden rounded-md">
        <h1 className="md:text-5xl text-3xl lg:text-8xl font-bold text-center text-white relative z-20">
          Vision Catalog
        </h1>
        <div className="w-[40rem] h-40 relative">
          {/* Gradients */}
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

          {/* Core component */}
          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={1200}
            className="w-full h-full"
            particleColor="#FFFFFF"
          />

          {/* Radial Gradient to prevent sharp edges */}
          <div className="absolute inset-0 w-full h-full bg-background [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
        </div>
        <Particles
          className="absolute inset-0 -z-10 animate-fade-in"
          quantity={100}
        />
        <Link href={"https://github.com/Binary-Pulse/Vision-Catalog"} target="_blank">
        <button className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
         STAR ON GITHUB <Github className="w-6 h-6 ml-2" />
        </button>
        </Link>
      </div>
      <div className="flex flex-col overflow-hidden">
        <ContainerScroll
          titleComponent={
            <>
              <h1 className="text-4xl font-semibold text-black dark:text-white">
                Headache-Free Application For:
                <br />
                <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                  Sellers
                </span>
              </h1>
            </>
          }
        />
      </div>
      <LampContainer>
        <motion.h1
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
        >
          Get Started in  <br /> 4 Easy Steps
        </motion.h1>
      </LampContainer>
    </section>
  );
};

        
      