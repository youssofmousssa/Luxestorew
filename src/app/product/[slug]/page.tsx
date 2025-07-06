import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import ProductDetail from '@/components/product/ProductDetail'
import RelatedProducts from '@/components/product/RelatedProducts'

// Sample products data
const products = [
  {
    id: '1',
    name: 'Silk Evening Dress',
    category: 'Women',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1983&auto=format&fit=crop',
    slug: 'silk-evening-dress',
    description: 'Elevate your evening attire with our luxurious silk evening dress. Crafted from the finest silk, this dress features a flattering silhouette with a subtle sheen that catches the light beautifully. The elegant design includes a sweetheart neckline and a tasteful side slit for ease of movement.',
    details: [
      'Premium 100% silk fabric',
      'Fully lined',
      'Side slit for comfort and style',
      'Hidden back zipper',
      'Dry clean only',
    ],
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1983&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1976&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1550639525-c97d455acf70?q=80&w=1974&auto=format&fit=crop',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'Navy', 'Burgundy'],
    inStock: true,
  },
  {
    id: '2',
    name: 'Tailored Wool Suit',
    category: 'Men',
    price: 499.99,
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=2080&auto=format&fit=crop',
    slug: 'tailored-wool-suit',
    description: 'Make a statement with our impeccably tailored wool suit. Crafted from premium Italian wool, this suit offers both comfort and sophistication. The modern cut provides a sleek silhouette while maintaining ease of movement for all-day wear.',
    details: [
      'Premium Italian wool',
      'Half-canvas construction',
      'Two-button closure',
      'Four interior pockets',
      'Dry clean only',
    ],
    images: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=2080&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1598032895397-b9472444bf93?q=80&w=1780&auto=format&fit=crop',
    ],
    sizes: ['46', '48', '50', '52', '54'],
    colors: ['Charcoal', 'Navy', 'Black'],
    inStock: true,
  },
  // More products...
]

interface ProductPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = products.find(p => p.slug === params.slug)
  
  if (!product) {
    return {
      title: 'Product Not Found | LuxeStore',
    }
  }
  
  return {
    title: `${product.name} | LuxeStore`,
    description: product.description.substring(0, 160),
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = products.find(p => p.slug === params.slug)
  
  if (!product) {
    notFound()
  }
  
  // Get related products (same category, excluding current product)
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4)
  
  return (
    <div className="animate-fadeIn">
      <ProductDetail product={product} />
      <RelatedProducts products={relatedProducts} />
    </div>
  )
}