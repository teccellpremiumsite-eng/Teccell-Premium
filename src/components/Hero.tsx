import { Button } from '@/components/ui/button'
import { ArrowRight, Wrench, CheckCircle } from '@phosphor-icons/react'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-secondary/30">
      <div className="container relative z-10 px-4 py-20 md:px-8 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-8">
            <CheckCircle size={16} weight="fill" />
            Especialistas Certificados Apple
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Reparo Profissional de
            <span className="text-accent block mt-2">Placas Apple</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Diagnosticamos e reparamos placas-mãe de iPhone, iPad e MacBook com precisão microscópica. 
            Utilizamos equipamentos de última geração e componentes originais.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg" className="px-8 py-6 text-lg font-semibold">
              <Wrench size={20} className="mr-2" />
              Solicitar Orçamento
              <ArrowRight size={16} className="ml-2" />
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-6 text-lg">
              Ver Nossos Trabalhos
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-accent mb-2">5000+</div>
              <div className="text-muted-foreground">Reparos Realizados</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-2">98%</div>
              <div className="text-muted-foreground">Taxa de Sucesso</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-2">7 Dias</div>
              <div className="text-muted-foreground">Garantia Premium</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-accent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-primary rounded-full blur-3xl"></div>
      </div>
    </section>
  )
}