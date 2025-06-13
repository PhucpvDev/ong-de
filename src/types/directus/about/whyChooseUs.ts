export interface WhyChooseUsTranslation {
  id: number;
  whyChooseUs_id: number;
  languages_code: string;
  title: string;
  description: string;
  features: string[];
  illustration: {
    title: string;
    stats: { label: string; value: number }[];
    mainStat: string;
    mainLabel: string;
    chartData: { percentage: number; label: string };
  };
}

export interface WhyChooseUs {
  id: number;
  translations: WhyChooseUsTranslation[];
}

export interface WhyChooseUsResponse {
  data: WhyChooseUs[];
}