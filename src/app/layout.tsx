import type { Metadata } from 'next'
import { Playfair_Display, Raleway } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Providers } from './providers'

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
})

const raleway = Raleway({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-raleway',
})

export const metadata: Metadata = {
  title: 'LuxeStore | Premium Clothing',
  description: 'Luxury clothing store with premium quality products',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${playfair.variable} ${raleway.variable} font-sans bg-primary text-text-primary min-h-screen flex flex-col`}>
        <Providers>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}