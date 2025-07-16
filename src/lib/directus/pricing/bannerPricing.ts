import axios from "axios";
import { BannerPricingTranslation, BannerPricingResponse } from "@/types/directus/pricing/bannerPricing";

export async function GetBannerPricing(locale: string): Promise<BannerPricingTranslation | undefined> {
  const lang = locale === "vi" ? "vi-VN" : locale === "zh" ? "zh-CN" : locale === "ko" ? "ko-KR" : "en-US";

  try {
    const response = await axios.get<BannerPricingResponse>(
      `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/banner_pricing?lang=${lang}&fields=*,translations.*`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    const { data } = response.data;

    if (!data) {
      throw new Error("No banner pricing data found");
    }

    const translation = data.translations.find((t) => t.languages_code === lang);

    if (!translation) {
      throw new Error(`No translation found for language: ${lang}`);
    }

    return translation;
  } catch (error) {
    console.error("Error fetching banner pricing data:", error);
    return undefined;
  }
}
