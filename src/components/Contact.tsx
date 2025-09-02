import { WhatsappLogo, MapPin, Clock, Phone } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export function Contact() {
  const handleWhatsApp = () => {
    const message = encodeURIComponent('Olá! Gostaria de saber mais sobre os serviços de reparo de placas Apple.')
    window.open(`https://wa.me/5511999999999?text=${message}`, '_blank')
  }

  return (
    <section id="contact" className="py-20 px-4 lg:px-8 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Entre em Contato
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Precisa de reparo especializado em placas Apple? 
            Nossa equipe está pronta para ajudar com diagnóstico gratuito.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Fale Conosco
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <WhatsappLogo size={24} className="text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">WhatsApp</h4>
                    <p className="text-muted-foreground mb-3">
                      Atendimento rápido pelo WhatsApp
                    </p>
                    <Button onClick={handleWhatsApp} className="w-full">
                      <WhatsappLogo size={16} className="mr-2" />
                      Chamar no WhatsApp
                    </Button>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone size={24} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Telefone</h4>
                    <p className="text-muted-foreground">
                      (11) 99999-9999
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin size={24} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Localização</h4>
                    <p className="text-muted-foreground">
                      São Paulo - SP<br />
                      Atendimento em toda região metropolitana
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock size={24} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Horário</h4>
                    <p className="text-muted-foreground">
                      Segunda a Sexta: 9h às 18h<br />
                      Sábado: 9h às 14h
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Nossos Diferenciais
              </h3>
              
              <div className="space-y-4">
                <div className="border-l-4 border-accent pl-4">
                  <h4 className="font-semibold text-foreground mb-1">
                    Diagnóstico Gratuito
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Análise completa sem custo para identificar o problema
                  </p>
                </div>
                
                <div className="border-l-4 border-accent pl-4">
                  <h4 className="font-semibold text-foreground mb-1">
                    Orçamento Transparente
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Preços justos com detalhamento completo do serviço
                  </p>
                </div>
                
                <div className="border-l-4 border-accent pl-4">
                  <h4 className="font-semibold text-foreground mb-1">
                    Equipamentos Profissionais
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Estação de solda, microscópio e ferramentas especializadas
                  </p>
                </div>
                
                <div className="border-l-4 border-accent pl-4">
                  <h4 className="font-semibold text-foreground mb-1">
                    Garantia Estendida
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    6 meses de garantia em todos os reparos realizados
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}