import React, { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { toast } from 'sonner'
import { useAuth } from '../hooks/useAuth'
import { useMediaItems } from '../hooks/useMediaItems'
import { useTestimonials } from '../hooks/useTestimonials'
import { uploadFile, validateFileType, validateFileSize } from '../lib/upload'
import { FirstTimeSetup } from './FirstTimeSetup'
import { EditableMediaItem } from './EditableMediaItem'
import { EditableTestimonial } from './EditableTestimonial'
import { 
  X, 
  Plus, 
  Image, 
  VideoCamera, 
  SignOut,
  Star,
  ChatCircle,
  ArrowClockwise,
  Spinner,
  Upload
} from 'phosphor-react'

interface AdminPanelProps {
  onClose: () => void
  onLogout: () => void
}

export function AdminPanelSimple({ onClose, onLogout }: AdminPanelProps) {
  const { 
    user, 
    loading, 
    isFirstTimeAccess, 
    isAuthenticated, 
    completeFirstTimeSetup,
    logout 
  } = useAuth()
  
  const { 
    mediaItems, 
    images, 
    videos, 
    loading: mediaLoading, 
    addMediaItem, 
    updateMediaItem,
    deleteMediaItem,
    refresh: refreshMedia
  } = useMediaItems()
  
  const { 
    testimonials, 
    averageRating, 
    loading: testimonialsLoading, 
    addTestimonial, 
    updateTestimonial,
    deleteTestimonial,
    refresh: refreshTestimonials
  } = useTestimonials()

  // Estados para adicionar novos itens
  const [isAddMediaOpen, setIsAddMediaOpen] = useState(false)
  const [isAddTestimonialOpen, setIsAddTestimonialOpen] = useState(false)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const [newMedia, setNewMedia] = useState({
    type: 'image' as 'image' | 'video',
    title: '',
    description: '',
    category: 'iPhone',
    file: null as File | null,
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

  const categories = ['iPhone', 'iPad', 'MacBook']

  // Função para fazer upload do arquivo
  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validar tipo
    if (!validateFileType(file, newMedia.type)) {
      toast.error(`Por favor, selecione um arquivo de ${newMedia.type === 'image' ? 'imagem' : 'vídeo'}`)
      return
    }

    // Validar tamanho (45MB para vídeos, 10MB para imagens)
    const maxSize = newMedia.type === 'video' ? 45 : 10
    if (!validateFileSize(file, maxSize)) {
      toast.error(`Arquivo muito grande! Tamanho máximo: ${maxSize}MB`)
      return
    }

    setNewMedia(prev => ({ ...prev, file }))
    toast.success('Arquivo selecionado com sucesso!')
  }

  // Função para adicionar novo item de mídia
  const handleAddMedia = async () => {
    if (!newMedia.title.trim() || !newMedia.description.trim()) {
      toast.error('Preencha título e descrição')
      return
    }

    if (!newMedia.file && !newMedia.url.trim()) {
      toast.error('Selecione um arquivo ou insira uma URL')
      return
    }

    setUploading(true)

    try {
      let finalUrl = newMedia.url

      // Se tem arquivo, fazer upload
      if (newMedia.file) {
        toast.loading('Fazendo upload do arquivo...')
        const uploadedUrl = await uploadFile(newMedia.file, 'media')
        
        if (!uploadedUrl) {
          toast.error('Erro no upload do arquivo')
          setUploading(false)
          return
        }
        
        finalUrl = uploadedUrl
        toast.dismiss()
      }

      // Adicionar ao banco de dados
      const result = await addMediaItem({
        type: newMedia.type,
        url: finalUrl,
        title: newMedia.title,
        description: newMedia.description,
        category: newMedia.category
      })

      if (result) {
        toast.success('Item adicionado com sucesso!')
        setNewMedia({
          type: 'image',
          title: '',
          description: '',
          category: 'iPhone',
          file: null,
          url: ''
        })
        setIsAddMediaOpen(false)
        if (fileInputRef.current) {
          fileInputRef.current.value = ''
        }
      } else {
        toast.error('Erro ao adicionar item')
      }
    } catch (error) {
      console.error('Erro:', error)
      toast.error('Erro ao adicionar item')
    } finally {
      setUploading(false)
    }
  }

  // Função para adicionar novo depoimento
  const handleAddTestimonial = async () => {
    if (!newTestimonial.name.trim() || !newTestimonial.device.trim() || !newTestimonial.testimonial.trim()) {
      toast.error('Preencha nome, dispositivo e depoimento')
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
      toast.success('Depoimento adicionado com sucesso!')
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
    } else {
      toast.error('Erro ao adicionar depoimento')
    }
  }


  // Se for primeiro acesso, mostrar tela de configuração
  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin w-8 h-8 border-4 border-white border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Carregando...</p>
        </div>
      </div>
    )
  }

  if (isFirstTimeAccess) {
    return (
      <FirstTimeSetup 
        onSetupComplete={(password) => {
          completeFirstTimeSetup(password)
        }}
      />
    )
  }

  const handleRefreshAll = async () => {
    toast.promise(
      Promise.all([refreshMedia(), refreshTestimonials()]),
      {
        loading: 'Atualizando dados...',
        success: 'Dados atualizados com sucesso!',
        error: 'Erro ao atualizar dados'
      }
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-7xl h-full max-h-[90vh] overflow-hidden">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Painel de Administração</CardTitle>
              <p className="text-muted-foreground">Gerencie o conteúdo do site em tempo real</p>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleRefreshAll}>
                <ArrowClockwise className="w-4 h-4 mr-2" />
                Atualizar
              </Button>
              
              <Button variant="outline" size="sm" onClick={onLogout}>
                <SignOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
              
              <Button variant="outline" size="sm" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0 h-full overflow-hidden">
          <Tabs defaultValue="gallery" className="h-full flex flex-col">
            <TabsList className="m-4 mb-0">
              <TabsTrigger value="gallery" className="flex items-center gap-2">
                <Image className="w-4 h-4" />
                Galeria ({mediaItems?.length || 0})
              </TabsTrigger>
              <TabsTrigger value="testimonials" className="flex items-center gap-2">
                <ChatCircle className="w-4 h-4" />
                Depoimentos ({testimonials?.length || 0})
              </TabsTrigger>
            </TabsList>

            <div className="flex-1 overflow-y-auto p-4">
              {/* ABA DA GALERIA */}
              <TabsContent value="gallery" className="space-y-4 mt-0">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">Galeria de Reparos</h2>
                    <p className="text-sm text-muted-foreground">
                      Edite os itens clicando no ícone de lápis • Mudanças são refletidas automaticamente no site
                    </p>
                  </div>
                  
                  <Dialog open={isAddMediaOpen} onOpenChange={setIsAddMediaOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Adicionar Mídia
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Adicionar Foto ou Vídeo</DialogTitle>
                      </DialogHeader>
                      
                      <div className="space-y-4">
                        {/* Tipo de mídia */}
                        <div>
                          <Label>Tipo de Mídia</Label>
                          <Tabs 
                            value={newMedia.type} 
                            onValueChange={(value) => setNewMedia(prev => ({ ...prev, type: value as 'image' | 'video', file: null }))}
                            className="w-full mt-2"
                          >
                            <TabsList className="grid w-full grid-cols-2">
                              <TabsTrigger value="image" className="flex items-center gap-2">
                                <Image className="w-4 h-4" />
                                Foto
                              </TabsTrigger>
                              <TabsTrigger value="video" className="flex items-center gap-2">
                                <VideoCamera className="w-4 h-4" />
                                Vídeo
                              </TabsTrigger>
                            </TabsList>
                          </Tabs>
                        </div>

                        {/* Upload de arquivo */}
                        <div className="space-y-2">
                          <Label>Arquivo</Label>
                          <input
                            ref={fileInputRef}
                            type="file"
                            onChange={handleFileSelect}
                            accept={newMedia.type === 'image' ? 'image/*' : 'video/*'}
                            className="hidden"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            className="w-full"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={uploading}
                          >
                            {uploading ? (
                              <>
                                <Spinner className="w-4 h-4 mr-2 animate-spin" />
                                Carregando...
                              </>
                            ) : (
                              <>
                                <Upload className="w-4 h-4 mr-2" />
                                {newMedia.file ? newMedia.file.name : 'Selecionar Arquivo'}
                              </>
                            )}
                          </Button>
                          <p className="text-xs text-muted-foreground">
                            Tamanho máximo: {newMedia.type === 'video' ? '45MB para vídeos' : '10MB para fotos'}
                          </p>
                          
                          {/* OU URL */}
                          <div className="flex items-center gap-2 my-2">
                            <div className="flex-1 border-t"></div>
                            <span className="text-xs text-muted-foreground">OU</span>
                            <div className="flex-1 border-t"></div>
                          </div>
                          
                          <Input
                            placeholder="Cole uma URL de imagem/vídeo"
                            value={newMedia.url}
                            onChange={(e) => setNewMedia(prev => ({ ...prev, url: e.target.value, file: null }))}
                            disabled={!!newMedia.file}
                          />
                        </div>

                        {/* Título */}
                        <div>
                          <Label>Título *</Label>
                          <Input
                            placeholder="Ex: Reparo de Placa iPhone 13 Pro"
                            value={newMedia.title}
                            onChange={(e) => setNewMedia(prev => ({ ...prev, title: e.target.value }))}
                            className="mt-2"
                          />
                        </div>

                        {/* Categoria */}
                        <div>
                          <Label>Categoria *</Label>
                          <Select 
                            value={newMedia.category}
                            onValueChange={(value) => setNewMedia(prev => ({ ...prev, category: value }))}
                          >
                            <SelectTrigger className="mt-2">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map(cat => (
                                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Descrição */}
                        <div>
                          <Label>Descrição *</Label>
                          <Textarea
                            placeholder="Descreva o reparo realizado..."
                            value={newMedia.description}
                            onChange={(e) => setNewMedia(prev => ({ ...prev, description: e.target.value }))}
                            rows={3}
                            className="mt-2"
                          />
                        </div>

                        {/* Botões */}
                        <div className="flex gap-2 pt-4">
                          <Button 
                            className="flex-1" 
                            onClick={handleAddMedia}
                            disabled={uploading || (!newMedia.file && !newMedia.url.trim())}
                          >
                            {uploading ? (
                              <>
                                <Spinner className="w-4 h-4 mr-2 animate-spin" />
                                Adicionando...
                              </>
                            ) : (
                              <>
                                <Plus className="w-4 h-4 mr-2" />
                                Adicionar à Galeria
                              </>
                            )}
                          </Button>
                          <Button 
                            variant="outline" 
                            onClick={() => setIsAddMediaOpen(false)}
                            disabled={uploading}
                          >
                            Cancelar
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                {mediaLoading ? (
                  <div className="text-center py-12">
                    <Spinner size={32} className="animate-spin mx-auto mb-4" />
                    <p>Carregando galeria...</p>
                  </div>
                ) : (mediaItems?.length || 0) === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <Image size={64} className="mx-auto mb-4 opacity-50" />
                    <h3 className="text-lg font-medium mb-2">Nenhum item na galeria</h3>
                    <p>Adicione fotos e vídeos dos seus reparos para mostrar no site</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {(mediaItems || []).map((item) => (
                      <EditableMediaItem 
                        key={item.id}
                        item={item}
                        onUpdate={updateMediaItem}
                        onDelete={deleteMediaItem}
                        onUploadNew={async (file: File) => {
                          try {
                            const uploadedUrl = await uploadFile(file, 'media')
                            return uploadedUrl
                          } catch (error) {
                            console.error('Erro no upload:', error)
                            return null
                          }
                        }}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>

              {/* ABA DOS DEPOIMENTOS */}
              <TabsContent value="testimonials" className="space-y-4 mt-0">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">Depoimentos de Clientes</h2>
                    {testimonials && testimonials.length > 0 && (
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-muted-foreground">
                          Média: {averageRating?.toFixed(1)} ({testimonials.length} avaliações)
                        </span>
                      </div>
                    )}
                    <p className="text-sm text-muted-foreground mt-1">
                      Edite os depoimentos clicando no ícone de lápis • Mudanças são refletidas automaticamente no site
                    </p>
                  </div>
                  
                  <Dialog open={isAddTestimonialOpen} onOpenChange={setIsAddTestimonialOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Adicionar Depoimento
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Adicionar Novo Depoimento</DialogTitle>
                      </DialogHeader>
                      
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Nome do Cliente *</Label>
                            <Input
                              placeholder="João Silva"
                              value={newTestimonial.name}
                              onChange={(e) => setNewTestimonial(prev => ({ ...prev, name: e.target.value }))}
                              className="mt-2"
                            />
                          </div>
                          
                          <div>
                            <Label>Localização</Label>
                            <Input
                              placeholder="São Paulo, SP"
                              value={newTestimonial.location}
                              onChange={(e) => setNewTestimonial(prev => ({ ...prev, location: e.target.value }))}
                              className="mt-2"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Dispositivo *</Label>
                            <Input
                              placeholder="iPhone 14 Pro"
                              value={newTestimonial.device}
                              onChange={(e) => setNewTestimonial(prev => ({ ...prev, device: e.target.value }))}
                              className="mt-2"
                            />
                          </div>
                          
                          <div>
                            <Label>Tipo de Reparo</Label>
                            <Input
                              placeholder="Troca de tela"
                              value={newTestimonial.repair_type}
                              onChange={(e) => setNewTestimonial(prev => ({ ...prev, repair_type: e.target.value }))}
                              className="mt-2"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Avaliação *</Label>
                            <Select 
                              value={newTestimonial.rating.toString()}
                              onValueChange={(value) => setNewTestimonial(prev => ({ ...prev, rating: parseInt(value) }))}
                            >
                              <SelectTrigger className="mt-2">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {[5, 4, 3, 2, 1].map(rating => (
                                  <SelectItem key={rating} value={rating.toString()}>
                                    <div className="flex items-center gap-1">
                                      {Array.from({ length: rating }, (_, i) => (
                                        <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                                      ))}
                                      <span className="ml-1">{rating} estrela{rating > 1 ? 's' : ''}</span>
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label>Plataforma</Label>
                            <Select 
                              value={newTestimonial.platform}
                              onValueChange={(value) => setNewTestimonial(prev => ({ ...prev, platform: value as 'google' | 'facebook' | 'local' }))}
                            >
                              <SelectTrigger className="mt-2">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="local">Local</SelectItem>
                                <SelectItem value="google">Google</SelectItem>
                                <SelectItem value="facebook">Facebook</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div>
                          <Label>Depoimento *</Label>
                          <Textarea
                            placeholder="Escreva o depoimento do cliente..."
                            value={newTestimonial.testimonial}
                            onChange={(e) => setNewTestimonial(prev => ({ ...prev, testimonial: e.target.value }))}
                            rows={4}
                            className="mt-2"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Data</Label>
                            <Input
                              type="date"
                              value={newTestimonial.date}
                              onChange={(e) => setNewTestimonial(prev => ({ ...prev, date: e.target.value }))}
                              className="mt-2"
                            />
                          </div>

                          <div>
                            <Label>URL da Foto do Cliente</Label>
                            <Input
                              placeholder="https://exemplo.com/foto.jpg"
                              value={newTestimonial.avatar_url}
                              onChange={(e) => setNewTestimonial(prev => ({ ...prev, avatar_url: e.target.value }))}
                              className="mt-2"
                            />
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={newTestimonial.verified}
                              onChange={(e) => setNewTestimonial(prev => ({ ...prev, verified: e.target.checked }))}
                              className="rounded"
                            />
                            <span className="text-sm">Depoimento Verificado</span>
                          </label>

                          {newTestimonial.platform !== 'local' && (
                            <div className="flex-1">
                              <Input
                                placeholder="URL da avaliação original"
                                value={newTestimonial.review_url}
                                onChange={(e) => setNewTestimonial(prev => ({ ...prev, review_url: e.target.value }))}
                                className="text-sm"
                              />
                            </div>
                          )}
                        </div>

                        <div className="flex gap-2 pt-4">
                          <Button 
                            className="flex-1" 
                            onClick={handleAddTestimonial}
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Adicionar Depoimento
                          </Button>
                          <Button 
                            variant="outline" 
                            onClick={() => setIsAddTestimonialOpen(false)}
                          >
                            Cancelar
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                {testimonialsLoading ? (
                  <div className="text-center py-12">
                    <Spinner size={32} className="animate-spin mx-auto mb-4" />
                    <p>Carregando depoimentos...</p>
                  </div>
                ) : (testimonials?.length || 0) === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <ChatCircle size={64} className="mx-auto mb-4 opacity-50" />
                    <h3 className="text-lg font-medium mb-2">Nenhum depoimento cadastrado</h3>
                    <p>Adicione depoimentos de clientes para mostrar no site</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {(testimonials || []).map((testimonial) => (
                      <EditableTestimonial 
                        key={testimonial.id}
                        testimonial={{
                          ...testimonial,
                          verified: testimonial.verified || false
                        }}
                        onUpdate={updateTestimonial}
                        onDelete={deleteTestimonial}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}