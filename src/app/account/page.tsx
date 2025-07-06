'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FiUser, FiPackage, FiHeart, FiSettings, FiLogOut } from 'react-icons/fi'
import { useAuth } from '@/context/AuthContext'

interface Order {
  id: string
  date: string
  status: 'processing' | 'shipped' | 'delivered'
  total: number
  items: {
    id: string
    name: string
    image: string
    price: number
    quantity: number
  }[]
}

const AccountPage = () => {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState('profile')
  const [orders, setOrders] = useState<Order[]>([])
  const [wishlist, setWishlist] = useState<any[]>([])

  useEffect(() => {
    // Simulate fetching orders
    const mockOrders: Order[] = [
      {
        id: 'LUX-123456',
        date: '2023-11-15',
        status: 'delivered',
        total: 349.97,
        items: [
          {
            id: 'p1',
            name: 'Leather Jacket',
            image: '/images/products/product-1.jpg',
            price: 199.99,
            quantity: 1
          },
          {
            id: 'p2',
            name: 'Designer Jeans',
            image: '/images/products/product-2.jpg',
            price: 149.98,
            quantity: 1
          }
        ]
      },
      {
        id: 'LUX-789012',
        date: '2023-10-28',
        status: 'shipped',
        total: 129.99,
        items: [
          {
            id: 'p3',
            name: 'Cashmere Sweater',
            image: '/images/products/product-3.jpg',
            price: 129.99,
            quantity: 1
          }
        ]
      }
    ]

    // Simulate fetching wishlist
    const mockWishlist = [
      {
        id: 'w1',
        name: 'Silk Dress',
        image: '/images/products/product-4.jpg',
        price: 179.99,
        category: 'Women'
      },
      {
        id: 'w2',
        name: 'Leather Boots',
        image: '/images/products/product-5.jpg',
        price: 249.99,
        category: 'Accessories'
      },
      {
        id: 'w3',
        name: 'Designer Watch',
        image: '/images/products/product-6.jpg',
        price: 399.99,
        category: 'Accessories'
      }
    ]

    setOrders(mockOrders)
    setWishlist(mockWishlist)
  }, [])

  if (!user) {
    return (
      <div className="py-20 bg-primary">
        <div className="container-custom text-center">
          <h1 className="text-3xl md:text-4xl font-serif font-medium mb-6">Account Access</h1>
          <p className="text-text-secondary mb-8">Please log in to access your account.</p>
          <Link href="/login" className="btn-primary inline-block">
            Log In
          </Link>
          <p className="mt-4 text-text-secondary">
            Don't have an account?{' '}
            <Link href="/register" className="text-accent hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    )
  }

  const renderProfile = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-secondary p-6"
    >
      <h2 className="text-xl font-serif font-medium mb-6">Profile Information</h2>
      
      <div className="flex flex-col md:flex-row items-start gap-8">
        <div className="w-32 h-32 relative rounded-full overflow-hidden bg-primary flex items-center justify-center">
          {user.avatar ? (
            <Image src={user.avatar} alt={user.name} fill className="object-cover" />
          ) : (
            <FiUser className="w-16 h-16 text-text-secondary" />
          )}
        </div>
        
        <div className="flex-grow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm uppercase tracking-wider text-text-secondary mb-1">
                Name
              </label>
              <p className="font-medium">{user.name}</p>
            </div>
            
            <div>
              <label className="block text-sm uppercase tracking-wider text-text-secondary mb-1">
                Email
              </label>
              <p>{user.email}</p>
            </div>
            
            <div>
              <label className="block text-sm uppercase tracking-wider text-text-secondary mb-1">
                Phone
              </label>
              <p>{user.phone || 'Not provided'}</p>
            </div>
            
            <div>
              <label className="block text-sm uppercase tracking-wider text-text-secondary mb-1">
                Member Since
              </label>
              <p>{new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
          
          <button className="btn-secondary mt-8">
            Edit Profile
          </button>
        </div>
      </div>
      
      <div className="mt-12">
        <h3 className="text-lg font-medium mb-4">Address Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-primary p-4">
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-medium">Shipping Address</h4>
              <button className="text-accent text-sm hover:underline">Edit</button>
            </div>
            <p>{user.shippingAddress?.street || '123 Fashion Street'}</p>
            <p>{user.shippingAddress?.city || 'New York'}, {user.shippingAddress?.state || 'NY'} {user.shippingAddress?.zip || '10001'}</p>
            <p>{user.shippingAddress?.country || 'United States'}</p>
          </div>
          
          <div className="bg-primary p-4">
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-medium">Billing Address</h4>
              <button className="text-accent text-sm hover:underline">Edit</button>
            </div>
            <p>{user.billingAddress?.street || 'Same as shipping address'}</p>
            {user.billingAddress && (
              <>
                <p>{user.billingAddress.city}, {user.billingAddress.state} {user.billingAddress.zip}</p>
                <p>{user.billingAddress.country}</p>
              </>
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-12">
        <h3 className="text-lg font-medium mb-4">Password & Security</h3>
        <button className="btn-secondary">
          Change Password
        </button>
      </div>
    </motion.div>
  )

  const renderOrders = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-secondary p-6"
    >
      <h2 className="text-xl font-serif font-medium mb-6">Order History</h2>
      
      {orders.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-text-secondary mb-4">You haven't placed any orders yet.</p>
          <Link href="/shop" className="btn-primary">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => (
            <div key={order.id} className="bg-primary p-6">
              <div className="flex flex-col md:flex-row justify-between mb-6">
                <div>
                  <h3 className="font-medium">Order #{order.id}</h3>
                  <p className="text-text-secondary text-sm">
                    Placed on {new Date(order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
                
                <div className="mt-4 md:mt-0 flex items-center">
                  <span className="mr-4">Status:</span>
                  <span className={`px-3 py-1 rounded-full text-xs uppercase tracking-wider ${
                    order.status === 'delivered' ? 'bg-green-900/30 text-green-400' :
                    order.status === 'shipped' ? 'bg-blue-900/30 text-blue-400' :
                    'bg-yellow-900/30 text-yellow-400'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
              
              <div className="border-t border-gray-800 pt-6">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center py-3 border-b border-gray-800 last:border-b-0">
                    <div className="relative w-16 h-16 mr-4">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-medium">{item.name}</h4>
                      <div className="flex justify-between mt-1">
                        <span className="text-text-secondary text-sm">{item.quantity} × ${item.price.toFixed(2)}</span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-800">
                <Link href={`/order/${order.id}`} className="text-accent hover:underline">
                  View Order Details
                </Link>
                <div className="text-right">
                  <span className="block text-text-secondary text-sm">Total</span>
                  <span className="text-lg font-medium">${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  )

  const renderWishlist = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-secondary p-6"
    >
      <h2 className="text-xl font-serif font-medium mb-6">My Wishlist</h2>
      
      {wishlist.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-text-secondary mb-4">Your wishlist is empty.</p>
          <Link href="/shop" className="btn-primary">
            Discover Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <div key={item.id} className="group">
              <div className="card overflow-hidden">
                <div className="relative h-64 overflow-hidden mb-4">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  <div className="absolute bottom-0 left-0 right-0 bg-black/70 py-3 px-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex justify-between">
                      <Link href={`/product/${item.id}`} className="text-accent hover:underline">
                        View Product
                      </Link>
                      <button className="text-red-400 hover:text-red-300">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="px-2 pb-4">
                  <span className="text-text-secondary text-sm">{item.category}</span>
                  <h3 className="font-medium text-lg mb-2">
                    <Link href={`/product/${item.id}`} className="hover:text-accent transition-colors duration-300">
                      {item.name}
                    </Link>
                  </h3>
                  <p className="text-accent font-medium">${item.price.toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  )

  const renderSettings = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-secondary p-6"
    >
      <h2 className="text-xl font-serif font-medium mb-6">Account Settings</h2>
      
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-medium mb-4">Notifications</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-text-secondary text-sm">Receive emails about your orders and account activity</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">SMS Notifications</p>
                <p className="text-text-secondary text-sm">Receive text messages for order updates</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Marketing Communications</p>
                <p className="text-text-secondary text-sm">Receive emails about new products, sales, and offers</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
              </label>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-4">Privacy</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Data Sharing</p>
                <p className="text-text-secondary text-sm">Allow sharing your shopping preferences with trusted partners</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
              </label>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-4">Account Actions</h3>
          <div className="space-y-4">
            <button className="text-red-400 hover:text-red-300 flex items-center gap-2">
              <span>Delete Account</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )

  return (
    <div className="py-12 bg-primary animate-fadeIn">
      <div className="container-custom">
        <h1 className="text-3xl md:text-4xl font-serif font-medium mb-12">My Account</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-secondary p-6">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 relative rounded-full overflow-hidden bg-primary flex items-center justify-center mr-4">
                  {user.avatar ? (
                    <Image src={user.avatar} alt={user.name} fill className="object-cover" />
                  ) : (
                    <FiUser className="w-6 h-6 text-text-secondary" />
                  )}
                </div>
                <div>
                  <h2 className="font-medium">{user.name}</h2>
                  <p className="text-text-secondary text-sm">{user.email}</p>
                </div>
              </div>

              <nav>
                <ul className="space-y-2">
                  <li>
                    <button
                      onClick={() => setActiveTab('profile')}
                      className={`w-full text-left py-3 px-4 flex items-center gap-3 transition-colors duration-300 ${activeTab === 'profile' ? 'bg-primary text-accent' : 'hover:bg-primary/50'}`}
                    >
                      <FiUser />
                      <span>Profile</span>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab('orders')}
                      className={`w-full text-left py-3 px-4 flex items-center gap-3 transition-colors duration-300 ${activeTab === 'orders' ? 'bg-primary text-accent' : 'hover:bg-primary/50'}`}
                    >
                      <FiPackage />
                      <span>Orders</span>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab('wishlist')}
                      className={`w-full text-left py-3 px-4 flex items-center gap-3 transition-colors duration-300 ${activeTab === 'wishlist' ? 'bg-primary text-accent' : 'hover:bg-primary/50'}`}
                    >
                      <FiHeart />
                      <span>Wishlist</span>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab('settings')}
                      className={`w-full text-left py-3 px-4 flex items-center gap-3 transition-colors duration-300 ${activeTab === 'settings' ? 'bg-primary text-accent' : 'hover:bg-primary/50'}`}
                    >
                      <FiSettings />
                      <span>Settings</span>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={logout}
                      className="w-full text-left py-3 px-4 flex items-center gap-3 text-red-400 hover:bg-primary/50 transition-colors duration-300"
                    >
                      <FiLogOut />
                      <span>Logout</span>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {activeTab === 'profile' && renderProfile()}
            {activeTab === 'orders' && renderOrders()}
            {activeTab === 'wishlist' && renderWishlist()}
            {activeTab === 'settings' && renderSettings()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountPage