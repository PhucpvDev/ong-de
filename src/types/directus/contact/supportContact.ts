export interface SupportContactTranslation {
  id: number;
  support_contact_id: number;
  languages_code: string;
  title: string;
  description: string;
  bg_color: string;
  icon_bg_color: string;
  icon: string;
}

export interface SupportContact {
  id: number;
  translations: SupportContactTranslation[];
}

export interface SupportContactResponse {
  data: SupportContact[];
}