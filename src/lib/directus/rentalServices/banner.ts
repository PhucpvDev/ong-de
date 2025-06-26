import { BannerRentalServicesTranslation, BannerRentalServicesResponse } from "@/types/directus/rentalServices/banner";

export async function GetBannerRentalServices(locale: string): Promise<BannerRentalServicesTranslation[] | undefined> {
  const lang = locale === "vi" ? "vi-VN" : locale === "zh" ? "zh-CN" : locale === "ko" ? "ko-KR" : "en-US";

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/bannerRentalServices?lang=${lang}&fields=*,translations.*`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { data }: BannerRentalServicesResponse = await response.json();

    if (!data || data.length === 0) {
      throw new Error("No banner rental services data found");
    }

    const translations = data
      .map((section) => section.translations.find((t) => t.languages_code === lang))
      .filter((translation): translation is BannerRentalServicesTranslation => !!translation);

    if (translations.length === 0) {
      throw new Error(`No translations found for language: ${lang}`);
    }

    return translations;
  } catch (error) {
    console.error("Error fetching banner rental services data:", error);
    return undefined;
  }
}