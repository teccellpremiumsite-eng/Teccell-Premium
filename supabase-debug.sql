-- Script SQL para verificar e corrigir políticas do Supabase
-- Execute este script no Supabase SQL Editor

-- 1. Verificar se as tabelas existem
SELECT 
  table_name, 
  (SELECT COUNT(*) FROM information_schema.columns WHERE table_name = t.table_name) as column_count
FROM information_schema.tables t
WHERE table_schema = 'public' 
  AND table_name IN ('media_items', 'testimonials');

-- 2. Contar registros existentes
SELECT 'media_items' as tabela, COUNT(*) as total FROM media_items
UNION ALL
SELECT 'testimonials' as tabela, COUNT(*) as total FROM testimonials;

-- 3. Ver dados das tabelas
SELECT id, type, title, category, created_at FROM media_items ORDER BY created_at DESC LIMIT 10;
SELECT id, name, device, rating, created_at FROM testimonials ORDER BY created_at DESC LIMIT 10;

-- 4. CORRIGIR POLÍTICAS RLS (se não estiver funcionando)

-- Remover políticas antigas se existirem
DROP POLICY IF EXISTS "Permitir leitura pública" ON media_items;
DROP POLICY IF EXISTS "Permitir insert público" ON media_items;
DROP POLICY IF EXISTS "Permitir update público" ON media_items;
DROP POLICY IF EXISTS "Permitir delete público" ON media_items;

DROP POLICY IF EXISTS "Permitir leitura pública" ON testimonials;
DROP POLICY IF EXISTS "Permitir insert público" ON testimonials;
DROP POLICY IF EXISTS "Permitir update público" ON testimonials;
DROP POLICY IF EXISTS "Permitir delete público" ON testimonials;

-- DESABILITAR RLS temporariamente para testes (NÃO RECOMENDADO EM PRODUÇÃO)
-- Apenas para diagnóstico
ALTER TABLE media_items DISABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials DISABLE ROW LEVEL SECURITY;

-- OU criar políticas permissivas (RECOMENDADO)
ALTER TABLE media_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Políticas para media_items
CREATE POLICY "Permitir leitura pública"
  ON media_items FOR SELECT
  USING (true);

CREATE POLICY "Permitir insert público"
  ON media_items FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Permitir update público"
  ON media_items FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Permitir delete público"
  ON media_items FOR DELETE
  USING (true);

-- Políticas para testimonials
CREATE POLICY "Permitir leitura pública"
  ON testimonials FOR SELECT
  USING (true);

CREATE POLICY "Permitir insert público"
  ON testimonials FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Permitir update público"
  ON testimonials FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Permitir delete público"
  ON testimonials FOR DELETE
  USING (true);

-- 5. Verificar Storage Bucket
-- No Supabase Dashboard > Storage, verifique se:
-- - Bucket "media" existe
-- - Políticas do bucket permitem: SELECT, INSERT, UPDATE, DELETE para público

-- 6. Inserir dados de teste (se as tabelas estiverem vazias)
INSERT INTO media_items (type, url, title, description, category)
VALUES 
  ('image', 'https://images.unsplash.com/photo-1621768216002-5ac171876625?w=800', 'Teste iPhone 13 Pro', 'Reparo de teste', 'iPhone'),
  ('video', 'https://www.w3schools.com/html/mov_bbb.mp4', 'Teste Vídeo', 'Vídeo de teste', 'iPad')
ON CONFLICT DO NOTHING;

INSERT INTO testimonials (name, device, rating, testimonial, date, platform)
VALUES 
  ('João Silva', 'iPhone 14 Pro', 5, 'Excelente serviço de reparo!', CURRENT_DATE, 'local'),
  ('Maria Santos', 'MacBook Pro', 5, 'Muito satisfeita com o resultado!', CURRENT_DATE, 'google')
ON CONFLICT DO NOTHING;

-- 7. Verificar resultado final
SELECT 'media_items' as tabela, COUNT(*) as total FROM media_items
UNION ALL
SELECT 'testimonials' as tabela, COUNT(*) as total FROM testimonials;
