'use client'

import { MdCheckCircle } from 'react-icons/md'
import { featuresData } from '@/data/featuresContent'
import OrderButton from '@/components/OrderButton'
import WhatsAppButton from '@/components/WhatsAppButton'

export default function Features() {
  return (
    <section className="bg-white w-full">
      <div className="flex justify-center items-start w-full">
        <div className="w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-44 flex flex-col lg:flex-row justify-center items-start gap-8 lg:gap-16">
          <div className="w-full lg:flex-1 relative h-64 sm:h-80 md:h-96 lg:h-[600px]">
            <div className="hidden lg:flex w-64 sm:w-72 lg:w-96 xl:w-[27rem] h-64 sm:h-72 lg:h-96 p-3 sm:p-4 lg:left-[219px] lg:top-[171px] absolute bg-violet-800 rounded-br-[60px] sm:rounded-br-[80px] lg:rounded-br-[100px] justify-end items-end gap-2">
              <div className="w-56 sm:w-64 lg:w-72 pl-4 sm:pl-6 lg:pl-8 justify-start text-white text-lg sm:text-2xl lg:text-3xl font-bold leading-relaxed sm:leading-8 lg:leading-9 font-serif">
                {featuresData.images.leftText}
              </div>
            </div>

            <img
              className="w-40 h-48 sm:w-56 sm:h-64 md:w-72 md:h-80 lg:w-80 lg:h-96 lg:left-0 lg:top-[179px] absolute rounded-tl-[40px] sm:rounded-tl-[60px] lg:rounded-tl-[100px] object-cover transition-transform duration-300 ease-out hover:scale-105 cursor-pointer"
              src={featuresData.images.image1}
              alt={featuresData.images.image1Alt}
            />
            
            <img
              className="w-40 h-48 sm:w-56 sm:h-64 md:w-72 md:h-80 lg:w-80 lg:h-96 left-44 sm:left-60 md:left-80 lg:left-[332px] top-0 absolute rounded-tl-[40px] sm:rounded-tl-[60px] lg:rounded-tl-[100px] object-cover transition-transform duration-300 ease-out hover:scale-105 cursor-pointer"
              src={featuresData.images.image2}
              alt={featuresData.images.image2Alt}
            />
          </div>

          <div className="w-full lg:flex-1 flex flex-col justify-start items-start gap-16">
            <div className="w-full flex flex-col justify-start items-start gap-4">
              <div className="w-full text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-bold leading-[40px] sm:leading-[48px] md:leading-[56px] lg:leading-[64px]">
                <span className="text-zinc-800">{featuresData.heading.part1}</span>
                <span className="text-violet-800">{featuresData.heading.part2}</span>
                <span className="text-zinc-800">{featuresData.heading.part3}</span>
              </div>

              <div className="w-full text-lg sm:text-xl md:text-2xl lg:text-2xl leading-7 font-serif">
                <span className="text-neutral-700 font-normal">
                  {featuresData.description.part1}
                </span>
                <span className="text-red-600 font-semibold">
                  {featuresData.description.part2}
                </span>
                <span className="text-neutral-700 font-normal">
                  {featuresData.description.part3}
                </span>
              </div>
            </div>

            <div className="w-full flex flex-col justify-start items-start gap-3">
              {featuresData.features.map((feature, index) => (
                <div key={index} className="self-stretch inline-flex justify-start items-center gap-1">
                  <MdCheckCircle className="w-7 h-7 text-violet-800 flex-shrink-0" />
                  <div className="text-violet-800 text-lg sm:text-xl md:text-2xl lg:text-2xl font-semibold leading-7 font-serif">
                    {feature.title}
                  </div>
                </div>
              ))}
            </div>

            <div className="w-full flex flex-col sm:flex-row justify-start items-center gap-4">
              <OrderButton />
              <WhatsAppButton />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
