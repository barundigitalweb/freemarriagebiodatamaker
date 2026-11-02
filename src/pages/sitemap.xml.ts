import type { APIRoute } from 'astro';

const pages = [
  { url: '', priority: '1.0', changefreq: 'daily' },
  { url: 'bengali-marriage-biodata-maker', priority: '0.9', changefreq: 'weekly' },
  { url: 'marathi-marriage-biodata-maker', priority: '0.9', changefreq: 'weekly' },
  { url: 'hindu-marriage-biodata-format', priority: '0.9', changefreq: 'weekly' },
  { url: 'muslim-marriage-biodata-format', priority: '0.9', changefreq: 'weekly' },
  { url: 'biodata-format-for-marriage', priority: '0.8', changefreq: 'weekly' },
  { url: 'about', priority: '0.5', changefreq: 'monthly' },
  { url: 'privacy-policy', priority: '0.5', changefreq: 'monthly' },
  { url: 'terms', priority: '0.5', changefreq: 'monthly' },
  { url: 'disclaimer', priority: '0.5', changefreq: 'monthly' },
  { url: 'contact', priority: '0.5', changefreq: 'monthly' }
];

export const GET: APIRoute = async () => {
  const siteUrl = 'https://freemarriagebiodatamaker.com';
  const today = new Date().toISOString().split('T')[0];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `  <url>
    <loc>${page.url ? `${siteUrl}/${page.url}` : siteUrl}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600'
    }
  });
};
