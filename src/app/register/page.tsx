'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { FiUser, FiMail, FiLock } from 'react-icons/fi'
import { useAuth } from '@/context/AuthContext'

const RegisterPage = () => {
  const router = useRouter()
  const { register } = useAuth()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [registerError, setRegisterError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))

    // Clear error when field is edited
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }

    // Clear register error when any field changes
    if (registerError) {
      setRegisterError('')
    }
  }

  const validateForm = () => {
    const errors: Record<string, string> = {}

    if (!formData.name.trim()) {
      errors.name = 'Name is required'
    }

    if (!formData.email) {
      errors.email = 'Email is required'
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address'
    }

    if (!formData.password) {
      errors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters'
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match'
    }

    if (!formData.agreeTerms) {
      errors.agreeTerms = 'You must agree to the Terms of Service'
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setRegisterError('')

    try {
      // For demo purposes, we'll use a simple registration
      // In a real app, this would be an API call to your backend
      const success = await register(formData.name, formData.email, formData.password)

      if (success) {
        router.push('/account')
      } else {
        setRegisterError('Registration failed. Email may already be in use.')
      }
    } catch (error) {
      setRegisterError('An error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="py-16 bg-primary animate-fadeIn">
      <div className="container-custom max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-secondary p-8"
        >
          <h1 className="text-3xl font-serif font-medium text-center mb-8">Create Account</h1>

          {registerError && (
            <div className="bg-red-900/30 border border-red-800 text-red-400 px-4 py-3 rounded mb-6">
              {registerError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm uppercase tracking-wider mb-2">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-text-secondary">
                  <FiUser />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`input-field pl-10 w-full ${formErrors.name ? 'border-red-500' : ''}`}
                  placeholder="John Doe"
                />
              </div>
              {formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm uppercase tracking-wider mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-text-secondary">
                  <FiMail />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`input-field pl-10 w-full ${formErrors.email ? 'border-red-500' : ''}`}
                  placeholder="your@email.com"
                />
              </div>
              {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-text-secondary">
                  <FiLock />
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`input-field pl-10 w-full ${formErrors.password ? 'border-red-500' : ''}`}
                  placeholder="••••••••"
                />
              </div>
              {formErrors.password && <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>}
              <p className="text-text-secondary text-xs mt-1">Must be at least 8 characters</p>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm uppercase tracking-wider mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-text-secondary">
                  <FiLock />
                </div>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`input-field pl-10 w-full ${formErrors.confirmPassword ? 'border-red-500' : ''}`}
                  placeholder="••••••••"
                />
              </div>
              {formErrors.confirmPassword && <p className="text-red-500 text-sm mt-1">{formErrors.confirmPassword}</p>}
            </div>

            <div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    type="checkbox"
                    id="agreeTerms"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    className="w-4 h-4 bg-gray-700 border-gray-600 rounded focus:ring-accent focus:ring-1"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="agreeTerms">
                    I agree to the{' '}
                    <Link href="/terms" className="text-accent hover:underline">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link href="/privacy" className="text-accent hover:underline">
                      Privacy Policy
                    </Link>
                  </label>
                  {formErrors.agreeTerms && <p className="text-red-500 text-sm mt-1">{formErrors.agreeTerms}</p>}
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary w-full flex items-center justify-center"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </button>

            <div className="text-center">
              <p className="text-text-secondary text-sm">
                Already have an account?{' '}
                <Link href="/login" className="text-accent hover:underline">
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

export default RegisterPage