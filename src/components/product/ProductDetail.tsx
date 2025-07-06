'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FiMinus, FiPlus, FiHeart, FiShare2, FiShoppingBag, FiTruck, FiRefreshCw, FiShield } from 'react-icons/fi'
import { useCart } from '@/context/CartContext'

interface ProductDetailProps {
  product: any // Using any for simplicity, should be properly typed in a real project
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const { addToCart } = useCart()
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [selectedSize, setSelectedSize] = useState(product.sizes[0])
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(0)

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity,
      color: selectedColor,
      size: selectedSize,
    })
  }

  return (
    <section className="py-12 bg-primary">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="relative h-[600px] mb-4 overflow-hidden bg-secondary">
              <Image
                src={product.images[activeImage]}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {product.images.map((image: string, index: number) => (
                <button
                  key={index}
                  className={`relative h-24 bg-secondary ${index === activeImage ? 'ring-2 ring-accent' : ''}`}
                  onClick={() => setActiveImage(index)}
                >
                  <Image
                    src={image}
                    alt={`${product.name} - View ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-text-secondary text-sm uppercase tracking-wider">{product.category}</span>
              <h1 className="text-3xl md:text-4xl font-serif font-medium mt-2 mb-4">{product.name}</h1>
              <p className="text-2xl text-accent font-medium mb-6">${product.price.toFixed(2)}</p>
              
              <div className="mb-8">
                <p className="text-text-secondary">{product.description}</p>
              </div>

              {/* Color Selection */}
              <div className="mb-6">
                <h3 className="text-sm uppercase tracking-wider mb-3">Color: <span className="text-accent">{selectedColor}</span></h3>
                <div className="flex space-x-3">
                  {product.colors.map((color: string) => {
                    // Map color names to tailwind color classes
                    const colorClass = {
                      'Black': 'bg-black',
                      'White': 'bg-white',
                      'Navy': 'bg-blue-900',
                      'Burgundy': 'bg-red-900',
                      'Charcoal': 'bg-gray-700',
                    }[color] || 'bg-gray-500'

                    return (
                      <button
                        key={color}
                        className={`w-8 h-8 rounded-full ${colorClass} ${selectedColor === color ? 'ring-2 ring-offset-2 ring-accent' : ''}`}
                        onClick={() => setSelectedColor(color)}
                        aria-label={`Select ${color} color`}
                      />
                    )
                  })}
                </div>
              </div>

              {/* Size Selection */}
              <div className="mb-6">
                <h3 className="text-sm uppercase tracking-wider mb-3">Size: <span className="text-accent">{selectedSize}</span></h3>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size: string) => (
                    <button
                      key={size}
                      className={`w-12 h-12 flex items-center justify-center ${selectedSize === size ? 'bg-accent text-primary' : 'border border-gray-600 text-text-secondary hover:border-accent hover:text-accent'}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-8">
                <h3 className="text-sm uppercase tracking-wider mb-3">Quantity:</h3>
                <div className="flex items-center">
                  <button
                    className="w-10 h-10 border border-gray-600 flex items-center justify-center hover:border-accent hover:text-accent"
                    onClick={decreaseQuantity}
                    aria-label="Decrease quantity"
                  >
                    <FiMinus />
                  </button>
                  <span className="w-16 text-center">{quantity}</span>
                  <button
                    className="w-10 h-10 border border-gray-600 flex items-center justify-center hover:border-accent hover:text-accent"
                    onClick={increaseQuantity}
                    aria-label="Increase quantity"
                  >
                    <FiPlus />
                  </button>
                </div>
              </div>

              {/* Add to Cart & Wishlist */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button
                  className="btn-primary flex-1 flex items-center justify-center gap-2"
                  onClick={handleAddToCart}
                >
                  <FiShoppingBag />
                  Add to Cart
                </button>
                <button className="btn-secondary flex-1 flex items-center justify-center gap-2">
                  <FiHeart />
                  Add to Wishlist
                </button>
              </div>

              {/* Product Details */}
              <div className="border-t border-gray-800 pt-6">
                <h3 className="text-lg font-medium mb-4">Product Details</h3>
                <ul className="list-disc list-inside space-y-2 text-text-secondary">
                  {product.details.map((detail: string, index: number) => (
                    <li key={index}>{detail}</li>
                  ))}
                </ul>
              </div>

              {/* Shipping & Returns */}
              <div className="border-t border-gray-800 pt-6 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex flex-col items-center text-center p-4">
                    <FiTruck className="text-accent text-2xl mb-3" />
                    <h4 className="font-medium mb-1">Free Shipping</h4>
                    <p className="text-text-secondary text-sm">On orders over $200</p>
                  </div>
                  <div className="flex flex-col items-center text-center p-4">
                    <FiRefreshCw className="text-accent text-2xl mb-3" />
                    <h4 className="font-medium mb-1">Easy Returns</h4>
                    <p className="text-text-secondary text-sm">30 days return policy</p>
                  </div>
                  <div className="flex flex-col items-center text-center p-4">
                    <FiShield className="text-accent text-2xl mb-3" />
                    <h4 className="font-medium mb-1">Secure Checkout</h4>
                    <p className="text-text-secondary text-sm">100% protected payments</p>
                  </div>
                </div>
              </div>

              {/* Share */}
              <div className="border-t border-gray-800 pt-6 mt-6 flex items-center">
                <span className="text-sm uppercase tracking-wider mr-4">Share:</span>
                <div className="flex space-x-4">
                  <button className="text-text-secondary hover:text-accent transition-colors duration-300">
                    <FiShare2 />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductDetail