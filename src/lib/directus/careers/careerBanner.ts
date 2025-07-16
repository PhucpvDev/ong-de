import { CareersBannerTranslation, CareersBannerResponse } from "@/types/directus/careers/careerBanner";

export async function GetCareersBanner(locale: string): Promise<CareersBannerTranslation | undefined> {
  const lang = locale === "vi" ? "vi-VN" : locale === "zh" ? "zh-CN" : locale === "ko" ? "ko-KR" : "en-US";

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/careers_banner?lang=${lang}&fields=*,translations.*`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { data }: CareersBannerResponse = await response.json();

    if (!data || data.length === 0) {
      throw new Error("No careers banner data found");
    }

    const translation = data[0].translations.find((t) => t.languages_code === lang);

    if (!translation) {
      throw new Error(`No translation found for language: ${lang}`);
    }

    return translation;
  } catch (error) {
    console.error("Error fetching careers banner data:", error);
    return undefined;
  }
}