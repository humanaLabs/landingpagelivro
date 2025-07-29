# 🚀 Landing Page Empresarial

Uma landing page moderna e profissional construída com Next.js 15, TypeScript e Tailwind CSS, seguindo as melhores práticas de desenvolvimento e design.

## ✨ Características

- 🎨 **Design System** completo e consistente
- 🚀 **Next.js 15** com App Router
- 📱 **Responsivo** e mobile-first
- 🎭 **Animações** suaves com Framer Motion
- 🔍 **SEO otimizado** com metadados completos
- 🧪 **Testes** automatizados (unitários e E2E)
- 🎯 **Acessibilidade** (WCAG 2.1 AA)
- ⚡ **Performance** otimizada
- 🔒 **TypeScript** para segurança de tipos
- 🎨 **Tailwind CSS** para styling

## 🏗️ Tecnologias

- **Framework**: Next.js 15
- **Linguagem**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animações**: Framer Motion
- **Ícones**: Lucide React
- **Testes**: Jest, React Testing Library, Playwright
- **Linting**: ESLint, Prettier
- **CI/CD**: GitHub Actions
- **Deploy**: Vercel

## 🚀 Início Rápido

### Pré-requisitos

- Node.js 18.0 ou superior
- npm, yarn ou pnpm

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/landing-page.git
cd landing-page

# Instale as dependências
npm install

# Execute o servidor de desenvolvimento
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 📜 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Servidor de desenvolvimento
npm run build        # Build para produção
npm run start        # Servidor de produção

# Qualidade de código
npm run lint         # Executar linting
npm run lint:fix     # Corrigir problemas de linting
npm run format       # Formatar código
npm run type-check   # Verificar tipos TypeScript

# Testes
npm run test         # Testes unitários
npm run test:watch   # Testes em modo watch
npm run test:coverage # Testes com cobertura
npm run test:e2e     # Testes E2E
npm run test:e2e:ui  # Testes E2E com interface
```

## 📁 Estrutura do Projeto

```
landing-page/
├── src/
│   ├── app/                    # App Router (Next.js 15)
│   │   ├── layout.tsx         # Layout principal
│   │   ├── page.tsx           # Página inicial
│   │   └── globals.css        # Estilos globais
│   ├── components/            # Componentes React
│   │   ├── ui/                # Componentes do design system
│   │   ├── marketing/         # Componentes de marketing
│   │   └── layout/            # Componentes de layout
│   └── lib/                   # Utilitários e configurações
│       └── utils.ts           # Funções auxiliares
├── docs/                      # Documentação
│   └── blueprint/             # Blueprint do projeto
├── tests/                     # Testes
│   └── e2e/                   # Testes E2E
├── .github/                   # GitHub Actions
│   └── workflows/             # Workflows CI/CD
└── public/                    # Assets estáticos
```

## 🎨 Design System

### Cores

```css
/* Tema Claro */
--primary: 222.2 84% 4.9%;
--secondary: 210 40% 96%;
--muted: 210 40% 96%;
--background: 0 0% 100%;
--foreground: 222.2 84% 4.9%;
```

### Componentes

- **Button**: 6 variantes (default, outline, secondary, ghost, link, destructive)
- **Card**: Com header, content e footer
- **Input**: Com estados e validação
- **Label**: Acessível e semântico

### Tipografia

- **Font Principal**: Inter
- **Font Mono**: JetBrains Mono
- **Escala**: 12px - 48px com line-heights otimizados

## 🧪 Testes

### Testes Unitários

```bash
# Executar todos os testes
npm run test

# Executar com cobertura
npm run test:coverage

# Executar em modo watch
npm run test:watch
```

### Testes E2E

```bash
# Executar testes E2E
npm run test:e2e

# Executar com interface
npm run test:e2e:ui
```

## 📊 Performance

- **Lighthouse Score**: > 90
- **First Contentful Paint**: < 1.8s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Time to Interactive**: < 3.5s

## 🔧 Configuração

### Variáveis de Ambiente

Crie um arquivo `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=https://seudominio.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Deployment

#### Vercel (Recomendado)

```bash
# Instalar Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

#### Netlify

```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

## 📈 Monitoramento

- **Analytics**: Google Analytics 4
- **Performance**: Vercel Analytics
- **Errors**: Sentry (opcional)
- **Uptime**: Vercel Monitor

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🆘 Suporte

Para suporte, email contato@landingpage.com ou abra uma issue no GitHub.

## 🙏 Agradecimentos

- [Next.js](https://nextjs.org/) pela framework incrível
- [Tailwind CSS](https://tailwindcss.com/) pelo sistema de design
- [Framer Motion](https://framer.com/motion/) pelas animações
- [Lucide](https://lucide.dev/) pelos ícones
- [Vercel](https://vercel.com/) pelo hosting

---

Feito com ❤️ por [Seu Nome](https://github.com/seu-usuario)
