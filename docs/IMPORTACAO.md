# Fluxo de Importação e Camada de Dados WordPress Headless

Este documento detalha a arquitetura da camada de dados (`src/lib/wordpress/`), que alimenta o portal da Câmara Municipal de Paraíso do Tocantins a partir da REST API pública do WordPress.

## 1. Endpoints Utilizados

A aplicação consome a API REST oficial em `https://www.paraisodotocantins.to.leg.br/wp-json/wp/v2/`:

- `GET /wp-json`: Descoberta do site (nome, descrição, fuso horário, namespaces suportados).
- `GET /posts`: Listagem paginada de matérias e notícias institucionais com suporte aos parâmetros `_embed=1`, `page`, `per_page`, `categories`, `tags`, `search`.
- `GET /pages`: Páginas institucionais hierárquicas (História, Estrutura Organizacional, Mesa Diretora, Símbolos).
- `GET /categories` e `GET /tags`: Taxonomias oficiais do portal.
- `GET /vereador`: Custom Post Type (CPT) com os parlamentares municipais eleitos.
- `GET /videos`: Sessões plenárias e transmissões gravadas da TV Câmara.
- `GET /banner`: Banners de destaque rotativos da página inicial.
- `GET /search`: Busca nativa indexada do WordPress.

## 2. Resiliência e Concorrência

Para respeitar as diretrizes do `robots.txt` original (`Crawl-Delay: 5`) e garantir alta disponibilidade sem sobrecarregar o servidor upstream:

- **Fila de concorrência controlada:** O módulo `client.ts` implementa uma fila em memória que limita as requisições simultâneas ao valor de `WP_MAX_CONCURRENCY` (padrão: 2).
- **Taxa de requisição com delay:** Implementa delay configurável por `WP_REQUEST_DELAY_MS`.
- **Tratamento de 429 e 5xx:** Em caso de HTTP 429 (Too Many Requests), respeita o cabeçalho `Retry-After` antes de prosseguir. Para erros 5xx, executa retry com backoff exponencial (até 3 tentativas).
- **Timeout seguro:** Cada requisição possui timeout configurado via `AbortController` (15 segundos).

## 3. Paginação Completa (`fetchAll`)

O helper `src/lib/wordpress/paginate.ts` lê os cabeçalhos de resposta HTTP expostos pela API:
- `X-WP-Total`: Total de registros encontrados.
- `X-WP-TotalPages`: Total de páginas disponíveis.

Ele percorre sequencialmente as páginas até atingir o total ou o limite estipulado, agregando todos os registros de forma determinística.

## 4. Estratégia de Cache e ISR

- **Incremental Static Regeneration (ISR):** As rotas são revalidadas em segundo plano a cada `REVALIDATE_SECONDS` (padrão: 300 segundos = 5 minutos).
- **Cache por Tags:** As requisições utilizam tags granulares do Next.js (`posts`, `pages`, `post:{slug}`, `vereadores`, `terms`).
- **Revalidação Sob Demanda:** Webhooks do WordPress podem invalidar o cache instantaneamente através do endpoint `/api/revalidate`.
