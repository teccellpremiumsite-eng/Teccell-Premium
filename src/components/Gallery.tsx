import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Play, X, Eye } from '@phosphor-icons/react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface MediaItem {
  id: string
  type: 'image' | 'video'
  url: string
  title: string
  description: string
  category: string
  timestamp: number
}

export function Gallery() {
  const [mediaItems] = useKV<MediaItem[]>('gallery-items', [])
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null)
  const [activeCategory, setActiveCategory] = useState('all')

  const categories = ['all', ...Array.from(new Set(mediaItems.map(item => item.category)))]
  
  const filteredItems = activeCategory === 'all' 
    ? mediaItems 
    : mediaItems.filter(item => item.category === activeCategory)

  const MediaCard = ({ item }: { item: MediaItem }) => (
    <Card className="group overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300">
      <div className="aspect-video bg-muted relative overflow-hidden">
        {item.type === 'video' ? (
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
            <div className="w-16 h-16 bg-background/90 rounded-full flex items-center justify-center">
              <Play size={24} className="text-foreground ml-1" />
            </div>
          </div>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-muted to-muted-foreground/20" />
        )}
        
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => setSelectedItem(item)}
            className="backdrop-blur-sm"
          >
            <Eye size={16} className="mr-2" />
            Ver Detalhes
          </Button>
        </div>
        
        <Badge 
          variant="secondary" 
          className="absolute top-3 left-3 backdrop-blur-sm"
        >
          {item.category}
        </Badge>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {item.description}
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          {new Date(item.timestamp).toLocaleDateString('pt-BR')}
        </p>
      </div>
    </Card>
  )

  return (
    <section id="gallery" className="py-20 px-4 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Trabalhos Realizados
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Veja alguns dos reparos mais desafiadores que realizamos. 
            Cada caso é documentado com detalhes do processo técnico.
          </p>
        </div>

        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="mb-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-4">
            {categories.slice(0, 4).map(category => (
              <TabsTrigger 
                key={category} 
                value={category}
                className="capitalize"
              >
                {category === 'all' ? 'Todos' : category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {filteredItems.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map(item => (
              <MediaCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Eye size={32} className="text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Em breve
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Estamos documentando nossos melhores trabalhos. 
              Em breve você poderá ver nossa galeria de reparos realizados.
            </p>
          </div>
        )}

        <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
          <DialogContent className="max-w-2xl">
            {selectedItem && (
              <>
                <DialogHeader>
                  <DialogTitle>{selectedItem.title}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    {selectedItem.type === 'video' ? (
                      <div className="w-20 h-20 bg-background/90 rounded-full flex items-center justify-center">
                        <Play size={28} className="text-foreground ml-1" />
                      </div>
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-muted to-muted-foreground/20 rounded-lg" />
                    )}
                  </div>
                  <div>
                    <Badge variant="outline" className="mb-3">
                      {selectedItem.category}
                    </Badge>
                    <p className="text-muted-foreground">
                      {selectedItem.description}
                    </p>
                    <p className="text-sm text-muted-foreground mt-3">
                      Realizado em {new Date(selectedItem.timestamp).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}