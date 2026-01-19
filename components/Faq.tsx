'use client'

import { useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { faqContent } from '@/data/faqContent'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index)
  }

  return (
    <section className="w-full bg-violet-100 py-12 sm:py-16 md:py-24 lg:py-32">
      <div className="flex justify-center items-start w-full px-4 sm:px-6 md:px-8">
        <div className="w-full max-w-7xl flex flex-col lg:flex-row justify-start items-center gap-6 md:gap-8 lg:gap-12">
          {/* Left Section - Card */}
          <div className="w-full lg:w-96 flex justify-center lg:justify-start items-start pt-6 md:pt-12 lg:pt-16">
            <div className="w-full max-w-sm p-6 sm:p-8 bg-violet-800 rounded-2xl sm:rounded-3xl lg:rounded-[32px] flex flex-col justify-start items-start gap-6 sm:gap-8">
              {/* Heading */}
              <div className="w-full flex flex-col justify-start items-start gap-3 sm:gap-4">
                <h2 className="text-white text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight sm:leading-[56px] lg:leading-[64px] font-['Li_Ador_Noirrit']">
                  {faqContent.leftSection.heading}
                </h2>

                {/* Description */}
                <p className="w-full text-base sm:text-lg lg:text-2xl leading-6 sm:leading-[28px] lg:leading-7 font-['Li_Ador_Noirrit']">
                  <span className="text-white font-normal">
                    {faqContent.leftSection.description.part1}
                  </span>
                  <span className="text-amber-200 font-semibold">
                    {faqContent.leftSection.description.part2}
                  </span>
                  <span className="text-white font-normal">
                    {faqContent.leftSection.description.part3}
                  </span>
                </p>
              </div>

              {/* Contact Button */}
              <a
                href={`https://wa.me/${faqContent.leftSection.contact.number.replace(/\s/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full px-5 sm:px-7 py-2 sm:py-3 bg-white rounded-lg outline outline-2 outline-offset-[-2px] outline-green-500 inline-flex justify-start items-center gap-2 sm:gap-2.5 hover:bg-gray-100 active:bg-gray-200 transition-all duration-200 group"
              >
                <div className="flex-1">
                  <div className="text-green-500 text-xs sm:text-sm font-normal leading-4 sm:leading-5 font-['Li_Ador_Noirrit'] underline">
                    {faqContent.leftSection.contact.label}
                  </div>
                  <div className="text-green-500 text-2xl sm:text-3xl font-semibold leading-7 sm:leading-8 font-['Li_Ador_Noirrit']">
                    {faqContent.leftSection.contact.number}
                  </div>
                </div>
                <FaWhatsapp className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
              </a>
            </div>
          </div>

          {/* Right Section - FAQ List */}
          <div className="w-full lg:flex-1 flex flex-col justify-start items-stretch">
            <div className="w-full bg-neutral-100 rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm">
              <div className="flex flex-col divide-y divide-zinc-200">
                {faqContent.faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="w-full transition-all duration-300 ease-in-out hover:bg-zinc-50"
                  >
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full px-5 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 flex justify-between items-start gap-4 text-left group"
                    >
                      {/* Question */}
                      <div className="flex-1 flex flex-col justify-start items-start gap-0 min-w-0">
                        <h3 className="text-lg sm:text-2xl lg:text-3xl font-semibold font-['Li_Ador_Noirrit'] leading-6 sm:leading-7 lg:leading-8 text-zinc-800 group-hover:text-violet-800 transition-colors duration-200 break-words">
                          {faq.question}
                        </h3>

                        {/* Answer - Smooth Animation */}
                        <div
                          className={`w-full overflow-hidden transition-all duration-300 ease-in-out ${
                            openIndex === index
                              ? 'max-h-96 opacity-100 mt-3 sm:mt-4'
                              : 'max-h-0 opacity-0 mt-0'
                          }`}
                        >
                          <p className="text-base sm:text-lg lg:text-xl font-normal font-['Li_Ador_Noirrit'] leading-6 sm:leading-7 text-neutral-700 pb-2">
                            {faq.answer}
                          </p>
                        </div>
                      </div>

                      {/* Toggle Icon */}
                      <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center mt-1">
                        <div className="relative w-6 h-6 flex items-center justify-center">
                          {/* Horizontal Line - Always Present */}
                          <div
                            className={`absolute w-3.5 h-0.5 bg-zinc-800 group-hover:bg-violet-800 transition-all duration-300 ${
                              openIndex === index ? 'rotate-0' : 'rotate-0'
                            }`}
                          ></div>

                          {/* Vertical Line - Toggle */}
                          <div
                            className={`absolute w-0.5 h-3.5 bg-zinc-800 group-hover:bg-violet-800 transition-all duration-300 ${
                              openIndex === index
                                ? 'opacity-0 scale-0'
                                : 'opacity-100 scale-100'
                            }`}
                          ></div>
                        </div>
                      </div>
                    </button>
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