import { BannerServiceTranslation, BannerServiceResponse } from "@/types/directus/services/banner";

export async function GetBannerService(locale: string): Promise<BannerServiceTranslation | undefined> {
  const lang = locale === "vi" ? "vi-VN" : locale === "zh" ? "zh-CN" : locale === "ko" ? "ko-KR" : "en-US";

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/bannerService?lang=${lang}&fields=*,translations.*`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { data }: BannerServiceResponse = await response.json();

    const translation = data.translations.find((t) => t.languages_code === lang);
    if (!translation) {
      throw new Error(`No translation found for language: ${lang} in bannerService ID: ${data.id}`);
    }

    return translation;
  } catch (error) {
    console.error("Error fetching banner service data:", error);
    return undefined;
  }
}
