"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useStore } from "@/context/StoreContent";
import { getTenantConfig } from "@/config/general.config";
import { parsePrice } from "@/utils/parsePrice";
import CartItemProduct from "./CartItemProduct";
import { useRouter } from "next/navigation";
import { Product, Variant } from "@/types/ProductType";

declare global {
  interface Window {
    dataLayer: any[];
  }
}

const OrderFormSection = ({
  apiProducts,
}: {
  apiProducts: Product;
}) => {
  const router = useRouter();
  const { cartItems, setCartItems, products } = useStore();
  const [totalPrice, setTotalPrice] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState<{
    name?: string;
    phone?: string;
    address?: string;
  }>({});
  const [isInitiateCheckoutFired, setIsInitiateCheckoutFired] = useState(false);
  
  const nameInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const addressInputRef = useRef<HTMLInputElement>(null);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (!isInitiateCheckoutFired && typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "initiate_checkout",
      });
      setIsInitiateCheckoutFired(true);
    }
  };

  const totalPriceOfCartItems = () => {
    let total = 0;
    const findSelectedProduct = cartItems.find(
      (item) => item.selectForOrder === false
    );
    if (!findSelectedProduct) return total;
    const quantity = findSelectedProduct.quantity || 1;
    const price =
      parsePrice(
        findSelectedProduct.selectedVariant?.discountPrice || "BDT 0"
      ) ||
      parsePrice(findSelectedProduct.selectedVariant?.retailPrice || "BDT 0") ||
      0;
    total += price * quantity;
    return Math.round(total);
  };

  const [shippingMethod, setShippingMethod] = useState("inside_dhaka");

  const shippingOptions = [
    { id: "inside_dhaka", label: "ঢাকা শহর", price: 70 },
    { id: "outskirts_dhaka", label: "ঢাকার আশেপাশের এলাকা", price: 100 },
    { id: "outside_dhaka", label: "ঢাকার বাইরে", price: 130 },
  ];

  const [colors, setColors] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState<string>(colors[0] || "");

  const findGroupOptionsAndAddToCart = (prod?: Product) => {
    const optionsMap: Record<string, Set<string>> = {};
    const product = products[0] || prod;
    if (!product) return;
    product.variants.forEach((variant: Variant) => {
      variant.option_values.forEach((value) => {
        if (!value.name) return;
        const optionName = value.option_name.en;
        const optionValue = value.name.en;

        if (!optionsMap[optionName]) {
          optionsMap[optionName] = new Set();
        }

        optionsMap[optionName].add(optionValue);
      });
    });
    const variantOptions = Object.fromEntries(
      Object.entries(optionsMap).map(([key, set]) => [key, Array.from(set)])
    );
    const localCartItemBasedOnColorVariant: Product[] = [];
    const colors: string[] = variantOptions?.Color ?? [];
    if (colors.length > 0) {
      setSelectedColor(colors[0]); // Set the first color as default
    }
    setColors(colors);
    if (colors.length > 0) {
      colors.forEach((color) => {
        // has to change selected variant based on color
        localCartItemBasedOnColorVariant.push({
          ...product,
          quantity: 1,
          selectForOrder: true,
          selectedColor: color,
        });
      });
    }
    setCartItems(localCartItemBasedOnColorVariant);
    return;
  };

  const shippingCharge =
    shippingOptions.find((opt) => opt.id === shippingMethod)?.price || 0;

  const total = totalPriceOfCartItems() + shippingCharge;

  const validate = () => {
    const newErrors: { name?: string; phone?: string; address?: string } = {};

    if (!name.trim()) newErrors.name = "নামটি দিন";

    const normalized = phone.replace(/\s|-/g, "");
    const bdPattern = /^(\+?8801[3-9]\d{8}|01[3-9]\d{8})$/; // 0XXXXXXXXXX or 01XXXXXXXXX
    if (!bdPattern.test(normalized))
      newErrors.phone = "সঠিক মোবাইল নাম্বার দিন";

    if (address.trim().length < 3) newErrors.address = "সম্পূর্ণ ঠিকানা লিখুন";

    setErrors(newErrors);
    
    if (newErrors.name && nameInputRef.current) {
      nameInputRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      nameInputRef.current.focus();
    } else if (newErrors.phone && phoneInputRef.current) {
      phoneInputRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      phoneInputRef.current.focus();
    } else if (newErrors.address && addressInputRef.current) {
      addressInputRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      addressInputRef.current.focus();
    }
    
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = async () => {
    if (!validate()) return;
    if (cartItems && cartItems.length === 0) {
      alert("কার্টে কোন প্রোডাক্ট নেই!");
      return;
    }

    // check product is selected or not in cartitem if selectForOrder is false
    const foundSelectForOrder =
      cartItems.find((item) => item.selectForOrder === false) || null;

    if (!foundSelectForOrder) {
      alert("প্রডাক্ট সিলেক্ট করুন!");
      return;
    }
    // check foundSelectForOrder product has selectedVariant in the object
    if (!foundSelectForOrder.selectedVariant) {
      alert("প্রডাক্ট সাইজ সিলেক্ট করুন!");
      return;
    }

    const customer = {
      name: name.trim(),
      phone: phone.replace(/\s|-/g, ""),
      address: address.trim(),
    };

    // Transform data to API format
    const transformOrderData = () => {
      const nameParts = customer.name.split(" ");
      const firstName = nameParts[0] || "Mr/Mrs";
      const lastName = nameParts.slice(1).join(" ") || ".";

      const totalAmount = totalPriceOfCartItems() + shippingCharge;

      const purchasableProduct = cartItems.find(
        (item) => item.selectForOrder === false
      );
      const purchasable = {
        id: parseInt(purchasableProduct?.selectedVariant?.variantId || "0"), // variant id
        quantity: purchasableProduct?.quantity || 1,
        discount_should_apply: true,
        order_quantity: purchasableProduct?.quantity || 1,
        uom_id: 1,
        uom: "pcs",
        order_uom_id: 1,
        order_uom: "pcs",
        batch_id: null,
      };

      return {
        customer_id: 1, // You might want to get this from auth/user context
        channel_id: 2, // You might want to get this from config
        amount_due: totalAmount, // Convert to paisa/cents if needed
        amount_paid: 0,
        amount_change: 0,
        billing_address: {
          first_name: firstName,
          last_name: lastName,
          phone: customer.phone,
          state: null,
          city: null,
          area: null,
          postcode: "",
          address: customer.address,
          landmark: "",
          type: "billing",
        },
        shipping_address: {
          first_name: firstName,
          last_name: lastName,
          phone: customer.phone,
          state: null,
          city: null,
          area: null,
          postcode: "",
          address: customer.address,
          landmark: "",
          type: "shipping",
        },
        payment: {
          intent: "sale",
          status: "unpaid",
          meta_data: [
            {
              provider: "Cash on Delivery",
              type: "cash",
              amount: totalAmount.toString(), // Convert to paisa/cents
              payment_information: "Cash on Delivery",
              vouchers: [],
            },
          ],
        },
        purchasable: [{ ...purchasable }],
        meta_data: {
          shipping_charge: {
            amount: shippingCharge,
            currency_code: "BDT",
          },
        },
      };
    };
    const apiOrderData = transformOrderData();
    await sendOrderToAPI(apiOrderData);
  };

  // Send the data to your API
  const sendOrderToAPI = async (apiOrderData: any) => {
    try {
      // find the api url based on the subdomain and find the config for the subdomain
      const subdomain = window.location.hostname.split(".")[0];
      const cleanSubdomain = subdomain.replace(/-/g, "");
      const config = getTenantConfig(cleanSubdomain);
      const apiUrl = config.api.baseUrl;
      // return;
      if (!apiUrl) {
        throw new Error(
          "API URL is not configured. Please check your tenant configuration."
        );
      }

      const response = await fetch(apiUrl + "/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiOrderData),
      });

      const result = await response.json();
      const orderNumber =
        result?.data?.order_number ||
        result?.order_number ||
        result?.data?.address?.order_number;
      const alertOrderId =
        orderNumber || (result?.id ? String(result.id) : Date.now().toString());

      if (response.ok) {

        if (typeof window !== "undefined") {
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            event: "purchase",
            ecommerce: {
              value: apiOrderData.amount_due,
              currency: "BDT",
              items: cartItems
                .filter((item) => !item.selectForOrder)
                .map((item) => ({
                  item_id: item.id,
                  item_name: item.name.en,
                  price:
                    parsePrice(
                      item.selectedVariant?.discountPrice ||
                        item.selectedVariant?.retailPrice ||
                        "0"
                    ) || 0,
                  quantity: item.quantity || 1,
                })),
            },
          });
        }

        // Reset form on success
        setName("");
        setPhone("");
        setAddress("");
        setErrors({});
        setCartItems([]);
        setShippingMethod("inside_dhaka");
        const confirmationUrl = `/order-complete?orderNumber=${encodeURIComponent(
          alertOrderId
        )}&message=${encodeURIComponent(result?.message || "")}`;
        router.push(confirmationUrl);
      } else {
        alert(
          `অর্ডার সাবমিট করতে সমস্যা হয়েছে: ${
            result.message || "আবার চেষ্টা করুন"
          }`
        );
      }
    } catch (error) {
      console.error("Order submission error:", error);
      alert("নেটওয়ার্ক সমস্যা। আবার চেষ্টা করুন।");
    }
  };

  // select product for order
  const selectTheProductForOrder = (product: Product, index: number) => {
    if (index === -1) return;

    // first make all the selectForOrder false from cartItems
    const updatedCartItems = [...cartItems];
    updatedCartItems.forEach((item) => {
      item.selectForOrder = true;
    });
    updatedCartItems[index].selectForOrder = false;
    setCartItems(updatedCartItems);
  };

  const subTotalOfCartProductWithQuantity = () => {
    // find the selecteForOrder from cartItem false and calculate the price with quantity from selectedProduct variant amount
    const selectedProduct = cartItems.find(
      (item) => item.selectForOrder === false
    );
    if (!selectedProduct) return 0;
    const selectedVariant = selectedProduct.selectedVariant;
    if (!selectedVariant) return 0;
    const selectedVariantAmount =
      selectedVariant.discountPrice || selectedVariant.retailPrice;
    const quantity = selectedProduct.quantity;
    const subtotal = Math.round(
      parsePrice(selectedVariantAmount || "BDT 0") * (quantity || 1)
    );
    return subtotal;
  };

  useEffect(() => {
    findGroupOptionsAndAddToCart(apiProducts);
  }, []);

  const getSelectedProductImage = (item: Product) => {
    if (!item.media?.length) return "";

    const selectedColor = item.selectedColor?.toLowerCase();

    const matchedVariant = item.variants.find(
      (variant) =>
        variant.id.toString() === item.selectedVariant?.variantId?.toString()
    );

    const colorName =
      selectedColor ||
      matchedVariant?.option_values.find(
        (opt) => opt.option_name?.en?.toLowerCase() === "color"
      )?.name?.en?.toLowerCase();

    if (item.media.length === 1) return item.media[0].original_url;

    if (colorName === "blue") return item.media[0].original_url;
    if (colorName === "white") return item.media[1]?.original_url || item.media[0].original_url;
    if (colorName === "golden-white")
      return item.media[2]?.original_url || item.media[0].original_url;

    return item.media[0].original_url;
  };

  return (
    <section id="order" className="bg-white py-8 md:py-12 lg:py-16">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-zinc-100 rounded-lg p-4 sm:p-6 lg:p-12">
          {/* Title */}
          <h2 className="text-center text-neutral-700 text-2xl sm:text-3xl lg:text-4xl font-semibold font-['Hind_Siliguri'] leading-tight mb-8 sm:mb-10 lg:mb-12">
            অর্ডার করতে নীচের ফর্মটি পূরণ করুন এবং অর্ডার করুন বার্টনে ক্লিক
            করুন!
          </h2>

          {/* Your Products Section */}
          <h3 className="text-neutral-700 text-2xl sm:text-3xl font-semibold font-['Jost'] leading-10 mb-4 sm:mb-6">
            Your Products 
          </h3>

          {/* Products Container */}
          <div className="">
            {cartItems &&
              cartItems.length > 0 &&
              cartItems.map((product, index) => (
                <CartItemProduct
                  key={product.id + Math.random()}
                  product={product}
                  colors={colors}
                  productIndex={index}
                  selectTheProductForOrder={selectTheProductForOrder}
                />
              ))}
          </div>

          {/* Two Column Layout for Billing and Order */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Column - Billing Details & Shipping */}
            <div className="space-y-8">
              {/* Billing Details Section */}
              <div>
                <h3 className="text-neutral-700 text-2xl sm:text-3xl font-semibold font-['Jost'] leading-10 my-4 sm:mb-6 sm:mt-10">
                  Billing Details
                </h3>

                <div className="flex flex-col gap-4">
                  {/* Name Field */}
                  <div className="flex flex-col gap-2">
                    <label className="text-neutral-600 text-lg sm:text-xl font-semibold font-['Hind_Siliguri'] leading-6" htmlFor="name">
                      আপনার নাম <span className="text-red-600"> * </span>
                    </label>
                    <div
                      className={`h-12 p-3 bg-white shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] border ${
                        errors.name ? "border-red-500" : "border-gray-300"
                      } rounded flex items-center`}
                    >
                      <input
                        ref={nameInputRef}
                        id="name"
                        type="text"
                        placeholder="নাম লিখুন"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (errors.name) {
                            setErrors((prev) => ({ ...prev, name: undefined }));
                          }
                        }}
                        required
                        aria-invalid={!!errors.name}
                        alt="নাম লিখুন"
                        className={"flex-1 text-base sm:text-lg font-medium font-['Hind_Siliguri'] bg-transparent border-0 outline-none focus:ring-0 text-black"}
                      />
                    </div>
                    {errors.name && (
                      <span className="text-red-500 text-sm" role="alert">
                        * {errors.name}
                      </span>
                    )}
                  </div>

                  {/* Phone Field */}
                  <div className="flex flex-col gap-2">
                    <label className="text-neutral-600 text-lg sm:text-xl font-semibold font-['Hind_Siliguri'] leading-6" htmlFor="phone">
                      আপনার মোবাইল নাম্বার <span className="text-red-600"> * </span>
                    </label>
                    <div
                      className={`h-12 p-3 bg-white shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] border ${
                        errors.phone ? "border-red-500" : "border-gray-300"
                      } rounded flex items-center`}
                    >
                      <input
                        ref={phoneInputRef}
                        id="phone"
                        type="tel"
                        placeholder="01234 567890"
                        value={phone}
                        name="phone"
                        onChange={(e) => {
                          setPhone(e.target.value);
                          if (errors.phone) {
                            setErrors((prev) => ({ ...prev, phone: undefined }));
                          }
                        }}
                        required
                        aria-invalid={!!errors.phone}
                        alt="মোবাইল নাম্বার লিখুন"
                        className={"flex-1 text-base sm:text-lg font-medium font-['Hind_Siliguri'] bg-transparent border-0 outline-none focus:ring-0 text-black"}
                      />
                    </div>
                    {errors.phone && (
                      <span className="text-red-500 text-sm" role="alert">
                        * {errors.phone}
                      </span>
                    )}
                  </div>

                  {/* Address Field */}
                  <div className="flex flex-col gap-2">
                    <label className="text-neutral-600 text-lg sm:text-xl font-semibold font-['Hind_Siliguri'] leading-6" htmlFor="address">
                      আপনার ঠিকানা <span className="text-red-600"> * </span>
                    </label>
                    <div
                      className={`h-12 p-3 bg-white shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] border ${
                        errors.address ? "border-red-500" : "border-gray-300"
                      } rounded flex items-center`}
                    >
                      <input
                        ref={addressInputRef}
                        id="address"
                        type="text"
                        placeholder="ঠিকানা"
                        value={address}
                        onChange={(e) => {
                          setAddress(e.target.value);
                          if (errors.address) {
                            setErrors((prev) => ({ ...prev, address: undefined }));
                          }
                        }}
                        required
                        aria-invalid={!!errors.address}
                        alt="ঠিকানা লিখুন"
                        className={"flex-1 text-base sm:text-lg font-medium font-['Hind_Siliguri'] bg-transparent border-0 outline-none focus:ring-0 text-black"}
                      />
                    </div>
                    {errors.address && (
                      <span className="text-red-500 text-sm" role="alert">
                        * {errors.address}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Shipping Section */}
              <div>
                <h3 className="text-neutral-700 text-2xl sm:text-3xl font-semibold font-['Jost'] leading-10 mb-4 sm:mb-6">
                  Shipping
                </h3>

                <div className="flex flex-col rounded overflow-hidden border border-zinc-100">
                  {/* Inside Dhaka */}
                  <div
                    onClick={() => setShippingMethod("inside_dhaka")}
                    className={`p-4 bg-white shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] border-b border-zinc-100 flex items-center gap-3 cursor-pointer transition-colors hover:bg-gray-50 ${
                      shippingMethod === "inside_dhaka" ? "bg-green-50" : ""
                    }`}
                  >
                    <div className="w-4 h-4 relative shrink-0">
                      {shippingMethod === "inside_dhaka" ? (
                        <div className="w-4 h-4 bg-green-500 rounded-full ring-[5px] ring-green-100"></div>
                      ) : (
                        <div className="w-3.5 h-3.5 absolute left-[1.33px] top-[1.33px] border border-neutral-400 rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                      <div className="flex-1 text-neutral-600 text-base sm:text-lg font-medium font-['Jost']">
                        ঢাকা শহর
                      </div>
                      <div className="text-neutral-600 text-lg sm:text-xl font-medium font-['Jost']">
                        ৳ 70.00
                      </div>
                    </div>
                  </div>

                  {/* Outskirts of Dhaka */}
                  <div
                    onClick={() => setShippingMethod("outskirts_dhaka")}
                    className={`p-4 bg-white shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] border-b border-zinc-100 flex items-center gap-3 cursor-pointer transition-colors hover:bg-gray-50 ${
                      shippingMethod === "outskirts_dhaka" ? "bg-green-50" : ""
                    }`}
                  >
                    <div className="w-4 h-4 relative shrink-0">
                      {shippingMethod === "outskirts_dhaka" ? (
                        <div className="w-4 h-4 bg-green-500 rounded-full ring-[5px] ring-green-100"></div>
                      ) : (
                        <div className="w-3.5 h-3.5 absolute left-[1.33px] top-[1.33px] border border-neutral-400 rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                      <div className="flex-1 text-neutral-600 text-base sm:text-lg font-medium font-['Jost']">
                        ঢাকার আশেপাশের এলাকা
                      </div>
                      <div className="text-neutral-600 text-lg sm:text-xl font-medium font-['Jost']">
                        ৳ 100.00
                      </div>
                    </div>
                  </div>

                  {/* Outside Dhaka */}
                  <div
                    onClick={() => setShippingMethod("outside_dhaka")}
                    className={`p-4 bg-white shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] flex items-center gap-3 cursor-pointer transition-colors hover:bg-gray-50 ${
                      shippingMethod === "outside_dhaka" ? "bg-green-50" : ""
                    }`}
                  >
                    <div className="w-4 h-4 relative shrink-0">
                      {shippingMethod === "outside_dhaka" ? (
                        <div className="w-4 h-4 bg-green-500 rounded-full ring-[5px] ring-green-100"></div>
                      ) : (
                        <div className="w-3.5 h-3.5 absolute left-[1.33px] top-[1.33px] border border-neutral-400 rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                      <div className="flex-1 text-neutral-600 text-base sm:text-lg font-medium font-['Jost']">
                        ঢাকার বাইরে
                      </div>
                      <div className="text-neutral-600 text-lg sm:text-xl font-medium font-['Jost']">
                        ৳ 130.00
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="space-y-6">
              {/* Your Order Section */}
              <div>
                <h3 className="text-neutral-700 text-2xl sm:text-3xl font-semibold font-['Jost'] leading-10 my-4 sm:mb-6 sm:mt-10">
                  Your Order
                </h3>

                <div className="bg-white border border-zinc-100 rounded-lg overflow-hidden">
                  {/* Product Header */}
                  <div className="py-3 px-4 border-b border-neutral-400 flex items-center gap-4">
                    <div className="flex-1 text-neutral-600 text-lg sm:text-xl font-semibold font-['Jost']">
                      Product
                    </div>
                    <div className="text-neutral-600 text-lg sm:text-xl font-semibold font-['Jost']">
                      Sub-Total
                    </div>
                  </div>

                  {/* Product in Order */}
                  <div className="border">
                    {cartItems.length > 0 &&
                      cartItems.map(
                        (item) =>
                          !item.selectForOrder && (
                            <div
                              key={item.id + Math.random()}
                              className="py-3 px-4 border-b border-neutral-400 flex items-center gap-3 sm:gap-4"
                            >
                              <Image
                                src={getSelectedProductImage(item)}
                                alt={item.name.en}
                                width={68}
                                height={82}
                                className="object-cover w-12 h-16 sm:w-[68px] sm:h-[82px] shrink-0"
                              />
                              <div className="flex-1 text-gray-900 text-base sm:text-lg lg:text-xl font-semibold font-['Jost'] leading-tight">
                                {item.name.en} <span className="font-normal font-['sans-serif']">
                                  x
                                  </span> {item.quantity || 1}
                              </div>
                              <div className="flex items-center gap-1 text-gray shrink-0">
                                {/* <span className="flex items-center  gap-1 text-xl text-gray-500 line-through font-medium font-hindi">
                                  {item.selectedVariant?.discountPrice
                                    ? "৳" + parsePrice(
                                        item.selectedVariant?.retailPrice ||
                                          " 0"
                                      ).toFixed(2)
                                    : ""}
                                </span> */}
                                <span className="text-orange-600 text-base sm:text-lg lg:text-xl font-medium font-['Baloo_2']">
                                  ৳{item.selectedVariant?.discountPrice
                                    ? Math.round(
                                        parsePrice(
                                          item.selectedVariant?.discountPrice ||
                                            "0"
                                        ) * (item.quantity || 1)
                                      ).toFixed(2)
                                    : Math.round(
                                        parsePrice(
                                          item.selectedVariant?.retailPrice ||
                                            "0"
                                        ) * (item.quantity || 1)
                                      ).toFixed(2)}
                                </span>
                              </div>
                            </div>
                          )
                      )}
                  </div>

                  {/* Order Summary */}
                  <div className="px-4">
                    {/* Subtotal */}
                    <div className="py-3 border-b border-neutral-400 flex items-center justify-between gap-4">
                      <div className="text-neutral-600 text-lg sm:text-xl font-semibold font-['Jost']">
                        Subtotal
                      </div>
                      <div className="flex items-center gap-1 text-gray">
                        <svg
                          width="11"
                          height="14"
                          viewBox="0 0 11 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="shrink-0"
                        >
                          <path
                            d="M2.18299 0C2.75 1.58423e-05 3.19416 0.2446 3.51547 0.733752C3.85567 1.20337 4.04467 1.84907 4.08247 2.67086V5.75262H4.87629L6.20876 7.16143H4.08247V11.153C4.08247 11.4661 4.19587 11.7498 4.42268 12.0042C4.64948 12.2586 5.01804 12.3857 5.52835 12.3857C6.18986 12.3857 6.88917 12.0042 7.62629 11.2411C8.3823 10.4584 8.7792 9.65619 8.81701 8.83438L8.4768 8.86373C7.26718 8.86374 6.66236 8.19847 6.66237 6.86792C6.66236 6.4179 6.80412 6.01678 7.08763 5.66457C7.37113 5.31238 7.84364 5.13628 8.50516 5.13627C9.20446 5.13628 9.79037 5.44935 10.2629 6.07547C10.7543 6.70162 11 7.46472 11 8.36478C11 9.69533 10.4519 10.9672 9.35567 12.1803C8.27834 13.3934 6.99312 14 5.5 14C4.95189 14 4.36597 13.7554 3.74227 13.2662C3.13745 12.7575 2.77835 12.2683 2.66495 11.7987V7.16143H1.30412L0 5.75262H2.66495V2.96436C2.66495 2.39694 2.33419 2.06431 1.67268 1.96646C1.37027 1.96647 1.17182 2.01539 1.07732 2.11321C0.907216 1.81972 0.746564 1.46752 0.595361 1.0566V0.909853C0.595361 0.655501 0.784364 0.440269 1.16237 0.264152C1.54038 0.0880679 1.88058 1.58423e-05 2.18299 0Z"
                            fill="currentColor"
                          />
                        </svg>
                        <span className="text-neutral-600 text-lg sm:text-xl font-medium font-['Jost']">
                          {/* {totalPriceOfCartItems()} */}
                          {/* { cartItems.map()} */}
                          {subTotalOfCartProductWithQuantity()}
                        </span>
                      </div>
                    </div>

                    {/* Delivery Charge */}
                    <div className="py-3 border-b border-neutral-400 flex items-center justify-between gap-4">
                      <div className="text-neutral-600 text-lg sm:text-xl font-semibold font-['Jost']">
                        Delivery Charge
                      </div>
                      <div className="flex items-center gap-1 text-gray">
                        <svg
                          width="11"
                          height="14"
                          viewBox="0 0 11 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="shrink-0"
                        >
                          <path
                            d="M2.18299 0C2.75 1.58423e-05 3.19416 0.2446 3.51547 0.733752C3.85567 1.20337 4.04467 1.84907 4.08247 2.67086V5.75262H4.87629L6.20876 7.16143H4.08247V11.153C4.08247 11.4661 4.19587 11.7498 4.42268 12.0042C4.64948 12.2586 5.01804 12.3857 5.52835 12.3857C6.18986 12.3857 6.88917 12.0042 7.62629 11.2411C8.3823 10.4584 8.7792 9.65619 8.81701 8.83438L8.4768 8.86373C7.26718 8.86374 6.66236 8.19847 6.66237 6.86792C6.66236 6.4179 6.80412 6.01678 7.08763 5.66457C7.37113 5.31238 7.84364 5.13628 8.50516 5.13627C9.20446 5.13628 9.79037 5.44935 10.2629 6.07547C10.7543 6.70162 11 7.46472 11 8.36478C11 9.69533 10.4519 10.9672 9.35567 12.1803C8.27834 13.3934 6.99312 14 5.5 14C4.95189 14 4.36597 13.7554 3.74227 13.2662C3.13745 12.7575 2.77835 12.2683 2.66495 11.7987V7.16143H1.30412L0 5.75262H2.66495V2.96436C2.66495 2.39694 2.33419 2.06431 1.67268 1.96646C1.37027 1.96647 1.17182 2.01539 1.07732 2.11321C0.907216 1.81972 0.746564 1.46752 0.595361 1.0566V0.909853C0.595361 0.655501 0.784364 0.440269 1.16237 0.264152C1.54038 0.0880679 1.88058 1.58423e-05 2.18299 0Z"
                            fill="currentColor"
                          />
                        </svg>
                        <span className="text-neutral-600 text-lg sm:text-xl font-medium font-['Jost']">
                          {shippingCharge}
                        </span>
                      </div>
                    </div>

                    {/* Total */}
                    <div className="pt-3 pb-6 sm:pb-10 border-b border-neutral-400 flex items-center justify-between gap-4">
                      <div className="text-neutral-600 text-lg sm:text-xl font-semibold font-['Jost']">
                        Total
                      </div>
                      <div className="flex items-center gap-1 text-gray">
                        <svg
                          width="11"
                          height="14"
                          viewBox="0 0 11 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="shrink-0"
                        >
                          <path
                            d="M2.18299 0C2.75 1.58423e-05 3.19416 0.2446 3.51547 0.733752C3.85567 1.20337 4.04467 1.84907 4.08247 2.67086V5.75262H4.87629L6.20876 7.16143H4.08247V11.153C4.08247 11.4661 4.19587 11.7498 4.42268 12.0042C4.64948 12.2586 5.01804 12.3857 5.52835 12.3857C6.18986 12.3857 6.88917 12.0042 7.62629 11.2411C8.3823 10.4584 8.7792 9.65619 8.81701 8.83438L8.4768 8.86373C7.26718 8.86374 6.66236 8.19847 6.66237 6.86792C6.66236 6.4179 6.80412 6.01678 7.08763 5.66457C7.37113 5.31238 7.84364 5.13628 8.50516 5.13627C9.20446 5.13628 9.79037 5.44935 10.2629 6.07547C10.7543 6.70162 11 7.46472 11 8.36478C11 9.69533 10.4519 10.9672 9.35567 12.1803C8.27834 13.3934 6.99312 14 5.5 14C4.95189 14 4.36597 13.7554 3.74227 13.2662C3.13745 12.7575 2.77835 12.2683 2.66495 11.7987V7.16143H1.30412L0 5.75262H2.66495V2.96436C2.66495 2.39694 2.33419 2.06431 1.67268 1.96646C1.37027 1.96647 1.17182 2.01539 1.07732 2.11321C0.907216 1.81972 0.746564 1.46752 0.595361 1.0566V0.909853C0.595361 0.655501 0.784364 0.440269 1.16237 0.264152C1.54038 0.0880679 1.88058 1.58423e-05 2.18299 0Z"
                            fill="currentColor"
                          />
                        </svg>
                        <span className="text-neutral-600 text-lg sm:text-xl font-medium font-['Jost']">
                          {total}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="px-4 pt-3 pb-6 bg-zinc-100">
                    <div className="text-neutral-600 text-base sm:text-lg font-medium font-['Jost']">
                      Cash on delivery
                    </div>
                  </div>

                  <div className="px-4 py-3 bg-white border-b">
                    <div className="text-neutral-400 text-sm sm:text-base lg:text-lg font-normal font-['Jost']">
                      Pay with cash on Delivery
                    </div>
                  </div>

                  {/* Privacy Note */}
                  <div className="px-4 py-6 bg-white">
                    <div className="text-neutral-600 text-sm sm:text-base lg:text-lg font-normal font-['Jost'] leading-relaxed">
                      Your personal data will be used to process your order,
                      support your experience throughout this website, and for
                      other purposes described in our privacy policy.
                    </div>
                  </div>

                  {/* Place Order Button */}
                  <div className="px-4 pb-4">
                    <button
                      id="orderSubmitBtn"
                      type="button"
                      onClick={handlePlaceOrder}
                      className="w-full px-8 py-3.5 bg-yellow-500 rounded flex justify-center items-center gap-2 hover:bg-yellow-600 transition-colors cursor-pointer"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="shrink-0"
                      >
                        <path
                          d="M9 6H15C15 4.34315 13.6569 3 12 3C10.3431 3 9 4.34315 9 6ZM7 6C7 3.23858 9.23858 1 12 1C14.7614 1 17 3.23858 17 6H20C20.5523 6 21 6.44772 21 7V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V7C3 6.44772 3.44772 6 4 6H7ZM5 8V20H19V8H5ZM9 10C9 11.6569 10.3431 13 12 13C13.6569 13 15 11.6569 15 10H17C17 12.7614 14.7614 15 12 15C9.23858 15 7 12.7614 7 10H9Z"
                          fill="#161616"
                        />
                      </svg>
                      <span className="text-center text-neutral-900 text-lg sm:text-xl font-semibold font-['Hind_Siliguri']">
                        অর্ডার কনফার্ম করুন
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderFormSection;
