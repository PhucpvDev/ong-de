import { CustomerCareersTranslation, CustomerCareersResponse } from "@/types/directus/careers/customerCareers";

export async function GetCustomerCareers(locale: string): Promise<CustomerCareersTranslation[] | undefined> {
  const lang = locale === "vi" ? "vi-VN" : locale === "zh" ? "zh-CN" : locale === "ko" ? "ko-KR" : "en-US";

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/customer_careers?lang=${lang}&fields=*,translations.*`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { data }: CustomerCareersResponse = await response.json();

    if (!data || data.length === 0) {
      throw new Error("No customer careers data found");
    }

    const translations = data
      .map((section) => section.translations.find((t) => t.languages_code === lang))
      .filter((translation): translation is CustomerCareersTranslation => !!translation);

    if (translations.length === 0) {
      throw new Error(`No translations found for language: ${lang}`);
    }

    return translations;
  } catch (error) {
    console.error("Error fetching customer careers data:", error);
    return undefined;
  }
}