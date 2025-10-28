import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { User, Session } from '@supabase/supabase-js'

interface AuthState {
  user: User | null
  session: Session | null
  loading: boolean
  isAuthenticated: boolean
  isAdmin: boolean
}

export function useSupabaseAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    session: null,
    loading: true,
    isAuthenticated: false,
    isAdmin: false
  })

  useEffect(() => {
    // Verificar sessão atual
    checkSession()

    // Listener para mudanças de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        console.log('🔐 Auth state changed:', _event)
        if (session?.user) {
          await checkIfAdmin(session.user)
        } else {
          setAuthState({
            user: null,
            session: null,
            loading: false,
            isAuthenticated: false,
            isAdmin: false
          })
        }
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const checkSession = async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession()
      
      if (error) {
        console.error('Erro ao verificar sessão:', error)
        setAuthState(prev => ({ ...prev, loading: false }))
        return
      }

      if (session?.user) {
        await checkIfAdmin(session.user)
      } else {
        setAuthState({
          user: null,
          session: null,
          loading: false,
          isAuthenticated: false,
          isAdmin: false
        })
      }
    } catch (error) {
      console.error('Erro ao verificar sessão:', error)
      setAuthState(prev => ({ ...prev, loading: false }))
    }
  }

  const checkIfAdmin = async (user: User) => {
    try {
      // Verificar se o usuário está na tabela admin_users
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('email', user.email)
        .eq('is_active', true)
        .single()

      if (error || !data) {
        console.warn('Usuário não é admin:', user.email)
        setAuthState({
          user,
          session: null,
          loading: false,
          isAuthenticated: true,
          isAdmin: false
        })
        return
      }

      console.log('✅ Usuário admin verificado:', user.email)
      setAuthState({
        user,
        session: null,
        loading: false,
        isAuthenticated: true,
        isAdmin: true
      })
    } catch (error) {
      console.error('Erro ao verificar admin:', error)
      setAuthState({
        user,
        session: null,
        loading: false,
        isAuthenticated: true,
        isAdmin: false
      })
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) {
        console.error('Erro no login:', error.message)
        return { success: false, error: error.message }
      }

      if (!data.user) {
        return { success: false, error: 'Usuário não encontrado' }
      }

      // Verificar se é admin
      const { data: adminData, error: adminError } = await supabase
        .from('admin_users')
        .select('*')
        .eq('email', email)
        .eq('is_active', true)
        .single()

      if (adminError || !adminData) {
        await supabase.auth.signOut()
        return { success: false, error: 'Acesso não autorizado. Apenas administradores podem fazer login.' }
      }

      return { success: true, user: data.user }
    } catch (error: any) {
      console.error('Erro no login:', error)
      return { success: false, error: error.message || 'Erro ao fazer login' }
    }
  }

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error('Erro no logout:', error)
        return { success: false, error: error.message }
      }
      return { success: true }
    } catch (error: any) {
      console.error('Erro no logout:', error)
      return { success: false, error: error.message || 'Erro ao fazer logout' }
    }
  }

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      })

      if (error) {
        return { success: false, error: error.message }
      }

      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.message || 'Erro ao resetar senha' }
    }
  }

  const updatePassword = async (newPassword: string) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      })

      if (error) {
        return { success: false, error: error.message }
      }

      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.message || 'Erro ao atualizar senha' }
    }
  }

  return {
    ...authState,
    login,
    logout,
    resetPassword,
    updatePassword,
    checkSession
  }
}
