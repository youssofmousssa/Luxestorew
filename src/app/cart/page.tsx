'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FiTrash2, FiMinus, FiPlus, FiArrowRight } from 'react-icons/fi'
import { useCart } from '@/context/CartContext'

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, subtotal, clearCart } = useCart()
  const [couponCode, setCouponCode] = useState('')
  const [couponApplied, setCouponApplied] = useState(false)
  const [discount, setDiscount] = useState(0)

  const shipping = 15.00
  const total = subtotal + shipping - discount

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault()
    if (couponCode.toLowerCase() === 'luxe20') {
      setDiscount(subtotal * 0.2) // 20% discount
      setCouponApplied(true)
    } else {
      setDiscount(0)
      setCouponApplied(false)
      alert('Invalid coupon code')
    }
  }

  if (cartItems.length === 0) {
    return (
      <div className="py-20 bg-primary">
        <div className="container-custom text-center">
          <h1 className="text-3xl md:text-4xl font-serif font-medium mb-6">Your Cart is Empty</h1>
          <p className="text-text-secondary mb-8">Looks like you haven't added any items to your cart yet.</p>
          <Link href="/shop" className="btn-primary inline-flex items-center gap-2">
            Continue Shopping
            <FiArrowRight />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="py-12 bg-primary animate-fadeIn">
      <div className="container-custom">
        <h1 className="text-3xl md:text-4xl font-serif font-medium mb-12">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-secondary p-6">
              <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-gray-800 text-sm uppercase tracking-wider">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Total</div>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {cartItems.map((item) => (
                  <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 py-6 border-b border-gray-800 items-center">
                    {/* Product */}
                    <div className="col-span-1 md:col-span-6 flex items-center">
                      <div className="relative w-20 h-20 mr-4">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        {item.color && item.size && (
                          <p className="text-text-secondary text-sm">
                            {item.color} / {item.size}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Price */}
                    <div className="col-span-1 md:col-span-2 text-left md:text-center">
                      <span className="md:hidden text-text-secondary mr-2">Price:</span>
                      <span>${item.price.toFixed(2)}</span>
                    </div>

                    {/* Quantity */}
                    <div className="col-span-1 md:col-span-2 flex items-center justify-start md:justify-center">
                      <span className="md:hidden text-text-secondary mr-2">Quantity:</span>
                      <div className="flex items-center">
                        <button
                          className="w-8 h-8 border border-gray-600 flex items-center justify-center hover:border-accent hover:text-accent"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          aria-label="Decrease quantity"
                        >
                          <FiMinus />
                        </button>
                        <span className="w-10 text-center">{item.quantity}</span>
                        <button
                          className="w-8 h-8 border border-gray-600 flex items-center justify-center hover:border-accent hover:text-accent"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          aria-label="Increase quantity"
                        >
                          <FiPlus />
                        </button>
                      </div>
                    </div>

                    {/* Total */}
                    <div className="col-span-1 md:col-span-2 flex items-center justify-between md:justify-end">
                      <span className="md:hidden text-text-secondary mr-2">Total:</span>
                      <div className="flex items-center">
                        <span className="mr-4">${(item.price * item.quantity).toFixed(2)}</span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-text-secondary hover:text-accent transition-colors duration-300"
                          aria-label="Remove item"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Cart Actions */}
              <div className="flex flex-col sm:flex-row justify-between items-center mt-8">
                <button
                  onClick={clearCart}
                  className="text-text-secondary hover:text-accent transition-colors duration-300 flex items-center gap-2 mb-4 sm:mb-0"
                >
                  <FiTrash2 />
                  Clear Cart
                </button>
                <Link href="/shop" className="btn-secondary">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-secondary p-6">
              <h2 className="text-xl font-serif font-medium mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-accent">
                    <span>Discount (20%)</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between border-t border-gray-800 pt-4 font-medium">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Coupon Code */}
              <form onSubmit={handleApplyCoupon} className="mb-6">
                <label htmlFor="coupon" className="block text-sm uppercase tracking-wider mb-2">
                  Coupon Code
                </label>
                <div className="flex">
                  <input
                    type="text"
                    id="coupon"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter coupon code"
                    className="input-field flex-grow"
                    disabled={couponApplied}
                  />
                  <button
                    type="submit"
                    className="bg-accent text-primary px-4 hover:bg-accent-light transition-colors duration-300 uppercase tracking-wider text-sm"
                    disabled={couponApplied}
                  >
                    Apply
                  </button>
                </div>
                {couponApplied && (
                  <p className="text-accent text-sm mt-2">Coupon applied successfully!</p>
                )}
                <p className="text-text-secondary text-sm mt-2">Try code: LUXE20 for 20% off</p>
              </form>

              {/* Checkout Button */}
              <Link href="/checkout" className="btn-primary w-full flex items-center justify-center gap-2">
                Proceed to Checkout
                <FiArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage