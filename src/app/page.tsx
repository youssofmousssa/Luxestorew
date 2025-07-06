import Hero from '@/components/home/Hero'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import Categories from '@/components/home/Categories'
import NewArrivals from '@/components/home/NewArrivals'
import Testimonials from '@/components/home/Testimonials'
import Newsletter from '@/components/home/Newsletter'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'LuxeStore | Luxury Clothing Brand',
  description: 'Discover premium clothing at LuxeStore. Elevate your style with our luxury collection.',
}

export default async function Home() {
  return (
    <div className="animate-fadeIn">
      <Hero />
      <Categories />
      <FeaturedProducts />
      <NewArrivals />
      <Testimonials />
      <Newsletter />
    </div>
  )
}