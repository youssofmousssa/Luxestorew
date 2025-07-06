'use client'

import { useState } from 'react'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'

const FilterSidebar = () => {
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    color: true,
    size: true,
  })

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  return (
    <div className="bg-secondary p-6">
      <h2 className="text-xl font-serif font-medium mb-6">Filters</h2>

      {/* Categories Filter */}
      <div className="mb-6 border-b border-gray-800 pb-6">
        <button
          className="flex items-center justify-between w-full text-left mb-4"
          onClick={() => toggleSection('categories')}
        >
          <h3 className="text-lg font-medium">Categories</h3>
          {expandedSections.categories ? <FiChevronUp /> : <FiChevronDown />}
        </button>

        {expandedSections.categories && (
          <div className="space-y-3">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="category-all"
                className="mr-3 accent-accent"
              />
              <label htmlFor="category-all" className="text-text-secondary cursor-pointer hover:text-text-primary transition-colors">
                All Products
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="category-men"
                className="mr-3 accent-accent"
              />
              <label htmlFor="category-men" className="text-text-secondary cursor-pointer hover:text-text-primary transition-colors">
                Men
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="category-women"
                className="mr-3 accent-accent"
              />
              <label htmlFor="category-women" className="text-text-secondary cursor-pointer hover:text-text-primary transition-colors">
                Women
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="category-accessories"
                className="mr-3 accent-accent"
              />
              <label htmlFor="category-accessories" className="text-text-secondary cursor-pointer hover:text-text-primary transition-colors">
                Accessories
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Price Filter */}
      <div className="mb-6 border-b border-gray-800 pb-6">
        <button
          className="flex items-center justify-between w-full text-left mb-4"
          onClick={() => toggleSection('price')}
        >
          <h3 className="text-lg font-medium">Price Range</h3>
          {expandedSections.price ? <FiChevronUp /> : <FiChevronDown />}
        </button>

        {expandedSections.price && (
          <div className="space-y-3">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="price-all"
                className="mr-3 accent-accent"
              />
              <label htmlFor="price-all" className="text-text-secondary cursor-pointer hover:text-text-primary transition-colors">
                All Prices
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="price-under-100"
                className="mr-3 accent-accent"
              />
              <label htmlFor="price-under-100" className="text-text-secondary cursor-pointer hover:text-text-primary transition-colors">
                Under $100
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="price-100-200"
                className="mr-3 accent-accent"
              />
              <label htmlFor="price-100-200" className="text-text-secondary cursor-pointer hover:text-text-primary transition-colors">
                $100 - $200
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="price-200-300"
                className="mr-3 accent-accent"
              />
              <label htmlFor="price-200-300" className="text-text-secondary cursor-pointer hover:text-text-primary transition-colors">
                $200 - $300
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="price-300-plus"
                className="mr-3 accent-accent"
              />
              <label htmlFor="price-300-plus" className="text-text-secondary cursor-pointer hover:text-text-primary transition-colors">
                $300 & Above
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Color Filter */}
      <div className="mb-6 border-b border-gray-800 pb-6">
        <button
          className="flex items-center justify-between w-full text-left mb-4"
          onClick={() => toggleSection('color')}
        >
          <h3 className="text-lg font-medium">Color</h3>
          {expandedSections.color ? <FiChevronUp /> : <FiChevronDown />}
        </button>

        {expandedSections.color && (
          <div className="flex flex-wrap gap-3">
            <button className="w-8 h-8 rounded-full bg-black border-2 border-accent" title="Black" />
            <button className="w-8 h-8 rounded-full bg-white border-2 border-gray-600" title="White" />
            <button className="w-8 h-8 rounded-full bg-gray-500 border-2 border-transparent" title="Gray" />
            <button className="w-8 h-8 rounded-full bg-blue-700 border-2 border-transparent" title="Blue" />
            <button className="w-8 h-8 rounded-full bg-red-700 border-2 border-transparent" title="Red" />
            <button className="w-8 h-8 rounded-full bg-green-700 border-2 border-transparent" title="Green" />
            <button className="w-8 h-8 rounded-full bg-yellow-500 border-2 border-transparent" title="Yellow" />
            <button className="w-8 h-8 rounded-full bg-purple-700 border-2 border-transparent" title="Purple" />
          </div>
        )}
      </div>

      {/* Size Filter */}
      <div className="mb-6">
        <button
          className="flex items-center justify-between w-full text-left mb-4"
          onClick={() => toggleSection('size')}
        >
          <h3 className="text-lg font-medium">Size</h3>
          {expandedSections.size ? <FiChevronUp /> : <FiChevronDown />}
        </button>

        {expandedSections.size && (
          <div className="flex flex-wrap gap-2">
            <button className="w-10 h-10 border border-gray-600 flex items-center justify-center hover:border-accent hover:text-accent transition-colors">
              XS
            </button>
            <button className="w-10 h-10 border border-gray-600 flex items-center justify-center hover:border-accent hover:text-accent transition-colors">
              S
            </button>
            <button className="w-10 h-10 border border-accent bg-accent/10 text-accent flex items-center justify-center">
              M
            </button>
            <button className="w-10 h-10 border border-gray-600 flex items-center justify-center hover:border-accent hover:text-accent transition-colors">
              L
            </button>
            <button className="w-10 h-10 border border-gray-600 flex items-center justify-center hover:border-accent hover:text-accent transition-colors">
              XL
            </button>
            <button className="w-10 h-10 border border-gray-600 flex items-center justify-center hover:border-accent hover:text-accent transition-colors">
              XXL
            </button>
          </div>
        )}
      </div>

      {/* Clear Filters Button */}
      <button className="w-full bg-transparent border border-accent text-accent py-2 px-4 hover:bg-accent hover:text-primary transition-colors duration-300 uppercase tracking-wider text-sm">
        Clear All Filters
      </button>
    </div>
  )
}

export default FilterSidebar