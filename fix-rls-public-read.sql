-- ============================================
-- EMERGÊNCIA: LIMPAR TODAS AS POLÍTICAS PERIGOSAS
-- Você tem políticas que permitem QUALQUER PESSOA
-- deletar e modificar dados sem autenticação!
-- ============================================

-- DROP TODAS as políticas de media_items
DROP POLICY IF EXISTS "Anyone can delete media items" ON media_items;
DROP POLICY IF EXISTS "Anyone can insert media items" ON media_items;
DROP POLICY IF EXISTS "Anyone can update media items" ON media_items;
DROP POLICY IF EXISTS "Authenticated users can delete media items" ON media_items;
DROP POLICY IF EXISTS "Authenticated users can insert media items" ON media_items;
DROP POLICY IF EXISTS "Authenticated users can update media items" ON media_items;
DROP POLICY IF EXISTS "Media items are viewable by everyone" ON media_items;
DROP POLICY IF EXISTS "Permitir delete público" ON media_items;
DROP POLICY IF EXISTS "Permitir insert público" ON media_items;
DROP POLICY IF EXISTS "Permitir leitura pública" ON media_items;
DROP POLICY IF EXISTS "Permitir update público" ON media_items;
DROP POLICY IF EXISTS "Public can read all media items" ON media_items;
DROP POLICY IF EXISTS "Allow authenticated users to read their own data" ON media_items;
DROP POLICY IF EXISTS "Allow authenticated users to insert data" ON media_items;
DROP POLICY IF EXISTS "Allow authenticated users to update their own data" ON media_items;
DROP POLICY IF EXISTS "Allow authenticated users to delete their own data" ON media_items;

-- DROP TODAS as políticas de testimonials
DROP POLICY IF EXISTS "Anyone can delete testimonials" ON testimonials;
DROP POLICY IF EXISTS "Anyone can insert testimonials" ON testimonials;
DROP POLICY IF EXISTS "Anyone can update testimonials" ON testimonials;
DROP POLICY IF EXISTS "Authenticated users can delete testimonials" ON testimonials;
DROP POLICY IF EXISTS "Authenticated users can insert testimonials" ON testimonials;
DROP POLICY IF EXISTS "Authenticated users can update testimonials" ON testimonials;
DROP POLICY IF EXISTS "Permitir delete público" ON testimonials;
DROP POLICY IF EXISTS "Permitir insert público" ON testimonials;
DROP POLICY IF EXISTS "Permitir leitura pública" ON testimonials;
DROP POLICY IF EXISTS "Permitir update público" ON testimonials;
DROP POLICY IF EXISTS "Public can read all testimonials" ON testimonials;
DROP POLICY IF EXISTS "Testimonials are viewable by everyone" ON testimonials;
DROP POLICY IF EXISTS "Allow authenticated users to read their own data" ON testimonials;
DROP POLICY IF EXISTS "Allow authenticated users to insert data" ON testimonials;
DROP POLICY IF EXISTS "Allow authenticated users to update their own data" ON testimonials;
DROP POLICY IF EXISTS "Allow authenticated users to delete their own data" ON testimonials;

-- ============================================
-- CRIAR POLÍTICAS CORRETAS E SEGURAS
-- ============================================

-- MEDIA_ITEMS
-- -----------

-- 1. Leitura pública (visitantes podem ver a galeria)
CREATE POLICY "media_read_public"
ON media_items
FOR SELECT
TO anon, authenticated
USING (true);

-- 2. Apenas ADMIN AUTENTICADO pode inserir
CREATE POLICY "media_insert_auth"
ON media_items
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM admin_users 
    WHERE user_id = auth.uid() 
    AND is_admin = true
  )
);

-- 3. Apenas ADMIN AUTENTICADO pode atualizar
CREATE POLICY "media_update_auth"
ON media_items
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM admin_users 
    WHERE user_id = auth.uid() 
    AND is_admin = true
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM admin_users 
    WHERE user_id = auth.uid() 
    AND is_admin = true
  )
);

-- 4. Apenas ADMIN AUTENTICADO pode deletar
CREATE POLICY "media_delete_auth"
ON media_items
FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM admin_users 
    WHERE user_id = auth.uid() 
    AND is_admin = true
  )
);

-- TESTIMONIALS
-- ------------

-- 1. Leitura pública (visitantes podem ver depoimentos)
CREATE POLICY "testimonials_read_public"
ON testimonials
FOR SELECT
TO anon, authenticated
USING (true);

-- 2. Apenas ADMIN AUTENTICADO pode inserir
CREATE POLICY "testimonials_insert_auth"
ON testimonials
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM admin_users 
    WHERE user_id = auth.uid() 
    AND is_admin = true
  )
);

-- 3. Apenas ADMIN AUTENTICADO pode atualizar
CREATE POLICY "testimonials_update_auth"
ON testimonials
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM admin_users 
    WHERE user_id = auth.uid() 
    AND is_admin = true
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM admin_users 
    WHERE user_id = auth.uid() 
    AND is_admin = true
  )
);

-- 4. Apenas ADMIN AUTENTICADO pode deletar
CREATE POLICY "testimonials_delete_auth"
ON testimonials
FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM admin_users 
    WHERE user_id = auth.uid() 
    AND is_admin = true
  )
);


-- ============================================
-- Verificar se RLS está habilitado
-- ============================================

-- Confirmar RLS ativo
SELECT 
  schemaname, 
  tablename, 
  rowsecurity as rls_enabled
FROM pg_tables 
WHERE schemaname = 'public' 
  AND tablename IN ('media_items', 'testimonials');

-- Listar políticas criadas
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd
FROM pg_policies 
WHERE schemaname = 'public' 
  AND tablename IN ('media_items', 'testimonials')
ORDER BY tablename, policyname;
