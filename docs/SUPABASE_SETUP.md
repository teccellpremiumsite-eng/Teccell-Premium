# 🗄️ Configuração do Supabase para Teccell Premium

## ⚡ Configuração Rápida

### 1. **Acesse o Supabase Dashboard**
- Vá para [supabase.com](https://supabase.com)
- Faça login na sua conta
- Selecione seu projeto: `dtwxwzyawlfzmjnrfgeb`

### 2. **Execute o Schema SQL**
1. Vá para **SQL Editor** no painel lateral
2. Clique em **New Query**
3. Copie todo o conteúdo do arquivo `database/schema.sql`
4. Cole no editor SQL
5. Clique em **Run** (ou pressione Ctrl+Enter)

### 3. **Verificar Storage Bucket**
1. Vá para **Storage** no painel lateral
2. Você deve ver o bucket `media` listado
3. Se não existir, será criado automaticamente pelo script

### 4. **Verificar Tabelas**
1. Vá para **Table Editor**
2. Você deve ver as tabelas:
   - `media_items` - Para fotos e vídeos
   - `testimonials` - Para depoimentos

---

## 🔧 Configuração Manual (se necessário)

### Storage Bucket 'media':
```sql
-- Só execute se o bucket não existir
INSERT INTO storage.buckets (id, name, public) VALUES ('media', 'media', true);
```

### Políticas de Storage:
```sql
-- Permitir visualização pública
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'media');

-- Permitir upload para usuários autenticados
CREATE POLICY "Authenticated users can upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'media' AND auth.role() = 'authenticated');

-- Permitir deletar para usuários autenticados
CREATE POLICY "Authenticated users can delete" ON storage.objects FOR DELETE USING (bucket_id = 'media' AND auth.role() = 'authenticated');
```

---

## ✅ Verificação Final

### 1. **Testar Storage**
```sql
SELECT * FROM storage.buckets WHERE id = 'media';
```

### 2. **Testar Tabelas**
```sql
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('media_items', 'testimonials');
```

### 3. **Testar Políticas**
```sql
SELECT schemaname, tablename, policyname 
FROM pg_policies 
WHERE tablename IN ('media_items', 'testimonials', 'objects');
```

---

## 🚀 URLs e Credenciais

**Sua configuração atual:**
- **URL**: `https://dtwxwzyawlfzmjnrfgeb.supabase.co`
- **Anon Key**: Já configurada no `.env`

**Para deployment no Vercel:**
- Adicione as variáveis de ambiente:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`

---

## 🔥 Funcionalidades Habilitadas

✅ **Upload real de fotos e vídeos**  
✅ **Persistência de dados no banco**  
✅ **Autenticação com Supabase**  
✅ **Storage bucket público para mídia**  
✅ **Políticas de segurança (RLS)**  
✅ **Triggers automáticos para timestamps**  
✅ **Índices para performance**

**Agora o painel admin está totalmente integrado com Supabase!** 🎯