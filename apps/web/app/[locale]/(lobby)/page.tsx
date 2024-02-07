import HeroSection from "@/components/landing-page/hero-section";
import initTranslations from "@/app/i18n";

export default async function IndexPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const { t } = await initTranslations(locale, ["home"]);

  return (
    <div>
      <h1>{t("hello")}</h1>
      <HeroSection />
    </div>
  );
}
