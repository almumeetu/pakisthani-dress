export interface OptionValue {
  name: {
    en: string;
  };
  option_name: {
    en: string;
  };
}

export interface Variant {
  id: number;
  variantId?: string;
  title: string;
  retailPrice: string;
  discountPrice: string;
  option_values: OptionValue[];
}

export interface ProductMedia {
  original_url: string;
}

export interface Product {
  id: number;
  name: {
    en: string;
  };
  slug?: string;
  description?: {
    en: string;
  };
  retail_price?: string;
  discount_price?: string;
  variants: Variant[];
  media: ProductMedia[];
  
  // Cart/Local specific properties
  quantity?: number;
  selectForOrder?: boolean;
  selectedColor?: string;
  selectedVariant?: Variant;
}
