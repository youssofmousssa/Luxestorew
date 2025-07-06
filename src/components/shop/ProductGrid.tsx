'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FiShoppingBag, FiHeart, FiEye } from 'react-icons/fi'
import { useCart } from '@/context/CartContext'

interface Product {
  id: string
  name: string
  category: string
  price: number
  image: string
  slug: string
  isNew?: boolean
}

interface ProductGridProps {
  products: Product[]
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  const { addToCart } = useCart()
  const [sortBy, setSortBy] = useState('featured')

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    })
  }

  // Sort products based on selected option
  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'name-asc':
        return a.name.localeCompare(b.name)
      case 'name-desc':
        return b.name.localeCompare(a.name)
      default:
        return 0 // featured - no sorting
    }
  })

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

  return (
    <div>
      {/* Sort Options */}
      <div className="flex justify-end mb-8">
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-secondary border-b border-accent/50 text-text-primary px-4 py-2 pr-8 appearance-none focus:outline-none focus:border-accent"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name-asc">Name: A to Z</option>
            <option value="name-desc">Name: Z to A</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-text-primary">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {sortedProducts.map((product) => (
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
                
                {/* New Tag */}
                {product.isNew && (
                  <span className="absolute top-4 left-4 bg-accent text-primary text-xs uppercase tracking-wider py-1 px-2 z-10">
                    New
                  </span>
                )}
                
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
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default ProductGrid