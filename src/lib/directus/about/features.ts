import { FeatureTranslation, FeatureResponse } from "@/types/directus/about/features";

export async function GetFeatures(locale: string): Promise<FeatureTranslation[] | undefined> {
  const lang = locale === "vi" ? "vi-VN" : locale === "zh" ? "zh-CN" : locale === "ko" ? "ko-KR" : "en-US";

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/features?lang=${lang}&fields=*,translations.*`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { data }: FeatureResponse = await response.json();

    const translations = data.map((feature) => {
      const translation = feature.translations.find((t) => t.languages_code === lang);
      if (!translation) {
        throw new Error(`No translation found for language: ${lang} in feature ID: ${feature.id}`);
      }
      return translation;
    });

    return translations;
  } catch (error) {
    console.error("Error fetching features data:", error);
    return undefined;
  }
}
