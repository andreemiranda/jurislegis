import test from 'node:test';
import assert from 'node:assert/strict';
import { isDefaultWordPressCategory, getPostCategoryName } from './categories.ts';

test('isDefaultWordPressCategory identifies native WP default categories', () => {
  assert.equal(isDefaultWordPressCategory('Sem categoria'), true);
  assert.equal(isDefaultWordPressCategory('sem-categoria'), true);
  assert.equal(isDefaultWordPressCategory('Sem Categoria'), true);
  assert.equal(isDefaultWordPressCategory('sem nome'), true);
  assert.equal(isDefaultWordPressCategory('sem-nome'), true);
  assert.equal(isDefaultWordPressCategory('Uncategorized'), true);
  assert.equal(isDefaultWordPressCategory('uncategorized'), true);
  assert.equal(isDefaultWordPressCategory('padrão'), true);
  assert.equal(isDefaultWordPressCategory('padrao'), true);
  assert.equal(isDefaultWordPressCategory('geral'), true);
  assert.equal(isDefaultWordPressCategory(''), true);
  assert.equal(isDefaultWordPressCategory('   '), true);
  assert.equal(isDefaultWordPressCategory(null), true);
  assert.equal(isDefaultWordPressCategory(undefined), true);
});

test('isDefaultWordPressCategory preserves valid categories', () => {
  assert.equal(isDefaultWordPressCategory('Sessões Plenárias'), false);
  assert.equal(isDefaultWordPressCategory('Projetos de Lei'), false);
  assert.equal(isDefaultWordPressCategory('Notícias'), false);
  assert.equal(isDefaultWordPressCategory('Transparência'), false);
  assert.equal(isDefaultWordPressCategory('Saúde'), false);
});

test('getPostCategoryName returns null when post has Sem categoria', () => {
  const dummyPost = {
    _embedded: {
      'wp:term': [
        [
          { id: 1, name: 'Sem categoria', slug: 'sem-categoria', taxonomy: 'category' },
        ],
      ],
    },
  };
  assert.equal(getPostCategoryName(dummyPost), null);
});

test('getPostCategoryName returns null when post has ID 1 or uncategorized', () => {
  const dummyPost = {
    _embedded: {
      'wp:term': [
        [
          { id: 1, name: 'Uncategorized', slug: 'uncategorized', taxonomy: 'category' },
        ],
      ],
    },
  };
  assert.equal(getPostCategoryName(dummyPost), null);
});

test('getPostCategoryName returns null when terms array is empty or undefined', () => {
  assert.equal(getPostCategoryName({ _embedded: {} }), null);
  assert.equal(getPostCategoryName({}), null);
  assert.equal(getPostCategoryName(null), null);
  assert.equal(getPostCategoryName({ _embedded: { 'wp:term': [] } }), null);
});

test('getPostCategoryName returns valid category name when present', () => {
  const dummyPost = {
    _embedded: {
      'wp:term': [
        [
          { id: 12, name: 'Educação e Cultura', slug: 'educacao-e-cultura', taxonomy: 'category' },
        ],
      ],
    },
  };
  assert.equal(getPostCategoryName(dummyPost), 'Educação e Cultura');
});

test('getPostCategoryName skips default category and returns the real category if multiple exist', () => {
  const dummyPost = {
    _embedded: {
      'wp:term': [
        [
          { id: 1, name: 'Sem categoria', slug: 'sem-categoria', taxonomy: 'category' },
          { id: 15, name: 'Obras Públicas', slug: 'obras-publicas', taxonomy: 'category' },
        ],
      ],
    },
  };
  assert.equal(getPostCategoryName(dummyPost), 'Obras Públicas');
});
