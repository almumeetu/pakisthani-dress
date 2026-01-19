import Image from 'next/image'

// Hero Section Content
const heroContent = {
  logo: {
    src: '/images/Logo.svg',
    alt: 'NeoComerz Logo',
    width: 200,
    height: 60,
  },
  background: {
    src: '/images/hero-bg.webp',
    alt: 'Pakistani Dress Collection Background',
  },
  headlines: {
    primary: 'প্রিমিয়াম',
    secondary: 'Pakistani Dress',
  },
  description: {
    line1: 'সেই ডিজাইন—যেটা পরলে আলাদা করে কিছু বলার দরকার পড়ে না.',
    line2: 'ফ্যাশন-লাভারদের নতুন obsession',
  },
  cta: {
    text: 'এখনই অর্ডার করুন',
  },
}

export default function Hero() {
  return (
    <section className="relative ">
      {/* Hero Background Image */}
      <div className="image-container">
        <Image
          src={heroContent.background.src}
          alt={heroContent.background.alt}
          fill
          className="object-cover object-center hero-bg-mobile"
          priority
          quality={90}
        />
      </div>

      <div className="relative z-10 container mx-auto max-w-[1440px] flex">
        <div className="w-full max-w-[720px] px-4 sm:px-8 pt-6 sm:pt-12 md:pt-16 pb-12 sm:pb-24 md:pb-32 flex flex-col justify-start items-start gap-6 sm:gap-12 md:gap-16">
          
          {/* Logo */}
          <div className="flex justify-start items-center mb-12 sm:mb-20 md:mb-32">
            <Image
              src={heroContent.logo.src}
              alt={heroContent.logo.alt}
              width={heroContent.logo.width}
              height={heroContent.logo.height}
              className="h-10 sm:h-14 md:h-16 w-auto hero-logo"
              priority
            />
          </div>

      
          {/* Main Content */}
          <div className="self-stretch inline-flex flex-col justify-start items-start gap-8 sm:gap-12 md:gap-16">
            
            {/* Headlines */}
            <div className="self-stretch flex flex-col justify-start items-start">
              <div className="justify-start text-zinc-800 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-bengali leading-[1.2] md:leading-[96px]">
                {heroContent.headlines.primary}
              </div>
              <div className="self-stretch justify-start text-violet-800 text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold font-['Li_Ador_Noirrit'] leading-[1.2] md:leading-[72px]">
                {heroContent.headlines.secondary}
              </div>
            </div>

            {/* Description */}
            <div className="self-stretch justify-start text-zinc-800 text-base sm:text-lg md:text-xl lg:text-2xl font-semibold font-bengali leading-[1.5] md:leading-7">
              {heroContent.description.line1}{' '}
              <br className="hidden sm:block" />{' '}
              {heroContent.description.line2}
            </div>

            {/* CTA Button */}
            <div className="px-5 sm:px-6 md:px-7 py-2.5 sm:py-3 md:py-3.5 bg-red-600 rounded-lg inline-flex justify-center items-center gap-2 hover:bg-red-700 transition-colors cursor-pointer">
              <div className="justify-start text-white text-xl sm:text-2xl md:text-3xl font-bold font-['Li_Ador_Noirrit']">
                {heroContent.cta.text}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
