import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { X, SignOut, Plus, Upload, Trash, Eye, Image, VideoCamera } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from 'sonner'

interface MediaItem {
  id: string
  type: 'image' | 'video'
  url: string
  title: string
  description: string
  category: string
  timestamp: number
}

interface AdminPanelProps {
  onClose: () => void
  onLogout: () => void
}

export function AdminPanel({ onClose, onLogout }: AdminPanelProps) {
  const [mediaItems, setMediaItems] = useKV<MediaItem[]>('gallery-items', [])
  const [showUploadForm, setShowUploadForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'iphone',
    type: 'image' as 'image' | 'video'
  })

  const categories = ['iphone', 'macbook', 'imac', 'watch', 'outros']

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const newItem: MediaItem = {
      id: Date.now().toString(),
      url: `placeholder-${formData.type}`,
      timestamp: Date.now(),
      ...formData
    }

    setMediaItems(current => [newItem, ...current])
    setFormData({ title: '', description: '', category: 'iphone', type: 'image' })
    setShowUploadForm(false)
    toast.success('Mídia adicionada com sucesso!')
  }

  const handleDelete = (id: string) => {
    setMediaItems(current => current.filter(item => item.id !== id))
    toast.success('Item removido com sucesso!')
  }

  const handleLogout = () => {
    onLogout()
    toast.success('Logout realizado com sucesso!')
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl font-bold text-foreground">
              Painel Administrativo - Teccell Premium
            </h1>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={onClose}>
                <X size={16} className="mr-2" />
                Fechar
              </Button>
              <Button variant="destructive" size="sm" onClick={handleLogout}>
                <SignOut size={16} className="mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Gerenciar Galeria
              </h2>
              <p className="text-muted-foreground">
                Adicione e gerencie fotos e vídeos dos trabalhos realizados
              </p>
            </div>
            <Dialog open={showUploadForm} onOpenChange={setShowUploadForm}>
              <DialogTrigger asChild>
                <Button>
                  <Plus size={16} className="mr-2" />
                  Adicionar Mídia
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Adicionar Nova Mídia</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">Tipo</Label>
                    <Select
                      value={formData.type}
                      onValueChange={(value: 'image' | 'video') => 
                        setFormData({ ...formData, type: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="image">
                          <div className="flex items-center">
                            <Image size={16} className="mr-2" />
                            Imagem
                          </div>
                        </SelectItem>
                        <SelectItem value="video">
                          <div className="flex items-center">
                            <VideoCamera size={16} className="mr-2" />
                            Vídeo
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="title">Título</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Ex: Reparo placa iPhone 12"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Categoria</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category} value={category}>
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Descrição</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Descreva o trabalho realizado..."
                      rows={3}
                      required
                    />
                  </div>

                  <div className="p-4 border-2 border-dashed border-border rounded-lg text-center">
                    <Upload size={32} className="text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Área de upload (simulação)
                    </p>
                  </div>

                  <div className="flex space-x-2">
                    <Button type="submit" className="flex-1">
                      Adicionar
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setShowUploadForm(false)}
                    >
                      Cancelar
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Eye size={20} className="mr-2" />
                Itens da Galeria ({mediaItems.length})
              </CardTitle>
              <CardDescription>
                Gerencie todos os itens da galeria de trabalhos
              </CardDescription>
            </CardHeader>
            <CardContent>
              {mediaItems.length > 0 ? (
                <div className="space-y-4">
                  {mediaItems.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                          {item.type === 'video' ? (
                            <VideoCamera size={24} className="text-muted-foreground" />
                          ) : (
                            <Image size={24} className="text-muted-foreground" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">{item.title}</h4>
                          <p className="text-sm text-muted-foreground line-clamp-1">
                            {item.description}
                          </p>
                          <div className="flex items-center space-x-2 mt-2">
                            <Badge variant="outline">{item.category}</Badge>
                            <span className="text-xs text-muted-foreground">
                              {new Date(item.timestamp).toLocaleDateString('pt-BR')}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash size={16} />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Upload size={48} className="text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Nenhuma mídia encontrada
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Comece adicionando fotos e vídeos dos seus trabalhos
                  </p>
                  <Button onClick={() => setShowUploadForm(true)}>
                    <Plus size={16} className="mr-2" />
                    Adicionar Primeira Mídia
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}