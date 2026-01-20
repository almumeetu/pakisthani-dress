"use client";
import { Product } from "@/types/ProductType";
import Image from "next/image";
import { parsePrice } from "@/utils/parsePrice";
import { RiCheckLine } from "react-icons/ri";

interface CartItemProductProps {
  product: Product;
  colors: string[];
  productIndex: number;
  selectTheProductForOrder: (product: Product, index: number) => void;
}

const CartItemProduct = ({
  product,
  colors,
  productIndex,
  selectTheProductForOrder,
}: CartItemProductProps) => {
  const isSelected = !product.selectForOrder;
  const price = parsePrice(product.selectedVariant?.discountPrice || product.selectedVariant?.retailPrice || "0");
  
  const getSelectedProductImage = (item: Product) => {
    if (!item.media?.length) return "/images/feature-images.webp";
    return item.media[0].original_url;
  };

  const imageSrc = getSelectedProductImage(product);

  return (
    <div 
      className={`relative flex items-center gap-4 p-4 mb-4 border rounded-lg cursor-pointer transition-all ${
        isSelected ? "border-green-500 bg-green-50 ring-1 ring-green-500" : "border-gray-200 hover:border-gray-300"
      }`}
      onClick={() => selectTheProductForOrder(product, productIndex)}
    >
      <div className="relative w-20 h-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
        <Image
          src={imageSrc}
          alt={product.name.en}
          fill
          className="object-cover"
        />
      </div>
      
      <div className="flex-1">
        <h4 className="text-lg font-semibold text-gray-800 line-clamp-2">
            {product.name.en}
        </h4>
        {product.selectedColor && (
             <p className="text-sm text-gray-500 mt-1">Color: {product.selectedColor}</p>
        )}
        <div className="flex items-center gap-2 mt-2">
            <span className="text-lg font-bold text-gray-900">
                ৳{price}
            </span>
            {product.selectedVariant?.retailPrice && price < parsePrice(product.selectedVariant.retailPrice) && (
                <span className="text-sm text-gray-400 line-through">
                    ৳{parsePrice(product.selectedVariant.retailPrice)}
                </span>
            )}
        </div>
      </div>

      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
          isSelected ? "border-green-500 bg-green-500" : "border-gray-300"
      }`}>
          {isSelected && <RiCheckLine className="text-white text-sm" />}
      </div>
    </div>
  );
};

export default CartItemProduct;
