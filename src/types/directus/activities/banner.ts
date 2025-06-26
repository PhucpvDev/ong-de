export interface BannerServiceTranslation {
  id: number;
  bannerService_id: number;
  languages_code: string;
  title: string;
  highlight_title: string;
  description: string;
  features_1: string;
  features_2: string;
  location: string;
  images: string;
}

export interface BannerService {
  id: number;
  translations: BannerServiceTranslation[];
}

export interface BannerServiceResponse {
  data: BannerService;
}