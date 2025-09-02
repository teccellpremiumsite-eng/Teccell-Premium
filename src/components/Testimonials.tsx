import { useState, useEffect } from 'react'
import { useKV } from '@github/spark/hooks'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Star, Quote, ChevronLeft, ChevronRight } from '@phosphor-icons/react'

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
    date: '2024-01-15'
  },
  {
    id: '2',
    name: 'João Santos',
    location: 'Rio de Janeiro, RJ',
    device: 'MacBook Pro 13"',
    rating: 5,
    testimonial: 'Depois de passar por várias assistências, finalmente encontrei quem realmente entende de Apple. Recuperaram totalmente meu MacBook com problema de placa lógica.',
    repairType: 'Reparo de Placa Lógica',
    date: '2024-01-10'
  },
  {
    id: '3',
    name: 'Ana Costa',
    location: 'Belo Horizonte, MG',
    device: 'iPad Pro',
    rating: 5,
    testimonial: 'Serviço premium de verdade! Meu iPad não ligava mais e eles fizeram um diagnóstico preciso e reparo completo. Voltou melhor que novo!',
    repairType: 'Diagnóstico e Reparo',
    date: '2024-01-05'
  }
]

export function Testimonials() {
  const [testimonials, setTestimonials] = useKV('testimonials', defaultTestimonials)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  const nextTestimonial = () => {
    setCurrentIndex(prev => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
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

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  if (testimonials.length === 0) return null

  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
            Depoimentos
          </Badge>
          <h2 className="text-4xl font-bold text-foreground mb-4">
            O que nossos clientes dizem
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A satisfação dos nossos clientes é nossa maior conquista. 
            Veja os depoimentos de quem confia na Teccell Premium.
          </p>
        </div>

        <div className="relative">
          <div className="flex items-center justify-center min-h-[400px]">
            <Card className="max-w-4xl w-full bg-card/50 backdrop-blur-sm border shadow-lg">
              <CardContent className="p-8 sm:p-12">
                <div className="flex flex-col items-center text-center space-y-6">
                  <Quote className="w-12 h-12 text-accent/60" />
                  
                  <blockquote className="text-xl sm:text-2xl font-medium text-foreground leading-relaxed">
                    "{testimonials[currentIndex].testimonial}"
                  </blockquote>

                  <div className="flex items-center space-x-1">
                    {renderStars(testimonials[currentIndex].rating)}
                  </div>

                  <div className="flex items-center space-x-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={testimonials[currentIndex].avatar} />
                      <AvatarFallback className="bg-accent text-accent-foreground font-semibold">
                        {getInitials(testimonials[currentIndex].name)}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="text-left">
                      <h4 className="font-semibold text-foreground text-lg">
                        {testimonials[currentIndex].name}
                      </h4>
                      <p className="text-muted-foreground">
                        {testimonials[currentIndex].location}
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge variant="secondary" className="text-xs">
                          {testimonials[currentIndex].device}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {testimonials[currentIndex].repairType}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {testimonials.length > 1 && (
            <>
              <button
                onClick={prevTestimonial}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-background/80 backdrop-blur-sm border shadow-lg hover:bg-background transition-colors"
                aria-label="Depoimento anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <button
                onClick={nextTestimonial}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-background/80 backdrop-blur-sm border shadow-lg hover:bg-background transition-colors"
                aria-label="Próximo depoimento"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
        </div>

        {testimonials.length > 1 && (
          <div className="flex justify-center mt-8 space-x-2">
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

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-accent mb-2">500+</div>
            <p className="text-muted-foreground">Reparos Realizados</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent mb-2">98%</div>
            <p className="text-muted-foreground">Taxa de Sucesso</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent mb-2">4.9★</div>
            <p className="text-muted-foreground">Avaliação Média</p>
          </div>
        </div>
      </div>
    </section>
  )
}