'use client'
import { RiShoppingBag3Line } from 'react-icons/ri'

interface OrderButtonProps {
  className?: string
  onClick?: () => void
}

export default function OrderButton({ className = '', onClick }: OrderButtonProps) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      const orderSection = document.getElementById('order');
      if (orderSection) {
        orderSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`px-6 sm:px-8 py-3 sm:py-3.5 bg-red-600 rounded-lg flex justify-center items-center gap-2 hover:bg-red-700 transition-colors ${className}`}
    >
      <RiShoppingBag3Line  className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
      <div className="text-white text-lg sm:text-xl lg:text-2xl font-bold font-serif">
        এখনই অর্ডার করুন
      </div>
    </button>
  )
}
