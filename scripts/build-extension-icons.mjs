import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { Resvg } from '@resvg/resvg-js';
const destination = process.argv[2];
if (!destination) throw new Error('Provide an output directory for extension icons.');
const svg = readFileSync(new URL('../extension/assets/icon.svg', import.meta.url), 'utf8');
mkdirSync(destination, { recursive: true });
for (const size of [16, 32, 48, 128]) {
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: size }, font: { loadSystemFonts: false } }).render().asPng();
  writeFileSync(path.join(destination, `${size}.png`), png);
}
