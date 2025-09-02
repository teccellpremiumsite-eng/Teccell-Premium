import { Button } from '@/components/ui/button'
import { ArrowRight, House, CheckCircle } from '@phosphor-icons/react'
import logoFundo from '@/assets/images/logo fundo.webp'

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="container relative z-10 px-4 py-20 md:px-8 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-primary text-sm font-medium mb-8">
            <CheckCircle size={16} weight="fill" />
            Especialistas Certificados Apple
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white drop-shadow-lg">
            Reparo Profissional de
            <span className="text-blue-300 block mt-2">Placas Apple</span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
            Diagnosticamos e reparamos placas-mãe de iPhone, iPad e MacBook com precisão microscópica. 
            Utilizamos equipamentos de última geração e componentes originais.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              className="px-8 py-6 text-lg font-semibold bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30"
              onClick={() => window.open('https://wa.me/5517997746622?text=Olá! Gostaria de solicitar um orçamento para reparo de placa Apple.', '_blank')}
            >
              � Solicitar Orçamento
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-6 text-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-white/30">
              Ver Nossos Trabalhos
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-300 mb-2 drop-shadow-lg">5000+</div>
              <div className="text-white/80">Reparos Realizados</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-300 mb-2 drop-shadow-lg">98%</div>
              <div className="text-white/80">Taxa de Sucesso</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-300 mb-2 drop-shadow-lg">7 Dias</div>
              <div className="text-white/80">Garantia Premium</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Logo cobrindo 100% da tela como fundo */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center">
        <img 
          src={logoFundo} 
          alt="Teccell Premium Background Logo" 
          className="max-w-full max-h-full object-contain"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
    </section>
  )
}
