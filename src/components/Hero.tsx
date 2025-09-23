
import { Button } from '@/components/ui/button'
import { ArrowRight, House, CheckCircle, Calculator, Image } from 'phosphor-react'
import videoFundo from '@/assets/images/logo fundo.mp4'


export function Hero() {
  return (
    <section className="relative overflow-hidden min-h-screen flex items-center">
      <div className="container relative z-10 px-4 py-20 md:px-8 md:py-32 w-full">
        <div className="max-w-4xl mx-auto text-center">
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
              <Calculator size={20} className="mr-2" />
              Solicitar Orçamento
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 py-6 text-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-white/30"
              onClick={() => {
                const gallerySection = document.getElementById('galeria')
                if (gallerySection) {
                  gallerySection.scrollIntoView({ behavior: 'smooth' })
                }
              }}
            >
              <Image size={20} className="mr-2" />
              Ver Nossos Trabalhos
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-300 mb-2 drop-shadow-lg">5000+</div>
              <div className="text-white/80">Reparos Realizados</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-300 mb-2 drop-shadow-lg">90%</div>
              <div className="text-white/80">Taxa de Sucesso</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-300 mb-2 drop-shadow-lg">30 Dias</div>
              <div className="text-white/80">Garantia Premium</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Vídeo cobrindo 100% da tela como fundo */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center">
        <video
          src={videoFundo}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
    </section>
  )
}
