import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import 'swiper/css'
import { StoreProvider } from '@/context/StoreContent'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'প্রিমিয়াম Pakistani Dress Collection',
  description: 'সেই ডিজাইন—যেটা পরলে আলাদা করে কিছু বলার দরকার পড়ে না. ফ্যাশন-লাভারদের নতুন obsession',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="bn">
      <body className={`${inter.className} bg-white`}>
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  )
}
