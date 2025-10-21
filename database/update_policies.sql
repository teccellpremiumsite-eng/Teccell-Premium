-- Políticas RLS mais permissivas para o painel admin funcionar sem autenticação obrigatória

-- Remover políticas existentes e criar novas mais permissivas
DROP POLICY IF EXISTS "Authenticated users can insert media items" ON public.media_items;
DROP POLICY IF EXISTS "Authenticated users can update their own media items" ON public.media_items;
DROP POLICY IF EXISTS "Authenticated users can delete their own media items" ON public.media_items;

DROP POLICY IF EXISTS "Authenticated users can insert testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Authenticated users can update their own testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Authenticated users can delete their own testimonials" ON public.testimonials;

-- Criar políticas mais permissivas (para demo/desenvolvimento)
CREATE POLICY "Anyone can insert media items" ON public.media_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update media items" ON public.media_items FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete media items" ON public.media_items FOR DELETE USING (true);

CREATE POLICY "Anyone can insert testimonials" ON public.testimonials FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update testimonials" ON public.testimonials FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete testimonials" ON public.testimonials FOR DELETE USING (true);

-- Políticas para storage também mais permissivas
DROP POLICY IF EXISTS "Authenticated users can upload" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete" ON storage.objects;

CREATE POLICY "Anyone can upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'media');
CREATE POLICY "Anyone can delete" ON storage.objects FOR DELETE USING (bucket_id = 'media');