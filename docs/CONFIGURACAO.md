# Guia de Configuração e Variáveis de Ambiente

O projeto foi construído para operar de maneira desacoplada e flexível. **Nenhum endpoint, domínio ou cor de marca é hard-coded no código fonte.**

## 1. Variáveis de Ambiente

| Variável | Descrição | Padrão |
| :--- | :--- | :--- |
| `WORDPRESS_API_URL` | URL base da API REST do WordPress | `https://www.paraisodotocantins.to.leg.br/wp-json/wp/v2` |
| `SITE_URL` | URL pública canônica do novo portal | `http://localhost:3000` |
| `REVALIDATE_SECONDS` | Intervalo em segundos do ISR | `300` |
| `REVALIDATE_SECRET` | Token secreto para webhook de revalidação | `camara-paraiso-revalidate-secret-token` |
| `WP_API_USER` | Usuário para Application Passwords (opcional) | `""` |
| `WP_API_APP_PASSWORD` | Senha de aplicativo do WordPress (opcional) | `""` |
| `WP_REQUEST_DELAY_MS` | Intervalo em milissegundos entre requisições | `5000` |
| `WP_MAX_CONCURRENCY` | Limite de requisições paralelas à API | `2` |
| `NEXT_PUBLIC_GA_ID` | ID do Google Analytics (opcional) | `""` |

## 2. Como Trocar o Endpoint da API Sem Alterar Código

Para apontar o portal para outro domínio do WordPress ou ambiente de homologação:

1. Atualize a variável no `.env.local` ou nas variáveis de ambiente da hospedagem:
   ```env
   WORDPRESS_API_URL="https://novo-dominio.leg.br/wp-json/wp/v2"
   SITE_URL="https://novo-portal.leg.br"
   ```
2. O sistema automaticamente:
   - Extrai o novo `wpOrigin` e `wpHost`.
   - Adiciona o novo host nos `images.remotePatterns` do `next.config.ts`.
   - Adapta as regras do reescritor de links (`src/lib/links/rewrite.ts`).
   - Redireciona a rota de mídia `/arquivos/...` para a nova origem.
   - Atualiza a busca do `sitemap.xml`, `robots.txt` e `/feed`.

## 3. Sincronização do Tema Visual (`sync:theme`)

Para atualizar os arquivos CSS e variáveis de estilo do tema Araguaia diretamente da fonte:

```bash
npm run sync:theme
```

O script baixa e atualiza todos os blocos do tema em `src/styles/theme/`.
