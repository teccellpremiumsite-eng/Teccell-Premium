-- ============================================
-- VERIFICAR CONTEÚDO DO BANCO DE DADOS
-- ============================================

-- Ver todos os depoimentos
SELECT 
  id,
  name,
  device,
  rating,
  LEFT(testimonial, 50) as testimonial_preview,
  date,
  platform,
  verified,
  created_at
FROM testimonials
ORDER BY created_at DESC;

-- Ver todas as fotos/vídeos
SELECT 
  id,
  type,
  title,
  category,
  LEFT(url, 60) as url_preview,
  created_at
FROM media_items
ORDER BY created_at DESC;

-- Contar totais
SELECT 
  (SELECT COUNT(*) FROM testimonials) as total_testimonials,
  (SELECT COUNT(*) FROM media_items) as total_media_items,
  (SELECT COUNT(*) FROM admin_users) as total_admins;
