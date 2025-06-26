export interface BannerPolicyTranslation {
  id: number;
  banner_policy_id: number;
  languages_code: string;
  images: string;
  title: string;
  highlighted_title: string;
  subtitle: string;
}

export interface BannerPolicy {
  id: number;
  translations: BannerPolicyTranslation[];
}

export interface BannerPolicyResponse {
  data: BannerPolicy[];
}