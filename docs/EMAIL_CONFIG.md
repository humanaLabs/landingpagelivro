# 📧 Configuração de Email - Nodemailer

## 🔧 Variáveis de Ambiente

Para configurar o sistema de email, crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```env
# Gmail (recomendado para testes)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=noreply@humana.ai
EMAIL_PASS=ailsfnyuyqorzstg

# Destinatários
FROM_EMAIL=noreply@humana.ai
FROM_NAME=Humana AI
SALES_EMAIL=contato@humana.ai
```

## 📋 Descrição das Variáveis

### Configurações SMTP
- **EMAIL_HOST**: Servidor SMTP (Gmail: smtp.gmail.com)
- **EMAIL_PORT**: Porta do servidor (Gmail: 587)
- **EMAIL_SECURE**: Conexão segura (Gmail: false)
- **EMAIL_USER**: Email de autenticação
- **EMAIL_PASS**: Senha do app (não a senha da conta)

### Configurações de Remetente
- **FROM_EMAIL**: Email que aparecerá como remetente
- **FROM_NAME**: Nome que aparecerá como remetente
- **SALES_EMAIL**: Email para onde serão enviados os leads

## 🚀 Configuração do Gmail

### 1. Ativar Autenticação de 2 Fatores
- Acesse sua conta Google
- Vá em "Segurança" > "Verificação em duas etapas"
- Ative a verificação

### 2. Gerar Senha de App
- Ainda em "Segurança"
- Vá em "Senhas de app"
- Gere uma senha para "Email"
- Use essa senha na variável `EMAIL_PASS`

### 3. Configurar no Projeto
- Copie as variáveis acima para `.env.local`
- Reinicie o servidor de desenvolvimento

## 🔍 Teste da Configuração

Após configurar as variáveis:

1. Inicie o servidor: `npm run dev`
2. Acesse a página de lead
3. Preencha o formulário
4. Verifique se o email foi enviado
5. Verifique os logs do console

## ⚠️ Importante

- **NUNCA** commite o arquivo `.env.local` no Git
- Mantenha as credenciais seguras
- Use senhas de app, não senhas de conta
- Teste sempre em ambiente de desenvolvimento primeiro

## 🆘 Solução de Problemas

### Erro de Autenticação
- Verifique se a senha de app está correta
- Confirme se a autenticação de 2 fatores está ativa

### Erro de Conexão
- Verifique se o firewall não está bloqueando
- Confirme se as portas estão abertas

### Email não chega
- Verifique a pasta de spam
- Confirme se o email de destino está correto
- Verifique os logs do console
