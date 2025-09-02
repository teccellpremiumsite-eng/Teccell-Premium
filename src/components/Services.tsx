import { DeviceMobile, Laptop, Desktop, Watch } from '@phosphor-icons/react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'

export function Services() {
  const services = [
    {
      icon: DeviceMobile,
      title: 'iPhone',
      description: 'Reparo de placas-mãe de iPhone de todas as gerações',
      details: [
        'Problemas de carregamento',
        'Falhas no sistema',
        'Danos por líquidos', 
        'Componentes queimados'
      ]
    },
    {
      icon: Laptop,
      title: 'MacBook',
      description: 'Especialização em placas lógicas de MacBook Pro e Air',
      details: [
        'Reparo de circuitos',
        'Substituição de chips',
        'Correção de trilhas',
        'Diagnóstico avançado'
      ]
    },
    {
      icon: Desktop,
      title: 'iMac',
      description: 'Manutenção e reparo de placas-mãe de iMac',
      details: [
        'Problemas de inicialização',
        'Falhas de vídeo',
        'Componentes danificados',
        'Restauração completa'
      ]
    },
    {
      icon: Watch,
      title: 'Apple Watch',
      description: 'Reparo especializado em componentes do Apple Watch',
      details: [
        'Problemas de bateria',
        'Sensores defeituosos',
        'Conectividade',
        'Restauração de firmware'
      ]
    }
  ]

  return (
    <section id="services" className="py-20 px-4 lg:px-8 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Serviços Especializados
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Oferecemos reparo técnico avançado para toda linha de produtos Apple, 
            com foco em soluções que outros não conseguem realizar.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon size={32} className="text-primary" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.details.map((detail, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-center">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full mr-3 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}