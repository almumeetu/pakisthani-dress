'use client'

import { FiShoppingCart } from 'react-icons/fi'

interface OrderButtonProps {
  className?: string
  onClick?: () => void
}

export default function OrderButton({ className = '', onClick }: OrderButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-6 sm:px-8 py-3 sm:py-3.5 bg-red-600 rounded-lg flex justify-center items-center gap-2 hover:bg-red-700 transition-colors ${className}`}
    >
      <FiShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
      <div className="text-white text-lg sm:text-xl lg:text-2xl font-bold font-serif">
        এখনই অর্ডার করুন
      </div>
    </button>
  )
}
