import test from 'node:test';
import assert from 'node:assert/strict';
import { rewriteUrl, rewriteHtmlLinks } from './rewrite.ts';

test('rewriteUrl converts WP host to internal relative route', () => {
  const result = rewriteUrl('https://www.paraisodotocantins.to.leg.br/historia/');
  assert.equal(result.isInternal, true);
  assert.equal(result.isMedia, false);
  assert.equal(result.url, '/historia/');
});

test('rewriteUrl converts wp-content/uploads to /arquivos/ path', () => {
  const result = rewriteUrl('https://www.paraisodotocantins.to.leg.br/wp-content/uploads/2024/05/logo-paraios.png');
  assert.equal(result.isInternal, true);
  assert.equal(result.isMedia, true);
  assert.equal(result.url, '/arquivos/2024/05/logo-paraios.png');
});

test('rewriteUrl preserves external URLs', () => {
  const result = rewriteUrl('https://acessoainformacao.paraisodotocantins.to.leg.br/cidadao/transparencia');
  assert.equal(result.isInternal, false);
  assert.equal(result.url, 'https://acessoainformacao.paraisodotocantins.to.leg.br/cidadao/transparencia');
});

test('rewriteUrl preserves anchor links, tel and mailto', () => {
  assert.equal(rewriteUrl('#topo').url, '#topo');
  assert.equal(rewriteUrl('tel:6336021688').url, 'tel:6336021688');
  assert.equal(rewriteUrl('mailto:contato@exemplo.com').url, 'mailto:contato@exemplo.com');
});

test('rewriteHtmlLinks replaces WP links and uploads in HTML string', () => {
  const html = `
    <div>
      <a href="https://www.paraisodotocantins.to.leg.br/noticia-1/">Notícia 1</a>
      <img src="https://www.paraisodotocantins.to.leg.br/wp-content/uploads/2024/01/foto.jpg" />
      <a href="https://google.com">Google</a>
    </div>
  `;
  const rewritten = rewriteHtmlLinks(html);
  assert.match(rewritten, /href="\/noticia-1\/"/);
  assert.match(rewritten, /src="\/arquivos\/2024\/01\/foto.jpg"/);
  assert.match(rewritten, /target="_blank"/);
  assert.match(rewritten, /rel="noopener noreferrer"/);
});
