'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { FiSearch, FiUser, FiShoppingBag, FiMenu, FiX } from 'react-icons/fi'
import { useCart } from '@/context/CartContext'
import { motion, AnimatePresence } from 'framer-motion'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { cartItems } = useCart()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Collections', path: '/collections' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ]

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-primary/95 backdrop-blur-sm py-3 shadow-md' : 'bg-transparent py-5'}`}
    >
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="relative z-10">
          <h1 className="text-2xl font-serif font-bold tracking-wider">
            <span className="text-accent">LUXE</span>STORE
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className={`nav-link ${pathname === link.path ? 'text-accent' : ''}`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Icons */}
        <div className="flex items-center space-x-4 relative z-10">
          <Link href="/search" className="nav-link">
            <FiSearch className="text-xl" />
          </Link>
          <Link href="/account" className="nav-link">
            <FiUser className="text-xl" />
          </Link>
          <Link href="/cart" className="nav-link relative">
            <FiShoppingBag className="text-xl" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent text-primary text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </Link>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-text-primary focus:outline-none"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <FiX className="text-2xl" />
            ) : (
              <FiMenu className="text-2xl" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="absolute top-full left-0 right-0 bg-primary shadow-lg py-4 md:hidden"
            >
              <nav className="flex flex-col space-y-4 px-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.path}
                    className={`nav-link ${pathname === link.path ? 'text-accent' : ''}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}

export default Header