'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

const heroSlides = [
  {
    id: 1,
    title: 'Luxury Redefined',
    subtitle: 'Fall/Winter Collection 2023',
    description: 'Elevate your style with our premium luxury clothing collection.',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop',
    cta: 'Shop Collection',
    link: '/shop/winter-collection',
  },
  {
    id: 2,
    title: 'Elegance in Black',
    subtitle: 'Exclusive Designer Pieces',
    description: 'Discover our handcrafted designer pieces made with premium materials.',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2020&auto=format&fit=crop',
    cta: 'Explore Now',
    link: '/shop/designer-collection',
  },
  {
    id: 3,
    title: 'Timeless Sophistication',
    subtitle: 'Signature Collection',
    description: 'Invest in timeless pieces that transcend seasonal trends.',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=2074&auto=format&fit=crop',
    cta: 'Discover More',
    link: '/shop/signature-collection',
  },
]

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1))
    }, 6000)

    return () => clearInterval(interval)
  }, [])

  const handleDotClick = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Hero Slides */}
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        >
          {/* Background Image */}
          <div className="absolute inset-0 bg-black/40 z-10" />
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            priority
            className="object-cover"
          />

          {/* Content */}
          <div className="relative z-20 h-full flex items-center">
            <div className="container-custom">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={index === currentSlide ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="max-w-2xl"
              >
                <span className="text-accent uppercase tracking-widest mb-4 block">
                  {slide.subtitle}
                </span>
                <h2 className="text-4xl md:text-6xl font-serif font-medium mb-6">
                  {slide.title}
                </h2>
                <p className="text-lg mb-8 text-gray-200 max-w-lg">
                  {slide.description}
                </p>
                <Link href={slide.link} className="btn-primary">
                  {slide.cta}
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-0 right-0 z-30 flex justify-center space-x-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-accent w-8' : 'bg-white/50'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

export default Hero