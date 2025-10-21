import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from './useAuth'
import { addCacheBuster } from '../lib/cacheBusting'
import type { Database } from '../types/supabase'

type Testimonial = Database['public']['Tables']['testimonials']['Row']
type TestimonialInsert = Database['public']['Tables']['testimonials']['Insert']
type TestimonialUpdate = Database['public']['Tables']['testimonials']['Update']

export function useTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const { user } = useAuth()

  // Carregar depoimentos
  const fetchTestimonials = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setTestimonials(data || [])
    } catch (error) {
      console.error('Erro ao carregar depoimentos:', error)
      setError(error instanceof Error ? error.message : 'Erro desconhecido')
    } finally {
      setLoading(false)
    }
  }

  // Adicionar novo depoimento
  const addTestimonial = async (testimonial: TestimonialInsert): Promise<Testimonial | null> => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .insert({
          ...testimonial,
          created_by: user?.id || null
        })
        .select()
        .single()

      if (error) throw error
      
      setTestimonials(prev => [data, ...prev])
      return data
    } catch (error) {
      console.error('Erro ao adicionar depoimento:', error)
      setError(error instanceof Error ? error.message : 'Erro ao adicionar depoimento')
      return null
    }
  }

  // Atualizar depoimento
  const updateTestimonial = async (id: string, updates: TestimonialUpdate): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('testimonials')
        .update(updates)
        .eq('id', id)

      if (error) throw error
      
      setTestimonials(prev => 
        prev.map(testimonial => 
          testimonial.id === id ? { ...testimonial, ...updates } : testimonial
        )
      )
      return true
    } catch (error) {
      console.error('Erro ao atualizar depoimento:', error)
      setError(error instanceof Error ? error.message : 'Erro ao atualizar depoimento')
      return false
    }
  }

  // Deletar depoimento
  const deleteTestimonial = async (id: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id)

      if (error) throw error
      
      setTestimonials(prev => prev.filter(testimonial => testimonial.id !== id))
      return true
    } catch (error) {
      console.error('Erro ao deletar depoimento:', error)
      setError(error instanceof Error ? error.message : 'Erro ao deletar depoimento')
      return false
    }
  }

  useEffect(() => {
    fetchTestimonials()
    
    // Auto refresh every 30 seconds when component is visible and not uploading
    const interval = setInterval(() => {
      if (!document.hidden && !uploading) {
        fetchTestimonials()
      }
    }, 30000)

    // Refresh when page becomes visible (but not during upload)
    const handleVisibilityChange = () => {
      if (!document.hidden && !uploading) {
        fetchTestimonials()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      clearInterval(interval)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [uploading])

  // Filtros úteis
  const byRating = (rating: number) => testimonials.filter(t => t.rating === rating)
  const byPlatform = (platform: 'google' | 'facebook' | 'local') => 
    testimonials.filter(t => t.platform === platform)
  const verified = testimonials.filter(t => t.verified === true)
  const averageRating = testimonials.length > 0 
    ? testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length 
    : 0

  return {
    testimonials,
    byRating,
    byPlatform,
    verified,
    averageRating,
    loading,
    error,
    uploading,
    setUploading,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
    refresh: fetchTestimonials
  }
}