import { BannerTranslation, BannerResponse } from "@/types/directus/home/banner";

export async function GetBanner(locale: string): Promise<BannerTranslation[] | undefined> {
  const lang = locale === "vi" ? "vi-VN" : locale === "zh" ? "zh-CN" : locale === "ko" ? "ko-KR" : "en-US";

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/banner?lang=${lang}&fields=*,translations.*`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { data }: BannerResponse = await response.json();

    const translations = data.map((banner) => {
      const translation = banner.translations.find((t) => t.languages_code === lang);
      if (!translation) {
        throw new Error(`No translation found for language: ${lang} in banner ID: ${banner.id}`);
      }
      return translation;
    });

    return translations;
  } catch (error) {
    console.error("Error fetching banner data:", error);
    return undefined;
  }
}