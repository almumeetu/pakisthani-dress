import { Product } from '@/types/ProductType';

const sampleProduct: Product = {
  id: 1,
  name: { en: 'Sample Embroidered Dress' },
  slug: 'sample-embroidered-dress',
  description: { en: 'A sample product used when API is unavailable.' },
  retail_price: 'BDT 2500',
  discount_price: 'BDT 2200',
  variants: [
    {
      id: 101,
      variantId: '101',
      title: 'Size M - Blue',
      retailPrice: 'BDT 2500',
      discountPrice: 'BDT 2200',
      option_values: [
        { option_name: { en: 'Color' }, name: { en: 'Blue' } },
        { option_name: { en: 'Size' }, name: { en: 'M' } },
      ],
    },
    {
      id: 102,
      variantId: '102',
      title: 'Size L - White',
      retailPrice: 'BDT 2600',
      discountPrice: 'BDT 2300',
      option_values: [
        { option_name: { en: 'Color' }, name: { en: 'White' } },
        { option_name: { en: 'Size' }, name: { en: 'L' } },
      ],
    },
  ],
  media: [
    { original_url: '/images/sample-blue.jpg' },
    { original_url: '/images/sample-white.jpg' },
  ],
};

export default sampleProduct;
