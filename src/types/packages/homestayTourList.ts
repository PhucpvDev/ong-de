export interface Package {
  id: string;
  name: string;
  slug: string;
  description: string;
  long_description: string;
  main_image: string;
  images: string[];
  duration: string;
  conditions: string;
  min_quantity: number;
  is_active: boolean;
  is_featured: boolean;
  keywords: string;
  meta_description: string;
  available_start: string;
  available_end: string;
  categories: Array<{
    id: number;
    name: string;
    slug: string;
    description: string;
  }>;
  audiences: Array<{
    id: number;
    name: string;
    description: string;
    icon?: string;
  }>;
  services: Array<{
    id: number;
    name: string;
    description: string;
    icon?: string;
  }>;
  base_prices: Array<{
    price: number;
    price_type: {
      id: number;
      name: string;
      description: string;
    };
  }>;
  capacity_prices: Array<{
    price: number;
    min_person: number;
    max_person?: number;
    price_type: {
      id: number;
      name: string;
      description: string;
    };
    customer_segment: {
      id: number;
      name: string;
      description: string;
    };
  }>;
  policies: Array<{
    id: number;
    name: string;
    content: string;
    description: string;
    type: string;
  }>;
}

export interface PackageTourItemProps {
  data: Package;
  onSelect?: (packageData: Package) => void;
}

export interface ServiceCarouselProps {
  data: Package[];
  onPackageSelect?: (packageData: Package) => void;
}