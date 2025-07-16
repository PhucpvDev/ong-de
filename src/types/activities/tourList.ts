export interface PriceType {
  id: number;
  name: string;
  description: string;
}

export interface BasePrice {
  price: number;
  price_type: PriceType;
}

export interface Activity {
  id: number;
  name: string;
  slug: string;
  short_description: string;
  long_description: string;
  main_image: string;
  images: string[];
  conditions: string;
  location_area: string;
  min_participants: number;
  max_participants: number;
  base_prices: BasePrice[];
  capacity_prices: any[];
  segment_prices: any[];
  policies: any[];
}

export interface Tour {
  id: string;
  image: string;
  title: string;
  tag?: string;
  price: number;
  slug: string;
}