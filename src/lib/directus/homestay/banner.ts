import { BannerHomestayTranslation, BannerHomestayResponse } from "@/types/directus/homestay/banner";

export async function GetBannerHomestay(locale: string): Promise<BannerHomestayTranslation[] | undefined> {
  const lang = locale === "vi" ? "vi-VN" : locale === "zh" ? "zh-CN" : locale === "ko" ? "ko-KR" : "en-US";

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/banner_homestay?lang=${lang}&fields=*,translations.*`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { data }: BannerHomestayResponse = await response.json();

    if (!data || data.length === 0) {
      throw new Error("No banner homestay data found");
    }

    const translations = data
      .map((section) => section.translations.find((t) => t.languages_code === lang))
      .filter((translation): translation is BannerHomestayTranslation => !!translation);

    if (translations.length === 0) {
      throw new Error(`No translations found for language: ${lang}`);
    }

    return translations;
  } catch (error) {
    console.error("Error fetching banner homestay data:", error);
    return undefined;
  }
}