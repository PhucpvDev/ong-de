export interface PackageBannerTranslation {
  id: number;
  packageBanner_id: number;
  languages_code: string;
  title: string;
  description: string;
  features: string;
  images: string;
}

export interface PackageBanner {
  id: number;
  translations: PackageBannerTranslation[];
}

export interface PackageBannerResponse {
  data: PackageBanner;
}