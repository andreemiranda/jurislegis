# Regras de Reescrita de Links e Privacidade

O módulo `src/lib/links/rewrite.ts` é responsável por processar todas as URLs presentes no conteúdo retornado pelo WordPress para garantir que o domínio upstream nunca fique exposto e que a navegação do usuário seja rápida e consistente.

## 1. Links Internos

Qualquer link apontando para o domínio do WordPress (com ou sem `www`, `http` ou `https`) é convertido em caminho relativo interno:

- Exemplo de entrada: `https://www.paraisodotocantins.to.leg.br/historia/`
- Exemplo de saída: `/historia/`

Isso permite que o Next.js utilize o componente `<Link>` com pré-carregamento instantâneo via Client-Side Routing sem recarregar a página inteira.

## 2. Arquivos de Mídia e Uploads (`/arquivos/...`)

Arquivos no caminho `/wp-content/uploads/` são roteados internamente:

- Exemplo de entrada: `https://www.paraisodotocantins.to.leg.br/wp-content/uploads/2024/05/logo-paraios.png`
- Exemplo de saída: `/arquivos/2024/05/logo-paraios.png`

Essa rota é processada pelo Next.js (`next.config.ts` rewrite e `app/arquivos/[...path]/route.ts`), servindo o binário com cabeçalhos de cache otimizados (`Cache-Control: public, max-age=604800`) e sem vazar a infraestrutura original.

## 3. Links Externos Preexistentes

Links apontando para portais externos legítimos (Portal da Transparência `acessoainformacao.*`, redes sociais, diários oficiais estaduais, órgãos federais) são preservados como links externos e recebem os atributos de segurança:

- `target="_blank"`
- `rel="noopener noreferrer"`

## 4. Âncoras e Protocolos Especiais

- Âncoras `#topo`, links `mailto:` e `tel:` permanecem inalterados.
- Links `javascript:` são sanitizados por motivos de segurança.

## 5. Auditoria de Links (`npm run audit:links`)

Para auditar e inspecionar links no banco de conteúdo:

```bash
npm run audit:links
```

O relatório é gerado em `/logs/unresolved-links.json`.
