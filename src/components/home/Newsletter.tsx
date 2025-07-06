'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Basic email validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address')
      return
    }

    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true)
      setEmail('')
    }, 500)
  }

  return (
    <section className="py-20 bg-primary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#d4af37" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-medium mb-6">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
            Stay updated with our latest collections, exclusive offers, and style inspiration delivered directly to your inbox.
          </p>

          {isSubmitted ? (
            <div className="bg-accent/10 border border-accent p-6 rounded-none">
              <p className="text-accent font-medium">
                Thank you for subscribing! We've sent a confirmation email to your inbox.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto">
              <div className="flex-grow">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="input-field h-12"
                  aria-label="Email address"
                />
                {error && <p className="text-red-500 text-sm mt-2 text-left">{error}</p>}
              </div>
              <button
                type="submit"
                className="btn-primary h-12 whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          )}

          <p className="text-text-secondary text-sm mt-6">
            By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default Newsletter