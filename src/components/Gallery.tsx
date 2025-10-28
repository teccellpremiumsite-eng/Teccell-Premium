import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Play, Image, VideoCamera, Wrench, Spinner } from 'phosphor-react'
import { useMediaItems } from '../hooks/useMediaItems'

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
  const { mediaItems, loading, error } = useMediaItems()
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos')
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null)

  // Debug: ver o que está vindo do banco
  useEffect(() => {
    console.log('🎨 Gallery - mediaItems do banco:', mediaItems)
    console.log('🎨 Gallery - loading:', loading)
    console.log('🎨 Gallery - error:', error)
  }, [mediaItems, loading, error])

  // Usar APENAS dados do banco (sem fallback)
  const displayItems = mediaItems

  const categories = ['Todos', ...Array.from(new Set(mediaItems.map(item => item.category).filter(Boolean)))]
  
  const filteredItems = selectedCategory === 'Todos' 
    ? displayItems
    : displayItems.filter(item => item.category === selectedCategory)

  const displayImages = filteredItems.filter(item => item.type === 'image')
  const displayVideos = filteredItems.filter(item => item.type === 'video')

  // Loading state
  if (loading) {
    return (
      <section id="galeria" className="min-h-screen py-20 flex items-center bg-gray-300 dark:bg-gray-600">
        <div className="container px-4 md:px-8 w-full">
          <div className="text-center">
            <Spinner className="animate-spin w-8 h-8 mx-auto mb-4" />
            <p>Carregando galeria...</p>
          </div>
        </div>
      </section>
    )
  }

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
          {mediaItems.length === 0 && (
            <p className="text-sm text-muted-foreground mt-2">
              Dados sendo carregados do banco...
            </p>
          )}
        </div>

        <Tabs defaultValue="images" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="images" className="flex items-center gap-2">
              <Image size={16} />
              Fotos ({displayImages.length})
            </TabsTrigger>
            <TabsTrigger value="videos" className="flex items-center gap-2">
              <VideoCamera size={16} />
              Vídeos ({displayVideos.length})
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
            {displayImages.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayImages.map((item) => (
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
                <Image size={64} className="mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">Nenhuma imagem encontrada</h3>
                <p className="text-muted-foreground">
                  {selectedCategory === 'Todos' 
                    ? 'Adicione imagens através do painel administrativo'
                    : `Nenhuma imagem na categoria ${selectedCategory}`
                  }
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="videos" className="space-y-8">
            {displayVideos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayVideos.map((item) => (
                  <Dialog key={item.id}>
                    <DialogTrigger asChild>
                      <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                        <div className="relative aspect-video overflow-hidden">
                          <video
                            src={item.url}
                            className="w-full h-full object-cover"
                            poster={(item as any).beforeImage}
                          >
                            Seu navegador não suporta vídeos.
                          </video>
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300">
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                                <Play size={20} className="text-primary" weight="fill" />
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
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
                      <div className="relative">
                        <video
                          src={item.url}
                          controls
                          autoPlay
                          className="w-full h-auto max-h-[70vh] object-contain bg-black"
                          poster={(item as any).beforeImage}
                        >
                          Seu navegador não suporta vídeos.
                        </video>
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
                <VideoCamera size={64} className="mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">Nenhum vídeo encontrado</h3>
                <p className="text-muted-foreground">
                  {selectedCategory === 'Todos' 
                    ? 'Adicione vídeos através do painel administrativo'
                    : `Nenhum vídeo na categoria ${selectedCategory}`
                  }
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}