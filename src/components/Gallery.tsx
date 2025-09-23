import { useState, useEffect } from 'react'
import { useKV } from '@github/spark/hooks'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Play, Image, VideoCamera, Wrench } from 'phosphor-react'

interface MediaItem {
  id: string
  type: 'image' | 'video'
  url: string
  title: string
  description: string
  category: string
  beforeImage?: string
}

export function Gallery() {
  const [mediaItems] = useKV<MediaItem[]>('gallery-items', [
    {
      id: '1',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1621768216002-5ac171876625?w=800&h=600&fit=crop',
      title: 'Reparo de Placa iPhone 13 Pro',
      description: 'Problema resolvido: Face ID não funcionando após queda',
      category: 'iPhone'
    },
    {
      id: '2',
      type: 'image', 
      url: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=800&h=600&fit=crop',
      title: 'Microsoldagem MacBook Pro',
      description: 'Substituição de IC de carregamento USB-C',
      category: 'MacBook'
    },
    {
      id: '3',
      type: 'video',
      url: 'https://www.w3schools.com/html/mov_bbb.mp4',
      title: 'Processo de Reparo iPad Pro',
      description: 'Demonstração completa do processo de reparo',
      category: 'iPad'
    },
    {
      id: '4',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&h=600&fit=crop',
      title: 'Dano por Líquido iPhone 12',
      description: 'Limpeza ultrassônica e restauração completa',
      category: 'iPhone'
    }
  ])

  const [selectedCategory, setSelectedCategory] = useState<string>('Todos')
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null)

  const categories = ['Todos', 'iPhone', 'iPad', 'MacBook']
  
  const filteredItems = selectedCategory === 'Todos' 
    ? (mediaItems || [])
    : (mediaItems || []).filter(item => item.category === selectedCategory)

  const images = (filteredItems || []).filter(item => item.type === 'image')
  const videos = (filteredItems || []).filter(item => item.type === 'video')

  return (
    <section id="galeria" className="min-h-screen py-20 flex items-center bg-gray-300 dark:bg-gray-600">
      <div className="container px-4 md:px-8 w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Trabalhos Realizados
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Veja exemplos dos nossos reparos profissionais. Cada trabalho é documentado 
            com fotos e vídeos do processo.
          </p>
        </div>

        <Tabs defaultValue="images" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="images" className="flex items-center gap-2">
              <Image size={16} />
              Fotos ({images.length})
            </TabsTrigger>
            <TabsTrigger value="videos" className="flex items-center gap-2">
              <VideoCamera size={16} />
              Vídeos ({videos.length})
            </TabsTrigger>
          </TabsList>

          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="text-sm"
              >
                {category}
              </Button>
            ))}
          </div>

          <TabsContent value="images" className="space-y-8">
            {images.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {images.map((item) => (
                  <Dialog key={item.id}>
                    <DialogTrigger asChild>
                      <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <img
                            src={item.url}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300">
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                                <Image size={20} className="text-primary" />
                              </div>
                            </div>
                          </div>
                          <Badge className="absolute top-3 right-3">
                            {item.category}
                          </Badge>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-semibold mb-2 line-clamp-1">{item.title}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                        </CardContent>
                      </Card>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
                      <div className="relative">
                        <img
                          src={item.url}
                          alt={item.title}
                          className="w-full h-auto max-h-[70vh] object-contain"
                        />
                        <div className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                              <p className="text-muted-foreground">{item.description}</p>
                            </div>
                            <Badge>{item.category}</Badge>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Image size={48} className="mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Nenhuma foto encontrada para esta categoria.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="videos" className="space-y-8">
            {videos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {videos.map((item) => (
                  <Dialog key={item.id}>
                    <DialogTrigger asChild>
                      <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                        <div className="relative aspect-video overflow-hidden bg-muted">
                          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-accent/20 to-primary/20">
                            <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                              <Play size={24} className="text-primary ml-1" weight="fill" />
                            </div>
                          </div>
                          <Badge className="absolute top-3 right-3">
                            {item.category}
                          </Badge>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-semibold mb-2 line-clamp-1">{item.title}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                        </CardContent>
                      </Card>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                      <div className="space-y-4">
                        <video
                          controls
                          className="w-full aspect-video rounded-lg"
                          poster=""
                        >
                          <source src={item.url} type="video/mp4" />
                          Seu navegador não suporta o elemento de vídeo.
                        </video>
                        <div>
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="text-xl font-semibold">{item.title}</h3>
                            <Badge>{item.category}</Badge>
                          </div>
                          <p className="text-muted-foreground">{item.description}</p>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <VideoCamera size={48} className="mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Nenhum vídeo encontrado para esta categoria.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}