import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Collection from '@/components/Collection'
import AboutComponent from '@/components/About'
import FAQ from '@/components/Faq'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <AboutComponent />
      <Collection />
      <FAQ />
      <Footer />
    </main>
  )
}
