'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

const categories = [
  {
    id: 1,
    name: 'Men',
    image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=1974&auto=format&fit=crop',
    link: '/shop/men',
  },
  {
    id: 2,
    name: 'Women',
    image: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=1972&auto=format&fit=crop',
    link: '/shop/women',
  },
  {
    id: 3,
    name: 'Accessories',
    image: 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?q=80&w=1974&auto=format&fit=crop',
    link: '/shop/accessories',
  },
]

const Categories = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  }

  return (
    <section className="py-20 bg-primary">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="section-title">Shop By Category</h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Explore our curated collections designed for every occasion and style preference.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {categories.map((category) => (
            <motion.div key={category.id} variants={itemVariants} className="group">
              <Link href={category.link} className="block relative overflow-hidden">
                <div className="relative h-[500px] overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/30 transition-opacity duration-500 group-hover:bg-black/50" />
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <h3 className="text-3xl font-serif text-white mb-4">{category.name}</h3>
                      <span className="inline-block px-6 py-2 border border-accent text-accent uppercase tracking-wider text-sm transition-colors duration-300 group-hover:bg-accent group-hover:text-primary">
                        Shop Now
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Categories