import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  MapPin, 
  Clock, 
  Phone, 
  WhatsappLogo,
  InstagramLogo,
  FacebookLogo,
  CheckCircle,
  Shield
} from 'phosphor-react'

export function Contact() {

  const contactInfo = [
    {
      icon: Phone,
      title: 'Telefone',
      value: '(17) 99774-6622',
      description: 'Seg-Sex: 9h às 18h',
      action: 'tel:+5517997746622'
    },
    {
      icon: WhatsappLogo,
      title: 'WhatsApp',
      value: '(17) 99774-6622',
      description: 'Atendimento rápido',
      action: 'https://wa.me/5517997746622'
    },
    {
      icon: InstagramLogo,
      title: 'Instagram',
      value: '@teccellpremium',
      description: 'Siga nossa página',
      action: 'https://www.instagram.com/teccellpremium/'
    }
  ]

  const workingHours = [
    { day: 'Segunda a Sexta', hours: '09:00 - 18:00' },
    { day: 'Sábado', hours: 'Fechado' },
    { day: 'Domingo', hours: 'Fechado' }
  ]

  return (
    <section id="contato" className="py-20 bg-gradient-to-br from-gray-50 via-gray-25 to-gray-50 dark:from-gray-900/20 dark:via-gray-800/10 dark:to-gray-900/20">
      <div className="container px-4 md:px-8 mx-auto">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
            Entre em Contato
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Fale Conosco
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Está com problemas no seu dispositivo Apple? Entre em contato conosco! 
            Nossa equipe especializada está pronta para ajudar.
          </p>
        </div>

        {/* Cards de Contato Principais */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {contactInfo.map((info, index) => (
            <Card 
              key={index} 
              className={`group relative overflow-hidden backdrop-blur-sm border-0 shadow-lg transition-all duration-500 ${
                info.title === 'Instagram' 
                  ? 'bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-orange-500/20 hover:shadow-2xl hover:scale-105' 
                  : info.title === 'WhatsApp'
                  ? 'bg-gradient-to-br from-green-500/20 to-green-600/20 hover:shadow-2xl hover:scale-105'
                  : info.title === 'Telefone'
                  ? 'bg-gradient-to-br from-gray-700/20 to-gray-800/20 hover:shadow-2xl hover:scale-105'
                  : 'bg-gradient-to-br from-card/50 to-card/80 hover:shadow-xl hover:-translate-y-2'
              }`}
            >
              <div className={`absolute inset-0 transition-opacity duration-500 ${
                info.title === 'Instagram'
                  ? 'bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-orange-500/10'
                  : info.title === 'WhatsApp'
                  ? 'bg-gradient-to-br from-green-500/10 to-green-600/10'
                  : info.title === 'Telefone'
                  ? 'bg-gradient-to-br from-gray-700/10 to-gray-800/10'
                  : 'bg-gradient-to-br from-accent/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100'
              }`} />
              <CardContent className="relative p-8 text-center">
                <div className={`flex items-center justify-center w-16 h-16 rounded-2xl transition-all duration-500 mx-auto mb-6 ${
                  info.title === 'Instagram'
                    ? 'bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 text-white group-hover:scale-110'
                    : info.title === 'WhatsApp'
                    ? 'bg-gradient-to-br from-green-500 to-green-600 text-white group-hover:scale-110'
                    : info.title === 'Telefone'
                    ? 'bg-gradient-to-br from-gray-700 to-gray-800 text-white group-hover:scale-110'
                    : 'bg-gradient-to-br from-accent/10 to-primary/10 text-accent group-hover:from-accent group-hover:to-primary group-hover:text-white group-hover:scale-110'
                }`}>
                  <info.icon size={28} weight="bold" />
                </div>
                <h3 className={`font-bold text-lg mb-3 transition-colors ${
                  info.title === 'Instagram' 
                    ? 'text-pink-500' 
                    : info.title === 'WhatsApp'
                    ? 'text-green-600'
                    : info.title === 'Telefone'
                    ? 'text-gray-700'
                    : 'group-hover:text-accent'
                }`}>{info.title}</h3>
                <p className="font-semibold text-foreground mb-2 text-lg">{info.value}</p>
                <p className="text-sm text-muted-foreground mb-6">{info.description}</p>
                <Button
                  variant="outline"
                  size="default"
                  onClick={() => window.open(info.action, '_blank')}
                  className={`w-full transition-all duration-300 ${
                    info.title === 'Instagram'
                      ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white border-pink-500'
                      : info.title === 'WhatsApp'
                      ? 'bg-gradient-to-r from-green-500 to-green-600 text-white border-green-500'
                      : info.title === 'Telefone'
                      ? 'bg-gradient-to-r from-gray-700 to-gray-800 text-white border-gray-700'
                      : 'group-hover:bg-accent group-hover:text-white group-hover:border-accent'
                  }`}
                >
                  <info.icon size={16} className="mr-2" />
                  {info.title === 'Instagram' ? 'Seguir Agora' : info.title === 'WhatsApp' ? 'Conversar Agora' : info.title === 'Telefone' ? 'Ligar Agora' : 'Contatar Agora'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Seção de Localização e Horários Otimizada */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Card de Localização Principal - Ocupa 3 colunas */}
          <div className="lg:col-span-3">
            <Card className="bg-gradient-to-br from-card via-card/95 to-card/90 backdrop-blur-md border border-accent/10 shadow-xl">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 rounded-xl bg-gradient-to-br from-accent/20 to-primary/20">
                    <MapPin size={24} className="text-accent" weight="bold" />
                  </div>
                  <div>
                    <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent font-bold">
                      Nossa Localização
                    </span>
                    <p className="text-sm text-muted-foreground font-normal">
                      Fácil acesso no centro de Bebedouro
                    </p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="relative space-y-6 p-8">
                {/* Endereço Principal */}
                <div className="p-6 bg-gradient-to-br from-accent/5 to-primary/5 rounded-xl border border-accent/10">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge className="bg-accent/10 text-accent border-accent/20">
                      📍 Endereço Completo
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-foreground">
                      Avenida Prefeito Pedro Paschoal, 1322
                    </h3>
                    <p className="text-base text-muted-foreground">
                      <span className="font-semibold">Bebedouro/SP</span> - CEP: 14701-000
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Coordenadas: 20°56'43.9"S 48°29'33.1"W
                    </p>
                  </div>
                </div>
                
                {/* Botões de Navegação */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button
                    onClick={() => window.open('https://maps.google.com/?q=-20.945527778,-48.492527778', '_blank')}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-0"
                    size="lg"
                  >
                    <MapPin size={18} className="mr-2" />
                    Ver no Google Maps
                  </Button>
                  <Button
                    onClick={() => window.open('https://www.waze.com/pt-BR/live-map/directions?to=ll.-20.945527778%2C-48.492527778', '_blank')}
                    className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white border-0"
                    size="lg"
                  >
                    <MapPin size={18} className="mr-2" />
                    Abrir no Waze
                  </Button>
                </div>

                {/* Cards de Informações */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/50 dark:to-emerald-950/50 rounded-xl border border-green-200/50 dark:border-green-800/50">
                    <h4 className="font-semibold mb-2 flex items-center gap-2 text-green-700 dark:text-green-400">
                      <CheckCircle size={16} weight="fill" />
                      Localização Privilegiada
                    </h4>
                    <p className="text-sm text-green-600 dark:text-green-300">
                      Na principal avenida de Bebedouro, região central com fácil acesso.
                    </p>
                  </div>

                  <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/50 dark:to-cyan-950/50 rounded-xl border border-blue-200/50 dark:border-blue-800/50">
                    <h4 className="font-semibold mb-2 flex items-center gap-2 text-blue-700 dark:text-blue-400">
                      <CheckCircle size={16} weight="fill" />
                      Estacionamento Disponível
                    </h4>
                    <p className="text-sm text-blue-600 dark:text-blue-300">
                      Estacionamento disponível na região para sua comodidade.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar com Horários e Garantia - 2 colunas lado a lado */}
          <div className="lg:col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Card de Horários Premium */}
            <Card className="bg-gradient-to-br from-card via-card/95 to-card/90 backdrop-blur-md border border-accent/10 shadow-xl">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-accent/20 to-primary/20">
                    <Clock size={24} className="text-accent" weight="bold" />
                  </div>
                  <div>
                    <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent font-bold">
                      Funcionamento
                    </span>
                    <p className="text-sm text-muted-foreground font-normal">
                      Horários de atendimento
                    </p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                {workingHours.map((schedule, index) => (
                  <div key={index} className="flex justify-between items-center p-4 rounded-xl bg-gradient-to-r from-muted/20 to-muted/10 border border-border/20 hover:shadow-md transition-all duration-200">
                    <span className="font-semibold text-base text-foreground">
                      {schedule.day}
                    </span>
                    <Badge 
                      variant="outline" 
                      className={`font-semibold text-sm px-3 py-1 ${
                        schedule.hours === 'Fechado' 
                          ? 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-400 dark:border-red-800/30' 
                          : 'bg-accent/10 text-accent border-accent/30'
                      }`}
                    >
                      {schedule.hours}
                    </Badge>
                  </div>
                ))}
                
                {/* Informação adicional */}
                <div className="mt-6 p-4 bg-gradient-to-r from-blue-50/80 to-cyan-50/80 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-xl border border-blue-200/40 dark:border-blue-800/30">
                  <p className="text-sm text-blue-700 dark:text-blue-400 text-center font-medium">
                    💡 <strong>Dica:</strong> WhatsApp para atendimento rápido
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Card de Garantia Premium */}
            <Card className="bg-gradient-to-br from-accent/8 to-primary/5 border border-accent/20 shadow-xl">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-accent/20 to-primary/20">
                    <Shield size={24} className="text-accent" weight="bold" />
                  </div>
                  <div>
                    <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent font-bold">
                      Garantia Premium
                    </span>
                    <p className="text-sm text-muted-foreground font-normal">
                      Proteção total garantida
                    </p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                <div className="space-y-3">
                  <div className="p-4 bg-gradient-to-r from-green-50/80 to-emerald-50/80 dark:from-green-950/30 dark:to-emerald-950/30 rounded-xl border border-green-200/50 dark:border-green-800/30 hover:shadow-md transition-all duration-200">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0"></div>
                      <span className="font-semibold text-green-700 dark:text-green-400 text-base">Garantia de 90 dias</span>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-r from-blue-50/80 to-cyan-50/80 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-xl border border-blue-200/50 dark:border-blue-800/30 hover:shadow-md transition-all duration-200">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-blue-500 rounded-full flex-shrink-0"></div>
                      <span className="font-semibold text-blue-700 dark:text-blue-400 text-base">Suporte técnico completo</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 mt-6">
                  <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide text-center">
                    Redes Sociais
                  </h4>
                  <div className="flex justify-center gap-3">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => window.open('https://www.instagram.com/teccellpremium/', '_blank')}
                      className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 border-pink-200/50 hover:from-pink-500 hover:to-purple-500 hover:text-white transition-all duration-300 p-2"
                    >
                      <InstagramLogo size={16} />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => window.open('https://www.facebook.com/tec.cellpremium.3/', '_blank')}
                      className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 border-blue-200/50 hover:from-blue-500 hover:to-blue-600 hover:text-white transition-all duration-300 p-2"
                    >
                      <FacebookLogo size={16} />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => window.open('https://wa.me/5517997746622', '_blank')}
                      className="bg-gradient-to-r from-green-500/10 to-green-600/10 border-green-200/50 hover:from-green-500 hover:to-green-600 hover:text-white transition-all duration-300 p-2"
                    >
                      <WhatsappLogo size={16} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}