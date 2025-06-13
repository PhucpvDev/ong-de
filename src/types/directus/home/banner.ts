export interface BannerTranslation {
  id: number;
  banner_id: number;
  languages_code: string;
  title: string;
  subtitle: string;
  description: string;
  features_1: string;
  features_2: string;
  features_3: string;
  features_4: string;
  images: string;
}

export interface Banner {
  id: number;
  translations: BannerTranslation[];
}

export interface BannerResponse {
  data: Banner[];
}