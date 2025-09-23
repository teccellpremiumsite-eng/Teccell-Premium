import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  DeviceMobile, 
  DeviceTablet, 
  Laptop, 
  Lightning,
  Drop,
  Wrench,
  Cpu
} from 'phosphor-react'

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
    icon: Cpu,
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
    <section id="servicos" className="py-20 bg-gradient-to-br from-gray-100 via-gray-200 to-blue-200 dark:from-gray-800 dark:via-gray-700 dark:to-blue-800">
      <div className="container px-4 md:px-8 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            Especialização em Dispositivos Apple
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            Oferecemos reparos profissionais com equipamentos de última geração e técnicos especializados 
            em tecnologia Apple.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="group relative overflow-hidden bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50 border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 min-h-[280px] hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-950/20 dark:hover:to-indigo-950/20">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <CardContent className="p-5 h-full flex flex-col relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="relative">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <service.icon size={24} weight="bold" />
                    </div>
                    <div className="absolute -inset-1 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-300"></div>
                  </div>
                  <Badge variant="secondary" className={`text-xs px-3 py-1 font-medium shadow-sm ${getComplexityColor(service.complexity)}`}>
                    {service.complexity}
                  </Badge>
                </div>
                
                <h3 className="text-base font-bold mb-3 text-gray-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-300 line-clamp-2">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed text-sm flex-1 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                  {service.description}
                </p>
                
                <div className="space-y-3 mt-auto">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-blue-500"></div>
                    <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200">Especializações</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {service.features.map((feature, featureIndex) => (
                      <Badge key={featureIndex} variant="outline" className="text-xs px-2 py-1 bg-white/80 dark:bg-gray-800/80 border-gray-200 dark:border-gray-700 hover:bg-blue-50 hover:border-blue-200 dark:hover:bg-blue-950/30 dark:hover:border-blue-800 transition-colors duration-200 font-medium whitespace-nowrap">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
              
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-blue-500/10 to-transparent rounded-bl-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute bottom-0 left-0 w-12 h-12 bg-gradient-to-tr from-indigo-500/10 to-transparent rounded-tr-[1.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}