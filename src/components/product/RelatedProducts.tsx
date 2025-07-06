'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { FiShoppingBag } from 'react-icons/fi'
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

interface RelatedProductsProps {
  products: Product[]
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ products }) => {
  const { addToCart } = useCart()
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    })
  }

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

  if (products.length === 0) {
    return null
  }

  return (
    <section ref={sectionRef} className="py-16 bg-secondary">
      <div className="container-custom">
        <h2 className="section-title mb-12">You May Also Like</h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {products.map((product) => (
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
                  
                  {/* Add to Cart Button */}
                  <div className="absolute bottom-0 left-0 right-0 bg-black/70 py-3 px-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-full bg-accent text-primary py-2 uppercase tracking-wider text-sm hover:bg-accent-light transition-colors duration-300 flex items-center justify-center gap-2"
                    >
                      <FiShoppingBag />
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
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default RelatedProducts