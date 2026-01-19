'use client'

import { aboutContent } from '@/data/aboutContent'

export default function About() {
  return (
    <section className="w-full relative">
      {/* Full Width Background Image with Content Overlay */}
      <div
        className="w-full h-auto bg-cover bg-center relative"
        style={{
          backgroundImage: `url('${aboutContent.images.background}')`,
          minHeight: '600px',
          aspectRatio: '1920 / 1071.07',
          maxHeight: '1071px',
        }}
      >
        <div className="absolute inset-0 bg-white/60 mix-blend-soft-light"></div>

        {/* Content Section - Positioned at Bottom */}
        <div className="absolute bottom-0 left-0 right-0 w-full flex justify-center z-10 bg-transparent">
          <div className="w-full max-w-[1440px]">
            <div className="w-full px-4 sm:px-6 lg:px-16 pt-8 sm:pt-12 lg:pt-16 bg-white rounded-t-[40px] sm:rounded-t-[48px] lg:rounded-t-[64px] flex flex-col justify-start items-start gap-4 sm:gap-6 lg:gap-4" style={{ boxShadow: '0px -80px 100px 0px rgba(0,0,0,0.12)' }}>
            {/* Heading */}
            <div className="w-full">
              <div className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-bold leading-[40px] sm:leading-[48px] md:leading-[56px] lg:leading-[64px] font-serif">
                <span className="text-violet-800">{aboutContent.heading.part1}</span>
                <span className="text-zinc-800">{aboutContent.heading.part2}</span>
              </div>
            </div>

            {/* Description */}
            <div className="w-full text-base sm:text-lg md:text-xl lg:text-2xl leading-6 sm:leading-7 lg:leading-7 font-serif">
              <span className="text-neutral-700 font-normal">
                {aboutContent.description.part1}
              </span>
              <span className="text-red-600 font-normal">
                {aboutContent.description.part2}
              </span>
              <span className="text-neutral-700 font-normal">
                {aboutContent.description.part3}
              </span>
            </div>

            {/* Features Grid */}
            <div className="w-full p-4 sm:p-6 lg:p-8 bg-gray-100 rounded-t-[40px] sm:rounded-t-[48px] lg:rounded-t-[64px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {aboutContent.features.map((feature, index) => (
                <div key={index} className="flex flex-col justify-start items-center gap-2">
                  {/* Feature Title with Icon */}
                  <div className="flex justify-center items-center gap-1.5">
                    <div className="w-5 h-5 relative flex-shrink-0">
                      <div className="w-5 h-5 left-0 top-0 absolute bg-lime-200 rounded-[10px] border border-violet-800"></div>
                      <div className="w-3.5 h-3.5 left-[3px] top-[5px] absolute bg-amber-200 rounded-full"></div>
                      <div className="w-2.5 h-2 left-[4.58px] top-[6.02px] absolute bg-violet-200 outline outline-1 outline-offset-[-0.54px] outline-violet-800"></div>
                    </div>
                    <div className="text-neutral-700 text-base sm:text-lg lg:text-xl font-semibold leading-6 font-serif">
                      {feature.title}
                    </div>
                  </div>
                  {/* Feature Description */}
                  <div className="text-center text-neutral-700 text-base sm:text-base lg:text-xl font-normal leading-6 font-serif">
                    {feature.description}
                  </div>
                </div>
              ))}
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
