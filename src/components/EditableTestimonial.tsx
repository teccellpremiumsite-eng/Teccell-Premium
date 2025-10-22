import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { toast } from 'sonner'
import { 
  Pencil, 
  Check, 
  X, 
  Trash, 
  Star,
  GoogleLogo,
  FacebookLogo,
  ChatCircle,
  CheckCircle,
  Clock
} from 'phosphor-react'

interface Testimonial {
  id: string
  name: string
  location?: string | null
  device: string
  rating: number
  testimonial: string
  repair_type?: string | null
  date: string
  avatar_url?: string | null
  platform: 'google' | 'facebook' | 'local'
  verified: boolean
  review_url?: string | null
  created_at?: string
}

interface EditableTestimonialProps {
  testimonial: Testimonial
  onUpdate: (id: string, updates: Partial<Testimonial>) => Promise<boolean>
  onDelete: (id: string) => Promise<boolean>
}

export function EditableTestimonial({ testimonial, onUpdate, onDelete }: EditableTestimonialProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    name: testimonial.name,
    location: testimonial.location || '',
    device: testimonial.device,
    rating: testimonial.rating,
    testimonial: testimonial.testimonial,
    repair_type: testimonial.repair_type || '',
    date: testimonial.date,
    avatar_url: testimonial.avatar_url || '',
    platform: testimonial.platform,
    verified: testimonial.verified,
    review_url: testimonial.review_url || ''
  })
  const [isLoading, setIsLoading] = useState(false)

  const platforms = [
    { value: 'local', label: 'Local', icon: ChatCircle },
    { value: 'google', label: 'Google', icon: GoogleLogo },
    { value: 'facebook', label: 'Facebook', icon: FacebookLogo }
  ]

  const handleSave = async () => {
    if (!editData.name.trim() || !editData.testimonial.trim() || !editData.device.trim()) {
      toast.error('Nome, dispositivo e depoimento são obrigatórios')
      return
    }

    setIsLoading(true)
    try {
      const updates = {
        ...editData,
        location: editData.location || null,
        repair_type: editData.repair_type || null,
        avatar_url: editData.avatar_url || null,
        review_url: editData.review_url || null
      }
      
      const success = await onUpdate(testimonial.id, updates)
      if (success) {
        setIsEditing(false)
        toast.success('Depoimento atualizado com sucesso!')
      } else {
        toast.error('Erro ao atualizar depoimento')
      }
    } catch (error) {
      toast.error('Erro ao salvar alterações')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    setEditData({
      name: testimonial.name,
      location: testimonial.location || '',
      device: testimonial.device,
      rating: testimonial.rating,
      testimonial: testimonial.testimonial,
      repair_type: testimonial.repair_type || '',
      date: testimonial.date,
      avatar_url: testimonial.avatar_url || '',
      platform: testimonial.platform,
      verified: testimonial.verified,
      review_url: testimonial.review_url || ''
    })
    setIsEditing(false)
  }

  const handleDelete = async () => {
    if (!confirm(`Tem certeza que deseja excluir o depoimento de "${testimonial.name}"?\n\nEsta ação não pode ser desfeita.`)) {
      return
    }

    setIsLoading(true)
    try {
      const success = await onDelete(testimonial.id)
      if (success) {
        toast.success('Depoimento excluído com sucesso!')
      } else {
        toast.error('Erro ao excluir depoimento')
      }
    } catch (error) {
      toast.error('Erro ao excluir depoimento')
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  const formatDateTime = (dateString?: string) => {
    if (!dateString) return 'Data não disponível'
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getPlatformIcon = (platform: string) => {
    const platformData = platforms.find(p => p.value === platform)
    if (!platformData) return ChatCircle
    return platformData.icon
  }

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'google': return 'text-red-500'
      case 'facebook': return 'text-blue-500'
      default: return 'text-gray-500'
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
      />
    ))
  }

  const PlatformIcon = getPlatformIcon(testimonial.platform)

  return (
    <Card className="group hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={testimonial.avatar_url || undefined} />
              <AvatarFallback className="text-sm">
                {testimonial.name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-sm">{testimonial.name}</h3>
                {testimonial.verified && (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                )}
              </div>
              
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <PlatformIcon className={`w-4 h-4 ${getPlatformColor(testimonial.platform)}`} />
                <span>{platforms.find(p => p.value === testimonial.platform)?.label}</span>
                {testimonial.location && (
                  <>
                    <span>•</span>
                    <span>{testimonial.location}</span>
                  </>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {!isEditing && (
              <>
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
        {isEditing ? (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium">Nome</label>
                <Input
                  value={editData.name}
                  onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Nome do cliente"
                  className="mt-1"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">Localização</label>
                <Input
                  value={editData.location}
                  onChange={(e) => setEditData(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="Cidade, Estado"
                  className="mt-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium">Dispositivo</label>
                <Input
                  value={editData.device}
                  onChange={(e) => setEditData(prev => ({ ...prev, device: e.target.value }))}
                  placeholder="iPhone 14 Pro"
                  className="mt-1"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">Tipo de Reparo</label>
                <Input
                  value={editData.repair_type}
                  onChange={(e) => setEditData(prev => ({ ...prev, repair_type: e.target.value }))}
                  placeholder="Troca de tela"
                  className="mt-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium">Avaliação</label>
                <Select
                  value={editData.rating.toString()}
                  onValueChange={(value) => setEditData(prev => ({ ...prev, rating: parseInt(value) }))}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map(rating => (
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
                <label className="text-sm font-medium">Plataforma</label>
                <Select
                  value={editData.platform}
                  onValueChange={(value) => setEditData(prev => ({ ...prev, platform: value as 'google' | 'facebook' | 'local' }))}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {platforms.map(platform => {
                      const Icon = platform.icon
                      return (
                        <SelectItem key={platform.value} value={platform.value}>
                          <div className="flex items-center gap-2">
                            <Icon className="w-4 h-4" />
                            {platform.label}
                          </div>
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Depoimento</label>
              <Textarea
                value={editData.testimonial}
                onChange={(e) => setEditData(prev => ({ ...prev, testimonial: e.target.value }))}
                placeholder="Depoimento do cliente..."
                className="mt-1"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium">Data</label>
                <Input
                  type="date"
                  value={editData.date}
                  onChange={(e) => setEditData(prev => ({ ...prev, date: e.target.value }))}
                  className="mt-1"
                />
              </div>

              <div>
                <label className="text-sm font-medium">URL da Foto</label>
                <Input
                  value={editData.avatar_url}
                  onChange={(e) => setEditData(prev => ({ ...prev, avatar_url: e.target.value }))}
                  placeholder="https://exemplo.com/foto.jpg"
                  className="mt-1"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={editData.verified}
                  onChange={(e) => setEditData(prev => ({ ...prev, verified: e.target.checked }))}
                  className="rounded"
                />
                Verificado
              </label>

              {editData.platform !== 'local' && (
                <div className="flex-1">
                  <Input
                    value={editData.review_url}
                    onChange={(e) => setEditData(prev => ({ ...prev, review_url: e.target.value }))}
                    placeholder="URL da avaliação original"
                    className="text-sm"
                  />
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center gap-1">
              {renderStars(testimonial.rating)}
            </div>
            
            <blockquote className="text-sm italic">
              "{testimonial.testimonial}"
            </blockquote>
            
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="space-y-1">
                <p><strong>Dispositivo:</strong> {testimonial.device}</p>
                {testimonial.repair_type && (
                  <p><strong>Reparo:</strong> {testimonial.repair_type}</p>
                )}
                <p><strong>Data:</strong> {formatDate(testimonial.date)}</p>
              </div>
              
              <div className="text-right space-y-1">
                <p className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {formatDateTime(testimonial.created_at)}
                </p>
                {testimonial.review_url && (
                  <a 
                    href={testimonial.review_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    Ver original
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}