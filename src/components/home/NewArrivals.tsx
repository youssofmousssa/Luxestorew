'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'
import { useCart } from '@/context/CartContext'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// Sample new arrivals data
const newArrivals = [
  {
    id: '101',
    name: 'Velvet Evening Gown',
    category: 'Women',
    price: 349.99,
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=2030&auto=format&fit=crop',
    slug: 'velvet-evening-gown',
    isNew: true,
  },
  {
    id: '102',
    name: 'Italian Leather Jacket',
    category: 'Men',
    price: 599.99,
    image: 'https://images.unsplash.com/photo-1520975954732-35dd22299614?q=80&w=1974&auto=format&fit=crop',
    slug: 'italian-leather-jacket',
    isNew: true,
  },
  {
    id: '103',
    name: 'Designer Sunglasses',
    category: 'Accessories',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1980&auto=format&fit=crop',
    slug: 'designer-sunglasses',
    isNew: true,
  },
  {
    id: '104',
    name: 'Silk Blouse',
    category: 'Women',
    price: 179.99,
    image: 'https://images.unsplash.com/photo-1551163943-3f7fffb9d770?q=80&w=2070&auto=format&fit=crop',
    slug: 'silk-blouse',
    isNew: true,
  },
  {
    id: '105',
    name: 'Cashmere Scarf',
    category: 'Accessories',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?q=80&w=1974&auto=format&fit=crop',
    slug: 'cashmere-scarf',
    isNew: true,
  },
  {
    id: '106',
    name: 'Tailored Dress Shirt',
    category: 'Men',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=1925&auto=format&fit=crop',
    slug: 'tailored-dress-shirt',
    isNew: true,
  },
]

const NewArrivals = () => {
  const { addToCart } = useCart()
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    })
  }

  return (
    <section ref={sectionRef} className="py-20 bg-primary">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h2 className="section-title">New Arrivals</h2>
            <p className="text-text-secondary max-w-xl">
              Be the first to discover our latest additions to the collection.
            </p>
          </div>
          <div className="flex space-x-4 mt-6 md:mt-0">
            <button className="swiper-button-prev-custom w-12 h-12 border border-accent/50 flex items-center justify-center text-accent hover:bg-accent hover:text-primary transition-colors duration-300">
              <FiArrowLeft />
            </button>
            <button className="swiper-button-next-custom w-12 h-12 border border-accent/50 flex items-center justify-center text-accent hover:bg-accent hover:text-primary transition-colors duration-300">
              <FiArrowRight />
            </button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            navigation={{
              prevEl: '.swiper-button-prev-custom',
              nextEl: '.swiper-button-next-custom',
            }}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            className="new-arrivals-swiper"
          >
            {newArrivals.map((product) => (
              <SwiperSlide key={product.id}>
                <div className="card overflow-hidden group h-full">
                  {/* Product Image */}
                  <div className="relative h-80 overflow-hidden mb-4">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* New Tag */}
                    {product.isNew && (
                      <span className="absolute top-4 left-4 bg-accent text-primary text-xs uppercase tracking-wider py-1 px-2 z-10">
                        New
                      </span>
                    )}
                    
                    {/* Add to Cart Button */}
                    <div className="absolute bottom-0 left-0 right-0 bg-black/70 py-3 px-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="w-full bg-accent text-primary py-2 uppercase tracking-wider text-sm hover:bg-accent-light transition-colors duration-300"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                  
                  {/* Product Info */}
                  <div className="px-2 pb-4">
                    <span className="text-text-secondary text-sm">{product.category}</span>
                    <h3 className="font-medium text-lg mb-2">
                      <Link href={`/product/${product.slug}`} className="hover:text-accent transition-colors duration-300">
                        {product.name}
                      </Link>
                    </h3>
                    <p className="text-accent font-medium">${product.price.toFixed(2)}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link href="/shop/new-arrivals" className="btn-secondary">
            View All New Arrivals
          </Link>
        </div>
      </div>
    </section>
  )
}

export default NewArrivals