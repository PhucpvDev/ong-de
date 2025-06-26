import { BannerAboutTranslation, BannerAbout, BannerAboutResponse } from "@/types/directus/about/banner_about";

export async function GetBannerAbout(locale: string): Promise<BannerAboutTranslation | undefined> {
  const lang = locale === "vi" ? "vi-VN" : locale === "zh" ? "zh-CN" : locale === "ko" ? "ko-KR" : "en-US";

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/banner_about?lang=${lang}&fields=*,translations.*`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { data }: BannerAboutResponse = await response.json();

    const section = data[0]; // Assuming only one banner is returned
    if (!section) {
      throw new Error("No banner data found");
    }

    const translation = section.translations.find((t) => t.languages_code === lang);
    if (!translation) {
      throw new Error(`No translation found for language: ${lang} in banner ID: ${section.id}`);
    }

    return translation;
  } catch (error) {
    console.error("Error fetching banner about data:", error);
    return undefined;
  }
}

