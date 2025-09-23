import { useState, useEffect } from 'react'
import { useKV } from '@github/spark/hooks'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Services } from './components/Services'
import { Gallery } from './components/Gallery'
import { Testimonials } from './components/Testimonials'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { AdminPanel } from './components/AdminPanel'
import { LoginForm } from './components/LoginForm'
import { Toaster } from '@/components/ui/sonner'

function App() {
  const [isAdmin, setIsAdmin] = useKV('admin-session', false)
  const [showLogin, setShowLogin] = useState(false)
  const [showAdmin, setShowAdmin] = useState(false)

  const handleLogin = (success: boolean) => {
    if (success) {
      setIsAdmin(true)
      setShowLogin(false)
      setShowAdmin(true)
    }
  }

  const handleLogout = () => {
    setIsAdmin(false)
    setShowAdmin(false)
  }

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