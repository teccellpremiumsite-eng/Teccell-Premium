import React, { useState, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { toast } from 'sonner'
import { 
  Pencil, 
  Check, 
  X, 
  Trash, 
  Eye, 
  Play,
  Image as ImageIcon,
  VideoCamera,
  Upload
} from 'phosphor-react'

interface MediaItem {
  id: string
  type: 'image' | 'video'
  url: string
  title: string
  description: string
  category: string
  created_at?: string
}

interface EditableMediaItemProps {
  item: MediaItem
  onUpdate: (id: string, updates: Partial<MediaItem>) => Promise<boolean>
  onDelete: (id: string) => Promise<boolean>
  onUploadNew?: (file: File) => Promise<string | null>
}

export function EditableMediaItem({ item, onUpdate, onDelete, onUploadNew }: EditableMediaItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    title: item.title,
    description: item.description,
    category: item.category
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const categories = ['iPhone', 'iPad', 'MacBook']

  const handleSave = async () => {
    if (!editData.title.trim() || !editData.description.trim()) {
      toast.error('Título e descrição são obrigatórios')
      return
    }

    setIsLoading(true)
    try {
      const success = await onUpdate(item.id, editData)
      if (success) {
        setIsEditing(false)
        toast.success('Item atualizado com sucesso!')
      } else {
        toast.error('Erro ao atualizar item')
      }
    } catch (error) {
      toast.error('Erro ao salvar alterações')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    setEditData({
      title: item.title,
      description: item.description,
      category: item.category
    })
    setIsEditing(false)
  }

  const handleDelete = async () => {
    if (!confirm(`Tem certeza que deseja excluir "${item.title}"?\n\nEsta ação não pode ser desfeita.`)) {
      return
    }

    setIsLoading(true)
    try {
      const success = await onDelete(item.id)
      if (success) {
        toast.success('Item excluído com sucesso!')
      } else {
        toast.error('Erro ao excluir item')
      }
    } catch (error) {
      toast.error('Erro ao excluir item')
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file || !onUploadNew) return

    setIsUploading(true)
    try {
      const newUrl = await onUploadNew(file)
      if (newUrl) {
        const success = await onUpdate(item.id, { url: newUrl })
        if (success) {
          toast.success('Arquivo atualizado com sucesso!')
        } else {
          toast.error('Erro ao atualizar URL do arquivo')
        }
      } else {
        toast.error('Erro no upload do arquivo')
      }
    } catch (error) {
      toast.error('Erro no upload')
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Data não disponível'
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <Card className="group hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            {item.type === 'image' ? (
              <ImageIcon className="w-5 h-5 text-blue-500" />
            ) : (
              <VideoCamera className="w-5 h-5 text-purple-500" />
            )}
            <Badge variant="outline" className="text-xs">
              {item.category}
            </Badge>
          </div>
          
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {!isEditing && (
              <>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      {item.type === 'image' ? (
                        <img 
                          src={item.url} 
                          alt={item.title}
                          className="w-full h-auto rounded-lg"
                        />
                      ) : (
                        <video 
                          src={item.url} 
                          controls 
                          className="w-full h-auto rounded-lg"
                        />
                      )}
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </DialogContent>
                </Dialog>

                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0"
                  onClick={() => setIsEditing(true)}
                >
                  <Pencil className="w-4 h-4" />
                </Button>

                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0 text-red-500 hover:text-red-600"
                  onClick={handleDelete}
                  disabled={isLoading}
                >
                  <Trash className="w-4 h-4" />
                </Button>
              </>
            )}

            {isEditing && (
              <>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0 text-green-600 hover:text-green-700"
                  onClick={handleSave}
                  disabled={isLoading}
                >
                  <Check className="w-4 h-4" />
                </Button>

                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0"
                  onClick={handleCancel}
                  disabled={isLoading}
                >
                  <X className="w-4 h-4" />
                </Button>
              </>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Prévia da mídia */}
        <div className="relative">
          {item.type === 'image' ? (
            <img 
              src={item.url} 
              alt={item.title}
              className="w-full h-32 object-cover rounded-lg"
            />
          ) : (
            <div className="relative w-full h-32 bg-gray-100 rounded-lg overflow-hidden">
              <video 
                src={item.url} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <Play className="w-8 h-8 text-white" />
              </div>
            </div>
          )}
          
          {/* Botão para trocar arquivo */}
          {onUploadNew && (
            <div className="absolute top-2 right-2">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept={item.type === 'image' ? 'image/*' : 'video/*'}
                className="hidden"
              />
              <Button
                variant="secondary"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="h-8 px-2"
              >
                {isUploading ? (
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Upload className="w-4 h-4" />
                )}
              </Button>
            </div>
          )}
        </div>

        {/* Campos editáveis */}
        {isEditing ? (
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium">Título</label>
              <Input
                value={editData.title}
                onChange={(e) => setEditData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Título do item"
                className="mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Categoria</label>
              <Select
                value={editData.category}
                onValueChange={(value) => setEditData(prev => ({ ...prev, category: value }))}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium">Descrição</label>
              <Textarea
                value={editData.description}
                onChange={(e) => setEditData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Descrição do reparo..."
                className="mt-1"
                rows={3}
              />
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <h3 className="font-semibold text-sm">{item.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {item.description}
            </p>
            <p className="text-xs text-muted-foreground">
              Criado em: {formatDate(item.created_at)}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}