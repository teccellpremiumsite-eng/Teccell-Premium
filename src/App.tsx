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
import { InitialPasswordSetup } from './components/InitialPasswordSetup'
import { useAuth } from './hooks/useAuth'
import { Toaster } from '@/components/ui/sonner'

function App() {
  const [showLogin, setShowLogin] = useState(false)
  const [showAdmin, setShowAdmin] = useState(false)
  const { isAuthenticated, isFirstTimeAccess, needsPasswordSetup, login, logout, loading, resetToDefault, completeFirstTimeSetup } = useAuth()

  // Initialize on app load
  useEffect(() => {
    // Cache busting removido para evitar erros
    
    // Adicionar função global para resetar via console
    (window as any).resetAdminSystem = () => {
      const confirmReset = confirm('⚠️ RESETAR SISTEMA ADMIN?\n\nIsso vai:\n- Apagar senha atual\n- Voltar para primeiro acesso\n- Permitir configurar nova senha\n- Senha padrão será: admin\n\nDeseja continuar?')
      if (confirmReset) {
        resetToDefault()
        setShowAdmin(false)
        setShowLogin(false)
        console.log('🎯 Sistema resetado!')
        console.log('📋 Para acessar:\n1. Pressione Ctrl+Shift+A\n2. Digite: admin\n3. Configure nova senha')
      }
    }
    
    console.log('🔧 Para resetar: resetAdminSystem() | Para acessar: Ctrl+Shift+A')
    console.log('📋 Senha padrão inicial: admin')
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
      // Se precisa configurar senha, não abre admin ainda
      if (!needsPasswordSetup) {
        setShowAdmin(true)
      }
    }
    return success
  }

  const handlePasswordSetup = (newPassword: string) => {
    completeFirstTimeSetup(newPassword)
    setShowAdmin(true)
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
        const confirmReset = confirm('⚠️ ATENÇÃO: Isso vai resetar o sistema para primeiro acesso.\n\nSenha padrão será: admin\n\nDeseja continuar?')
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

  // Mostrar configuração de senha se for primeiro acesso e está autenticado
  if (isAuthenticated && needsPasswordSetup) {
    return (
      <>
        <InitialPasswordSetup 
          onSetupComplete={handlePasswordSetup}
          onCancel={() => {
            logout()
            setShowLogin(false)
          }}
        />
        <Toaster />
      </>
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