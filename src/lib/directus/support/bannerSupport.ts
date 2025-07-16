import axios from "axios";
import { BannerSupportTranslation, BannerSupportResponse } from "@/types/directus/support/bannerSupport";

export async function GetBannerSupport(locale: string): Promise<BannerSupportTranslation | undefined> {
  const lang = locale === "vi" ? "vi-VN" : locale === "zh" ? "zh-CN" : locale === "ko" ? "ko-KR" : "en-US";

  try {
    const response = await axios.get<BannerSupportResponse>(
      `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/banner_support?lang=${lang}&fields=*,translations.*`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    const { data } = response.data;

    if (!data || data.length === 0) {
      throw new Error("No banner support data found");
    }

    const translation = data[0].translations.find((t) => t.languages_code === lang);

    if (!translation) {
      throw new Error(`No translation found for language: ${lang}`);
    }

    return translation;
  } catch (error) {
    console.error("Error fetching banner support data:", error);
    return undefined;
  }
}