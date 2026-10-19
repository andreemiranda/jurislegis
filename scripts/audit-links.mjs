import fs from 'fs';
import path from 'path';

async function auditLinks() {
  const apiUrl = process.env.WORDPRESS_API_URL || 'https://www.paraisodotocantins.to.leg.br/wp-json/wp/v2';
  console.log(`Iniciando auditoria de links em ${apiUrl}...`);

  const logsDir = path.join(process.cwd(), 'logs');
  fs.mkdirSync(logsDir, { recursive: true });

  const unresolved = [];
  try {
    const res = await fetch(`${apiUrl}/posts?per_page=20`, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
    });
    const posts = await res.json();

    for (const post of posts) {
      const content = post.content?.rendered || '';
      const matches = content.matchAll(/href="(https?:\/\/[^"]+)"/g);
      for (const m of matches) {
        const href = m[1];
        if (href.includes('paraisodotocantins.to.leg.br')) {
          // Check if link format is valid
          try {
            new URL(href);
          } catch {
            unresolved.push({ postId: post.id, title: post.title.rendered, url: href });
          }
        }
      }
    }

    const reportPath = path.join(logsDir, 'unresolved-links.json');
    fs.writeFileSync(reportPath, JSON.stringify(unresolved, null, 2));
    console.log(`Auditoria concluída. ${unresolved.length} links não resolvidos registrados em ${reportPath}`);
  } catch (err) {
    console.error('Erro na auditoria de links:', err.message);
  }
}

auditLinks();
