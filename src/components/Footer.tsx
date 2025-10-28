import { Card } from '@/components/ui/card'
import { 
  MapPin, 
  Phone, 
  WhatsappLogo,
  InstagramLogo,
  FacebookLogo,
  Clock,
  Globe
} from 'phosphor-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-br from-gray-200 via-gray-100 to-blue-100 dark:from-gray-800 dark:via-gray-700 dark:to-blue-900 border-t border-gray-300/50 dark:border-gray-600/50">
      <div className="container px-4 md:px-8 mx-auto py-12">
        {/* Grid principal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Informações da empresa */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              Teccell Premium
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Especializada em assistência técnica de celulares, tablets e smartwatches. 
              Qualidade e confiança há anos no mercado.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin size={16} className="text-accent" />
              <span>Bebedouro/SP</span>
            </div>
          </div>

          {/* Contato */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Contato</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-accent" />
                <a 
                  href="tel:+5517997746622" 
                  className="text-sm text-muted-foreground hover:text-accent transition-colors"
                >
                  (17) 99774-6622
                </a>
              </div>
              <div className="flex items-center gap-3">
                <WhatsappLogo size={16} className="text-green-500" />
                <a 
                  href="https://wa.me/5517997746622" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-green-500 transition-colors"
                >
                  WhatsApp
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-accent" />
                <span className="text-sm text-muted-foreground">
                  Av. Prefeito Pedro Paschoal, 1322
                </span>
              </div>
            </div>
          </div>

          {/* Horário de funcionamento */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Funcionamento</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-accent" />
                <div className="text-sm">
                  <p className="text-foreground font-medium">Segunda a Sexta</p>
                  <p className="text-muted-foreground">09:00 - 18:00</p>
                </div>
              </div>
              <div className="text-sm text-muted-foreground pl-6">
                <p><span className="font-medium">Sábado e Domingo:</span> Fechado</p>
              </div>
            </div>
          </div>

          {/* Redes sociais */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Redes Sociais</h4>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/teccellpremium/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-200/50 hover:from-pink-500 hover:to-purple-500 hover:text-white transition-all duration-300"
              >
                <InstagramLogo size={20} />
              </a>
              <a
                href="https://www.facebook.com/tec.cellpremium.3/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gradient-to-r from-blue-500/10 to-blue-600/10 border border-blue-200/50 hover:from-blue-500 hover:to-blue-600 hover:text-white transition-all duration-300"
              >
                <FacebookLogo size={20} />
              </a>
              <a
                href="https://wa.me/5517997746622"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gradient-to-r from-green-500/10 to-green-600/10 border border-green-200/50 hover:from-green-500 hover:to-green-600 hover:text-white transition-all duration-300"
              >
                <WhatsappLogo size={20} />
              </a>
            </div>
            <div className="text-xs text-muted-foreground">
              <p>Siga-nos para novidades e promoções!</p>
            </div>
          </div>
        </div>

        {/* Linha divisória */}
        <div className="border-t border-border/50 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            
            {/* Direitos reservados */}
            <div className="text-center md:text-left">
              <p className="text-sm text-muted-foreground">
                © {currentYear} <span className="font-semibold text-foreground">Teccell Premium</span>. 
                Todos os direitos reservados.
              </p>
            </div>

            {/* Desenvolvido por */}
            <div className="text-center md:text-right">
              <p className="text-xs text-muted-foreground">
                Desenvolvido por{' '}
                <a 
                  href="https://gruporaval.com.br/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-semibold text-accent hover:text-primary transition-colors inline-flex items-center gap-1"
                >
                  <Globe size={14} />
                  gruporaval.com.br
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}