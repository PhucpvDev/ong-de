import { BannerPolicyTranslation, BannerPolicy, BannerPolicyResponse } from "@/types/directus/policy/banner_policy";

export async function GetBannerPolicy(locale: string): Promise<BannerPolicyTranslation | undefined> {
  const lang = locale === "vi" ? "vi-VN" : locale === "zh" ? "zh-CN" : locale === "ko" ? "ko-KR" : "en-US";

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/banner_policy?lang=${lang}&fields=*,translations.*`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { data }: BannerPolicyResponse = await response.json();

    const section = data[0]; // Assuming only one banner policy is returned
    if (!section) {
      throw new Error("No banner policy data found");
    }

    const translation = section.translations.find((t) => t.languages_code === lang);
    if (!translation) {
      throw new Error(`No translation found for language: ${lang} in banner policy ID: ${section.id}`);
    }

    return translation;
  } catch (error) {
    console.error("Error fetching banner policy data:", error);
    return undefined;
  }
}

