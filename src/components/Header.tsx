import { Button } from '@/components/ui/button'
import { Smartphone, Shield, Award } from '@phosphor-icons/react'

interface HeaderProps {
  onAdminClick: () => void
}

export function Header({ onAdminClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-8">
        <div className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-primary-foreground">
            <Smartphone size={24} weight="bold" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Teccell Premium</h1>
            <p className="text-xs text-muted-foreground">Especialista Apple</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <a href="#servicos" className="text-sm font-medium hover:text-primary transition-colors">
            Serviços
          </a>
          <a href="#galeria" className="text-sm font-medium hover:text-primary transition-colors">
            Galeria
          </a>
          <a href="#contato" className="text-sm font-medium hover:text-primary transition-colors">
            Contato
          </a>
        </nav>

        <div className="flex items-center space-x-2">
          <div className="hidden md:flex items-center space-x-1 text-xs text-muted-foreground">
            <Shield size={16} />
            <span>Garantia Premium</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onAdminClick}
            className="opacity-0 hover:opacity-100 transition-opacity duration-300"
          >
            <Award size={16} />
          </Button>
        </div>
      </div>
    </header>
  )
}