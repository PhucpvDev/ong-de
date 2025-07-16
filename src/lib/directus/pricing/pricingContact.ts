import axios from "axios";
import { PricingContactTranslation, PricingContactResponse } from "@/types/directus/pricing/pricingContact";

export async function GetPricingContact(locale: string): Promise<PricingContactTranslation[] | undefined> {
  const lang = locale === "vi" ? "vi-VN" : locale === "zh" ? "zh-CN" : locale === "ko" ? "ko-KR" : "en-US";

  try {
    const response = await axios.get<PricingContactResponse>(
      `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/pricing_contact?lang=${lang}&fields=*,translations.*`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    const { data } = response.data;

    if (!data || data.length === 0) {
      throw new Error("No pricing contact data found");
    }

    const translations = data
      .map((section) => section.translations.find((t) => t.languages_code === lang))
      .filter((translation): translation is PricingContactTranslation => !!translation);

    if (translations.length === 0) {
      throw new Error(`No translations found for language: ${lang}`);
    }

    return translations;
  } catch (error) {
    console.error("Error fetching pricing contact data:", error);
    return undefined;
  }
}