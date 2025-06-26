export interface PackageData {
  id: string;
  name: string;
  short_description: string;
  long_description: string;
  main_image: string;
  images: string[];
  policies: {
    id: number;
    name: string;
    content: string;
    description: string | null;
    type: string;
  }[];
  base_prices: {
    price: number;
    price_type: {
      id: number;
      name: string;
      description: string | null;
    };
  }[];
  capacity_prices: {
    price: number;
    min_person: number;
    max_person: number | null;
    price_type: {
      id: number;
      name: string;
      description: string | null;
    };
    customer_segment: {
      id: number;
      name: string;
      description: string | null;
    };
  }[];
  segment_prices: {
    price: number;
    customer_segment: {
      id: number;
      name: string;
      description: string | null;
    };
  }[];
  conditions: string;
  min_participants: number;
  max_participants: number | null;
  duration: string;
  services: {
    id: number;
    name: string;
    description: string | null;
    icon: string | null;
  }[];
  menus: {
    id: number;
    name: string;
    type: string;
    description: string | null;
    menu_structure: string;
    fixed_items: {
      id: number;
      name: string;
      unit: string;
      quantity: string;
    }[];
  }[];
  categories: {
    id: number;
    name: string;
    slug: string;
    description: string | null;
  }[];
  audiences: {
    id: number;
    name: string;
    description: string | null;
    icon: string | null;
  }[];
  available_start: string;
  available_end: string;
  keywords: string;
  meta_description: string;
}