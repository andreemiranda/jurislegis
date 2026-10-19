import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizePath, resolveRoute } from './route-map.ts';

test('normalizePath cleans slashes and extracts pathname', () => {
  assert.equal(normalizePath('https://www.paraisodotocantins.to.leg.br/historia/'), '/historia');
  assert.equal(normalizePath('/sobre-a-camara/'), '/sobre-a-camara');
  assert.equal(normalizePath(''), '/');
});

test('resolveRoute detects home page', () => {
  const result = resolveRoute([]);
  assert.equal(result.type, 'home');
  assert.equal(result.fullPath, '/');
});

test('resolveRoute detects paginated home', () => {
  const result = resolveRoute(['page', '2']);
  assert.equal(result.type, 'home');
  assert.equal(result.pageNumber, 2);
});

test('resolveRoute detects vereador route', () => {
  const result = resolveRoute(['vereador', 'joao-gomes-camargo']);
  assert.equal(result.type, 'vereador');
  assert.equal(result.slug, 'joao-gomes-camargo');
});

test('resolveRoute detects category route with pagination', () => {
  const result = resolveRoute(['categoria', 'noticias', 'page', '3']);
  assert.equal(result.type, 'category');
  assert.equal(result.slug, 'noticias');
  assert.equal(result.pageNumber, 3);
});

test('resolveRoute resolves standard page or post slug', () => {
  const result = resolveRoute(['estrutura-organizacional']);
  assert.equal(result.slug, 'estrutura-organizacional');
});
