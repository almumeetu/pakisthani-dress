'use client'

import { useState } from 'react'
import { FaPlus, FaMinus } from 'react-icons/fa'
import { faqContent } from '@/data/faqContent'
import WhatsAppButton from './WhatsAppButton'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index)
  }

  return (
    <section className="w-full bg-violet-100 overflow-hidden">
      <div className="flex justify-center items-start w-full">
        <div className="w-full max-w-[1440px] flex flex-col lg:flex-row justify-start items-center gap-0">

          {/* Left Section (Contact Info Card) */}
          <div className="w-full lg:w-[40%] py-10 lg:py-20 flex justify-center lg:justify-start items-start px-4 sm:px-8 z-10">
            <div className="w-full max-w-lg p-6 sm:p-8 bg-violet-800 rounded-[24px] sm:rounded-[32px] flex flex-col justify-start items-start gap-6 sm:gap-8 shadow-xl">
              <div className="w-full flex flex-col justify-center items-start gap-4">
                <h2 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight lg:leading-[64px]">
                  {faqContent.leftSection.heading}
                </h2>
                <p className="w-full text-lg sm:text-xl lg:text-2xl leading-relaxed">
                  <span className="text-white font-normal">
                    {faqContent.leftSection.description.part1}
                  </span>
                  <span className="text-amber-200 font-semibold mx-1">
                    {faqContent.leftSection.description.part2}
                  </span>
                  <span className="text-white font-normal">
                    {faqContent.leftSection.description.part3}
                  </span>
                </p>
              </div>

              {/* WhatsApp Button - Full width on small mobile */}
              <div className="w-full overflow-visible">
                <WhatsAppButton
                  phoneNumber={faqContent.leftSection.contact.number}
                  labelText={faqContent.leftSection.contact.label}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Right Section (Accordion List) */}
          {/* Mobile এ নেগেটিভ মার্জিন রিমুভ করা হয়েছে (lg:ml-[-100px]) */}
          <div className="flex-1 py-12 lg:py-44 px-6 sm:px-12 lg:pl-32 lg:pr-16 bg-neutral-100 flex flex-col justify-start items-stretch lg:ml-[-100px] z-0">
            {faqContent.faqs.map((faq, index) => (
              <div
                key={index}
                className="w-full py-5 sm:py-6 border-b border-zinc-300 transition-all duration-300 ease-in-out hover:bg-zinc-50 last:border-b-0"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-start gap-4 sm:gap-6 text-left group"
                >
                  <div className="flex-1 flex flex-col justify-start items-start gap-0 min-w-0">
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold leading-snug text-zinc-800 group-hover:text-violet-800 transition-colors duration-200 break-words">
                      {faq.question}
                    </h3>
                    <div
                      className={`w-full overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index
                          ? 'max-h-96 opacity-100 mt-4'
                          : 'max-h-0 opacity-0 mt-0'
                        }`}
                    >
                      <p className="text-base sm:text-lg lg:text-xl font-normal leading-relaxed text-neutral-700">
                        {faq.answer}
                      </p>
                    </div>
                  </div>

                  <div className="mt-1 w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0 flex items-center justify-center bg-zinc-200 rounded-full group-hover:bg-violet-200 transition-colors">
                    {openIndex === index ? (
                      <FaMinus className="w-3 h-3 sm:w-4 sm:h-4 text-violet-800" />
                    ) : (
                      <FaPlus className="w-3 h-3 sm:w-4 sm:h-4 text-neutral-900" />
                    )}
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}