export interface PricingContactTranslation {
  id: number;
  pricing_contact_id: number;
  languages_code: string;
  title: string;
  description: string;
  image_icon: string;
}

export interface PricingContact {
  id: number;
  translations: PricingContactTranslation[];
}

export interface PricingContactResponse {
  data: PricingContact[];
}