# 🔐 Migração para Autenticação Supabase

## ✅ Benefícios da Migração

- 🔒 **Mais Seguro**: Autenticação profissional com criptografia
- ☁️ **Centralizado**: Tudo no banco de dados, sem depender de localStorage
- 🌐 **Multi-dispositivo**: Acesse de qualquer lugar
- 🚫 **Sem problemas de cache**: Cache nunca vai apagar suas credenciais
- 📧 **Reset de senha**: Sistema profissional de recuperação

---

## 📋 Passo a Passo da Configuração

### **Passo 1: Criar Tabela no Supabase**

1. Acesse o [Supabase Dashboard](https://supabase.com/dashboard)
2. Selecione seu projeto **TecCell Premium**
3. Vá em **SQL Editor** (no menu lateral)
4. Abra o arquivo `supabase-auth-setup.sql` que foi criado
5. Copie e cole TODO o conteúdo no SQL Editor
6. Clique em **Run** para executar

### **Passo 2: Criar Usuário Admin no Supabase Auth**

1. No Supabase Dashboard, vá em **Authentication** → **Users**
2. Clique em **Add User** → **Create new user**
3. Preencha:
   - **Email**: `admin@teccellpremium.com.br` (ou o email que preferir)
   - **Password**: `SuaSenhaSegura123!` (escolha uma senha forte)
   - **Auto Confirm User**: ✅ (marque esta opção)
4. Clique em **Create user**
5. **IMPORTANTE**: Copie o **User UID** que aparece (ex: `a1b2c3d4-e5f6-...`)

### **Passo 3: Registrar Admin na Tabela**

1. Volte ao **SQL Editor**
2. Execute este comando (substitua os valores):

```sql
INSERT INTO admin_users (id, email, full_name, is_active)
VALUES (
  'COLE_O_USER_UID_AQUI',  -- UID copiado no passo anterior
  'admin@teccellpremium.com.br',  -- Mesmo email usado
  'Administrador TecCell',
  true
);
```

3. Clique em **Run**

### **Passo 4: Verificar se Funcionou**

Execute no SQL Editor:

```sql
-- Ver todos os admins cadastrados
SELECT * FROM admin_users;

-- Deve retornar 1 linha com seu email
```

---

## 🚀 Implementar no Site

### **Opção A: Sistema Híbrido (Recomendado)**

Mantenha o sistema atual funcionando e adicione Supabase Auth como alternativa:
- Login com senha local OU
- Login com email/senha do Supabase

### **Opção B: Migração Total**

Substituir completamente o sistema localStorage pelo Supabase.

---

## 📝 Próximos Passos

**Após configurar o Supabase, me avise que vou:**

1. ✅ Atualizar o `App.tsx` para usar o novo hook `useSupabaseAuth`
2. ✅ Substituir `LoginForm` por `SupabaseLogin`
3. ✅ Integrar autenticação com upload de mídia (rastrear quem adicionou)
4. ✅ Remover código antigo do localStorage
5. ✅ Fazer deploy

---

## 🔑 Credenciais para Teste

Depois de configurar, você vai entrar com:

- **Email**: `admin@teccellpremium.com.br` (ou o que você escolheu)
- **Senha**: A senha que você definiu no Passo 2

---

## 🆘 Recuperação de Acesso

Se esquecer a senha:

1. No Supabase Dashboard → **Authentication** → **Users**
2. Encontre seu usuário
3. Clique nos 3 pontinhos → **Send password recovery email**

OU execute no SQL Editor:

```sql
-- Resetar senha direto no banco (use com cuidado!)
UPDATE auth.users 
SET encrypted_password = crypt('NovaSenha123!', gen_salt('bf'))
WHERE email = 'admin@teccellpremium.com.br';
```

---

## ✅ Checklist

- [ ] Executar `supabase-auth-setup.sql` no SQL Editor
- [ ] Criar usuário no Authentication → Users
- [ ] Copiar User UID
- [ ] Inserir admin na tabela `admin_users`
- [ ] Verificar com `SELECT * FROM admin_users`
- [ ] Avisar para fazer deploy com nova autenticação

---

**Dúvidas? Estou aqui para ajudar! 🚀**
