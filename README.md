# 🖥️ Gold Informática - E-commerce

Uma plataforma completa de e-commerce para periféricos e acessórios de informática, desenvolvida com Next.js 13, TypeScript e Prisma.

## 🎯 Sobre o Projeto

O **Gold Informática** é uma loja virtual especializada em periféricos e acessórios de informática, oferecendo uma experiência completa de compra online com sistema de autenticação, carrinho de compras, pagamentos via Stripe e painel administrativo.

### Características Principais

- **Frontend Moderno**: Interface responsiva com Tailwind CSS e componentes reutilizáveis
- **Backend Robusto**: API RESTful com Next.js 13 App Router
- **Banco de Dados**: PostgreSQL com Prisma ORM
- **Autenticação**: Sistema completo de login/registro com NextAuth.js
- **Pagamentos**: Integração com Stripe para processamento de pagamentos
- **Admin Panel**: Painel administrativo para gestão de produtos e pedidos

## ✨ Funcionalidades

### 🛍️ Loja Virtual

- **Catálogo de Produtos**: Navegação por categorias (Mouses, Teclados, Headphones, etc.)
- **Sistema de Busca**: Filtros por nome e categoria
- **Carrinho de Compras**: Adição, remoção e atualização de quantidades
- **Sistema de Descontos**: Aplicação automática de percentuais de desconto
- **Checkout Seguro**: Integração com Stripe para pagamentos
- **Histórico de Pedidos**: Acompanhamento do status dos pedidos

### 👤 Sistema de Usuários

- **Registro e Login**: Autenticação completa com validação
- **Perfil de Usuário**: Gestão de dados pessoais
- **Histórico de Compras**: Visualização de pedidos anteriores
- **Sessões Seguras**: Gerenciamento de tokens JWT

### 🛠️ Painel Administrativo

- **Dashboard**: Visão geral com métricas de vendas
- **Gestão de Produtos**: CRUD completo de produtos
- **Gestão de Categorias**: Organização do catálogo
- **Gestão de Pedidos**: Acompanhamento e atualização de status
- **Upload de Imagens**: Sistema de upload múltiplo de imagens

## 🛠️ Tecnologias Utilizadas

### Frontend

- **Next.js 13** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework CSS utilitário
- **Radix UI** - Componentes acessíveis
- **Framer Motion** - Animações
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de schemas

### Backend

- **NestJS** - API RESTful
- **Prisma ORM** - ORM para PostgreSQL
- **NextAuth.js** - Autenticação
- **Stripe** - Processamento de pagamentos
- **UploadThing** - Upload de arquivos

### Banco de Dados

- **PostgreSQL** - Banco de dados relacional

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) para ver a aplicação.

## 🔧 Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```env
# Banco de Dados
DATABASE_URL="postgresql://user:password@localhost:5432/gold_informatica"

# Stripe (Pagamentos)
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLIC_KEY="pk_test_..."
STRIP_WEBHOOK_SECRET_KEY="whsec_..."

# NextAuth
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# UploadThing (Opcional)
UPLOADTHING_SECRET="sk_live_..."
UPLOADTHING_APP_ID="..."

# URL da aplicação
HOST_URL="http://localhost:3000"
```

## 📜 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia o servidor de desenvolvimento

# Produção
npm run build        # Gera o build de produção
npm run start        # Inicia o servidor de produção

# Qualidade de código
npm run lint         # Executa o ESLint

# Banco de dados
npx prisma studio    # Abre o Prisma Studio
npx prisma migrate dev  # Executa migrações
npx prisma db seed   # Executa o seed
```

## 🔌 API Routes

### Autenticação

- `POST /api/auth/login` - Login de usuário
- `POST /api/auth/register` - Registro de usuário
- `GET /api/auth/[...nextauth]` - NextAuth.js

### Produtos

- `GET /api/products` - Lista produtos
- `GET /api/products/[id]` - Produto específico
- `POST /api/products` - Criar produto (admin)
- `PUT /api/products/[id]` - Atualizar produto (admin)
- `DELETE /api/products/[id]` - Deletar produto (admin)

### Pedidos

- `POST /api/orders` - Criar pedido
- `GET /api/orders` - Listar pedidos do usuário
- `PUT /api/orders/[id]` - Atualizar status (admin)

### Pagamentos

- `POST /api/order/payment-success` - Webhook do Stripe
