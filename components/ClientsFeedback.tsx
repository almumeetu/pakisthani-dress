"use client"
import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'

const IMAGES = [
    '/images/review-1.png',
    '/images/review-2.png',
    '/images/review-3.png',
    '/images/review1.png',
    '/images/review2.png',
]

export default function ClientsFeedback() {
    const swiperRef = useRef<any>(null)

    return (
        <section className="w-full overflow-hidden bg-white pb-[180px]">
            <div className="bg-white max-w-[1440px] mx-auto px-6 md:px-8 text-center pt-12 sm:pt-20 md:pt-[140px]">
                <h2 className="text-zinc-800 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-['Li_Ador_Noirrit'] leading-tight">গ্রাহকের মতামত</h2>
                <p className="mt-4 text-neutral-700 text-base sm:text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto">
                    আমাদের গ্রাহকরা সবসময়ই আমাদের অভিজ্ঞতা নিয়ে সন্তুষ্ট! প্রথম যোগাযোগ থেকে শুরু করে চূড়ান্ত ডেলিভারি পর্যন্ত <span className="text-violet-800 font-semibold">আমরা সর্বোচ্চ মানের সেবা ও পণ্য দেওয়ার চেষ্টা করি,</span> যা প্রত্যাশার থেকেও বেশি আনন্দ দেয়।
                </p>

                <div className="relative py-16 flex justify-center items-center">
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center pointer-events-none">
                        <div className="w-[220px] h-[220px] rounded-full bg-white opacity-70 filter blur-[40px] -z-10" />
                    </div>
                    <div className="z-10 flex gap-4">
                        <button
                            type="button"
                            onClick={() => swiperRef.current?.slidePrev()}
                            aria-label="prev"
                            className="w-12 h-12 md:w-14 md:h-14 bg-black text-white rounded-full flex items-center justify-center shadow-lg cursor-pointer"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        <button
                            type="button"
                            onClick={() => swiperRef.current?.slideNext()}
                            aria-label="next"
                            className="w-12 h-12 md:w-14 md:h-14 bg-black text-white rounded-full flex items-center justify-center shadow-lg cursor-pointer"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div className="w-full">
                <Swiper
                    modules={[Autoplay]}
                    onSwiper={(s) => (swiperRef.current = s)}
                    className="continuous-swiper"
                    loop={true}
                    slidesPerView={'auto'}
                    spaceBetween={24}
                    centeredSlides={false}
                    autoplay={{
                        delay: 0,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: false,
                    }}
                    speed={8000}
                >
                    {[...IMAGES, ...IMAGES].map((src, idx) => (
                        <SwiperSlide key={idx} style={{ width: 320 }}>
                            <div className="w-[320px] h-[480px] md:w-[320px] md:h-[498px] mx-auto">
                                <img src={src} alt={`review-${idx}`} className="w-full h-full object-cover rounded-sm" />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    )
}

