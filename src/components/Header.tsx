import { Apple, Settings } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'

interface HeaderProps {
  onAdminClick: () => void
}

export function Header({ onAdminClick }: HeaderProps) {
  return (
    <header className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <Apple weight="fill" size={24} className="text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Teccell Premium</h1>
              <p className="text-sm text-muted-foreground">Especialista Apple</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#services" className="text-foreground hover:text-accent transition-colors">
              Serviços
            </a>
            <a href="#gallery" className="text-foreground hover:text-accent transition-colors">
              Trabalhos
            </a>
            <a href="#contact" className="text-foreground hover:text-accent transition-colors">
              Contato
            </a>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onAdminClick}
            className="opacity-50 hover:opacity-100"
          >
            <Settings size={16} />
          </Button>
        </div>
      </nav>
    </header>
  )
}