import { PrivacyPolicyTranslation, PrivacyPolicyResponse } from "@/types/directus/policy/privacyPolicy";

export async function GetPrivacyPolicy(locale: string): Promise<PrivacyPolicyTranslation | undefined> {
  const lang = locale === "vi" ? "vi-VN" : locale === "zh" ? "zh-CN" : locale === "ko" ? "ko-KR" : "en-US";

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/privacy_policy?lang=${lang}&fields=*,categories.*,translations.*`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { data }: PrivacyPolicyResponse = await response.json();

    if (!data || data.length === 0) {
      throw new Error("No privacy policy data found");
    }

    const policy = data[0];
    const translation = policy.translations.find((t) => t.languages_code === lang);
    
    if (!translation) {
      throw new Error(`No translation found for language: ${lang} in privacy policy ID: ${policy.id}`);
    }

    return translation;
  } catch (error) {
    console.error("Error fetching privacy policy data:", error);
    return undefined;
  }
}