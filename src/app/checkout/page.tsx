'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FiArrowLeft, FiLock } from 'react-icons/fi'
import { useCart } from '@/context/CartContext'

const CheckoutPage = () => {
  const { cartItems, subtotal, clearCart } = useCart()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    paymentMethod: 'credit',
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)
  const [orderId, setOrderId] = useState('')

  const shipping = 15.00
  const tax = subtotal * 0.1 // 10% tax
  const total = subtotal + shipping + tax

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    // Clear error when field is edited
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const errors: Record<string, string> = {}
    const requiredFields = [
      'firstName', 'lastName', 'email', 'phone', 'address',
      'city', 'state', 'zipCode', 'country'
    ]

    requiredFields.forEach(field => {
      if (!formData[field as keyof typeof formData]) {
        errors[field] = 'This field is required'
      }
    })

    // Email validation
    if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address'
    }

    // Payment validation
    if (formData.paymentMethod === 'credit') {
      if (!formData.cardNumber) {
        errors.cardNumber = 'Card number is required'
      } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
        errors.cardNumber = 'Please enter a valid 16-digit card number'
      }

      if (!formData.cardName) {
        errors.cardName = 'Name on card is required'
      }

      if (!formData.expiry) {
        errors.expiry = 'Expiry date is required'
      } else if (!/^\d{2}\/\d{2}$/.test(formData.expiry)) {
        errors.expiry = 'Please use MM/YY format'
      }

      if (!formData.cvv) {
        errors.cvv = 'CVV is required'
      } else if (!/^\d{3,4}$/.test(formData.cvv)) {
        errors.cvv = 'Please enter a valid CVV'
      }
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    // Simulate order processing
    setTimeout(() => {
      // Generate random order ID
      const randomOrderId = 'LUX-' + Math.floor(100000 + Math.random() * 900000).toString()
      setOrderId(randomOrderId)
      setOrderComplete(true)
      clearCart()
      setIsSubmitting(false)
    }, 2000)
  }

  if (orderComplete) {
    return (
      <div className="py-20 bg-primary">
        <div className="container-custom max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-secondary p-8 md:p-12"
          >
            <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>

            <h1 className="text-3xl md:text-4xl font-serif font-medium mb-4">Order Confirmed!</h1>
            <p className="text-text-secondary mb-6">Thank you for your purchase. Your order has been received and is now being processed.</p>
            
            <div className="bg-primary p-6 mb-8">
              <p className="text-lg mb-2">Order Number: <span className="text-accent font-medium">{orderId}</span></p>
              <p className="text-text-secondary">A confirmation email has been sent to {formData.email}</p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/shop" className="btn-secondary">
                Continue Shopping
              </Link>
              <Link href="/" className="btn-primary">
                Back to Home
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="py-20 bg-primary">
        <div className="container-custom text-center">
          <h1 className="text-3xl md:text-4xl font-serif font-medium mb-6">Your Cart is Empty</h1>
          <p className="text-text-secondary mb-8">You need to add items to your cart before proceeding to checkout.</p>
          <Link href="/shop" className="btn-primary inline-flex items-center gap-2">
            Continue Shopping
            <FiArrowLeft />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="py-12 bg-primary animate-fadeIn">
      <div className="container-custom">
        <div className="flex items-center mb-8">
          <Link href="/cart" className="text-text-secondary hover:text-accent transition-colors duration-300 flex items-center gap-2">
            <FiArrowLeft />
            Back to Cart
          </Link>
        </div>

        <h1 className="text-3xl md:text-4xl font-serif font-medium mb-12">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Shipping Information */}
              <div className="bg-secondary p-6">
                <h2 className="text-xl font-serif font-medium mb-6">Shipping Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm uppercase tracking-wider mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`input-field w-full ${formErrors.firstName ? 'border-red-500' : ''}`}
                    />
                    {formErrors.firstName && <p className="text-red-500 text-sm mt-1">{formErrors.firstName}</p>}
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-sm uppercase tracking-wider mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`input-field w-full ${formErrors.lastName ? 'border-red-500' : ''}`}
                    />
                    {formErrors.lastName && <p className="text-red-500 text-sm mt-1">{formErrors.lastName}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm uppercase tracking-wider mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`input-field w-full ${formErrors.email ? 'border-red-500' : ''}`}
                    />
                    {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm uppercase tracking-wider mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`input-field w-full ${formErrors.phone ? 'border-red-500' : ''}`}
                    />
                    {formErrors.phone && <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>}
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="address" className="block text-sm uppercase tracking-wider mb-2">
                      Address *
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className={`input-field w-full ${formErrors.address ? 'border-red-500' : ''}`}
                    />
                    {formErrors.address && <p className="text-red-500 text-sm mt-1">{formErrors.address}</p>}
                  </div>

                  <div>
                    <label htmlFor="city" className="block text-sm uppercase tracking-wider mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={`input-field w-full ${formErrors.city ? 'border-red-500' : ''}`}
                    />
                    {formErrors.city && <p className="text-red-500 text-sm mt-1">{formErrors.city}</p>}
                  </div>

                  <div>
                    <label htmlFor="state" className="block text-sm uppercase tracking-wider mb-2">
                      State/Province *
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className={`input-field w-full ${formErrors.state ? 'border-red-500' : ''}`}
                    />
                    {formErrors.state && <p className="text-red-500 text-sm mt-1">{formErrors.state}</p>}
                  </div>

                  <div>
                    <label htmlFor="zipCode" className="block text-sm uppercase tracking-wider mb-2">
                      ZIP/Postal Code *
                    </label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      className={`input-field w-full ${formErrors.zipCode ? 'border-red-500' : ''}`}
                    />
                    {formErrors.zipCode && <p className="text-red-500 text-sm mt-1">{formErrors.zipCode}</p>}
                  </div>

                  <div>
                    <label htmlFor="country" className="block text-sm uppercase tracking-wider mb-2">
                      Country *
                    </label>
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className={`input-field w-full ${formErrors.country ? 'border-red-500' : ''}`}
                    >
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Australia">Australia</option>
                      <option value="France">France</option>
                      <option value="Germany">Germany</option>
                      <option value="Japan">Japan</option>
                    </select>
                    {formErrors.country && <p className="text-red-500 text-sm mt-1">{formErrors.country}</p>}
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-secondary p-6">
                <h2 className="text-xl font-serif font-medium mb-6">Payment Method</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="credit"
                      name="paymentMethod"
                      value="credit"
                      checked={formData.paymentMethod === 'credit'}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <label htmlFor="credit" className="flex items-center">
                      Credit Card
                      <div className="flex ml-4 space-x-2">
                        <div className="w-10 h-6 bg-blue-600 rounded"></div>
                        <div className="w-10 h-6 bg-red-500 rounded"></div>
                        <div className="w-10 h-6 bg-yellow-400 rounded"></div>
                      </div>
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="paypal"
                      name="paymentMethod"
                      value="paypal"
                      checked={formData.paymentMethod === 'paypal'}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <label htmlFor="paypal" className="flex items-center">
                      PayPal
                      <div className="ml-4 w-16 h-6 bg-blue-800 rounded flex items-center justify-center text-white text-xs font-bold">
                        PayPal
                      </div>
                    </label>
                  </div>
                </div>

                {formData.paymentMethod === 'credit' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label htmlFor="cardNumber" className="block text-sm uppercase tracking-wider mb-2">
                        Card Number *
                      </label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        placeholder="1234 5678 9012 3456"
                        className={`input-field w-full ${formErrors.cardNumber ? 'border-red-500' : ''}`}
                      />
                      {formErrors.cardNumber && <p className="text-red-500 text-sm mt-1">{formErrors.cardNumber}</p>}
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="cardName" className="block text-sm uppercase tracking-wider mb-2">
                        Name on Card *
                      </label>
                      <input
                        type="text"
                        id="cardName"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleChange}
                        className={`input-field w-full ${formErrors.cardName ? 'border-red-500' : ''}`}
                      />
                      {formErrors.cardName && <p className="text-red-500 text-sm mt-1">{formErrors.cardName}</p>}
                    </div>

                    <div>
                      <label htmlFor="expiry" className="block text-sm uppercase tracking-wider mb-2">
                        Expiry Date *
                      </label>
                      <input
                        type="text"
                        id="expiry"
                        name="expiry"
                        value={formData.expiry}
                        onChange={handleChange}
                        placeholder="MM/YY"
                        className={`input-field w-full ${formErrors.expiry ? 'border-red-500' : ''}`}
                      />
                      {formErrors.expiry && <p className="text-red-500 text-sm mt-1">{formErrors.expiry}</p>}
                    </div>

                    <div>
                      <label htmlFor="cvv" className="block text-sm uppercase tracking-wider mb-2">
                        CVV *
                      </label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleChange}
                        placeholder="123"
                        className={`input-field w-full ${formErrors.cvv ? 'border-red-500' : ''}`}
                      />
                      {formErrors.cvv && <p className="text-red-500 text-sm mt-1">{formErrors.cvv}</p>}
                    </div>
                  </div>
                )}

                {formData.paymentMethod === 'paypal' && (
                  <p className="text-text-secondary text-sm">
                    You will be redirected to PayPal to complete your payment securely.
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="mt-8">
                <button
                  type="submit"
                  className="btn-primary w-full flex items-center justify-center gap-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      <FiLock />
                      Place Order
                    </>
                  )}
                </button>
                <p className="text-text-secondary text-sm text-center mt-4">
                  By placing your order, you agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-secondary p-6 sticky top-24">
              <h2 className="text-xl font-serif font-medium mb-6">Order Summary</h2>

              {/* Cart Items */}
              <div className="max-h-80 overflow-y-auto mb-6 pr-2 custom-scrollbar">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center py-3 border-b border-gray-800">
                    <div className="relative w-16 h-16 mr-4">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-medium text-sm">{item.name}</h3>
                      {item.color && item.size && (
                        <p className="text-text-secondary text-xs">
                          {item.color} / {item.size}
                        </p>
                      )}
                      <div className="flex justify-between mt-1">
                        <span className="text-text-secondary text-xs">{item.quantity} × ${item.price.toFixed(2)}</span>
                        <span className="text-sm">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Tax (10%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t border-gray-800 pt-3 font-medium">
                  <span>Total</span>
                  <span className="text-accent">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Secure Checkout */}
              <div className="bg-primary p-4 flex items-center justify-center text-sm text-text-secondary">
                <FiLock className="mr-2" />
                <span>Secure Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage