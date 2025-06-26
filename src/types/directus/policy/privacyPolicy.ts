export interface PrivacyPolicyTranslation {
  id: number;
  privacy_policy_id: number;
  languages_code: string;
  breadcrumb: string;
  content: string;
}

export interface PrivacyPolicy {
  id: number;
  translations: PrivacyPolicyTranslation[];
  categories: {
    id: number;
    privacy_policy_id: number;
    categories_policy_id: number;
  }[];
}

export interface PrivacyPolicyResponse {
  data: PrivacyPolicy[];
}