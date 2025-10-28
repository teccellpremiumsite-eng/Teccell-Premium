import { useState, useEffect } from 'react'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Services } from './components/Services'
import { Gallery } from './components/Gallery'
import { Testimonials } from './components/Testimonials'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { AdminPanelSimple } from './components/AdminPanelSimple'
import { SupabaseLogin } from './components/SupabaseLogin'
import { useSupabaseAuth } from './hooks/useSupabaseAuth'
import { Toaster } from '@/components/ui/sonner'

function App() {
  const [showLogin, setShowLogin] = useState(false)
  const [showAdmin, setShowAdmin] = useState(false)
  
  // Sistema 100% Supabase - SEM localStorage
  const { isAdmin, loading, login, logout } = useSupabaseAuth()

  // Initialize on app load
  useEffect(() => {
    console.log('🔧 Sistema Admin TecCell Premium - 100% Supabase')
    console.log('📋 Para acessar: Ctrl+Shift+A')
  }, [])

  // Login handler para Supabase (assíncrono com email + senha)
  const handleLogin = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const result = await login(email, password)
    if (result.success) {
      setShowLogin(false)
      setShowAdmin(true)
    }
    return {
      success: result.success,
      error: result.error?.message || (result.success ? undefined : 'Erro ao fazer login')
    }
  }

  const handleLogout = async () => {
    await logout()
    setShowAdmin(false)
  }

  // Keyboard shortcut: Ctrl+Shift+A para abrir login/admin
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault()
        if (isAdmin) {
          setShowAdmin(true)
        } else {
          setShowLogin(true)
        }
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isAdmin])

  // Mostrar loading enquanto verifica autenticação Supabase
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Verificando autenticação...</p>
        </div>
      </div>
    )
  }

  // Modal de login Supabase
  if (showLogin) {
    return (
      <>
        <SupabaseLogin 
          onLogin={handleLogin} 
          onCancel={() => setShowLogin(false)} 
        />
        <Toaster />
      </>
    )
  }

  if (showAdmin) {
    return (
      <>
        <AdminPanelSimple onClose={() => setShowAdmin(false)} onLogout={handleLogout} />
        <Toaster />
      </>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onAdminClick={() => isAdmin ? setShowAdmin(true) : setShowLogin(true)} />
      <main>
        <Hero />
        <Services />
        <Gallery />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <Toaster />
    </div>
  )
}

export default App