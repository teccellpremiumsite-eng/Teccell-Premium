-- ================================================
-- SETUP COMPLETO DE AUTENTICAÇÃO SUPABASE
-- Sistema Admin TecCell Premium
-- SENHA PADRÃO: teccell2024
-- ================================================

-- 1. Criar usuário admin no Supabase Auth com SENHA PADRÃO
-- IMPORTANTE: Execute isso primeiro!
-- Este comando cria o usuário com email e senha padrão
DO $$
DECLARE
  admin_user_id uuid;
BEGIN
  -- Tentar criar usuário no auth.users (se não existir)
  INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    recovery_sent_at,
    last_sign_in_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    confirmation_token,
    email_change,
    email_change_token_new,
    recovery_token
  )
  SELECT
    '00000000-0000-0000-0000-000000000000',
    gen_random_uuid(),
    'authenticated',
    'authenticated',
    'admin@teccellpremium.com.br',
    crypt('teccell2024', gen_salt('bf')), -- SENHA PADRÃO: teccell2024
    NOW(),
    NOW(),
    NOW(),
    '{"provider":"email","providers":["email"]}',
    '{}',
    NOW(),
    NOW(),
    '',
    '',
    '',
    ''
  WHERE NOT EXISTS (
    SELECT 1 FROM auth.users WHERE email = 'admin@teccellpremium.com.br'
  )
  RETURNING id INTO admin_user_id;

  -- Se o usuário já existe, pegar o ID dele
  IF admin_user_id IS NULL THEN
    SELECT id INTO admin_user_id FROM auth.users WHERE email = 'admin@teccellpremium.com.br';
  END IF;

  RAISE NOTICE 'Usuário admin criado/encontrado com ID: %', admin_user_id;
END $$;

-- 2. Recriar tabela admin_users com estrutura correta
-- Primeiro, dropar a tabela antiga se existir
DROP TABLE IF EXISTS public.admin_users CASCADE;

-- Criar nova tabela com estrutura correta
CREATE TABLE public.admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  email text UNIQUE NOT NULL,
  is_admin boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 3. Inserir registro na tabela admin_users
INSERT INTO public.admin_users (user_id, email, is_admin)
SELECT 
  u.id,
  u.email,
  true
FROM auth.users u
WHERE u.email = 'admin@teccellpremium.com.br'
ON CONFLICT (email) DO UPDATE SET
  is_admin = true,
  updated_at = now();

-- 4. Habilitar RLS (Row Level Security)
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- 5. Criar policies de segurança
-- Permitir que apenas admins vejam a tabela
DROP POLICY IF EXISTS "Admins podem ver todos os registros" ON public.admin_users;
CREATE POLICY "Admins podem ver todos os registros"
  ON public.admin_users
  FOR SELECT
  USING (
    auth.uid() IN (SELECT user_id FROM public.admin_users WHERE is_admin = true)
  );

-- Permitir que admins atualizem registros
DROP POLICY IF EXISTS "Admins podem atualizar registros" ON public.admin_users;
CREATE POLICY "Admins podem atualizar registros"
  ON public.admin_users
  FOR UPDATE
  USING (
    auth.uid() IN (SELECT user_id FROM public.admin_users WHERE is_admin = true)
  );

-- 6. Criar função para verificar se usuário é admin
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

-- 7. Criar função para resetar senha (uso emergencial via SQL Editor)
CREATE OR REPLACE FUNCTION public.reset_admin_password(new_password text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  admin_user_id uuid;
BEGIN
  -- Buscar ID do usuário admin
  SELECT id INTO admin_user_id 
  FROM auth.users 
  WHERE email = 'admin@teccellpremium.com.br';

  IF admin_user_id IS NULL THEN
    RETURN 'Erro: Usuário admin não encontrado';
  END IF;

  -- Atualizar senha
  UPDATE auth.users
  SET 
    encrypted_password = crypt(new_password, gen_salt('bf')),
    updated_at = NOW()
  WHERE id = admin_user_id;

  RETURN 'Senha resetada com sucesso para: admin@teccellpremium.com.br';
END;
$$;

-- ================================================
-- VERIFICAÇÕES E INSTRUÇÕES
-- ================================================

-- Verificar se o usuário foi criado corretamente
SELECT 
  'Usuário Admin' as tipo,
  email,
  email_confirmed_at IS NOT NULL as email_confirmado,
  created_at
FROM auth.users
WHERE email = 'admin@teccellpremium.com.br';

-- Verificar se está na tabela admin_users
SELECT 
  'Registro Admin' as tipo,
  email,
  is_admin,
  created_at
FROM public.admin_users
WHERE email = 'admin@teccellpremium.com.br';

-- Testar função de verificação
SELECT 'É Admin?' as pergunta, public.is_admin_user() as resposta;

-- ================================================
-- INSTRUÇÕES DE USO:
-- ================================================
-- 
-- 1. SENHA PADRÃO:
--    Email: admin@teccellpremium.com.br
--    Senha: teccell2024
--
-- 2. TROCAR SENHA:
--    Use o botão "Trocar Senha" no painel admin
--    Ou use este comando SQL (emergencial):
--    SELECT public.reset_admin_password('sua_nova_senha_aqui');
--
-- 3. VERIFICAR LOGIN:
--    Acesse o site
--    Pressione Ctrl+Shift+A
--    Digite email e senha
--
-- ================================================
