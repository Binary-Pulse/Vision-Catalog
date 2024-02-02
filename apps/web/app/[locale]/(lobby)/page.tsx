import HeroSection from "@/components/landing-page/hero-section";
import { setStaticParamsLocale } from "next-international/server";
import { getStaticParams } from "@/locales/server";

export function generateStaticParams() {
  return getStaticParams();
}

export default function IndexPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setStaticParamsLocale(locale);
  return (
    <div>
      <HeroSection />
    </div>
  );
}
