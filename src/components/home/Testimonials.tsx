'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import { FiStar } from 'react-icons/fi'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

// Sample testimonials data
const testimonials = [
  {
    id: 1,
    name: 'Sophia Reynolds',
    role: 'Fashion Influencer',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop',
    rating: 5,
    text: 'The quality of LuxeStore clothing is unmatched. Each piece feels luxurious and the attention to detail is remarkable. I\'ve received countless compliments on my outfits from their latest collection.',
  },
  {
    id: 2,
    name: 'James Wilson',
    role: 'Business Executive',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop',
    rating: 5,
    text: 'As someone who values quality and style, LuxeStore has become my go-to for professional attire. Their tailored suits are impeccably crafted and the customer service is exceptional.',
  },
  {
    id: 3,
    name: 'Emma Thompson',
    role: 'Art Director',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop',
    rating: 4,
    text: 'LuxeStore offers the perfect blend of contemporary design and timeless elegance. Their pieces have become staples in my wardrobe, versatile enough for both work and special occasions.',
  },
  {
    id: 4,
    name: 'Michael Chen',
    role: 'Photographer',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1974&auto=format&fit=crop',
    rating: 5,
    text: 'The aesthetic and quality of LuxeStore clothing is perfect for my photoshoots. The materials photograph beautifully and my clients are always impressed with the sophisticated look.',
  },
]

const Testimonials = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  return (
    <section ref={sectionRef} className="py-20 bg-secondary">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="section-title">What Our Customers Say</h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Discover why our customers love shopping at LuxeStore.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 2 },
            }}
            className="testimonials-swiper pb-12"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="bg-primary p-8 h-full flex flex-col">
                  <div className="flex items-center mb-6">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium text-lg">{testimonial.name}</h4>
                      <p className="text-text-secondary text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                  
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={i}
                        className={`${i < testimonial.rating ? 'text-accent' : 'text-gray-600'} w-5 h-5 fill-current`}
                      />
                    ))}
                  </div>
                  
                  <p className="text-text-secondary italic flex-grow">"{testimonial.text}"</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonials