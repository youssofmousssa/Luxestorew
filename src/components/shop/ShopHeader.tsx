import React from 'react'

interface ShopHeaderProps {
  title: string
  productCount: number
  description?: string
}

const ShopHeader: React.FC<ShopHeaderProps> = ({ title, productCount, description }) => {
  return (
    <div className="bg-secondary py-16">
      <div className="container-custom">
        <h1 className="text-4xl md:text-5xl font-serif font-medium mb-4">{title}</h1>
        {description && (
          <p className="text-text-secondary max-w-2xl mb-4">{description}</p>
        )}
        <p className="text-accent">{productCount} products</p>
      </div>
    </div>
  )
}

export default ShopHeader