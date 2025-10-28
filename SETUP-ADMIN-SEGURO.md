# 🔐 Setup Admin Seguro - TecCell Premium

## ⚠️ Método Seguro (SEM credenciais no código)

### 📋 Passo a Passo

#### 1️⃣ Execute o Script SQL

1. Acesse o **Supabase Dashboard**
2. Vá em **SQL Editor**
3. Cole o conteúdo completo de `supabase-auth-setup-senha-padrao.sql`
4. Clique em **Run** (▶️)

✅ Isso cria a tabela `admin_users` e as funções necessárias

---

#### 2️⃣ Crie o Usuário Admin no Dashboard

1. No Supabase Dashboard, vá em **Authentication** > **Users**
2. Clique em **"Add user"** > **"Create new user"**
3. Preencha:
   - **Email**: `admin@teccellpremium.com.br`
   - **Password**: [DEFINA UMA SENHA SEGURA]
   - ✅ **Auto Confirm User** (MARQUE ESTA OPÇÃO!)
4. Clique em **"Create user"**

![image](https://github.com/user-attachments/assets/...)

---

#### 3️⃣ Adicione como Admin

Volte ao **SQL Editor** e execute:

```sql
SELECT public.add_admin_user('admin@teccellpremium.com.br');
```

Você deve ver: `"Admin adicionado com sucesso: admin@teccellpremium.com.br"`

---

#### 4️⃣ Verifique a Instalação

Execute no SQL Editor:

```sql
-- Ver todos os admins
SELECT * FROM public.admin_users;

-- Ver usuário no auth
SELECT email, created_at, email_confirmed_at 
FROM auth.users 
WHERE email = 'admin@teccellpremium.com.br';
```

✅ Deve mostrar o registro do admin!

---

## 🧪 Teste o Login

1. Acesse: https://teccell-premium.vercel.app (ou seu domínio)
2. Pressione **Ctrl+Shift+A**
3. Digite:
   - Email: `admin@teccellpremium.com.br`
   - Senha: [A SENHA QUE VOCÊ DEFINIU NO PASSO 2]
4. Clique em **Entrar**

---

## 🔒 Segurança

### ✅ Vantagens deste método:

- **NÃO expõe credenciais** no código-fonte
- **NÃO expõe credenciais** no frontend (inspecionável)
- Senha definida de forma segura via Dashboard
- Você escolhe uma senha forte e privada
- Ninguém tem acesso além de você

### ❌ Método anterior (INSEGURO):

- ~~Senha hardcoded no SQL~~
- ~~Senha exibida no console do navegador~~
- ~~Senha visível no código-fonte~~
- ~~Qualquer pessoa que inspecionar o site vê a senha~~

---

## 🔑 Trocar Senha

Após o primeiro login:

1. No painel admin, clique em **🔑 Trocar Senha** (botão verde)
2. Digite a senha atual
3. Digite a nova senha (mínimo 6 caracteres)
4. Confirme a nova senha
5. Pronto! ✅

---

## 🆘 Esqueci a Senha

### Opção 1: Resetar via Dashboard

1. Vá em **Authentication** > **Users**
2. Encontre o usuário `admin@teccellpremium.com.br`
3. Clique nos 3 pontinhos ⋮
4. **Send password reset email** ou **Reset password**

### Opção 2: Criar nova senha via Dashboard

1. Vá em **Authentication** > **Users**
2. Encontre o usuário e clique nele
3. Em **User Management**, clique em **Reset Password**
4. Digite a nova senha
5. Clique em **Update user**

---

## 📄 Arquivos Modificados

- ✅ `supabase-auth-setup-senha-padrao.sql` - Script sem credenciais hardcoded
- ✅ `src/components/SupabaseLogin.tsx` - Removida exibição de senha padrão
- ✅ `src/components/ChangePassword.tsx` - Removida exibição de senha padrão
- ✅ `src/App.tsx` - Removido log de email no console

---

## ✅ Checklist de Segurança

- [ ] Script SQL executado
- [ ] Usuário criado via Dashboard (NÃO via SQL)
- [ ] Opção "Auto Confirm User" marcada
- [ ] Função `add_admin_user()` executada
- [ ] Login testado com sucesso
- [ ] Senha forte definida (min. 12 caracteres recomendado)
- [ ] Credenciais salvas em local seguro (gerenciador de senhas)
- [ ] NÃO existem senhas no código-fonte
- [ ] Console do navegador limpo (sem logs de credenciais)

---

**🎯 Agora seu sistema está seguro!**

Nenhuma credencial é exposta no código ou no frontend. Apenas você tem acesso à senha definida no Dashboard do Supabase.
