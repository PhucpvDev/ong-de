export interface BusinessTabsTranslation {
  id: number;
  business_tabs_id: number;
  languages_code: string;
  label: string;
  icon: string;
  image: string;
  description_1: string;
  description_2: string;
  description_3: string;
}

export interface BusinessTabs {
  id: number;
  translations: BusinessTabsTranslation[];
}

export interface BusinessTabsResponse {
  data: BusinessTabs[];
}