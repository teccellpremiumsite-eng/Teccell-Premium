-- ================================================
-- SETUP COMPLETO DE AUTENTICAÇÃO SUPABASE
-- Sistema Admin TecCell Premium
-- ================================================

-- ATENÇÃO: Este script apenas cria a estrutura da tabela admin_users
-- O usuário admin deve ser criado via Dashboard do Supabase

-- 1. Recriar tabela admin_users com estrutura correta
DROP TABLE IF EXISTS public.admin_users CASCADE;

CREATE TABLE public.admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  email text UNIQUE NOT NULL,
  is_admin boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 2. Habilitar RLS (Row Level Security)
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- 3. Criar policies de segurança
-- Policy para permitir que usuários autenticados vejam seus próprios registros
DROP POLICY IF EXISTS "Usuários podem ver próprio registro admin" ON public.admin_users;
CREATE POLICY "Usuários podem ver próprio registro admin"
  ON public.admin_users
  FOR SELECT
  USING (
    auth.uid() = user_id
  );

DROP POLICY IF EXISTS "Admins podem ver todos os registros" ON public.admin_users;
CREATE POLICY "Admins podem ver todos os registros"
  ON public.admin_users
  FOR SELECT
  USING (
    auth.uid() IN (SELECT user_id FROM public.admin_users WHERE is_admin = true)
  );

DROP POLICY IF EXISTS "Admins podem atualizar registros" ON public.admin_users;
CREATE POLICY "Admins podem atualizar registros"
  ON public.admin_users
  FOR UPDATE
  USING (
    auth.uid() IN (SELECT user_id FROM public.admin_users WHERE is_admin = true)
  );

DROP POLICY IF EXISTS "Admins podem inserir registros" ON public.admin_users;
CREATE POLICY "Admins podem inserir registros"
  ON public.admin_users
  FOR INSERT
  WITH CHECK (
    auth.uid() IN (SELECT user_id FROM public.admin_users WHERE is_admin = true)
  );

-- 4. Criar função para verificar se usuário é admin
CREATE OR REPLACE FUNCTION public.is_admin_user()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 
    FROM public.admin_users 
    WHERE user_id = auth.uid() 
    AND is_admin = true
  );
END;
$$;

-- 5. Criar função para adicionar admin (após criar usuário no Auth)
CREATE OR REPLACE FUNCTION public.add_admin_user(admin_email text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  user_uuid uuid;
BEGIN
  -- Buscar ID do usuário pelo email
  SELECT id INTO user_uuid 
  FROM auth.users 
  WHERE email = admin_email;

  IF user_uuid IS NULL THEN
    RETURN 'Erro: Usuário não encontrado. Crie o usuário primeiro no Authentication > Users';
  END IF;

  -- Inserir na tabela admin_users
  INSERT INTO public.admin_users (user_id, email, is_admin)
  VALUES (user_uuid, admin_email, true)
  ON CONFLICT (email) DO UPDATE SET
    is_admin = true,
    updated_at = now();

  RETURN 'Admin adicionado com sucesso: ' || admin_email;
END;
$$;

-- ================================================
-- INSTRUÇÕES DE USO:
-- ================================================
-- 
-- PASSO 1: Execute este script no SQL Editor
-- 
-- PASSO 2: Crie o usuário admin no Dashboard do Supabase
--    1. Vá em Authentication > Users
--    2. Clique em "Add user" > "Create new user"
--    3. Preencha:
--       - Email: admin@teccellpremium.com.br
--       - Senha: [DEFINA SUA SENHA SEGURA AQUI]
--       - ✓ Auto Confirm User (marque esta opção!)
--    4. Clique em "Create user"
-- 
-- PASSO 3: Adicione o usuário como admin executando:
--    SELECT public.add_admin_user('admin@teccellpremium.com.br');
--
-- PASSO 4: Verifique se está tudo OK:
--    SELECT * FROM public.admin_users;
--
-- ================================================

-- Verificar estrutura criada
SELECT 'Tabela admin_users criada!' as status;
