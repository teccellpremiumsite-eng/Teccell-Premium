-- Configuração de Autenticação Admin no Supabase
-- Execute este script no Supabase SQL Editor

-- 0. LIMPAR INSTALAÇÃO ANTERIOR (se existir)
DROP POLICY IF EXISTS "Permitir leitura de admins ativos" ON admin_users;
DROP FUNCTION IF EXISTS is_admin_user(TEXT);
DROP TABLE IF EXISTS admin_users CASCADE;

-- 1. Criar tabela de administradores
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Habilitar RLS na tabela
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- 3. Políticas para admin_users (apenas leitura pública para verificar email)
CREATE POLICY "Permitir leitura de admins ativos"
  ON admin_users FOR SELECT
  USING (is_active = true);

-- 4. Criar função para verificar se usuário é admin
CREATE OR REPLACE FUNCTION is_admin_user(user_email TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admin_users 
    WHERE email = user_email 
    AND is_active = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. INSERIR ADMIN DIRETO (sem precisar criar no Auth primeiro)
-- Agora vamos criar o usuário E o registro de admin de uma vez só!

DO $$
DECLARE
  user_id UUID;
  user_email TEXT := 'admin@teccellpremium.com.br';
  user_password TEXT := 'TeccellAdmin2024!'; -- MUDE ESTA SENHA!
BEGIN
  -- Criar usuário no auth.users
  INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    invited_at,
    confirmation_token,
    confirmation_sent_at,
    recovery_token,
    recovery_sent_at,
    email_change_token_new,
    email_change,
    email_change_sent_at,
    last_sign_in_at,
    raw_app_meta_data,
    raw_user_meta_data,
    is_super_admin,
    created_at,
    updated_at,
    phone,
    phone_confirmed_at,
    phone_change,
    phone_change_token,
    phone_change_sent_at,
    email_change_token_current,
    email_change_confirm_status,
    banned_until,
    reauthentication_token,
    reauthentication_sent_at
  )
  VALUES (
    '00000000-0000-0000-0000-000000000000',
    gen_random_uuid(),
    'authenticated',
    'authenticated',
    user_email,
    crypt(user_password, gen_salt('bf')),
    NOW(),
    NOW(),
    '',
    NOW(),
    '',
    NOW(),
    '',
    '',
    NOW(),
    NOW(),
    '{"provider":"email","providers":["email"]}',
    '{}',
    FALSE,
    NOW(),
    NOW(),
    NULL,
    NULL,
    '',
    '',
    NOW(),
    '',
    0,
    NOW(),
    '',
    NOW()
  )
  RETURNING id INTO user_id;

  -- Criar identidade do usuário
  INSERT INTO auth.identities (
    id,
    user_id,
    provider_id,
    identity_data,
    provider,
    last_sign_in_at,
    created_at,
    updated_at
  )
  VALUES (
    gen_random_uuid(),
    user_id,
    user_id::text,
    format('{"sub":"%s","email":"%s"}', user_id::text, user_email)::jsonb,
    'email',
    NOW(),
    NOW(),
    NOW()
  );

  -- Inserir na tabela admin_users
  INSERT INTO admin_users (id, email, full_name, is_active)
  VALUES (
    user_id,
    user_email,
    'Administrador TecCell',
    true
  );

  RAISE NOTICE 'Usuário admin criado com sucesso! Email: %, ID: %', user_email, user_id;
END $$;

-- 6. Verificar se admin existe
SELECT * FROM admin_users;

-- 7. Testar função
SELECT is_admin_user('admin@teccellpremium.com.br');
