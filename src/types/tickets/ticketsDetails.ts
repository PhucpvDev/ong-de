export interface PriceType {
  name: string;
  description?: string;
}

export interface CustomerSegment {
  name: string;
  description?: string;
}

export interface BasePrice {
  price_type: PriceType;
  price: number;
}

export interface SegmentPrice {
  customer_segment: CustomerSegment;
  price: number;
  price_type: PriceType;
}

export interface CapacityPrice {
  min_person: number;
  max_person: number;
  price: number;
  price_type: PriceType;
}

export interface Policy {
  name: string;
  type: string;
  content: string;
  description?: string;
}

export interface Ticket {
  id: string;
  name: string;
  description: string;
  main_image?: string;
  images?: string[];
  includes?: string;
  policies?: Policy[];
  base_prices?: BasePrice[];
  segment_prices?: SegmentPrice[];
  capacity_prices?: CapacityPrice[];
}