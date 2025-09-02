import { useState, useRef } from 'react'
import { useKV } from '@github/spark/hooks'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { toast } from 'sonner'
import { 
  X, 
  Plus, 
  Images, 
  VideoCamera, 
  Upload,
  Trash,
  Eye,
  SignOut
} from '@phosphor-icons/react'

interface MediaItem {
  id: string
  type: 'image' | 'video'
  url: string
  title: string
  description: string
  category: string
}

interface AdminPanelProps {
  onClose: () => void
  onLogout: () => void
}

export function AdminPanel({ onClose, onLogout }: AdminPanelProps) {
  const [mediaItems, setMediaItems] = useKV<MediaItem[]>('gallery-items', [])
  const [newItem, setNewItem] = useState<Partial<MediaItem>>({
    type: 'image',
    title: '',
    description: '',
    category: 'iPhone',
    url: ''
  })
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const categories = ['iPhone', 'iPad', 'MacBook']

  const handleAddItem = () => {
    if (!newItem.title || !newItem.url || !newItem.description) {
      toast.error('Por favor, preencha todos os campos obrigatórios.')
      return
    }

    const item: MediaItem = {
      id: Date.now().toString(),
      type: newItem.type as 'image' | 'video',
      url: newItem.url!,
      title: newItem.title!,
      description: newItem.description!,
      category: newItem.category || 'iPhone'
    }

    setMediaItems((current) => [...current, item])
    
    setNewItem({
      type: 'image',
      title: '',
      description: '',
      category: 'iPhone',
      url: ''
    })
    
    setIsAddDialogOpen(false)
    toast.success('Item adicionado com sucesso!')
  }

  const handleDeleteItem = (id: string) => {
    setMediaItems((current) => current.filter(item => item.id !== id))
    toast.success('Item removido com sucesso!')
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // In a real application, you would upload the file to a server
      // For now, we'll create a placeholder URL
      const fakeUrl = URL.createObjectURL(file)
      setNewItem(prev => ({ ...prev, url: fakeUrl }))
      toast.success('Arquivo carregado! (Preview local)')
    }
  }

  const images = mediaItems.filter(item => item.type === 'image')
  const videos = mediaItems.filter(item => item.type === 'video')

  return (
    <div className="fixed inset-0 bg-background z-50 overflow-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Painel Administrativo</h1>
            <p className="text-muted-foreground">Gerencie a galeria de reparos</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={onLogout}>
              <SignOut size={16} className="mr-2" />
              Sair
            </Button>
            <Button variant="ghost" onClick={onClose}>
              <X size={20} />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{mediaItems.length}</p>
                  <p className="text-muted-foreground text-sm">Total de Itens</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-accent/10 text-accent flex items-center justify-center">
                  <Images size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{images.length}</p>
                  <p className="text-muted-foreground text-sm">Fotos</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                  <Images size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{videos.length}</p>
                  <p className="text-muted-foreground text-sm">Vídeos</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
                  <VideoCamera size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Gerenciar Galeria</CardTitle>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus size={16} className="mr-2" />
                    Adicionar Item
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Adicionar Novo Item</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Tipo</label>
                      <Tabs 
                        value={newItem.type} 
                        onValueChange={(value) => setNewItem(prev => ({ ...prev, type: value as 'image' | 'video' }))}
                        className="w-full"
                      >
                        <TabsList className="grid w-full grid-cols-2">
                          <TabsTrigger value="image">Foto</TabsTrigger>
                          <TabsTrigger value="video">Vídeo</TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Arquivo</label>
                      <div className="space-y-2">
                        <Input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleFileUpload}
                          accept={newItem.type === 'image' ? 'image/*' : 'video/*'}
                          className="hidden"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => fileInputRef.current?.click()}
                          className="w-full"
                        >
                          <Upload size={16} className="mr-2" />
                          Escolher Arquivo
                        </Button>
                        {newItem.url && (
                          <p className="text-xs text-green-600">✓ Arquivo carregado</p>
                        )}
                        <Input
                          placeholder="Ou insira uma URL"
                          value={newItem.url || ''}
                          onChange={(e) => setNewItem(prev => ({ ...prev, url: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Título *</label>
                      <Input
                        value={newItem.title || ''}
                        onChange={(e) => setNewItem(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Título do reparo"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Categoria *</label>
                      <select
                        className="w-full p-2 border rounded-md"
                        value={newItem.category || 'iPhone'}
                        onChange={(e) => setNewItem(prev => ({ ...prev, category: e.target.value }))}
                      >
                        {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Descrição *</label>
                      <Textarea
                        value={newItem.description || ''}
                        onChange={(e) => setNewItem(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Descreva o reparo realizado"
                        rows={3}
                      />
                    </div>

                    <Button onClick={handleAddItem} className="w-full">
                      Adicionar Item
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">Todos ({mediaItems.length})</TabsTrigger>
                <TabsTrigger value="images">Fotos ({images.length})</TabsTrigger>
                <TabsTrigger value="videos">Vídeos ({videos.length})</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                {mediaItems.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Images size={48} className="mx-auto mb-4 opacity-50" />
                    <p>Nenhum item na galeria</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {mediaItems.map((item) => (
                      <Card key={item.id} className="overflow-hidden">
                        <div className="relative aspect-video">
                          {item.type === 'image' ? (
                            <img
                              src={item.url}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-muted flex items-center justify-center">
                              <VideoCamera size={32} className="text-muted-foreground" />
                            </div>
                          )}
                          <Badge className="absolute top-2 left-2">
                            {item.category}
                          </Badge>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-medium line-clamp-1 mb-2">{item.title}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                            {item.description}
                          </p>
                          <div className="flex gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <Eye size={14} />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                <div className="space-y-4">
                                  {item.type === 'image' ? (
                                    <img
                                      src={item.url}
                                      alt={item.title}
                                      className="w-full h-auto"
                                    />
                                  ) : (
                                    <video controls className="w-full">
                                      <source src={item.url} type="video/mp4" />
                                    </video>
                                  )}
                                  <div>
                                    <h3 className="font-semibold text-lg">{item.title}</h3>
                                    <p className="text-muted-foreground">{item.description}</p>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleDeleteItem(item.id)}
                              className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                            >
                              <Trash size={14} />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="images">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {images.map((item) => (
                    <Card key={item.id} className="overflow-hidden">
                      <div className="relative aspect-video">
                        <img
                          src={item.url}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                        <Badge className="absolute top-2 left-2">
                          {item.category}
                        </Badge>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-medium line-clamp-1 mb-2">{item.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                          {item.description}
                        </p>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye size={14} />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDeleteItem(item.id)}
                            className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                          >
                            <Trash size={14} />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="videos">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {videos.map((item) => (
                    <Card key={item.id} className="overflow-hidden">
                      <div className="relative aspect-video bg-muted flex items-center justify-center">
                        <VideoCamera size={32} className="text-muted-foreground" />
                        <Badge className="absolute top-2 left-2">
                          {item.category}
                        </Badge>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-medium line-clamp-1 mb-2">{item.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                          {item.description}
                        </p>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye size={14} />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDeleteItem(item.id)}
                            className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                          >
                            <Trash size={14} />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}