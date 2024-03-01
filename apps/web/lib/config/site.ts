import { Icons } from "@repo/ui/icons";

type MySocialsProps = {
  title: string;
  href: string;
  external: boolean;
  icon: keyof typeof Icons;
};
export const Company = [
  {
    title: "About",
    href: "/about",
    external: false,
  },
  // {
  //   title: "Privacy policy",
  //   href: "/privacy-policy",
  //   external: false,
  // },
  // {
  //   title: "Terms of service",
  //   href: "/terms",
  //   external: false,
  // },
  {
    title: "Contact",
    href: "/contact",
    external: false,
  },
];
export const mySocials: MySocialsProps[] = [
  // {
  //   title: "Github",
  //   href: "https://github.com/Binary-Pulse/Vision-Catalog",
  //   external: true,
  //   icon: "gitHub",
  // },
  {
    title: "Twitter",
    href: "https://linktr.ee/praashh",
    external: true,
    icon: "twitter",
  },
  {
    title: "Discord",
    href: "https://discord.gg/ZpfCUqGVub",
    external: true,
    icon: "discord",
  },
];
