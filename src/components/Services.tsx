import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  DeviceMobile, 
  DeviceTablet, 
  Laptop, 
  Lightning,
  Drop,
  Wrench,
  Cpu,
  CircuitBoard
} from '@phosphor-icons/react'

const services = [
  {
    icon: DeviceMobile,
    title: "Reparo de iPhone",
    description: "Especialização em placas-mãe de iPhone. Reparamos problemas de carregamento, touch, câmera, Face ID e muito mais.",
    features: ["Face ID", "Touch Screen", "Carregamento", "Câmeras", "Audio"],
    complexity: "Alta"
  },
  {
    icon: DeviceTablet,
    title: "Reparo de iPad",
    description: "Diagnóstico e reparo completo de iPads. Problemas de touch, carregamento, botões e conectividade.",
    features: ["Touch Screen", "Carregamento", "Botões", "Wi-Fi", "Câmeras"],
    complexity: "Média"
  },
  {
    icon: Laptop,
    title: "Reparo de MacBook",
    description: "Reparos avançados em MacBooks. Problemas de inicialização, teclado, trackpad e conectores.",
    features: ["Logic Board", "Teclado", "Trackpad", "USB-C", "Carregamento"],
    complexity: "Muito Alta"
  },
  {
    icon: Drop,
    title: "Danos por Líquido",
    description: "Tratamento especializado para dispositivos que sofreram danos por líquidos. Limpeza ultrassônica e substituição de componentes.",
    features: ["Limpeza Ultrassônica", "Substituição", "Proteção", "Prevenção"],
    complexity: "Alta"
  },
  {
    icon: Lightning,
    title: "Problemas de Carregamento",
    description: "Diagnóstico preciso de problemas de carregamento. Reparo de conectores, circuitos e componentes de energia.",
    features: ["Conector Lightning", "USB-C", "Wireless", "IC Carregamento"],
    complexity: "Média"
  },
  {
    icon: CircuitBoard,
    title: "Microsoldagem",
    description: "Trabalhos de microsoldagem com precisão microscópica. Substituição de ICs, capacitores e componentes SMD.",
    features: ["IC Replacement", "SMD Components", "BGA Rework", "Jumpers"],
    complexity: "Muito Alta"
  }
]

const getComplexityColor = (complexity: string) => {
  switch (complexity) {
    case "Média": return "bg-yellow-100 text-yellow-800"
    case "Alta": return "bg-orange-100 text-orange-800"
    case "Muito Alta": return "bg-red-100 text-red-800"
    default: return "bg-green-100 text-green-800"
  }
}

export function Services() {
  return (
    <section id="servicos" className="py-20 bg-secondary/30">
      <div className="container px-4 md:px-8">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            <Wrench size={16} className="mr-2" />
            Nossos Serviços
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Especialização em Dispositivos Apple
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Oferecemos reparos profissionais com equipamentos de última geração e técnicos especializados 
            em tecnologia Apple.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                    <service.icon size={24} weight="bold" />
                  </div>
                  <Badge variant="secondary" className={getComplexityColor(service.complexity)}>
                    {service.complexity}
                  </Badge>
                </div>
                
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {service.description}
                </p>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-foreground/80">Especializações:</h4>
                  <div className="flex flex-wrap gap-2">
                    {service.features.map((feature, featureIndex) => (
                      <Badge key={featureIndex} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Card className="max-w-3xl mx-auto bg-gradient-to-r from-accent/5 to-primary/5 border-accent/20">
            <CardContent className="p-8">
              <Cpu size={48} className="mx-auto text-accent mb-4" />
              <h3 className="text-2xl font-bold mb-4">Diagnóstico Gratuito</h3>
              <p className="text-muted-foreground mb-6">
                Realizamos diagnóstico completo sem custo. Você só paga se aprovar o reparo.
                Utilizamos equipamentos profissionais para identificar problemas com precisão.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>Diagnóstico em até 2 horas</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>Orçamento detalhado</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>Sem compromisso</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}