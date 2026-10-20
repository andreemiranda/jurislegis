/**
 * Utilitários para detecção e higienização de categorias WordPress.
 * Remove nomes vazios, nulos ou a categoria padrão nativa do WordPress ("Sem categoria" / "Uncategorized" / ID 1).
 */

export interface PostTerm {
  id?: number;
  name?: string;
  slug?: string;
  taxonomy?: string;
}

export interface PostWithCategoryData {
  id?: number;
  categories?: number[];
  _embedded?: {
    'wp:term'?: PostTerm[][];
  };
}

/**
 * Verifica se um nome, slug ou identificador corresponde à categoria padrão nativa/sem nome do WordPress
 */
export function isDefaultWordPressCategory(nameOrSlug?: string | null, id?: number | null): boolean {
  // Se for ID 1 nativo do WordPress (Uncategorized / Sem Categoria) sem outro dado
  if (id === 1 && (!nameOrSlug || nameOrSlug.trim() === '')) {
    return true;
  }

  if (!nameOrSlug) return true;

  const normalized = nameOrSlug
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, ''); // remove acentos

  return (
    normalized === '' ||
    normalized === 'sem categoria' ||
    normalized === 'sem-categoria' ||
    normalized === 'sem nome' ||
    normalized === 'sem-nome' ||
    normalized === 'uncategorized' ||
    normalized === 'padrao' ||
    normalized === 'geral' ||
    normalized === 'nao categorizado'
  );
}

/**
 * Retorna o nome da categoria válida do post, ou null se não pertencer a nenhuma
 * categoria ou se pertencer à categoria nativa sem nome/sem categoria do WordPress.
 */
export function getPostCategoryName(post: PostWithCategoryData | null | undefined): string | null {
  if (!post) return null;

  // 1. Tenta recuperar termos embutidos do WordPress REST API (_embed)
  const termGroups = post._embedded?.['wp:term'];
  if (Array.isArray(termGroups) && termGroups.length > 0) {
    // Procura no primeiro grupo de termos (que normalmente é 'category') ou em qualquer grupo com taxonomy === 'category'
    const categoryTerms =
      termGroups.find((group) => group.some((t) => t?.taxonomy === 'category')) ||
      termGroups[0];

    if (Array.isArray(categoryTerms)) {
      for (const term of categoryTerms) {
        if (!term) continue;
        const isDefault =
          (term.id === 1 && isDefaultWordPressCategory(term.name, term.id)) ||
          isDefaultWordPressCategory(term.name) ||
          isDefaultWordPressCategory(term.slug);

        if (!isDefault && term.name && term.name.trim() !== '') {
          return term.name.trim();
        }
      }
    }
  }

  // 2. Se não encontrou nenhuma categoria válida, ou pertencer apenas à categoria nativa padrão
  return null;
}
