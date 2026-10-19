# Portal institucional e legislativo de Câmara Municipal

Réplica institucional do portal legislativo, desenvolvida em Next.js (App Router), TypeScript, e integrada de forma desacoplada à API REST do WordPress.

## Tecnologias

- **Framework:** Next.js 15+ (App Router, Server Components & ISR)
- **Linguagem:** TypeScript (Strict mode)
- **Estilização:** CSS Global + Tema Araguaia (FSE Blocks) + Tailwind CSS
- **Sanitização & Parser:** `sanitize-html`, `html-react-parser`
- **Validação de Dados:** `zod`
- **Acessibilidade:** WCAG 2.1 AA / eMAG (Painel lateral, alto contraste, controle de fonte, skip links)
- **SEO:** Metadados dinâmicos, OpenGraph, Twitter Cards, Schema.org JSON-LD, Sitemap XML e RSS 2.0 Feed

## Como Executar

```bash
# Instalação das dependências
npm install

# Execução em desenvolvimento
npm run dev

# Execução dos testes automatizados de lógica
npm test

# Build de produção
npm run build

# Iniciar servidor em produção
npm start
```

## Scripts Utilitários

- `npm run test`: Executa os testes de unidade via `node:test`.
- `npm run sync:theme`: Sincroniza folhas de estilo e tokens de tema a partir do portal de origem.
- `npm run audit:links`: Executa auditoria de links no conteúdo e gera relatório em `logs/unresolved-links.json`.
- `npm run audit:routes`: Mapeia e valida as rotas geradas contra a API.

## Documentação Detalhada

- [`docs/IMPORTACAO.md`](docs/IMPORTACAO.md): Endpoints da API, paginação e controle de concorrência.
- [`docs/CONFIGURACAO.md`](docs/CONFIGURACAO.md): Variáveis de ambiente e instruções para troca de endpoint.
- [`docs/LINKS.md`](docs/LINKS.md): Regras de reescrita de links e proxy de uploads.
- [`docs/DEPLOY.md`](docs/DEPLOY.md): Compilação, ISR, webhooks e containerização.
