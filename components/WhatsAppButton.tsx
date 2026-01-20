import React from 'react';

interface WhatsAppContactProps {
  phoneNumber?: string;
  labelText?: string;
  className?: string;
}

export default function WhatsAppCard({ 
  phoneNumber = "", 
  labelText = "যেকোন প্রয়োজনে", 
  className = "" 
}: WhatsAppContactProps) {
  
  const formattedNumber = phoneNumber ? phoneNumber.replace(/\D/g, '') : '';
  const finalLink = formattedNumber.startsWith('88') ? formattedNumber : `88${formattedNumber}`;

  if (!phoneNumber) return null;

  return (
    <div className={`flex items-center justify-start p-4 sm:p-0 ${className}`}>
      <a 
        href={`https://wa.me/${finalLink}`}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center bg-white border-2 border-[#27B43E] rounded-2xl p-3 pr-12 sm:p-3 sm:pr-16 shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 group cursor-pointer w-full max-w-[400px] sm:min-w-[340px]"
      >
        
        <div className="flex flex-col">
          <span className="text-[#27B43E] italic font-semibold text-sm sm:text-md border-b-2 border-[#27B43E] mb-1 sm:mb-2 w-max leading-tight">
            {labelText}
          </span>
          <span className="text-[#27B43E] text-2xl sm:text-4xl font-extrabold tracking-tight">
            {phoneNumber}
          </span>
        </div>

        <div className="absolute -right-12 -top-6 sm:right-14 sm:-top-8 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
          <svg
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-12 h-12 drop-shadow-xl"
          >
            <path
              d="M56 32C56 45.2548 45.2548 56 32 56C26.9443 56 22.2538 54.4368 18.3853 51.7673L10.1818 53.8182L12.3315 45.7568C9.60185 41.8614 8 37.1177 8 32C8 18.7452 18.7452 8 32 8C45.2548 8 56 18.7452 56 32Z"
              fill="url(#whatsapp_gradient_final)"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M32 60C47.464 60 60 47.464 60 32C60 16.536 47.464 4 32 4C16.536 4 4 16.536 4 32C4 37.0218 5.32199 41.7348 7.63695 45.8099L4 60L18.6297 56.6076C22.6028 58.7709 27.1578 60 32 60ZM32 55.6923C45.0849 55.6923 55.6923 45.0849 55.6923 32C55.6923 18.9151 45.0849 8.30769 32 8.30769C18.9151 8.30769 8.30769 18.9151 8.30769 32C8.30769 37.0521 9.889 41.7349 12.5837 45.5804L10.4615 53.5385L18.5599 51.5139C22.3787 54.1491 27.0091 55.6923 32 55.6923Z"
              fill="#D7FFDD"
            />
            <path
              d="M25 18.9998C24.3343 17.6626 23.3131 17.781 22.2814 17.781C20.4375 17.781 17.5625 19.9896 17.5625 24.0999C17.5625 27.4686 19.0469 31.1561 24.0488 36.6722C28.8761 41.9958 35.2188 44.7496 40.4844 44.6559C45.75 44.5621 46.8334 40.0309 46.8334 38.5006C46.8334 37.8224 46.4125 37.484 46.1225 37.392C44.3282 36.5309 41.0187 34.9263 40.2656 34.6248C39.5126 34.3233 39.1194 34.7311 38.875 34.9529C38.1922 35.6037 36.8385 37.5216 36.375 37.9529C35.9115 38.3843 35.2206 38.166 34.933 38.0029C33.8749 37.5783 31.0059 36.3021 28.7189 34.0853C25.8906 31.3436 25.7247 30.4003 25.1918 29.5606C24.7655 28.8889 25.0783 28.4768 25.2344 28.2967C25.8438 27.5935 26.6852 26.508 27.0625 25.9685C27.4399 25.4291 27.1403 24.61 26.9606 24.0999C26.1875 21.906 25.5326 20.0695 25 18.9998Z"
              fill="white"
            />
            <defs>
              <linearGradient id="whatsapp_gradient_final" x1="53" y1="14" x2="8" y2="56" gradientUnits="userSpaceOnUse">
                <stop stopColor="#5BD066" />
                <stop offset="1" stopColor="#27B43E" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </a>
    </div>
  );
}

