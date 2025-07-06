'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type User = {
  id: string
  name: string
  email: string
  role: 'user' | 'admin'
  avatar?: string
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('luxestore-user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error('Failed to parse user from localStorage:', error)
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // In a real app, this would be an API call to your backend
      // For demo purposes, we'll simulate a successful login with a mock user
      const mockUser: User = {
        id: '1',
        name: 'John Doe',
        email,
        role: 'user',
        avatar: email === 'demo@example.com' ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop' : undefined
      }

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setUser(mockUser)
      localStorage.setItem('luxestore-user', JSON.stringify(mockUser))
    } catch (error) {
      console.error('Login failed:', error)
      throw new Error('Invalid email or password')
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true)
    try {
      // In a real app, this would be an API call to your backend
      // For demo purposes, we'll simulate a successful registration with a mock user
      const mockUser: User = {
        id: '1',
        name,
        email,
        role: 'user',
        avatar: undefined
      }

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setUser(mockUser)
      localStorage.setItem('luxestore-user', JSON.stringify(mockUser))
    } catch (error) {
      console.error('Registration failed:', error)
      throw new Error('Registration failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('luxestore-user')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}