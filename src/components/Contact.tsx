import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { 
  MapPin, 
  Clock, 
  Phone, 
  Envelope, 
  WhatsappLogo,
  InstagramLogo,
  FacebookLogo,
  CheckCircle
} from '@phosphor-icons/react'

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    device: '',
    problem: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))

    toast.success('Mensagem enviada com sucesso! Entraremos em contato em breve.', {
      duration: 4000,
    })

    setFormData({
      name: '',
      email: '',
      phone: '',
      device: '',
      problem: '',
      message: ''
    })
    setIsSubmitting(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

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
      icon: Envelope,
      title: 'E-mail',
      value: 'contato@teccellpremium.com',
      description: 'Resposta em até 2h',
      action: 'mailto:contato@teccellpremium.com'
    },
    {
      icon: MapPin,
      title: 'Endereço',
      value: 'Rua da Tecnologia, 123',
      description: 'São Paulo - SP',
      action: 'https://maps.google.com'
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
                <Envelope size={20} />
                Solicitar Orçamento
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Nome *</label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Seu nome completo"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Telefone *</label>
                    <Input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(11) 99999-9999"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">E-mail</label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="seu@email.com"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Dispositivo *</label>
                    <Input
                      name="device"
                      value={formData.device}
                      onChange={handleChange}
                      placeholder="ex: iPhone 13 Pro"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Problema</label>
                    <Input
                      name="problem"
                      value={formData.problem}
                      onChange={handleChange}
                      placeholder="ex: Não carrega"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Mensagem</label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Descreva o problema com mais detalhes..."
                    rows={4}
                  />
                </div>
                
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></div>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <CheckCircle size={16} className="mr-2" />
                      Enviar Mensagem
                    </>
                  )}
                </Button>
              </form>
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