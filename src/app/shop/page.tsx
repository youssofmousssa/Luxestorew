import { Metadata } from 'next'
import ShopHeader from '@/components/shop/ShopHeader'
import ProductGrid from '@/components/shop/ProductGrid'
import FilterSidebar from '@/components/shop/FilterSidebar'

export const metadata: Metadata = {
  title: 'Shop | LuxeStore',
  description: 'Browse our luxury clothing collection at LuxeStore.',
}

// Sample products data
const products = [
  {
    id: '1',
    name: 'Silk Evening Dress',
    category: 'Women',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1983&auto=format&fit=crop',
    slug: 'silk-evening-dress',
  },
  {
    id: '2',
    name: 'Tailored Wool Suit',
    category: 'Men',
    price: 499.99,
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=2080&auto=format&fit=crop',
    slug: 'tailored-wool-suit',
  },
  {
    id: '3',
    name: 'Leather Crossbody Bag',
    category: 'Accessories',
    price: 189.99,
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=2076&auto=format&fit=crop',
    slug: 'leather-crossbody-bag',
  },
  {
    id: '4',
    name: 'Cashmere Sweater',
    category: 'Women',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1964&auto=format&fit=crop',
    slug: 'cashmere-sweater',
  },
  {
    id: '101',
    name: 'Velvet Evening Gown',
    category: 'Women',
    price: 349.99,
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=2030&auto=format&fit=crop',
    slug: 'velvet-evening-gown',
    isNew: true,
  },
  {
    id: '102',
    name: 'Italian Leather Jacket',
    category: 'Men',
    price: 599.99,
    image: 'https://images.unsplash.com/photo-1520975954732-35dd22299614?q=80&w=1974&auto=format&fit=crop',
    slug: 'italian-leather-jacket',
    isNew: true,
  },
  {
    id: '103',
    name: 'Designer Sunglasses',
    category: 'Accessories',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1980&auto=format&fit=crop',
    slug: 'designer-sunglasses',
    isNew: true,
  },
  {
    id: '104',
    name: 'Silk Blouse',
    category: 'Women',
    price: 179.99,
    image: 'https://images.unsplash.com/photo-1551163943-3f7fffb9d770?q=80&w=2070&auto=format&fit=crop',
    slug: 'silk-blouse',
    isNew: true,
  },
  {
    id: '105',
    name: 'Cashmere Scarf',
    category: 'Accessories',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?q=80&w=1974&auto=format&fit=crop',
    slug: 'cashmere-scarf',
    isNew: true,
  },
  {
    id: '106',
    name: 'Tailored Dress Shirt',
    category: 'Men',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=1925&auto=format&fit=crop',
    slug: 'tailored-dress-shirt',
    isNew: true,
  },
  {
    id: '201',
    name: 'Wool Overcoat',
    category: 'Men',
    price: 399.99,
    image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=1974&auto=format&fit=crop',
    slug: 'wool-overcoat',
  },
  {
    id: '202',
    name: 'Leather Ankle Boots',
    category: 'Women',
    price: 279.99,
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1980&auto=format&fit=crop',
    slug: 'leather-ankle-boots',
  },
]

export default function Shop() {
  return (
    <div className="animate-fadeIn">
      <ShopHeader title="All Products" productCount={products.length} />
      
      <div className="container-custom py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/4">
            <FilterSidebar />
          </div>
          
          <div className="w-full lg:w-3/4">
            <ProductGrid products={products} />
          </div>
        </div>
      </div>
    </div>
  )
}