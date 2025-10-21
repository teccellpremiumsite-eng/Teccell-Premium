import { supabase } from './supabase'

// Upload de arquivo para o Supabase Storage (sem autenticação obrigatória)
export async function uploadFile(file: File, bucket: string = 'media'): Promise<string | null> {
  try {
    // Gerar nome único para o arquivo
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
    const filePath = `uploads/${fileName}`

    // Upload do arquivo (funciona sem autenticação se as políticas permitirem)
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      console.error('Erro no upload:', error)
      return null
    }

    // Retornar URL pública
    const { data: publicData } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath)

    return publicData.publicUrl
  } catch (error) {
    console.error('Erro no upload:', error)
    return null
  }
}

// Deletar arquivo do storage
export async function deleteFile(url: string, bucket: string = 'media'): Promise<boolean> {
  try {
    // Extrair o caminho do arquivo da URL
    const urlParts = url.split('/')
    const filePath = urlParts.slice(-2).join('/') // pega 'uploads/filename.ext'

    const { error } = await supabase.storage
      .from(bucket)
      .remove([filePath])

    if (error) {
      console.error('Erro ao deletar arquivo:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Erro ao deletar arquivo:', error)
    return false
  }
}

// Validar tipo de arquivo
export function validateFileType(file: File, type: 'image' | 'video'): boolean {
  if (type === 'image') {
    return file.type.startsWith('image/')
  } else if (type === 'video') {
    return file.type.startsWith('video/')
  }
  return false
}

// Validar tamanho do arquivo (em bytes)
export function validateFileSize(file: File, maxSizeMB: number = 10): boolean {
  const maxSizeBytes = maxSizeMB * 1024 * 1024
  return file.size <= maxSizeBytes
}

// Comprimir imagem antes do upload (para imagens)
export function compressImage(file: File, quality: number = 0.8): Promise<File> {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()
    
    img.onload = () => {
      // Calcular dimensões mantendo aspect ratio
      const maxWidth = 1920
      const maxHeight = 1080
      let { width, height } = img
      
      if (width > height) {
        if (width > maxWidth) {
          height = (height * maxWidth) / width
          width = maxWidth
        }
      } else {
        if (height > maxHeight) {
          width = (width * maxHeight) / height
          height = maxHeight
        }
      }
      
      canvas.width = width
      canvas.height = height
      
      // Desenhar e comprimir
      ctx?.drawImage(img, 0, 0, width, height)
      
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const compressedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now()
            })
            resolve(compressedFile)
          } else {
            resolve(file)
          }
        },
        file.type,
        quality
      )
    }
    
    img.src = URL.createObjectURL(file)
  })
}