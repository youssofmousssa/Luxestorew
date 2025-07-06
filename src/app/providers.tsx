'use client'

import { ReactNode } from 'react'
import { CartProvider } from '@/context/CartContext'
import { AuthProvider } from '@/context/AuthContext'
import { ThemeProvider } from 'next-themes'

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <AuthProvider>
        <CartProvider>
          {children}
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}