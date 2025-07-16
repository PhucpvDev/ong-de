import { BenefitsWelfareTranslation, BenefitsWelfareResponse } from "@/types/directus/careers/benefitsWelfare";

export async function GetBenefitsWelfare(locale: string): Promise<BenefitsWelfareTranslation[] | undefined> {
  const lang = locale === "vi" ? "vi-VN" : locale === "zh" ? "zh-CN" : locale === "ko" ? "ko-KR" : "en-US";

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/benefits_welfare?lang=${lang}&fields=*,translations.*`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { data }: BenefitsWelfareResponse = await response.json();

    if (!data || data.length === 0) {
      throw new Error("No benefits welfare data found");
    }

    const translations = data
      .map((section) => section.translations.find((t) => t.languages_code === lang))
      .filter((translation): translation is BenefitsWelfareTranslation => !!translation);

    if (translations.length === 0) {
      throw new Error(`No translations found for language: ${lang}`);
    }

    return translations;
  } catch (error) {
    console.error("Error fetching benefits welfare data:", error);
    return undefined;
  }
}