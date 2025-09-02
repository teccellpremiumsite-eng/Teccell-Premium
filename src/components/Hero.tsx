import { ArrowRight, ShieldCheck, Wrench, Clock } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <section className="pt-24 pb-16 px-4 lg:px-8">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Reparo Especializado em
            <span className="text-accent block">Placas Apple</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Expertise técnica avançada em reparo de placas-mãe para dispositivos Apple. 
            Diagnóstico preciso, componentes originais e garantia de qualidade.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button size="lg" className="group">
              Solicitar Orçamento
              <ArrowRight 
                size={16} 
                className="ml-2 group-hover:translate-x-1 transition-transform" 
              />
            </Button>
            <Button variant="outline" size="lg">
              Ver Trabalhos Realizados
            </Button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <ShieldCheck size={32} className="text-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Garantia Premium</h3>
              <p className="text-muted-foreground">
                6 meses de garantia em todos os reparos realizados
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Wrench size={32} className="text-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Técnica Avançada</h3>
              <p className="text-muted-foreground">
                Equipamentos profissionais e técnicas de microssolda
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Clock size={32} className="text-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Agilidade</h3>
              <p className="text-muted-foreground">
                Diagnóstico rápido e reparo em até 48h
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}