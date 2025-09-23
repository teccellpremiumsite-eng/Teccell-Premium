import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Star, Quotes, CaretLeft, CaretRight, GoogleLogo, FacebookLogo, MapPin, DeviceMobile, Calendar } from 'phosphor-react'

interface Testimonial {
  id: string
  name: string
  avatar?: string
  location: string
  device: string
  rating: number
  testimonial: string
  repairType: string
  date: string
  platform: 'google' | 'facebook' | 'local'
  verified?: boolean
  reviewUrl?: string
}

const defaultTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Maria Silva',
    location: 'São Paulo, SP',
    device: 'iPhone 12 Pro',
    rating: 5,
    testimonial: 'Excelente trabalho! Meu iPhone estava com problemas na placa-mãe e eles conseguiram resolver perfeitamente. Atendimento profissional e resultado impecável.',
    repairType: 'Reparo de Placa-Mãe',
    date: '2024-01-15',
    platform: 'google',
    verified: true,
    reviewUrl: 'https://g.co/kgs/example1'
  },
  {
    id: '2',
    name: 'João Santos',
    location: 'Rio de Janeiro, RJ',
    device: 'MacBook Pro 13"',
    rating: 5,
    testimonial: 'Depois de passar por várias assistências, finalmente encontrei quem realmente entende de Apple. Recuperaram totalmente meu MacBook com problema de placa lógica.',
    repairType: 'Reparo de Placa Lógica',
    date: '2024-01-10',
    platform: 'facebook',
    verified: true,
    reviewUrl: 'https://facebook.com/review/example2'
  },
  {
    id: '3',
    name: 'Ana Costa',
    location: 'Belo Horizonte, MG',
    device: 'iPad Pro',
    rating: 5,
    testimonial: 'Serviço premium de verdade! Meu iPad não ligava mais e eles fizeram um diagnóstico preciso e reparo completo. Voltou melhor que novo!',
    repairType: 'Diagnóstico e Reparo',
    date: '2024-01-05',
    platform: 'google',
    verified: true,
    reviewUrl: 'https://g.co/kgs/example3'
  },
  {
    id: '4',
    name: 'Carlos Oliveira',
    location: 'Brasília, DF',
    device: 'iPhone 13 Pro Max',
    rating: 5,
    testimonial: 'Impressionante a qualidade do trabalho! Meu iPhone caiu na água e pensei que não tinha mais salvação. A equipe fez milagres e recuperou tudo.',
    repairType: 'Recuperação após Dano Líquido',
    date: '2024-01-20',
    platform: 'facebook',
    verified: true,
    reviewUrl: 'https://facebook.com/review/example4'
  },
  {
    id: '5',
    name: 'Fernanda Martins',
    location: 'Porto Alegre, RS',
    device: 'MacBook Air M1',
    rating: 5,
    testimonial: 'Atendimento excepcional do início ao fim. Explicaram todo o processo, deram garantia e o resultado foi perfeito. Recomendo 100%!',
    repairType: 'Reparo de Placa Lógica',
    date: '2024-01-12',
    platform: 'google',
    verified: true,
    reviewUrl: 'https://g.co/kgs/example5'
  },
  {
    id: '6',
    name: 'Ricardo Lima',
    location: 'Recife, PE',
    device: 'iPhone 11',
    rating: 5,
    testimonial: 'Profissionais extremamente competentes. Resolveram um problema que outros lugares disseram ser impossível. Preço justo e trabalho impecável.',
    repairType: 'Microsolda Avançada',
    date: '2024-01-08',
    platform: 'local',
    verified: false
  }
]

