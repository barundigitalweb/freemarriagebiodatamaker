import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4c0519" />
      <stop offset="50%" stop-color="#881337" />
      <stop offset="100%" stop-color="#78350f" />
    </linearGradient>

    <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#fde68a" />
      <stop offset="50%" stop-color="#fbbf24" />
      <stop offset="100%" stop-color="#d97706" />
    </linearGradient>

    <radialGradient id="glow" cx="50%" cy="30%" r="60%">
      <stop offset="0%" stop-color="#fbbf24" stop-opacity="0.25" />
      <stop offset="100%" stop-color="#4c0519" stop-opacity="0" />
    </radialGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)" />
  <rect width="1200" height="630" fill="url(#glow)" />

  <!-- Ornamental Border -->
  <rect x="25" y="25" width="1150" height="580" rx="20" fill="none" stroke="url(#gold)" stroke-width="3" stroke-opacity="0.7" />
  <rect x="35" y="35" width="1130" height="560" rx="14" fill="none" stroke="url(#gold)" stroke-width="1" stroke-dasharray="6,4" stroke-opacity="0.4" />

  <!-- Corner Flourishes -->
  <circle cx="50" cy="50" r="8" fill="#fbbf24" opacity="0.8" />
  <circle cx="1150" cy="50" r="8" fill="#fbbf24" opacity="0.8" />
  <circle cx="50" cy="580" r="8" fill="#fbbf24" opacity="0.8" />
  <circle cx="1150" cy="580" r="8" fill="#fbbf24" opacity="0.8" />

  <!-- Brand Pill -->
  <g transform="translate(420, 75)">
    <rect width="360" height="46" rx="23" fill="#ffffff" fill-opacity="0.12" stroke="url(#gold)" stroke-width="1.5" />
    <text x="180" y="29" font-family="system-ui, sans-serif" font-size="16" font-weight="800" fill="#fde68a" text-anchor="middle" letter-spacing="2">
      💍 100% FREE • NO WATERMARK
    </text>
  </g>

  <!-- Main Brand Title -->
  <text x="600" y="210" font-family="Georgia, serif" font-size="52" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="1">
    FreeMarriage<tspan fill="#fcd34d">Biodata</tspan>Maker.com
  </text>

  <!-- Headline -->
  <text x="600" y="290" font-family="system-ui, sans-serif" font-size="34" font-weight="800" fill="#fef3c7" text-anchor="middle">
    Free Online Marriage Biodata Maker with Photo
  </text>

  <!-- Subtitle -->
  <text x="600" y="345" font-family="system-ui, sans-serif" font-size="22" font-weight="500" fill="#e2e8f0" text-anchor="middle">
    Bengali • Hindi • Marathi • Muslim Nikah • Traditional Royal Indian Formats
  </text>

  <text x="600" y="385" font-family="system-ui, sans-serif" font-size="20" font-weight="500" fill="#cbd5e1" text-anchor="middle">
    Instant Download in Print-Ready A4 PDF &amp; WhatsApp HD Image
  </text>

  <!-- Trust Feature Pills -->
  <g transform="translate(140, 445)">
    <!-- Pill 1 -->
    <g transform="translate(0, 0)">
      <rect width="280" height="70" rx="16" fill="#0f172a" fill-opacity="0.4" stroke="#fbbf24" stroke-width="1.5" />
      <text x="140" y="32" font-family="system-ui, sans-serif" font-size="16" font-weight="800" fill="#ffffff" text-anchor="middle">✓ Always Free</text>
      <text x="140" y="52" font-family="system-ui, sans-serif" font-size="13" font-weight="500" fill="#94a3b8" text-anchor="middle">No hidden ₹99/₹149 charges</text>
    </g>

    <!-- Pill 2 -->
    <g transform="translate(320, 0)">
      <rect width="280" height="70" rx="16" fill="#0f172a" fill-opacity="0.4" stroke="#fbbf24" stroke-width="1.5" />
      <text x="140" y="32" font-family="system-ui, sans-serif" font-size="16" font-weight="800" fill="#ffffff" text-anchor="middle">✓ Zero Watermark</text>
      <text x="140" y="52" font-family="system-ui, sans-serif" font-size="13" font-weight="500" fill="#94a3b8" text-anchor="middle">100% clean &amp; royal design</text>
    </g>

    <!-- Pill 3 -->
    <g transform="translate(640, 0)">
      <rect width="280" height="70" rx="16" fill="#0f172a" fill-opacity="0.4" stroke="#fbbf24" stroke-width="1.5" />
      <text x="140" y="32" font-family="system-ui, sans-serif" font-size="16" font-weight="800" fill="#ffffff" text-anchor="middle">✓ 100% On-Device Privacy</text>
      <text x="140" y="52" font-family="system-ui, sans-serif" font-size="13" font-weight="500" fill="#94a3b8" text-anchor="middle">Photos never hit any server</text>
    </g>
  </g>

  <!-- Bottom website URL banner -->
  <text x="600" y="570" font-family="system-ui, sans-serif" font-size="16" font-weight="700" fill="#fde68a" text-anchor="middle" letter-spacing="1">
    WWW.FREEMARRIAGEBIODATAMAKER.COM
  </text>
</svg>
`;

async function run() {
  const publicDir = path.resolve('public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const outputPath = path.join(publicDir, 'og-image.png');
  await sharp(Buffer.from(svg))
    .png({ quality: 95 })
    .toFile(outputPath);

  console.log('Generated og-image.png at:', outputPath);
}

run().catch(console.error);
