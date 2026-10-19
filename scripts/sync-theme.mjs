import fs from 'fs';
import path from 'path';

const files = [
  { name: 'accessibility.css', url: 'https://www.paraisodotocantins.to.leg.br/wp-content/themes/araguaia/bundle/blocks/accessibility/style-index.css' },
  { name: 'search.css', url: 'https://www.paraisodotocantins.to.leg.br/wp-content/themes/araguaia/bundle/blocks/search/style-index.css' },
  { name: 'menu-access-info.css', url: 'https://www.paraisodotocantins.to.leg.br/wp-content/themes/araguaia/bundle/blocks/menu-access-information-2/style-index.css' },
  { name: 'mobile-menu.css', url: 'https://www.paraisodotocantins.to.leg.br/wp-content/themes/araguaia/bundle/blocks/mobile-menu/style-index.css' },
  { name: 'navigation.css', url: 'https://www.paraisodotocantins.to.leg.br/wp-content/themes/araguaia/bundle/blocks/core-navigation/style-index.css' },
  { name: 'banner.css', url: 'https://www.paraisodotocantins.to.leg.br/wp-content/themes/araguaia/bundle/blocks/banner/style-index.css' },
  { name: 'quick-access.css', url: 'https://www.paraisodotocantins.to.leg.br/wp-content/themes/araguaia/bundle/blocks/quick-access/style-index.css' },
  { name: 'last-posts.css', url: 'https://www.paraisodotocantins.to.leg.br/wp-content/themes/araguaia/bundle/blocks/last-posts/style-index.css' },
  { name: 'vereadores.css', url: 'https://www.paraisodotocantins.to.leg.br/wp-content/themes/araguaia/bundle/blocks/vereadores/style-index.css' },
  { name: 'video-session.css', url: 'https://www.paraisodotocantins.to.leg.br/wp-content/themes/araguaia/bundle/blocks/video-session/style-index.css' },
  { name: 'about-city.css', url: 'https://www.paraisodotocantins.to.leg.br/wp-content/themes/araguaia/bundle/blocks/about-city/style-index.css' },
  { name: 'wp-blocks.css', url: 'https://www.paraisodotocantins.to.leg.br/wp-includes/css/dist/block-library/style.min.css' },
];

async function syncTheme() {
  const dir = path.join(process.cwd(), 'src/styles/theme');
  fs.mkdirSync(dir, { recursive: true });

  console.log('Sincronizando arquivos CSS do tema Araguaia...');
  for (const item of files) {
    try {
      const res = await fetch(item.url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      if (res.ok) {
        const text = await res.text();
        fs.writeFileSync(path.join(dir, item.name), text);
        console.log(`✓ ${item.name} (${(text.length / 1024).toFixed(1)} KB)`);
      } else {
        console.warn(`✗ Falha ao baixar ${item.name}: ${res.status}`);
      }
    } catch (err) {
      console.error(`✗ Erro em ${item.name}:`, err.message);
    }
  }
  console.log('Sincronização concluída com sucesso.');
}

syncTheme();
