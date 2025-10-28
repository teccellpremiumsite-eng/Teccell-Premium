import { Button } from '@/components/ui/button'
import { DeviceMobile, ShieldCheck, Trophy } from 'phosphor-react'
import teccellLogo from '@/assets/images/teccell-logo.jpg'

interface HeaderProps {
  onAdminClick: () => void
}

export function Header({ onAdminClick }: HeaderProps) {
  return (
    <header className="fixed top-0 z-50 w-full">
      <div className="container flex h-20 items-center justify-between px-4 md:px-8 bg-gradient-to-b from-black/60 via-black/40 to-transparent backdrop-blur-sm">
        <div className="flex items-center space-x-5">
          {/* Logo da empresa */}
          <div className="flex items-center justify-center w-20 h-20 rounded-xl overflow-hidden bg-white/10 backdrop-blur-md ring-2 ring-white/30 shadow-2xl">
            <img src={teccellLogo} alt="Teccell Premium Logo" className="w-18 h-18 object-contain" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white drop-shadow-lg">Teccell Premium</h1>
            <p className="text-xs text-white/90 font-medium drop-shadow-md">Especialista Apple</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <a href="#servicos" className="text-sm font-medium text-white/95 hover:text-white hover:scale-105 transition-all duration-200 relative group drop-shadow-md">
            Serviços
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-200"></span>
          </a>
          <a href="#galeria" className="text-sm font-medium text-white/95 hover:text-white hover:scale-105 transition-all duration-200 relative group drop-shadow-md">
            Galeria
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-200"></span>
          </a>
          <a href="#contato" className="text-sm font-medium text-white/95 hover:text-white hover:scale-105 transition-all duration-200 relative group drop-shadow-md">
            Contato
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-200"></span>
          </a>
        </nav>

        <div className="flex items-center space-x-2">
          <div className="hidden md:flex items-center space-x-2 text-xs text-white bg-white/15 px-3 py-1.5 rounded-full backdrop-blur-md shadow-lg">
            <ShieldCheck size={16} className="text-white drop-shadow-md" />
            <span className="font-medium drop-shadow-md">Garantia Premium</span>
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