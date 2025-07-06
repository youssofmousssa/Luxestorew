'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { FiLock, FiMail } from 'react-icons/fi'
import { useAuth } from '@/context/AuthContext'

const LoginPage = () => {
  const router = useRouter()
  const { login } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loginError, setLoginError] = useState('')

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

    // Clear login error when any field changes
    if (loginError) {
      setLoginError('')
    }
  }

  const validateForm = () => {
    const errors: Record<string, string> = {}

    if (!formData.email) {
      errors.email = 'Email is required'
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address'
    }

    if (!formData.password) {
      errors.password = 'Password is required'
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
    setLoginError('')

    try {
      // For demo purposes, we'll use a simple login check
      // In a real app, this would be an API call to your backend
      const success = await login(formData.email, formData.password)

      if (success) {
        router.push('/account')
      } else {
        setLoginError('Invalid email or password')
      }
    } catch (error) {
      setLoginError('An error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // For demo purposes, let's add a quick login function
  const handleDemoLogin = async () => {
    setIsSubmitting(true)
    setLoginError('')

    try {
      const success = await login('demo@luxestore.com', 'password123')

      if (success) {
        router.push('/account')
      } else {
        setLoginError('Demo login failed. Please try again.')
      }
    } catch (error) {
      setLoginError('An error occurred. Please try again.')
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
          <h1 className="text-3xl font-serif font-medium text-center mb-8">Sign In</h1>

          {loginError && (
            <div className="bg-red-900/30 border border-red-800 text-red-400 px-4 py-3 rounded mb-6">
              {loginError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
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
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="password" className="block text-sm uppercase tracking-wider">
                  Password
                </label>
                <Link href="/forgot-password" className="text-accent text-sm hover:underline">
                  Forgot Password?
                </Link>
              </div>
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
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="w-4 h-4 bg-gray-700 border-gray-600 rounded focus:ring-accent focus:ring-1"
              />
              <label htmlFor="rememberMe" className="ml-2 text-sm">
                Remember me
              </label>
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
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </button>

            <div className="text-center">
              <p className="text-text-secondary text-sm mb-4">
                Don't have an account?{' '}
                <Link href="/register" className="text-accent hover:underline">
                  Create Account
                </Link>
              </p>

              <div className="relative flex items-center justify-center">
                <div className="border-t border-gray-800 w-full absolute"></div>
                <span className="relative bg-secondary px-4 text-sm text-text-secondary">
                  Or
                </span>
              </div>

              <button
                type="button"
                onClick={handleDemoLogin}
                className="btn-secondary w-full mt-4"
                disabled={isSubmitting}
              >
                Demo Login
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

export default LoginPage