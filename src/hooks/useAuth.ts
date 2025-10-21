import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { User, Session } from '@supabase/supabase-js'

interface AuthState {
  user: User | null
  session: Session | null
  loading: boolean
  isFirstTimeAccess: boolean
  isAuthenticated: boolean
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    session: null,
    loading: true,
    isFirstTimeAccess: false,
    isAuthenticated: false
  })

  const DEFAULT_PASSWORD = 'teccell2024'

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      // Verifica se é primeiro acesso
      const setupCompleted = localStorage.getItem('admin_setup_completed')
      const isLoggedIn = localStorage.getItem('admin_logged_in')
      const sessionExpiry = localStorage.getItem('admin_session_expiry')

      // Verifica se a sessão expirou
      if (sessionExpiry && new Date().getTime() > parseInt(sessionExpiry)) {
        localStorage.removeItem('admin_logged_in')
        localStorage.removeItem('admin_session_expiry')
      }

      const isCurrentlyLoggedIn = localStorage.getItem('admin_logged_in') === 'true'

      setAuthState({
        user: null,
        session: null,
        loading: false,
        isFirstTimeAccess: setupCompleted !== 'true',
        isAuthenticated: isCurrentlyLoggedIn
      })
    } catch (error) {
      console.error('Erro ao verificar status de autenticação:', error)
      setAuthState({
        user: null,
        session: null,
        loading: false,
        isFirstTimeAccess: true,
        isAuthenticated: false
      })
    }
  }

  const login = (password: string): boolean => {
    try {
      const setupCompleted = localStorage.getItem('admin_setup_completed')
      
      if (setupCompleted === 'true') {
        // Login com senha personalizada
        const storedPasswordHash = localStorage.getItem('admin_password_hash')
        const providedPasswordHash = btoa(password)
        
        if (storedPasswordHash === providedPasswordHash) {
          const expiryTime = new Date().getTime() + (24 * 60 * 60 * 1000) // 24 horas
          localStorage.setItem('admin_logged_in', 'true')
          localStorage.setItem('admin_session_expiry', expiryTime.toString())
          
          setAuthState(prev => ({
            ...prev,
            isAuthenticated: true
          }))
          return true
        }
      } else {
        // Primeiro acesso - verifica senha padrão
        if (password === DEFAULT_PASSWORD) {
          setAuthState(prev => ({
            ...prev,
            isFirstTimeAccess: true
          }))
          return true
        }
      }
      
      return false
    } catch (error) {
      console.error('Erro no login:', error)
      return false
    }
  }

  const completeFirstTimeSetup = (newPassword: string) => {
    try {
      const passwordHash = btoa(newPassword)
      const expiryTime = new Date().getTime() + (24 * 60 * 60 * 1000) // 24 horas
      
      localStorage.setItem('admin_setup_completed', 'true')
      localStorage.setItem('admin_password_hash', passwordHash)
      localStorage.setItem('admin_logged_in', 'true')
      localStorage.setItem('admin_session_expiry', expiryTime.toString())
      
      setAuthState(prev => ({
        ...prev,
        isAuthenticated: true,
        isFirstTimeAccess: false
      }))
    } catch (error) {
      console.error('Erro ao completar configuração inicial:', error)
    }
  }

  const logout = () => {
    try {
      localStorage.removeItem('admin_logged_in')
      localStorage.removeItem('admin_session_expiry')
      
      setAuthState(prev => ({
        ...prev,
        isAuthenticated: false
      }))
    } catch (error) {
      console.error('Erro no logout:', error)
    }
  }

  const resetToDefault = () => {
    try {
      localStorage.removeItem('admin_setup_completed')
      localStorage.removeItem('admin_password_hash')
      localStorage.removeItem('admin_logged_in')
      localStorage.removeItem('admin_session_expiry')
      
      setAuthState(prev => ({
        ...prev,
        isAuthenticated: false,
        isFirstTimeAccess: true
      }))
    } catch (error) {
      console.error('Erro ao resetar para padrão:', error)
    }
  }

  // Manter compatibilidade com Supabase para outras funcionalidades
  const signIn = (email: string, password: string) =>
    supabase.auth.signInWithPassword({ email, password })
  
  const signUp = (email: string, password: string) =>
    supabase.auth.signUp({ email, password })
  
  const signOut = () => supabase.auth.signOut()

  return {
    ...authState,
    login,
    logout,
    completeFirstTimeSetup,
    resetToDefault,
    checkAuthStatus,
    signIn,
    signUp,
    signOut
  }
}