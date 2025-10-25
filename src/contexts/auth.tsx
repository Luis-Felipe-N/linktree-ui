'use client'

import { api } from '@/lib/api'
import Cookies from 'js-cookie'
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

export interface User {
  id: string
  username: string
  email: string
  created_at: Date
}

export interface LoginCredentials {
  username: string
  password: string
}

interface AuthProviderProps {
  children: ReactNode
}

interface AuthContextProps {
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => void
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined,
)

const TOKEN_KEY = 'token'
const TOKEN_EXPIRY_DAYS = 7

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const logout = useCallback(() => {
    Cookies.remove(TOKEN_KEY)
    setUser(null)
    delete api.defaults.headers.Authorization
  }, [])

  useEffect(() => {
    async function loadUserFromCookies() {
      const token = Cookies.get(TOKEN_KEY)
      if (!token) {
        setIsLoading(false)
        return
      }

      try {
        api.defaults.headers.Authorization = `Bearer ${token}`
        const { data } = await api.get<User>('/me')
        setUser(data)
      } catch (error) {
        console.error('Erro ao carregar usuário:', error)
        logout()
      } finally {
        setIsLoading(false)
      }
    }

    loadUserFromCookies()
  }, [logout])

  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      const { data } = await api.post<{ token: string; user: User }>(
        '/sessions',
        credentials,
      )
      const { token } = data
      if (!token) {
        throw new Error('Resposta inválida do servidor')
      }
      api.defaults.headers.Authorization = `Bearer ${token}`

      const { data: user } = await api.get<User>('/me')

      Cookies.set(TOKEN_KEY, token, { expires: TOKEN_EXPIRY_DAYS })
      api.defaults.headers.Authorization = `Bearer ${token}`
      setUser(user)
    } catch (error) {
      console.error('Erro no login:', error)
      throw error
    }
  }, [])

  const isAuthenticated = !!user

  return (
    <AuthContext.Provider
      value={{ login, logout, user, isLoading, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
