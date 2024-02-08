import initTranslations from "@/i18n";
import { HeroSection } from "../../(lobby)/_components/hero-section";

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
