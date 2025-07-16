export interface CustomerCareersTranslation {
  id: number;
  customer_careers_id: number;
  languages_code: string;
  name: string;
  position: string;
  testimonial: string;
  image: string | null;
}

export interface CustomerCareers {
  id: number;
  translations: CustomerCareersTranslation[];
}

export interface CustomerCareersResponse {
  data: CustomerCareers[];
}