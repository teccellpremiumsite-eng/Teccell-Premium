# 🔐 Sistema de Autenticação TecCell Premium

## 📋 Credenciais Padrão

**Email:** admin@teccellpremium.com.br  
**Senha Padrão:** `teccell2024`

---

## 🚀 Como Usar

### 1️⃣ Primeiro Acesso

1. Acesse o site: https://teccell-premium.vercel.app
2. Pressione **Ctrl+Shift+A** para abrir o login
3. Digite:
   - Email: `admin@teccellpremium.com.br`
   - Senha: `teccell2024`
4. Clique em **Entrar**

### 2️⃣ Trocar a Senha (RECOMENDADO)

**Após o primeiro login, é ALTAMENTE RECOMENDADO trocar a senha!**

1. No painel admin, clique no botão **🔑 Trocar Senha** (verde)
2. Digite a senha atual: `teccell2024`
3. Digite sua nova senha (mínimo 6 caracteres)
4. Confirme a nova senha
5. Clique em **Alterar Senha**

✅ Pronto! Sua senha foi alterada com sucesso.

---

## 🔧 Configuração do Supabase

### Execute o Script SQL

1. Acesse o Supabase Dashboard
2. Vá em **SQL Editor**
3. Crie uma nova query
4. Cole o conteúdo do arquivo: `supabase-auth-setup-senha-padrao.sql`
5. Clique em **Run** (▶️)

O script irá:
- ✅ Criar usuário admin com senha padrão
- ✅ Criar tabela `admin_users`
- ✅ Configurar políticas de segurança (RLS)
- ✅ Criar funções auxiliares

### Verificar Instalação

Execute no SQL Editor:

```sql
-- Ver usuário criado
SELECT email, email_confirmed_at, created_at 
FROM auth.users 
WHERE email = 'admin@teccellpremium.com.br';

-- Ver registro admin
SELECT * FROM public.admin_users;

-- Testar função de admin
SELECT public.is_admin_user();
```

---

## 🛠️ Funcionalidades

### No Painel Admin:

- **📸 Gerenciar Galeria**: Adicionar, editar e excluir fotos/vídeos
- **⭐ Gerenciar Depoimentos**: Adicionar, editar e excluir avaliações
- **🗑️ Limpar Cache**: Forçar atualização do site
- **🔑 Trocar Senha**: Alterar senha de acesso
- **🚪 Sair**: Fazer logout

### Atalhos de Teclado:

- **Ctrl+Shift+A**: Abrir login/painel admin

---

## 🔒 Segurança

### Sistema 100% Cloud

- ✅ Autenticação via Supabase Auth
- ✅ Senhas criptografadas com bcrypt
- ✅ Sessões seguras com JWT tokens
- ✅ Row Level Security (RLS) habilitado
- ✅ Sem dependência de localStorage
- ✅ Acessível de qualquer dispositivo

### Resetar Senha via SQL (Emergencial)

Se esquecer a senha, execute no SQL Editor:

```sql
-- Resetar para senha padrão
SELECT public.reset_admin_password('teccell2024');

-- OU definir nova senha customizada
SELECT public.reset_admin_password('minha_nova_senha');
```

---

## 📱 Acesso Multiplataforma

Como a autenticação é 100% Supabase:

✅ Acesse de qualquer computador  
✅ Acesse de qualquer navegador  
✅ Acesse de dispositivos móveis  
✅ Sem perda de acesso ao trocar de máquina  

---

## 🆘 Solução de Problemas

### Não consigo fazer login

1. ✅ Verifique se o email está correto: `admin@teccellpremium.com.br`
2. ✅ Use a senha padrão: `teccell2024`
3. ✅ Se ainda não funcionar, execute o script SQL novamente
4. ✅ Em último caso, use a função de reset: `SELECT public.reset_admin_password('teccell2024');`

### Esqueci minha senha personalizada

1. Acesse o Supabase Dashboard
2. Vá em **SQL Editor**
3. Execute: `SELECT public.reset_admin_password('teccell2024');`
4. Faça login com a senha padrão
5. Troque para uma nova senha no painel

### Site não atualiza após mudanças

1. Clique em **🗑️ Limpar Cache** no painel admin
2. Isso irá forçar a atualização do site
3. Aguarde alguns segundos e recarregue a página

---

## 📄 Arquivos Relacionados

- `supabase-auth-setup-senha-padrao.sql` - Script de instalação completo
- `src/hooks/useSupabaseAuth.ts` - Hook de autenticação
- `src/components/SupabaseLogin.tsx` - Tela de login
- `src/components/ChangePassword.tsx` - Tela de troca de senha
- `src/components/AdminPanelSimple.tsx` - Painel administrativo
- `src/App.tsx` - Aplicação principal

---

## 🎯 Checklist Pós-Instalação

- [ ] Executar script SQL no Supabase
- [ ] Testar login com credenciais padrão
- [ ] Trocar senha padrão por uma personalizada
- [ ] Verificar upload de imagens
- [ ] Verificar adicionar depoimentos
- [ ] Testar botão Limpar Cache
- [ ] Fazer logout e login novamente

---

**✅ Sistema pronto para uso!**

Qualquer dúvida, consulte este guia ou verifique os logs no console do navegador (F12).
