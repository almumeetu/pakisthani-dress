import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Collection from '@/components/Collection'
import AboutComponent from '@/components/About'
import FAQ from '@/components/Faq'
import Footer from '@/components/Footer'
import SizeChart from '@/components/SizeChart'
import ClientsFeedback from '@/components/ClientsFeedback'
import OrderFormSection from '@/components/OrderFormSection'
import { Product } from '@/types/ProductType'
import sampleProduct from '@/data/sampleProduct'

async function getProducts(): Promise<Product | null> {
  try {
    const res = await fetch('https://pakisthanidress.dev-inventory.softzino.xyz/api/v1/products', {
      next: { revalidate: 60 }
    });
    if (!res.ok) {
      console.error('Failed to fetch products', res.status);
      // fallback to local sample product
      return sampleProduct;
    }

    const json = await res.json();
    // Check if the response has data property (common in Laravel)
    const products = Array.isArray(json.data) ? json.data : (Array.isArray(json) ? json : []);

    return products.length > 0 ? products[0] : sampleProduct;
  } catch (error) {
    console.error("Error fetching products:", error);
    // In case of network error return sample product so app still runs
    return sampleProduct;
  }
}

export default async function Home() {
  const product = await getProducts();

  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <AboutComponent />
      <Collection />
      <ClientsFeedback />
      <FAQ />
      <SizeChart />
      {product && <OrderFormSection apiProducts={product} />}
      <Footer />
    </main>
  )
}
