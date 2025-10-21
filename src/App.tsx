import { useState, useEffect } from 'react'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Services } from './components/Services'
import { Gallery } from './components/Gallery'
import { Testimonials } from './components/Testimonials'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { AdminPanel } from './components/AdminPanel'
import { LoginForm } from './components/LoginForm'
import { useAuth } from './hooks/useAuth'
import { Toaster } from '@/components/ui/sonner'

function App() {
  const [showLogin, setShowLogin] = useState(false)
  const [showAdmin, setShowAdmin] = useState(false)
  const { isAuthenticated, isFirstTimeAccess, login, logout, loading, resetToDefault } = useAuth()

  // Initialize on app load
  useEffect(() => {
    // Cache busting removido para evitar erros
    
    // Adicionar função global para resetar via console
    (window as any).resetAdminSystem = () => {
      const confirmReset = confirm('⚠️ RESETAR SISTEMA ADMIN?\n\nIsso vai:\n- Apagar senha atual\n- Voltar para primeiro acesso\n- Permitir configurar nova senha\n\nDeseja continuar?')
      if (confirmReset) {
        resetToDefault()
        setShowAdmin(false)
        setShowLogin(false)
        console.log('🎯 Sistema resetado! Digite no console: "window.location.reload()" para recarregar a página')
      }
    }
    
    console.log('🔧 Para resetar o sistema admin, digite no console: resetAdminSystem()')
  }, [resetToDefault])

  // Verificar se deve mostrar admin automaticamente
  useEffect(() => {
    if (isAuthenticated && !showLogin) {
      // Se está autenticado e não está mostrando login, pode mostrar admin se solicitado
      // Mas não abre automaticamente para não interferir na navegação
    }
  }, [isAuthenticated, showLogin])

  const handleLogin = (password: string): boolean => {
    const success = login(password)
    if (success) {
      setShowLogin(false)
      // Para primeiro acesso, o AdminPanel já gerencia a tela de setup
      setShowAdmin(true)
    }
    return success
  }

  const handleLogout = () => {
    logout()
    setShowAdmin(false)
  }

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault()
        if (isAuthenticated) {
          setShowAdmin(true)
        } else {
          setShowLogin(true)
        }
      }
      
      // Atalho especial para resetar sistema: Ctrl+Shift+R
      if (e.ctrlKey && e.shiftKey && e.key === 'R') {
        e.preventDefault()
        const confirmReset = confirm('⚠️ ATENÇÃO: Isso vai resetar o sistema para primeiro acesso. Deseja continuar?')
        if (confirmReset) {
          resetToDefault()
          setShowAdmin(false)
          setShowLogin(false)
        }
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isAuthenticated])

  // Mostrar loading enquanto verifica autenticação
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Carregando...</p>
        </div>
      </div>
    )
  }

  if (showLogin) {
    return (
      <>
        <LoginForm 
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
        <AdminPanel onClose={() => setShowAdmin(false)} onLogout={handleLogout} />
        <Toaster />
      </>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onAdminClick={() => isAuthenticated ? setShowAdmin(true) : setShowLogin(true)} />
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