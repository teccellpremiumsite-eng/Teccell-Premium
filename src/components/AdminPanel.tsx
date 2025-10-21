import React, { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { toast } from 'sonner'
import { useAuth } from '../hooks/useAuth'
import { useMediaItems } from '../hooks/useMediaItems'
import { useTestimonials } from '../hooks/useTestimonials'
import { uploadFile, deleteFile, validateFileType, validateFileSize, compressImage } from '../lib/upload'
import { 
  X, 
  Plus, 
  Image, 
  VideoCamera, 
  Upload,
  Trash,
  Eye,
  SignOut,
  Star,
  ChatCircle,
  GoogleLogo,
  FacebookLogo,
  Spinner
} from 'phosphor-react'

interface AdminPanelProps {
  onClose: () => void
  onLogout: () => void
}

export function AdminPanel({ onClose, onLogout }: AdminPanelProps) {
  const { user } = useAuth()
  const { 
    mediaItems, 
    images, 
    videos, 
    loading: mediaLoading, 
    addMediaItem, 
    deleteMediaItem 
  } = useMediaItems()
  
  const { 
    testimonials, 
    averageRating, 
    loading: testimonialsLoading, 
    addTestimonial, 
    deleteTestimonial 
  } = useTestimonials()

  const [newItem, setNewItem] = useState({
    type: 'image' as 'image' | 'video',
    title: '',
    description: '',
    category: 'iPhone',
    url: ''
  })
  
  const [newTestimonial, setNewTestimonial] = useState({
    name: '',
    location: '',
    device: '',
    rating: 5,
    testimonial: '',
    repair_type: '',
    date: new Date().toISOString().split('T')[0],
    platform: 'local' as 'google' | 'facebook' | 'local',
    verified: false,
    review_url: '',
    avatar_url: ''
  })

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isAddTestimonialOpen, setIsAddTestimonialOpen] = useState(false)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const categories = ['iPhone', 'iPad', 'MacBook']

  const handleAddItem = async () => {
    if (!newItem.title || !newItem.url || !newItem.description) {
      toast.error('Por favor, preencha todos os campos obrigatórios.')
      return
    }

    const result = await addMediaItem({
      type: newItem.type,
      url: newItem.url,
      title: newItem.title,
      description: newItem.description,
      category: newItem.category
    })

    if (result) {
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
  }

  const handleAddTestimonial = async () => {
    if (!newTestimonial.name || !newTestimonial.testimonial || !newTestimonial.device) {
      toast.error('Por favor, preencha todos os campos obrigatórios.')
      return
    }

    const result = await addTestimonial({
      name: newTestimonial.name,
      location: newTestimonial.location || null,
      device: newTestimonial.device,
      rating: newTestimonial.rating,
      testimonial: newTestimonial.testimonial,
      repair_type: newTestimonial.repair_type || null,
      date: newTestimonial.date,
      avatar_url: newTestimonial.avatar_url || null,
      platform: newTestimonial.platform,
      verified: newTestimonial.verified,
      review_url: newTestimonial.review_url || null
    })

    if (result) {
      setNewTestimonial({
        name: '',
        location: '',
        device: '',
        rating: 5,
        testimonial: '',
        repair_type: '',
        date: new Date().toISOString().split('T')[0],
        platform: 'local',
        verified: false,
        review_url: '',
        avatar_url: ''
      })
      setIsAddTestimonialOpen(false)
      toast.success('Depoimento adicionado com sucesso!')
    }
  }

  const handleDeleteItem = async (id: string, url: string) => {
    if (await deleteMediaItem(id)) {
      // Tentar deletar o arquivo do storage se for uma URL do Supabase
      if (url.includes('supabase')) {
        await deleteFile(url)
      }
      toast.success('Item removido com sucesso!')
    }
  }

  const handleDeleteTestimonial = async (id: string) => {
    if (await deleteTestimonial(id)) {
      toast.success('Depoimento removido com sucesso!')
    }
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validações
    if (!validateFileType(file, newItem.type)) {
      toast.error(`Tipo de arquivo inválido para ${newItem.type}`)
      return
    }

    if (!validateFileSize(file, 10)) {
      toast.error('Arquivo muito grande. Máximo 10MB.')
      return
    }

    setUploading(true)
    try {
      let fileToUpload = file

      // Comprimir imagem se necessário
      if (newItem.type === 'image') {
        fileToUpload = await compressImage(file)
      }

      // Upload para Supabase
      const url = await uploadFile(fileToUpload)
      
      if (url) {
        setNewItem(prev => ({ ...prev, url }))
        toast.success('Arquivo carregado com sucesso!')
      } else {
        toast.error('Erro no upload do arquivo')
      }
    } catch (error) {
      console.error('Erro no upload:', error)
      toast.error('Erro no upload do arquivo')
    } finally {
      setUploading(false)
    }
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
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

  // Verificar se está carregando dados
  if (mediaLoading || testimonialsLoading) {
    return (
      <div className="fixed inset-0 bg-background z-50 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Spinner className="animate-spin" size={24} />
          <span>Carregando...</span>
        </div>
      </div>
    )
  }

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

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{mediaItems?.length || 0}</p>
                  <p className="text-muted-foreground text-sm">Total de Itens</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-accent/10 text-accent flex items-center justify-center">
                  <Image size={24} />
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
                  <Image size={24} />
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

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{testimonials?.length || 0}</p>
                  <p className="text-muted-foreground text-sm">Depoimentos</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
                  <ChatCircle size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="gallery">
          <TabsList className="mb-6">
            <TabsTrigger value="gallery">Galeria</TabsTrigger>
            <TabsTrigger value="testimonials">Depoimentos</TabsTrigger>
          </TabsList>

          <TabsContent value="gallery">
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
                              disabled={uploading}
                            >
                              {uploading ? (
                                <Spinner size={16} className="mr-2 animate-spin" />
                              ) : (
                                <Upload size={16} className="mr-2" />
                              )}
                              {uploading ? 'Carregando...' : 'Escolher Arquivo'}
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
                <TabsTrigger value="all">Todos ({mediaItems?.length || 0})</TabsTrigger>
                <TabsTrigger value="images">Fotos ({images.length})</TabsTrigger>
                <TabsTrigger value="videos">Vídeos ({videos.length})</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                {(mediaItems?.length || 0) === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Image size={48} className="mx-auto mb-4 opacity-50" />
                    <p>Nenhum item na galeria</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {(mediaItems || []).map((item) => (
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
                              onClick={() => handleDeleteItem(item.id, item.url)}
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
                            onClick={() => handleDeleteItem(item.id, item.url)}
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
                            onClick={() => handleDeleteItem(item.id, item.url)}
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
      </TabsContent>

      <TabsContent value="testimonials">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Gerenciar Depoimentos</CardTitle>
              <Dialog open={isAddTestimonialOpen} onOpenChange={setIsAddTestimonialOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus size={16} className="mr-2" />
                    Adicionar Depoimento
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Adicionar Novo Depoimento</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Nome do Cliente *</label>
                      <Input
                        value={newTestimonial.name || ''}
                        onChange={(e) => setNewTestimonial(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Nome completo do cliente"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Localização</label>
                      <Input
                        value={newTestimonial.location || ''}
                        onChange={(e) => setNewTestimonial(prev => ({ ...prev, location: e.target.value }))}
                        placeholder="Cidade, Estado"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Dispositivo *</label>
                      <Input
                        value={newTestimonial.device || ''}
                        onChange={(e) => setNewTestimonial(prev => ({ ...prev, device: e.target.value }))}
                        placeholder="Ex: iPhone 12 Pro, MacBook Air"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Tipo de Reparo</label>
                      <Input
                        value={newTestimonial.repair_type || ''}
                        onChange={(e) => setNewTestimonial(prev => ({ ...prev, repair_type: e.target.value }))}
                        placeholder="Ex: Reparo de Placa-Mãe"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Avaliação</label>
                      <div className="flex items-center space-x-1">
                        {Array.from({ length: 5 }, (_, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => setNewTestimonial(prev => ({ ...prev, rating: index + 1 }))}
                            className="p-1"
                          >
                            <Star
                              className={`w-5 h-5 ${
                                index < (newTestimonial.rating || 5)
                                  ? 'text-yellow-400 fill-yellow-400'
                                  : 'text-muted-foreground'
                              }`}
                            />
                          </button>
                        ))}
                        <span className="ml-2 text-sm text-muted-foreground">
                          {newTestimonial.rating || 5} estrela(s)
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">URL do Avatar (opcional)</label>
                      <Input
                        value={newTestimonial.avatar_url || ''}
                        onChange={(e) => setNewTestimonial(prev => ({ ...prev, avatar_url: e.target.value }))}
                        placeholder="https://example.com/avatar.jpg"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Depoimento *</label>
                      <Textarea
                        value={newTestimonial.testimonial || ''}
                        onChange={(e) => setNewTestimonial(prev => ({ ...prev, testimonial: e.target.value }))}
                        placeholder="Escreva o depoimento do cliente"
                        rows={4}
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Plataforma</label>
                      <select
                        className="w-full p-2 border rounded-md"
                        value={newTestimonial.platform || 'local'}
                        onChange={(e) => setNewTestimonial(prev => ({ 
                          ...prev, 
                          platform: e.target.value as 'google' | 'facebook' | 'local' 
                        }))}
                      >
                        <option value="google">Google Reviews</option>
                        <option value="facebook">Facebook Reviews</option>
                        <option value="local">Cliente Direto</option>
                      </select>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="verified"
                        checked={newTestimonial.verified || false}
                        onChange={(e) => setNewTestimonial(prev => ({ ...prev, verified: e.target.checked }))}
                        className="rounded border-input"
                      />
                      <label htmlFor="verified" className="text-sm font-medium">
                        Avaliação Verificada
                      </label>
                    </div>

                    {(newTestimonial.platform === 'google' || newTestimonial.platform === 'facebook') && (
                      <div>
                        <label className="text-sm font-medium mb-2 block">URL da Avaliação</label>
                        <Input
                          value={newTestimonial.review_url || ''}
                          onChange={(e) => setNewTestimonial(prev => ({ ...prev, review_url: e.target.value }))}
                          placeholder="https://g.co/kgs/... ou https://facebook.com/..."
                        />
                      </div>
                    )}

                    <div>
                      <label className="text-sm font-medium mb-2 block">Data</label>
                      <Input
                        type="date"
                        value={newTestimonial.date || ''}
                        onChange={(e) => setNewTestimonial(prev => ({ ...prev, date: e.target.value }))}
                      />
                    </div>

                    <Button onClick={handleAddTestimonial} className="w-full">
                      Adicionar Depoimento
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            {(testimonials?.length || 0) === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <ChatCircle size={48} className="mx-auto mb-4 opacity-50" />
                <p>Nenhum depoimento cadastrado</p>
              </div>
            ) : (
              <div className="space-y-4">
                {(testimonials || []).map((testimonial) => (
                  <Card key={testimonial.id} className="p-4">
                    <div className="flex items-start space-x-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={testimonial.avatar_url || undefined} />
                        <AvatarFallback className="bg-accent text-accent-foreground">
                          {getInitials(testimonial.name)}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                            <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center space-x-1">
                              {renderStars(testimonial.rating)}
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteTestimonial(testimonial.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash size={16} />
                            </Button>
                          </div>
                        </div>
                        
                        <p className="text-sm mb-3 leading-relaxed">{testimonial.testimonial}</p>
                        
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary" className="text-xs">
                            {testimonial.device}
                          </Badge>
                          {testimonial.repair_type && (
                            <Badge variant="outline" className="text-xs">
                              {testimonial.repair_type}
                            </Badge>
                          )}
                          {testimonial.platform === 'google' && (
                            <Badge variant="outline" className="text-xs flex items-center space-x-1">
                              <GoogleLogo className="w-3 h-3 text-blue-500" />
                              <span>Google</span>
                            </Badge>
                          )}
                          {testimonial.platform === 'facebook' && (
                            <Badge variant="outline" className="text-xs flex items-center space-x-1">
                              <FacebookLogo className="w-3 h-3 text-blue-600" />
                              <span>Facebook</span>
                            </Badge>
                          )}
                          {testimonial.verified && (
                            <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                              Verificada
                            </Badge>
                          )}
                          <span className="text-xs text-muted-foreground">
                            {new Date(testimonial.date).toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
      </div>
    </div>
  )
}
