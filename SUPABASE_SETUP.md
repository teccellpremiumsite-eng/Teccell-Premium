# 🗄️ Configuração do Supabase para Teccell Premium

## 📋 Passos para Configurar o Banco de Dados

### 1. **Executar o Schema SQL**

No painel do Supabase, vá para **SQL Editor** e execute o arquivo `database/schema.sql`:

```sql
-- Copie e cole todo o conteúdo do arquivo schema.sql aqui
```

### 2. **Configurar Storage Bucket**

1. Vá para **Storage** no painel do Supabase
2. Clique em **Create Bucket**
3. Nome: `media`
4. Marque como **Public bucket**
5. Clique em **Create bucket**

### 3. **Verificar Políticas RLS**

Certifique-se de que as políticas foram criadas corretamente:

- **media_items**: Leitura pública, escrita apenas para usuários autenticados
- **testimonials**: Leitura pública, escrita apenas para usuários autenticados
- **storage.objects**: Upload e delete apenas para usuários autenticados

### 4. **Configurar Autenticação**

1. Vá para **Authentication** > **Settings**
2. Configure um provedor de email
3. Ou configure OAuth com Google/GitHub

### 5. **Variáveis de Ambiente para Vercel**

No deploy do Vercel, adicione estas variáveis:

```env
VITE_SUPABASE_URL=https://dtwxwzyawlfzmjnrfgeb.supabase.co
VITE_SUPABASE_ANON_KEY=seu_token_anon_key_aqui
```

## 🔐 Como Acessar o Painel Admin

1. **Via Tecla de Atalho:**
   - Pressione `Ctrl + Shift + A` (ou `Cmd + Shift + A` no Mac)
   - Se não estiver logado, aparecerá o formulário de login
   - Se já estiver logado, abre direto o painel

2. **Fazer Login:**
   - Use suas credenciais do Supabase
   - Ou crie uma conta via registro

## ✨ Funcionalidades do Painel

### 📸 **Galeria de Mídia:**
- ✅ Upload real de fotos e vídeos para Supabase Storage
- ✅ Compressão automática de imagens
- ✅ Validação de tipos e tamanhos de arquivo
- ✅ URLs permanentes do Supabase
- ✅ Categorização por dispositivo (iPhone, iPad, MacBook)
- ✅ Visualização em grid responsivo
- ✅ Filtros por tipo (Fotos, Vídeos)
- ✅ Preview modal
- ✅ Exclusão com remoção do arquivo

### 💬 **Depoimentos:**
- ✅ Formulário completo de depoimentos
- ✅ Sistema de avaliação por estrelas
- ✅ Integração com plataformas (Google, Facebook, Local)
- ✅ Avatar do cliente
- ✅ Verificação de depoimentos
- ✅ Links para avaliações originais
- ✅ Informações do dispositivo reparado

### 📊 **Dashboard:**
- ✅ Estatísticas em tempo real
- ✅ Total de itens na galeria
- ✅ Contadores separados por tipo
- ✅ Número de depoimentos
- ✅ Média de avaliações

## 🔧 Estrutura do Banco

### **Tabela: media_items**
- `id` (UUID, PK)
- `type` ('image' | 'video')
- `url` (TEXT) - URL do Supabase Storage
- `title` (TEXT)
- `description` (TEXT)
- `category` (TEXT) - iPhone, iPad, MacBook
- `file_path` (TEXT) - Caminho no storage
- `file_size` (INTEGER) - Tamanho em bytes
- `mime_type` (TEXT)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)
- `created_by` (UUID, FK)

### **Tabela: testimonials**
- `id` (UUID, PK)
- `name` (TEXT)
- `avatar_url` (TEXT)
- `location` (TEXT)
- `device` (TEXT)
- `rating` (INTEGER, 1-5)
- `testimonial` (TEXT)
- `repair_type` (TEXT)
- `date` (DATE)
- `platform` ('google' | 'facebook' | 'local')
- `verified` (BOOLEAN)
- `review_url` (TEXT)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)
- `created_by` (UUID, FK)

## 🚀 Deploy e Produção

1. **Build do projeto:** `npm run build`
2. **Deploy no Vercel:** Conectar repositório GitHub
3. **Configurar variáveis de ambiente** no painel do Vercel
4. **Testar upload de arquivos** no ambiente de produção

## 🔒 Segurança

- ✅ Row Level Security (RLS) ativo
- ✅ Políticas de acesso configuradas
- ✅ Upload apenas para usuários autenticados
- ✅ Validação de tipos de arquivo
- ✅ Limite de tamanho de arquivo (10MB)
- ✅ Compressão automática de imagens

## 📱 Responsividade

- ✅ Interface adaptável para desktop, tablet e mobile
- ✅ Grid responsivo para galeria
- ✅ Formulários otimizados para touch
- ✅ Navegação por tabs touch-friendly