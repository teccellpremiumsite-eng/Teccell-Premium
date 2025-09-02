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
  CheckCircle
} from '@phosphor-icons/react'

export function Contact() {

  const contactInfo = [
    {
      icon: Phone,
      title: 'Telefone',
      value: '(11) 99999-9999',
      description: 'Seg-Sex: 9h às 18h',
      action: 'tel:+5511999999999'
    },
    {
      icon: WhatsappLogo,
      title: 'WhatsApp',
      value: '(11) 99999-9999',
      description: 'Atendimento rápido',
      action: 'https://wa.me/5511999999999'
    },
    {
      icon: MapPin,
      title: 'Endereço',
      value: 'Avenida Prefeito Pedro Paschoal, 1322',
      description: 'Ribeirão Preto/SP',
      action: 'https://maps.google.com/?q=-20.945527778,-48.492527778'
    }
  ]

  const workingHours = [
    { day: 'Segunda a Sexta', hours: '09:00 - 18:00' },
    { day: 'Sábado', hours: '09:00 - 14:00' },
    { day: 'Domingo', hours: 'Fechado' }
  ]

  return (
    <section id="contato" className="py-20 bg-secondary/30">
      <div className="container px-4 md:px-8">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            <Phone size={16} className="mr-2" />
            Entre em Contato
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Fale Conosco
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Está com problemas no seu dispositivo Apple? Entre em contato conosco e 
            receba um diagnóstico gratuito e orçamento sem compromisso.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {contactInfo.map((info, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors mx-auto mb-4">
                  <info.icon size={24} weight="bold" />
                </div>
                <h3 className="font-semibold mb-2">{info.title}</h3>
                <p className="font-medium text-foreground mb-1">{info.value}</p>
                <p className="text-sm text-muted-foreground mb-4">{info.description}</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(info.action, '_blank')}
                  className="w-full"
                >
                  Contatar
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                📍
                Nossa Localização
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg border">
                  <h3 className="font-semibold mb-2 text-primary">Endereço Completo</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Avenida Prefeito Pedro Paschoal, 1322<br />
                    Ribeirão Preto/SP<br />
                    Coordenadas: 20°56'43.9"S 48°29'33.1"W
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button
                    onClick={() => window.open('https://maps.google.com/?q=-20.945527778,-48.492527778', '_blank')}
                    variant="outline"
                    className="w-full"
                  >
                    🗺️ Ver no Google Maps
                  </Button>
                  <Button
                    onClick={() => window.open('https://www.waze.com/pt-BR/live-map/directions?to=ll.-20.945527778%2C-48.492527778', '_blank')}
                    variant="outline"
                    className="w-full"
                  >
                    🚗 Abrir no Waze
                  </Button>
                </div>

                <div className="p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    🏢 Localização
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Na Avenida Prefeito Pedro Paschoal, região central de Ribeirão Preto, com fácil acesso e localização privilegiada.
                  </p>
                </div>

                <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 rounded-lg border">
                  <h4 className="font-medium mb-2 flex items-center gap-2 text-green-700 dark:text-green-400">
                    🚗 Acesso
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Localização de fácil acesso com estacionamento disponível na região.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock size={20} />
                  Horário de Funcionamento
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {workingHours.map((schedule, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-border/50 last:border-0">
                    <span className="font-medium">{schedule.day}</span>
                    <Badge variant="outline">{schedule.hours}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-accent/5 to-primary/5 border-accent/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle size={24} className="text-accent" weight="fill" />
                  <h3 className="font-semibold">Garantia Premium</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Todos os nossos reparos incluem garantia de 90 dias e suporte técnico completo.
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => window.open('https://instagram.com', '_blank')}>
                    <InstagramLogo size={16} />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => window.open('https://facebook.com', '_blank')}>
                    <FacebookLogo size={16} />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => window.open('https://wa.me/5511999999999', '_blank')}>
                    <WhatsappLogo size={16} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}