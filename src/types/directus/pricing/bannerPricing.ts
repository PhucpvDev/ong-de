export interface BannerPricingTranslation {
  id: number;
  banner_pricing_id: number;
  languages_code: string;
  title: string;
  description: string;
}

export interface BannerPricing {
  id: number;
  translations: BannerPricingTranslation[];
}

export interface BannerPricingResponse {
  data: BannerPricing;
}
