export interface BannerSupportTranslation {
  id: number;
  banner_support_id: number;
  languages_code: string;
  title: string;
  description: string;
}

export interface BannerSupport {
  id: number;
  translations: BannerSupportTranslation[];
}

export interface BannerSupportResponse {
  data: BannerSupport[];
}