export function Testimonials() {
  const [testimonials] = useState<Testimonial[]>(defaultTestimonials)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (!testimonials || testimonials.length === 0) return
    
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [testimonials?.length])

  const nextTestimonial = () => {
    if (!testimonials || testimonials.length === 0) return
    setCurrentIndex(prev => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    if (!testimonials || testimonials.length === 0) return
    setCurrentIndex(prev => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'
        }`}
      />
    ))
  }

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'google':
        return <GoogleLogo className="w-5 h-5 text-blue-500" weight="fill" />
      case 'facebook':
        return <FacebookLogo className="w-5 h-5 text-blue-600" weight="fill" />
      default:
        return <Star className="w-5 h-5 text-accent" weight="fill" />
    }
  }

  const getPlatformName = (platform: string) => {
    switch (platform) {
      case 'google':
        return 'Google'
      case 'facebook':
        return 'Facebook'
      default:
        return 'Teccell'
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    })
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  if (!testimonials || testimonials.length === 0) return null

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section className="h-screen bg-gradient-to-br from-gray-400 via-gray-200 to-white dark:from-gray-700 dark:via-gray-500 dark:to-gray-300 flex items-center justify-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-full flex flex-col justify-center">
        <div className="text-center mb-4 flex-shrink-0">
          <Badge className="mb-2 bg-accent/10 text-accent border-accent/20">
            Depoimentos Verificados
          </Badge>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            O que nossos clientes dizem
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Avaliações reais do Google e Facebook de clientes que confiaram na Teccell Premium
            para seus reparos Apple mais complexos.
          </p>
        </div>

        <div className="relative flex-1 min-h-0 max-h-full overflow-hidden">
          <div className="flex items-center justify-center h-full px-2">
            <Card className="max-w-3xl w-full bg-card/50 backdrop-blur-sm border shadow-lg">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4">
                  {/* Platform indicator */}
                  <div className="flex items-center space-x-2 bg-muted/50 px-2 py-1 rounded-full">
                    {getPlatformIcon(currentTestimonial.platform)}
                    <span className="text-xs font-medium text-muted-foreground">
                      Avaliação do {getPlatformName(currentTestimonial.platform)}
                    </span>
                    {currentTestimonial.verified && (
                      <Badge variant="secondary" className="text-xs bg-green-100 text-green-700 border-green-200">
                        Verificada
                      </Badge>
                    )}
                  </div>

                  <Quotes className="w-6 h-6 sm:w-8 sm:h-8 text-accent/60" />
                  
                  <blockquote className="text-base sm:text-lg md:text-xl font-medium text-foreground leading-relaxed line-clamp-4">
                    "{currentTestimonial.testimonial}"
                  </blockquote>

                  <div className="flex items-center space-x-1">
                    {renderStars(currentTestimonial.rating)}
                  </div>

                  <div className="flex items-center space-x-3">
                    <Avatar className="w-10 h-10 sm:w-12 sm:h-12">
                      <AvatarImage src={currentTestimonial.avatar} />
                      <AvatarFallback className="bg-accent text-accent-foreground font-semibold">
                        {getInitials(currentTestimonial.name)}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="text-left">
                      <h4 className="font-semibold text-foreground text-sm sm:text-base">
                        {currentTestimonial.name}
                      </h4>
                      <div className="flex items-center space-x-1 text-muted-foreground mb-1">
                        <MapPin className="w-3 h-3" />
                        <span className="text-xs">{currentTestimonial.location}</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-1">
                        <Badge variant="secondary" className="text-xs flex items-center space-x-1">
                          <DeviceMobile className="w-3 h-3" />
                          <span>{currentTestimonial.device}</span>
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {currentTestimonial.repairType}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* View original review link */}
                  {currentTestimonial.reviewUrl && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="mt-2 text-xs"
                      onClick={() => window.open(currentTestimonial.reviewUrl, '_blank')}
                    >
                      Ver avaliação original
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {testimonials && testimonials.length > 1 && (
            <>
              <button
                onClick={prevTestimonial}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-background/80 backdrop-blur-sm border shadow-lg hover:bg-background transition-colors"
                aria-label="Depoimento anterior"
              >
                <CaretLeft className="w-5 h-5" />
              </button>
              
              <button
                onClick={nextTestimonial}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-background/80 backdrop-blur-sm border shadow-lg hover:bg-background transition-colors"
                aria-label="Próximo depoimento"
              >
                <CaretRight className="w-5 h-5" />
              </button>
            </>
          )}
        </div>

        {testimonials && testimonials.length > 1 && (
          <div className="flex justify-center mt-4 space-x-2 flex-shrink-0">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex 
                    ? 'bg-accent' 
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
                aria-label={`Ir para depoimento ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}