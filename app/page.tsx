import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Collection from '@/components/Collection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <Collection />
      <Footer />
    </main>
  )
}
