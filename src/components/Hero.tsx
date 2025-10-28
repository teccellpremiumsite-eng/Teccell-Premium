
import { Button } from '@/components/ui/button'
import { ArrowRight, House, CheckCircle, Calculator, Image } from 'phosphor-react'
import videoFundo from '@/assets/images/logo fundo.mp4'


export function Hero() {
  return (
    <section className="relative overflow-hidden h-screen flex items-center">
      {/* Vídeo cobrindo 100% da tela como fundo */}
      <div className="absolute inset-0 w-full h-full">
        <video
          src={videoFundo}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(1.1) contrast(1.05)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/50"></div>
      </div>
      
      <div className="container relative z-10 px-4 md:px-8 w-full pt-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-white drop-shadow-2xl">
            Reparo Profissional de
            <span className="text-blue-300 block mt-3 drop-shadow-2xl">Placas Apple</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow-xl">
            Diagnosticamos e reparamos placas-mãe de iPhone, iPad e MacBook com precisão microscópica. 
            Utilizamos equipamentos de última geração e componentes originais.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button 
              size="lg" 
              className="px-8 py-7 text-lg font-semibold bg-white/20 backdrop-blur-md hover:bg-white/30 text-white border-2 border-white/40 shadow-2xl hover:scale-105 transition-transform"
              onClick={() => window.open('https://wa.me/5517997746622?text=Olá! Gostaria de solicitar um orçamento para reparo de placa Apple.', '_blank')}
            >
              <Calculator size={22} className="mr-2" />
              Solicitar Orçamento
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 py-7 text-lg bg-white/10 backdrop-blur-md hover:bg-white/25 text-white border-2 border-white/40 shadow-2xl hover:scale-105 transition-transform"
              onClick={() => {
                const gallerySection = document.getElementById('galeria')
                if (gallerySection) {
                  gallerySection.scrollIntoView({ behavior: 'smooth' })
                }
              }}
            >
              <Image size={22} className="mr-2" />
              Ver Nossos Trabalhos
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl">
              <div className="text-4xl font-bold text-blue-300 mb-2 drop-shadow-2xl">5000+</div>
              <div className="text-white font-medium drop-shadow-lg">Reparos Realizados</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl">
              <div className="text-4xl font-bold text-blue-300 mb-2 drop-shadow-2xl">90%</div>
              <div className="text-white font-medium drop-shadow-lg">Taxa de Sucesso</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl">
              <div className="text-4xl font-bold text-blue-300 mb-2 drop-shadow-2xl">90 Dias</div>
              <div className="text-white font-medium drop-shadow-lg">Garantia Premium</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
