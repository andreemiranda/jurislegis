import fs from 'fs';
import path from 'path';

async function auditRoutes() {
  const apiUrl = process.env.WORDPRESS_API_URL || 'https://www.paraisodotocantins.to.leg.br/wp-json/wp/v2';
  console.log(`Auditando rotas a partir de ${apiUrl}...`);

  try {
    const [pagesRes, postsRes, catRes] = await Promise.all([
      fetch(`${apiUrl}/pages?per_page=50`, { headers: { 'User-Agent': 'Mozilla/5.0' } }),
      fetch(`${apiUrl}/posts?per_page=50`, { headers: { 'User-Agent': 'Mozilla/5.0' } }),
      fetch(`${apiUrl}/categories?per_page=50`, { headers: { 'User-Agent': 'Mozilla/5.0' } }),
    ]);

    const pages = await pagesRes.json();
    const posts = await postsRes.json();
    const categories = await catRes.json();

    const routes = [
      { type: 'home', path: '/' },
      ...pages.map((p) => ({ type: 'page', id: p.id, slug: p.slug, link: p.link })),
      ...posts.map((p) => ({ type: 'post', id: p.id, slug: p.slug, link: p.link })),
      ...categories.map((c) => ({ type: 'category', id: c.id, slug: c.slug, link: c.link })),
    ];

    console.log(`Total de rotas mapeadas na amostra: ${routes.length}`);
    const logsDir = path.join(process.cwd(), 'logs');
    fs.mkdirSync(logsDir, { recursive: true });
    fs.writeFileSync(path.join(logsDir, 'routes-audit.json'), JSON.stringify(routes, null, 2));
    console.log(`Relatório salvo em logs/routes-audit.json`);
  } catch (err) {
    console.error('Erro ao auditar rotas:', err.message);
  }
}

auditRoutes();
