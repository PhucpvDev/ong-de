import { LandingTicketsTranslation, LandingTicketsResponse } from "@/types/directus/tickets/landingTickets";

export async function GetLandingTickets(locale: string): Promise<LandingTicketsTranslation[] | undefined> {
 const lang = locale === "vi" ? "vi-VN" : locale === "zh" ? "zh-CN" : locale === "ko" ? "ko-KR" : "en-US";
 
  try {
    if (!process.env.NEXT_PUBLIC_DIRECTUS_URL) {
      throw new Error("Directus URL is not defined");
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/landingTickets?lang=${lang}&fields=*,translations.*`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { data }: LandingTicketsResponse = await response.json();

    if (!data || !Array.isArray(data)) {
      throw new Error("Invalid API response format");
    }

    const translations = data.map((ticket) => {
      const translation = ticket.translations.find((t) => t.languages_code === lang);
      if (!translation) {
        throw new Error(`No translation found for language: ${lang} in ticket ID: ${ticket.id}`);
      }
      return translation;
    });

    return translations;
  } catch (error) {
    console.error("Error fetching landing tickets data:", error);
    return undefined;
  }
}