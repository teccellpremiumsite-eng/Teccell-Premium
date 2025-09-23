import { Button } from '@/components/ui/button'
import { DeviceMobile, ShieldCheck, Trophy } from 'phosphor-react'
import teccellLogo from '@/assets/images/teccell-logo.jpg'

interface HeaderProps {
  onAdminClick: () => void
}

export function Header({ onAdminClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-blue-200/30 bg-gradient-to-r from-blue-600/95 via-blue-700/95 to-blue-800/95 backdrop-blur supports-[backdrop-filter]:bg-blue-600/90 shadow-lg">
      <div className="container flex h-16 items-center justify-between px-4 md:px-8">
        <div className="flex items-center space-x-5">
          {/* Logo da empresa */}
          <div className="flex items-center justify-center w-20 h-20 rounded-xl overflow-hidden bg-white/20 backdrop-blur-sm ring-2 ring-white/30 shadow-lg">
            <img src={teccellLogo} alt="Teccell Premium Logo" className="w-18 h-18 object-contain" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white drop-shadow-sm">Teccell Premium</h1>
            <p className="text-xs text-blue-100/90 font-medium">Especialista Apple</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <a href="#servicos" className="text-sm font-medium text-white/90 hover:text-white hover:scale-105 transition-all duration-200 relative group">
            Serviços
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-200"></span>
          </a>
          <a href="#galeria" className="text-sm font-medium text-white/90 hover:text-white hover:scale-105 transition-all duration-200 relative group">
            Galeria
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-200"></span>
          </a>
          <a href="#contato" className="text-sm font-medium text-white/90 hover:text-white hover:scale-105 transition-all duration-200 relative group">
            Contato
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-200"></span>
          </a>
        </nav>

        <div className="flex items-center space-x-2">
          <div className="hidden md:flex items-center space-x-2 text-xs text-white/90 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
            <ShieldCheck size={16} className="text-white" />
            <span className="font-medium">Garantia Premium</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onAdminClick}
            className="opacity-0 hover:opacity-100 transition-opacity duration-300 text-white hover:bg-white/20"
          >
            <Trophy size={16} />
          </Button>
        </div>
      </div>
    </header>
  )
}