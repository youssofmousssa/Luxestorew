import Link from 'next/link'
import { FiInstagram, FiTwitter, FiFacebook, FiYoutube } from 'react-icons/fi'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-secondary pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div>
            <h3 className="text-2xl font-serif font-bold tracking-wider mb-6">
              <span className="text-accent">LUXE</span>STORE
            </h3>
            <p className="text-text-secondary mb-6">
              Elevate your style with our premium luxury clothing collection. Designed for those who appreciate quality and elegance.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-accent transition-colors duration-300">
                <FiInstagram className="text-xl" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-accent transition-colors duration-300">
                <FiTwitter className="text-xl" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-accent transition-colors duration-300">
                <FiFacebook className="text-xl" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-accent transition-colors duration-300">
                <FiYoutube className="text-xl" />
              </a>
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h4 className="text-lg font-medium uppercase tracking-wider mb-6">Shop</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/shop/men" className="text-text-secondary hover:text-accent transition-colors duration-300">
                  Men's Collection
                </Link>
              </li>
              <li>
                <Link href="/shop/women" className="text-text-secondary hover:text-accent transition-colors duration-300">
                  Women's Collection
                </Link>
              </li>
              <li>
                <Link href="/shop/accessories" className="text-text-secondary hover:text-accent transition-colors duration-300">
                  Accessories
                </Link>
              </li>
              <li>
                <Link href="/shop/new-arrivals" className="text-text-secondary hover:text-accent transition-colors duration-300">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/shop/sale" className="text-text-secondary hover:text-accent transition-colors duration-300">
                  Sale
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-lg font-medium uppercase tracking-wider mb-6">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-text-secondary hover:text-accent transition-colors duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-text-secondary hover:text-accent transition-colors duration-300">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-text-secondary hover:text-accent transition-colors duration-300">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-text-secondary hover:text-accent transition-colors duration-300">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/sustainability" className="text-text-secondary hover:text-accent transition-colors duration-300">
                  Sustainability
                </Link>
              </li>
            </ul>
          </div>

          {/* Help Column */}
          <div>
            <h4 className="text-lg font-medium uppercase tracking-wider mb-6">Help</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/customer-service" className="text-text-secondary hover:text-accent transition-colors duration-300">
                  Customer Service
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-text-secondary hover:text-accent transition-colors duration-300">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/size-guide" className="text-text-secondary hover:text-accent transition-colors duration-300">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-text-secondary hover:text-accent transition-colors duration-300">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-text-secondary hover:text-accent transition-colors duration-300">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-gray-800 text-center text-text-secondary">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>&copy; {currentYear} LuxeStore. All rights reserved.</p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <Link href="/terms" className="text-text-secondary hover:text-accent transition-colors duration-300">
                Terms of Service
              </Link>
              <Link href="/privacy" className="text-text-secondary hover:text-accent transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link href="/cookies" className="text-text-secondary hover:text-accent transition-colors duration-300">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer