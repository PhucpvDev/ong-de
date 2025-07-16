export interface BenefitsWelfareTranslation {
  id: number;
  benefits_welfare_id: number;
  languages_code: string;
  title: string;
  description: string;
  image_icon: string;
}

export interface BenefitsWelfare {
  id: number;
  translations: BenefitsWelfareTranslation[];
}

export interface BenefitsWelfareResponse {
  data: BenefitsWelfare[];
}