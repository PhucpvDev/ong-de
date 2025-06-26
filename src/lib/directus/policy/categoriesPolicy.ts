import { CategoriesPolicy, CategoriesPolicyTranslation, CategoriesPolicyResponse } from "@/types/directus/policy/categoriesPolicy";

export async function GetCategoriesPolicy(locale: string): Promise<CategoriesPolicyTranslation[] | undefined> {
  const lang = locale === "vi" ? "vi-VN" : locale === "zh" ? "zh-CN" : locale === "ko" ? "ko-KR" : "en-US";

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/categories_policy?lang=${lang}&fields=*,translations.*`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { data }: CategoriesPolicyResponse = await response.json();

    const translations = data.map((category) => {
      const translation = category.translations.find((t) => t.languages_code === lang);
      if (!translation) {
        throw new Error(`No translation found for language: ${lang} in category ID: ${category.id}`);
      }
      return translation;
    });

    return translations;
  } catch (error) {
    console.error("Error fetching categories policy data:", error);
    return undefined;
  }
}

