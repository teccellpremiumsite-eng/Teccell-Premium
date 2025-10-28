import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export function DebugSupabase() {
  const [status, setStatus] = useState<any>({
    connected: false,
    mediaCount: 0,
    testimonialsCount: 0,
    mediaItems: [],
    testimonials: [],
    error: null
  })

  useEffect(() => {
    testConnection()
  }, [])

  const testConnection = async () => {
    try {
      console.log('🔍 Testando conexão com Supabase...')
      
      // Testar conexão básica
      const { data: healthCheck, error: healthError } = await supabase
        .from('media_items')
        .select('count')
        .limit(1)
      
      console.log('✅ Conexão estabelecida!')
      
      // Buscar media items
      const { data: mediaData, error: mediaError } = await supabase
        .from('media_items')
        .select('*')
        .order('created_at', { ascending: false })
      
      console.log('📸 Media items:', mediaData)
      if (mediaError) console.error('❌ Erro media:', mediaError)
      
      // Buscar testimonials
      const { data: testimonialsData, error: testimonialsError } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false })
      
      console.log('🎤 Testimonials:', testimonialsData)
      if (testimonialsError) console.error('❌ Erro testimonials:', testimonialsError)
      
      setStatus({
        connected: !healthError,
        mediaCount: mediaData?.length || 0,
        testimonialsCount: testimonialsData?.length || 0,
        mediaItems: mediaData || [],
        testimonials: testimonialsData || [],
        error: healthError || mediaError || testimonialsError
      })
    } catch (error) {
      console.error('❌ Erro de conexão:', error)
      setStatus(prev => ({ ...prev, error, connected: false }))
    }
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg max-w-md z-50 border-2 border-blue-500">
      <h3 className="font-bold text-lg mb-2">🔧 Debug Supabase</h3>
      
      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <span className={status.connected ? 'text-green-500' : 'text-red-500'}>
            {status.connected ? '✅' : '❌'}
          </span>
          <span>Conexão: {status.connected ? 'OK' : 'FALHOU'}</span>
        </div>
        
        <div>
          <strong>Media Items:</strong> {status.mediaCount}
          {status.mediaItems.length > 0 && (
            <ul className="ml-4 mt-1 text-xs">
              {status.mediaItems.slice(0, 3).map((item: any) => (
                <li key={item.id}>• {item.title} ({item.type})</li>
              ))}
            </ul>
          )}
        </div>
        
        <div>
          <strong>Depoimentos:</strong> {status.testimonialsCount}
          {status.testimonials.length > 0 && (
            <ul className="ml-4 mt-1 text-xs">
              {status.testimonials.slice(0, 3).map((item: any) => (
                <li key={item.id}>• {item.name} - {item.rating}⭐</li>
              ))}
            </ul>
          )}
        </div>
        
        {status.error && (
          <div className="bg-red-100 dark:bg-red-900 p-2 rounded mt-2">
            <strong className="text-red-700 dark:text-red-300">Erro:</strong>
            <pre className="text-xs mt-1 overflow-auto max-h-20">
              {JSON.stringify(status.error, null, 2)}
            </pre>
          </div>
        )}
        
        <button 
          onClick={testConnection}
          className="mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 w-full"
        >
          🔄 Testar Novamente
        </button>
      </div>
    </div>
  )
}
