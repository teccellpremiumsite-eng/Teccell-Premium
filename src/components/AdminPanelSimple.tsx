import React, { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from 'sonner'
import { useAuth } from '../hooks/useAuth'
import { useMediaItems } from '../hooks/useMediaItems'
import { useTestimonials } from '../hooks/useTestimonials'
import { uploadFile } from '../lib/upload'
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
  Spinner
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
                  <h2 className="text-xl font-semibold">Galeria de Reparos</h2>
                  <p className="text-sm text-muted-foreground">
                    Edite os itens clicando no ícone de lápis • Mudanças são refletidas automaticamente no site
                  </p>
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
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Edite os depoimentos clicando no ícone de lápis • Mudanças são refletidas automaticamente no site
                  </p>
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