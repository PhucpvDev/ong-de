export interface CategoriesPolicyTranslation {
  id: number;
  categories_policy_id: number;
  languages_code: string;
  name: string;
}

export interface CategoriesPolicy {
  id: number;
  parent: number | null;
  translations: CategoriesPolicyTranslation[];
}

export interface CategoriesPolicyResponse {
  data: CategoriesPolicy[];
}