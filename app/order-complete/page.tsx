"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { RiCheckLine } from "react-icons/ri";

function OrderCompleteContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber");
  const message = searchParams.get("message");

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4 py-12">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <RiCheckLine className="text-green-600 text-4xl" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          অর্ডার সফল হয়েছে!
        </h1>
        
        <p className="text-gray-600 mb-6">
          আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে। আমাদের প্রতিনিধি শীঘ্রই আপনার সাথে যোগাযোগ করবেন।
        </p>

        {orderNumber && (
          <div className="bg-gray-100 p-4 rounded-md mb-6">
            <p className="text-sm text-gray-500 mb-1">অর্ডার নাম্বার</p>
            <p className="text-xl font-mono font-bold text-gray-800">#{orderNumber}</p>
          </div>
        )}

        <Link 
          href="/" 
          className="inline-block w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded transition duration-200"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
}

export default function OrderCompletePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderCompleteContent />
    </Suspense>
  );
}
