'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FiShoppingBag, FiHeart, FiEye } from 'react-icons/fi'
import { useCart } from '@/context/CartContext'

// Sample featured products data
const featuredProducts = [
  {
    id: '1',
    name: 'Silk Evening Dress',
    category: 'Women',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1983&auto=format&fit=crop',
    slug: 'silk-evening-dress',
  },
  {
    id: '2',
    name: 'Tailored Wool Suit',
    category: 'Men',
    price: 499.99,
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=2080&auto=format&fit=crop',
    slug: 'tailored-wool-suit',
  },
  {
    id: '3',
    name: 'Leather Crossbody Bag',
    category: 'Accessories',
    price: 189.99,
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=2076&auto=format&fit=crop',
    slug: 'leather-crossbody-bag',
  },
  {
    id: '4',
    name: 'Cashmere Sweater',
    category: 'Women',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1964&auto=format&fit=crop',
    slug: 'cashmere-sweater',
  },
]

const FeaturedProducts = () => {
  const { addToCart } = useCart()
  const [activeCategory, setActiveCategory] = useState('All')

  const categories = ['All', 'Men', 'Women', 'Accessories']

  const filteredProducts = activeCategory === 'All'
    ? featuredProducts
    : featuredProducts.filter(product => product.category === activeCategory)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

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
    <section className="py-20 bg-secondary">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="section-title">Featured Products</h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Discover our handpicked selection of premium clothing and accessories.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex border border-accent/30 p-1">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 text-sm uppercase tracking-wider transition-colors duration-300 ${activeCategory === category ? 'bg-accent text-primary' : 'text-text-secondary hover:text-accent'}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {filteredProducts.map((product) => (
            <motion.div key={product.id} variants={itemVariants} className="group">
              <div className="card overflow-hidden">
                {/* Product Image */}
                <div className="relative h-80 overflow-hidden mb-4">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Quick Actions Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 opacity-0 group-hover:opacity-100 flex items-center justify-center">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="w-10 h-10 rounded-full bg-white text-primary flex items-center justify-center hover:bg-accent transition-colors duration-300"
                        aria-label="Add to cart"
                      >
                        <FiShoppingBag />
                      </button>
                      <button
                        className="w-10 h-10 rounded-full bg-white text-primary flex items-center justify-center hover:bg-accent transition-colors duration-300"
                        aria-label="Add to wishlist"
                      >
                        <FiHeart />
                      </button>
                      <Link
                        href={`/product/${product.slug}`}
                        className="w-10 h-10 rounded-full bg-white text-primary flex items-center justify-center hover:bg-accent transition-colors duration-300"
                        aria-label="Quick view"
                      >
                        <FiEye />
                      </Link>
                    </div>
                  </div>
                </div>
                
                {/* Product Info */}
                <div className="px-2">
                  <span className="text-text-secondary text-sm">{product.category}</span>
                  <h3 className="font-medium text-lg mb-2">
                    <Link href={`/product/${product.slug}`} className="hover:text-accent transition-colors duration-300">
                      {product.name}
                    </Link>
                  </h3>
                  <p className="text-accent font-medium">${product.price.toFixed(2)}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link href="/shop" className="btn-secondary">
            View All Products
          </Link>
        </div>
      </div>
    </section>
  )
}

export default FeaturedProducts