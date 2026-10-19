import test from 'node:test';
import assert from 'node:assert/strict';
import { sanitizeContentHtml } from './sanitize.ts';

test('sanitizeContentHtml preserves WordPress block classes and styles', () => {
  const input = `<div class="wp-block-columns is-style-default" style="gap: 20px"><p class="has-primary-color">Texto</p></div>`;
  const output = sanitizeContentHtml(input);
  assert.match(output, /wp-block-columns/);
  assert.match(output, /is-style-default/);
  assert.match(output, /has-primary-color/);
});

test('sanitizeContentHtml strips dangerous script tags and event handlers', () => {
  const input = `<div><p>Olá</p><script>alert("hack")</script><img src="x" onerror="alert(1)" /></div>`;
  const output = sanitizeContentHtml(input);
  assert.equal(output.includes('<script>'), false);
  assert.equal(output.includes('onerror'), false);
});

test('sanitizeContentHtml allows safe YouTube embeds', () => {
  const input = `<iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" width="560" height="315" allowfullscreen></iframe>`;
  const output = sanitizeContentHtml(input);
  assert.match(output, /<iframe/);
  assert.match(output, /src="https:\/\/www\.youtube\.com\/embed\/dQw4w9WgXcQ"/);
});
