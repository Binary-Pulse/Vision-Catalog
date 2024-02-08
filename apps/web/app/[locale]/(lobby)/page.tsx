import { HeroSection } from "./_components/hero-section";
import initTranslations from "@/i18n";

export default async function IndexPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const { t } = await initTranslations(locale, ["IndexPage"]);

  return (
    <div>
      <HeroSection />
    </div>
  );
}
