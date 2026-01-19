'use client'

import Image from 'next/image'
import { FaWhatsapp } from 'react-icons/fa'
import { collectionContent } from '@/data/collectionContent'
import OrderButton from '@/components/OrderButton'

export default function Collection() {
  return (
    <section className="w-full mt-[-3px] bg-gray-100">
      <div className="flex justify-center items-start w-full py-12 sm:py-16 lg:py-20">
        <div className="w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">
            {collectionContent.cards.map((card, index) => (
              <div key={index} className="flex flex-col justify-start items-start gap-3 sm:gap-4">
                {/* Card Image */}
                <div className="w-full h-48 sm:h-56 md:h-64 relative rounded-lg overflow-hidden">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Card Title */}
                <div className="text-violet-800 text-xl sm:text-2xl font-bold font-serif">
                  {card.title}
                </div>

                {/* Card Features */}
                <div className="flex flex-col justify-start items-start gap-2">
                  {card.features.map((feature, idx) => (
                    <div key={idx} className="flex justify-start items-start gap-2">
                      {/* Checkmark Icon */}
                      <div className="w-5 h-5 relative flex-shrink-0 mt-0.5">
                        <div className="w-5 h-5 left-0 top-0 absolute bg-lime-200 rounded-[10px] border border-violet-800"></div>
                        <div className="w-3.5 h-3.5 left-[3px] top-[5px] absolute bg-amber-200 rounded-full"></div>
                        <div className="w-2.5 h-2 left-[4.58px] top-[6.02px] absolute bg-violet-200 outline outline-1 outline-offset-[-0.54px] outline-violet-800"></div>
                      </div>
                      <div className="text-neutral-700 text-sm sm:text-base font-normal leading-5 sm:leading-6 font-serif">
                        {feature}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
            {/* Order Button */}
            <OrderButton className="w-full sm:w-auto" />

            {/* WhatsApp Button */}
            <a
              href={`https://wa.me/${collectionContent.buttons.whatsapp.number.replace(/\s/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 bg-green-600 rounded-lg flex justify-center items-center gap-2 hover:bg-green-700 transition-colors border-2 border-green-700"
            >
              <FaWhatsapp className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              <div className="flex flex-col items-start">
                <div className="text-white text-xs sm:text-sm font-normal font-serif">
                  {collectionContent.buttons.whatsapp.label}
                </div>
                <div className="text-white text-base sm:text-lg font-bold font-serif">
                  {collectionContent.buttons.whatsapp.number}
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
