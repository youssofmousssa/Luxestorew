'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FiPackage, FiUsers, FiDollarSign, FiShoppingBag, FiGrid, FiList, FiPieChart, FiSettings } from 'react-icons/fi'

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard')

  // Mock data for dashboard
  const stats = [
    { id: 1, title: 'Total Sales', value: '$24,780', icon: FiDollarSign, change: '+12%', changeType: 'positive' },
    { id: 2, title: 'Total Orders', value: '156', icon: FiPackage, change: '+8%', changeType: 'positive' },
    { id: 3, title: 'Total Customers', value: '1,245', icon: FiUsers, change: '+15%', changeType: 'positive' },
    { id: 4, title: 'Products', value: '86', icon: FiShoppingBag, change: '+3', changeType: 'neutral' },
  ]

  const recentOrders = [
    { id: 'LUX-123456', customer: 'John Doe', date: '2023-11-15', status: 'Delivered', total: '$349.97' },
    { id: 'LUX-789012', customer: 'Jane Smith', date: '2023-11-14', status: 'Shipped', total: '$129.99' },
    { id: 'LUX-345678', customer: 'Robert Johnson', date: '2023-11-13', status: 'Processing', total: '$499.95' },
    { id: 'LUX-901234', customer: 'Emily Davis', date: '2023-11-12', status: 'Delivered', total: '$89.99' },
    { id: 'LUX-567890', customer: 'Michael Brown', date: '2023-11-11', status: 'Cancelled', total: '$199.99' },
  ]

  const topProducts = [
    { id: 1, name: 'Leather Jacket', sales: 28, image: '/images/products/product-1.jpg' },
    { id: 2, name: 'Designer Jeans', sales: 24, image: '/images/products/product-2.jpg' },
    { id: 3, name: 'Cashmere Sweater', sales: 22, image: '/images/products/product-3.jpg' },
    { id: 4, name: 'Silk Dress', sales: 19, image: '/images/products/product-4.jpg' },
  ]

  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: stat.id * 0.1 }}
            className="bg-secondary p-6 rounded-sm"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-text-secondary text-sm">{stat.title}</p>
                <h3 className="text-2xl font-medium mt-2">{stat.value}</h3>
                <p className={`text-sm mt-2 ${stat.changeType === 'positive' ? 'text-green-400' : stat.changeType === 'negative' ? 'text-red-400' : 'text-text-secondary'}`}>
                  {stat.change} from last month
                </p>
              </div>
              <div className="bg-primary/50 p-3 rounded-full">
                <stat.icon className="w-6 h-6 text-accent" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Orders & Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders */}
        <div className="lg:col-span-2">
          <div className="bg-secondary p-6 rounded-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-medium">Recent Orders</h2>
              <Link href="#" className="text-accent text-sm hover:underline">
                View All
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-text-secondary text-sm uppercase tracking-wider">
                    <th className="pb-4 font-medium">Order ID</th>
                    <th className="pb-4 font-medium">Customer</th>
                    <th className="pb-4 font-medium">Date</th>
                    <th className="pb-4 font-medium">Status</th>
                    <th className="pb-4 font-medium text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {recentOrders.map((order) => (
                    <tr key={order.id}>
                      <td className="py-4">
                        <Link href="#" className="text-accent hover:underline">
                          {order.id}
                        </Link>
                      </td>
                      <td className="py-4">{order.customer}</td>
                      <td className="py-4">{order.date}</td>
                      <td className="py-4">
                        <span className={`px-3 py-1 rounded-full text-xs uppercase tracking-wider ${
                          order.status === 'Delivered' ? 'bg-green-900/30 text-green-400' :
                          order.status === 'Shipped' ? 'bg-blue-900/30 text-blue-400' :
                          order.status === 'Processing' ? 'bg-yellow-900/30 text-yellow-400' :
                          'bg-red-900/30 text-red-400'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-4 text-right">{order.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="lg:col-span-1">
          <div className="bg-secondary p-6 rounded-sm h-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-medium">Top Products</h2>
              <Link href="#" className="text-accent text-sm hover:underline">
                View All
              </Link>
            </div>

            <div className="space-y-4">
              {topProducts.map((product) => (
                <div key={product.id} className="flex items-center">
                  <div className="relative w-12 h-12 mr-4">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-medium">{product.name}</h3>
                    <p className="text-text-secondary text-sm">{product.sales} sales</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderProducts = () => (
    <div className="bg-secondary p-6 rounded-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium">Products Management</h2>
        <button className="btn-primary text-sm py-2">Add New Product</button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-text-secondary text-sm uppercase tracking-wider">
              <th className="pb-4 font-medium">Product</th>
              <th className="pb-4 font-medium">Category</th>
              <th className="pb-4 font-medium">Stock</th>
              <th className="pb-4 font-medium">Price</th>
              <th className="pb-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            <tr>
              <td className="py-4">
                <div className="flex items-center">
                  <div className="relative w-10 h-10 mr-3">
                    <Image
                      src="/images/products/product-1.jpg"
                      alt="Leather Jacket"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span>Leather Jacket</span>
                </div>
              </td>
              <td className="py-4">Men</td>
              <td className="py-4">24</td>
              <td className="py-4">$199.99</td>
              <td className="py-4 text-right">
                <button className="text-accent hover:underline mr-4">Edit</button>
                <button className="text-red-400 hover:underline">Delete</button>
              </td>
            </tr>
            <tr>
              <td className="py-4">
                <div className="flex items-center">
                  <div className="relative w-10 h-10 mr-3">
                    <Image
                      src="/images/products/product-2.jpg"
                      alt="Designer Jeans"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span>Designer Jeans</span>
                </div>
              </td>
              <td className="py-4">Men</td>
              <td className="py-4">18</td>
              <td className="py-4">$149.99</td>
              <td className="py-4 text-right">
                <button className="text-accent hover:underline mr-4">Edit</button>
                <button className="text-red-400 hover:underline">Delete</button>
              </td>
            </tr>
            <tr>
              <td className="py-4">
                <div className="flex items-center">
                  <div className="relative w-10 h-10 mr-3">
                    <Image
                      src="/images/products/product-3.jpg"
                      alt="Cashmere Sweater"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span>Cashmere Sweater</span>
                </div>
              </td>
              <td className="py-4">Women</td>
              <td className="py-4">12</td>
              <td className="py-4">$129.99</td>
              <td className="py-4 text-right">
                <button className="text-accent hover:underline mr-4">Edit</button>
                <button className="text-red-400 hover:underline">Delete</button>
              </td>
            </tr>
            <tr>
              <td className="py-4">
                <div className="flex items-center">
                  <div className="relative w-10 h-10 mr-3">
                    <Image
                      src="/images/products/product-4.jpg"
                      alt="Silk Dress"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span>Silk Dress</span>
                </div>
              </td>
              <td className="py-4">Women</td>
              <td className="py-4">8</td>
              <td className="py-4">$179.99</td>
              <td className="py-4 text-right">
                <button className="text-accent hover:underline mr-4">Edit</button>
                <button className="text-red-400 hover:underline">Delete</button>
              </td>
            </tr>
            <tr>
              <td className="py-4">
                <div className="flex items-center">
                  <div className="relative w-10 h-10 mr-3">
                    <Image
                      src="/images/products/product-5.jpg"
                      alt="Leather Boots"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span>Leather Boots</span>
                </div>
              </td>
              <td className="py-4">Accessories</td>
              <td className="py-4">15</td>
              <td className="py-4">$249.99</td>
              <td className="py-4 text-right">
                <button className="text-accent hover:underline mr-4">Edit</button>
                <button className="text-red-400 hover:underline">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-6">
        <p className="text-text-secondary text-sm">Showing 5 of 86 products</p>
        <div className="flex space-x-2">
          <button className="w-8 h-8 flex items-center justify-center bg-primary hover:bg-accent hover:text-primary transition-colors duration-300">1</button>
          <button className="w-8 h-8 flex items-center justify-center hover:bg-primary transition-colors duration-300">2</button>
          <button className="w-8 h-8 flex items-center justify-center hover:bg-primary transition-colors duration-300">3</button>
          <button className="w-8 h-8 flex items-center justify-center hover:bg-primary transition-colors duration-300">...</button>
          <button className="w-8 h-8 flex items-center justify-center hover:bg-primary transition-colors duration-300">18</button>
        </div>
      </div>
    </div>
  )

  const renderOrders = () => (
    <div className="bg-secondary p-6 rounded-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium">Orders Management</h2>
        <div className="flex space-x-4">
          <select className="input-field text-sm py-2">
            <option>All Orders</option>
            <option>Processing</option>
            <option>Shipped</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>
          <button className="btn-secondary text-sm py-2">Export</button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-text-secondary text-sm uppercase tracking-wider">
              <th className="pb-4 font-medium">Order ID</th>
              <th className="pb-4 font-medium">Customer</th>
              <th className="pb-4 font-medium">Date</th>
              <th className="pb-4 font-medium">Status</th>
              <th className="pb-4 font-medium">Payment</th>
              <th className="pb-4 font-medium text-right">Total</th>
              <th className="pb-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {recentOrders.map((order) => (
              <tr key={order.id}>
                <td className="py-4">
                  <Link href="#" className="text-accent hover:underline">
                    {order.id}
                  </Link>
                </td>
                <td className="py-4">{order.customer}</td>
                <td className="py-4">{order.date}</td>
                <td className="py-4">
                  <span className={`px-3 py-1 rounded-full text-xs uppercase tracking-wider ${
                    order.status === 'Delivered' ? 'bg-green-900/30 text-green-400' :
                    order.status === 'Shipped' ? 'bg-blue-900/30 text-blue-400' :
                    order.status === 'Processing' ? 'bg-yellow-900/30 text-yellow-400' :
                    'bg-red-900/30 text-red-400'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="py-4">
                  <span className="px-3 py-1 rounded-full text-xs uppercase tracking-wider bg-green-900/30 text-green-400">
                    Paid
                  </span>
                </td>
                <td className="py-4 text-right">{order.total}</td>
                <td className="py-4 text-right">
                  <button className="text-accent hover:underline mr-4">View</button>
                  <button className="text-red-400 hover:underline">Cancel</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-6">
        <p className="text-text-secondary text-sm">Showing 5 of 156 orders</p>
        <div className="flex space-x-2">
          <button className="w-8 h-8 flex items-center justify-center bg-primary hover:bg-accent hover:text-primary transition-colors duration-300">1</button>
          <button className="w-8 h-8 flex items-center justify-center hover:bg-primary transition-colors duration-300">2</button>
          <button className="w-8 h-8 flex items-center justify-center hover:bg-primary transition-colors duration-300">3</button>
          <button className="w-8 h-8 flex items-center justify-center hover:bg-primary transition-colors duration-300">...</button>
          <button className="w-8 h-8 flex items-center justify-center hover:bg-primary transition-colors duration-300">32</button>
        </div>
      </div>
    </div>
  )

  const renderCustomers = () => (
    <div className="bg-secondary p-6 rounded-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium">Customers</h2>
        <div className="flex space-x-4">
          <input type="text" placeholder="Search customers..." className="input-field text-sm py-2" />
          <button className="btn-secondary text-sm py-2">Export</button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-text-secondary text-sm uppercase tracking-wider">
              <th className="pb-4 font-medium">Customer</th>
              <th className="pb-4 font-medium">Email</th>
              <th className="pb-4 font-medium">Joined</th>
              <th className="pb-4 font-medium">Orders</th>
              <th className="pb-4 font-medium text-right">Spent</th>
              <th className="pb-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            <tr>
              <td className="py-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center mr-3">
                    <span className="text-sm">JD</span>
                  </div>
                  <span>John Doe</span>
                </div>
              </td>
              <td className="py-4">john.doe@example.com</td>
              <td className="py-4">2023-10-15</td>
              <td className="py-4">5</td>
              <td className="py-4 text-right">$849.95</td>
              <td className="py-4 text-right">
                <button className="text-accent hover:underline mr-4">View</button>
                <button className="text-red-400 hover:underline">Delete</button>
              </td>
            </tr>
            <tr>
              <td className="py-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center mr-3">
                    <span className="text-sm">JS</span>
                  </div>
                  <span>Jane Smith</span>
                </div>
              </td>
              <td className="py-4">jane.smith@example.com</td>
              <td className="py-4">2023-09-22</td>
              <td className="py-4">3</td>
              <td className="py-4 text-right">$529.97</td>
              <td className="py-4 text-right">
                <button className="text-accent hover:underline mr-4">View</button>
                <button className="text-red-400 hover:underline">Delete</button>
              </td>
            </tr>
            <tr>
              <td className="py-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center mr-3">
                    <span className="text-sm">RJ</span>
                  </div>
                  <span>Robert Johnson</span>
                </div>
              </td>
              <td className="py-4">robert.johnson@example.com</td>
              <td className="py-4">2023-11-05</td>
              <td className="py-4">1</td>
              <td className="py-4 text-right">$499.95</td>
              <td className="py-4 text-right">
                <button className="text-accent hover:underline mr-4">View</button>
                <button className="text-red-400 hover:underline">Delete</button>
              </td>
            </tr>
            <tr>
              <td className="py-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center mr-3">
                    <span className="text-sm">ED</span>
                  </div>
                  <span>Emily Davis</span>
                </div>
              </td>
              <td className="py-4">emily.davis@example.com</td>
              <td className="py-4">2023-08-17</td>
              <td className="py-4">7</td>
              <td className="py-4 text-right">$1,249.93</td>
              <td className="py-4 text-right">
                <button className="text-accent hover:underline mr-4">View</button>
                <button className="text-red-400 hover:underline">Delete</button>
              </td>
            </tr>
            <tr>
              <td className="py-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center mr-3">
                    <span className="text-sm">MB</span>
                  </div>
                  <span>Michael Brown</span>
                </div>
              </td>
              <td className="py-4">michael.brown@example.com</td>
              <td className="py-4">2023-10-30</td>
              <td className="py-4">2</td>
              <td className="py-4 text-right">$379.98</td>
              <td className="py-4 text-right">
                <button className="text-accent hover:underline mr-4">View</button>
                <button className="text-red-400 hover:underline">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-6">
        <p className="text-text-secondary text-sm">Showing 5 of 1,245 customers</p>
        <div className="flex space-x-2">
          <button className="w-8 h-8 flex items-center justify-center bg-primary hover:bg-accent hover:text-primary transition-colors duration-300">1</button>
          <button className="w-8 h-8 flex items-center justify-center hover:bg-primary transition-colors duration-300">2</button>
          <button className="w-8 h-8 flex items-center justify-center hover:bg-primary transition-colors duration-300">3</button>
          <button className="w-8 h-8 flex items-center justify-center hover:bg-primary transition-colors duration-300">...</button>
          <button className="w-8 h-8 flex items-center justify-center hover:bg-primary transition-colors duration-300">249</button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-primary">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-secondary min-h-screen fixed left-0 top-0 z-10 hidden md:block">
          <div className="p-6">
            <Link href="/" className="flex items-center mb-8">
              <h1 className="text-2xl font-serif font-medium">LuxeStore <span className="text-accent">Admin</span></h1>
            </Link>

            <nav>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setActiveTab('dashboard')}
                    className={`w-full text-left py-3 px-4 flex items-center gap-3 transition-colors duration-300 ${activeTab === 'dashboard' ? 'bg-primary text-accent' : 'hover:bg-primary/50'}`}
                  >
                    <FiPieChart />
                    <span>Dashboard</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('products')}
                    className={`w-full text-left py-3 px-4 flex items-center gap-3 transition-colors duration-300 ${activeTab === 'products' ? 'bg-primary text-accent' : 'hover:bg-primary/50'}`}
                  >
                    <FiGrid />
                    <span>Products</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className={`w-full text-left py-3 px-4 flex items-center gap-3 transition-colors duration-300 ${activeTab === 'orders' ? 'bg-primary text-accent' : 'hover:bg-primary/50'}`}
                  >
                    <FiList />
                    <span>Orders</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('customers')}
                    className={`w-full text-left py-3 px-4 flex items-center gap-3 transition-colors duration-300 ${activeTab === 'customers' ? 'bg-primary text-accent' : 'hover:bg-primary/50'}`}
                  >
                    <FiUsers />
                    <span>Customers</span>
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
              </ul>
            </nav>
          </div>
        </div>

        {/* Mobile Sidebar Toggle */}
        <div className="md:hidden fixed top-0 left-0 right-0 z-20 bg-secondary p-4 flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <h1 className="text-xl font-serif font-medium">LuxeStore <span className="text-accent">Admin</span></h1>
          </Link>
          <button className="p-2 rounded-full hover:bg-primary/50">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Main Content */}
        <div className="w-full md:ml-64 p-6 md:p-8 pt-20 md:pt-8">
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'products' && renderProducts()}
          {activeTab === 'orders' && renderOrders()}
          {activeTab === 'customers' && renderCustomers()}
          {activeTab === 'settings' && (
            <div className="bg-secondary p-6 rounded-sm">
              <h2 className="text-xl font-medium mb-6">Settings</h2>
              <p className="text-text-secondary">Settings panel is under development.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard