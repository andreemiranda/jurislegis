# Guia de Deploy e Produção

Este documento orienta a compilação, implantação e operação em produção do portal da Câmara Municipal de Paraíso do Tocantins.

## 1. Requisitos de Sistema

- Node.js versão 20 LTS ou superior
- NPM 10+ ou Yarn / PNPM

## 2. Instalação e Compilação

```bash
# 1. Instalar dependências
npm install

# 2. Executar testes de unidade de lógica
npm test

# 3. Compilar para produção
npm run build

# 4. Iniciar servidor de produção
npm start
```

## 3. Webhook de Revalidação Instantânea (ISR)

Para que o site reflita imediatamente uma nova matéria ou alteração publicada no WordPress sem aguardar a expiração do cache periódico (300 segundos):

- Configure no WordPress um webhook disparado em eventos de publicação (`publish_post`, `save_post`, etc.).
- Endpoint: `POST https://seu-site.com/api/revalidate`
- Cabeçalho ou Query Parameter: `?secret=SEU_REVALIDATE_SECRET` ou `x-revalidate-secret: SEU_REVALIDATE_SECRET`
- Payload opcional:
  ```json
  {
    "tag": "posts"
  }
  ```
  ou
  ```json
  {
    "path": "/nova-noticia/"
  }
  ```

## 4. Deploy em Docker

O projeto inclui suporte ao modo `standalone` do Next.js configurado no `next.config.ts`. Para construir a imagem de container:

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
EXPOSE 3000
CMD ["node", "server.js"]
```
