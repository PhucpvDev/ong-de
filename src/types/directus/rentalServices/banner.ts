export interface BannerRentalServicesTranslation {
  id: number;
  banner_homestay_id: number;
  languages_code: string;
  title: string;
  description: string;
  tag: string;
  image: string;
  feature_1: string;
  feature_2: string;
  feature_3: string;
  feature_4: string;
}

export interface BannerRentalServices {
  id: number;
  translations: BannerRentalServicesTranslation[];
}

export interface BannerRentalServicesResponse {
  data: BannerRentalServices[];
}

