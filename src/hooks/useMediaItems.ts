import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from './useAuth'
import { addCacheBuster } from '../lib/cacheBusting'
import type { Database } from '../types/supabase'

type MediaItem = Database['public']['Tables']['media_items']['Row']
type MediaItemInsert = Database['public']['Tables']['media_items']['Insert']
type MediaItemUpdate = Database['public']['Tables']['media_items']['Update']

export function useMediaItems() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const { user } = useAuth()

  // Carregar itens da galeria
  const fetchMediaItems = async () => {
    try {
      setLoading(true)
      // Add cache busting timestamp to force fresh query
      const cacheBuster = Date.now()
      const { data, error } = await supabase
        .from('media_items')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setMediaItems(data || [])
    } catch (error) {
      console.error('Erro ao carregar itens:', error)
      setError(error instanceof Error ? error.message : 'Erro desconhecido')
    } finally {
      setLoading(false)
    }
  }

  // Adicionar novo item
  const addMediaItem = async (item: MediaItemInsert): Promise<MediaItem | null> => {
    try {
      const { data, error } = await supabase
        .from('media_items')
        .insert({
          ...item,
          created_by: user?.id || null
        })
        .select()
        .single()

      if (error) throw error
      
      setMediaItems(prev => [data, ...prev])
      return data
    } catch (error) {
      console.error('Erro ao adicionar item:', error)
      setError(error instanceof Error ? error.message : 'Erro ao adicionar item')
      return null
    }
  }

  // Atualizar item
  const updateMediaItem = async (id: string, updates: MediaItemUpdate): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('media_items')
        .update(updates)
        .eq('id', id)

      if (error) throw error
      
      setMediaItems(prev => 
        prev.map(item => 
          item.id === id ? { ...item, ...updates } : item
        )
      )
      return true
    } catch (error) {
      console.error('Erro ao atualizar item:', error)
      setError(error instanceof Error ? error.message : 'Erro ao atualizar item')
      return false
    }
  }

  // Deletar item
  const deleteMediaItem = async (id: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('media_items')
        .delete()
        .eq('id', id)

      if (error) throw error
      
      setMediaItems(prev => prev.filter(item => item.id !== id))
      return true
    } catch (error) {
      console.error('Erro ao deletar item:', error)
      setError(error instanceof Error ? error.message : 'Erro ao deletar item')
      return false
    }
  }

  useEffect(() => {
    fetchMediaItems()
    
    // Auto refresh every 30 seconds when component is visible and not uploading
    const interval = setInterval(() => {
      if (!document.hidden && !uploading) {
        fetchMediaItems()
      }
    }, 30000)

    // Refresh when page becomes visible (but not during upload)
    const handleVisibilityChange = () => {
      if (!document.hidden && !uploading) {
        fetchMediaItems()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      clearInterval(interval)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [uploading])

  // Filtros úteis
  const images = mediaItems.filter(item => item.type === 'image')
  const videos = mediaItems.filter(item => item.type === 'video')
  const byCategory = (category: string) => mediaItems.filter(item => item.category === category)

  return {
    mediaItems,
    images,
    videos,
    byCategory,
    loading,
    error,
    uploading,
    setUploading,
    addMediaItem,
    updateMediaItem,
    deleteMediaItem,
    refresh: fetchMediaItems
  }
}