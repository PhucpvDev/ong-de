import { LandingRentalServicesTranslation, LandingRentalServices, LandingRentalServicesResponse } from "@/types/directus/rentalServices/landingServices";

export async function GetLandingRentalServices(locale: string): Promise<LandingRentalServicesTranslation[] | undefined> {
  const lang = locale === "vi" ? "vi-VN" : locale === "zh" ? "zh-CN" : locale === "ko" ? "ko-KR" : "en-US";

  try {
    if (!process.env.NEXT_PUBLIC_DIRECTUS_URL) {
      throw new Error("Directus URL is not defined");
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/landingRentalServices?lang=${lang}&fields=*,translations.*`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { data }: LandingRentalServicesResponse = await response.json();

    if (!data || !Array.isArray(data)) {
      throw new Error("Invalid API response format");
    }

    const translations = data.map((service) => {
      const translation = service.translations.find((t) => t.languages_code === lang);
      if (!translation) {
        throw new Error(`No translation found for language: ${lang} in rental service ID: ${service.id}`);
      }
      return translation;
    });

    return translations;
  } catch (error) {
    console.error("Error fetching landing rental services data:", error);
    return undefined;
  }
}