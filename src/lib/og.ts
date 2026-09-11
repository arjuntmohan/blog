import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';
import { SITE } from '../consts';

// Builds the 1200×630 preview card that LinkedIn, iMessage, Slack, etc. show when a link is shared:
// the pixel-art landscape from the home page with the title on the sky.

const escape = (s: string) =>
	s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function wrap(text: string, maxChars: number, maxLines: number): string[] {
	const lines: string[] = [];
	let line = '';
	for (const word of text.split(/\s+/)) {
		if (line && (line + ' ' + word).length > maxChars) {
			lines.push(line);
			line = word;
		} else {
			line = line ? `${line} ${word}` : word;
		}
	}
	if (line) lines.push(line);
	if (lines.length > maxLines) {
		lines.length = maxLines;
		lines[maxLines - 1] = lines[maxLines - 1].replace(/\s*\S*$/, '') + '…';
	}
	return lines;
}

let background: Promise<Buffer> | undefined;

// Scale the art up with hard pixel edges, leaving out the dissolved bottom rows.
function landscape(): Promise<Buffer> {
	background ??= (async () => {
		const art = readFileSync(join(process.cwd(), 'public', 'hero.png'));
		const { width = 320, height = 150 } = await sharp(art).metadata();
		const scaled = await sharp(art)
			.extract({ left: 0, top: 0, width, height: height - 16 })
			.resize({ height: 630, kernel: 'nearest' })
			.toBuffer({ resolveWithObject: true });
		const left = Math.round((scaled.info.width - 1200) * 0.35);
		return sharp(scaled.data).extract({ left, top: 0, width: 1200, height: 630 }).png().toBuffer();
	})();
	return background;
}

export async function renderCard(title: string, kicker: string): Promise<Buffer> {
	const size = title.length > 55 ? 54 : 64;
	const lines = wrap(title, size === 64 ? 24 : 30, 3);
	const lineHeight = size * 1.15;
	const sans = `Geist, 'Helvetica Neue', Helvetica, 'DejaVu Sans', Arial, sans-serif`;
	const mono = `'Geist Mono', Menlo, 'DejaVu Sans Mono', monospace`;
	const serif = `'Instrument Serif', Georgia, 'DejaVu Serif', serif`;
	const domain = new URL(import.meta.env.SITE).host;

	const overlay = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
	<defs>
		<linearGradient id="shade" x1="0" y1="0" x2="0" y2="1">
			<stop offset="0" stop-color="#14326e" stop-opacity="0.45"/>
			<stop offset="0.6" stop-color="#14326e" stop-opacity="0"/>
		</linearGradient>
		<linearGradient id="foot" x1="0" y1="0" x2="0" y2="1">
			<stop offset="0" stop-color="#0f2410" stop-opacity="0"/>
			<stop offset="1" stop-color="#0f2410" stop-opacity="0.45"/>
		</linearGradient>
	</defs>
	<rect width="1200" height="630" fill="url(#shade)"/>
	<rect y="430" width="1200" height="200" fill="url(#foot)"/>
	<text x="72" y="96" font-family="${mono}" font-size="22" letter-spacing="3" fill="#ffffff" fill-opacity="0.85">${escape(kicker.toUpperCase())}</text>
	${lines
		.map(
			(l, i) =>
				`<text x="72" y="${178 + i * lineHeight}" font-family="${sans}" font-size="${size}" font-weight="500" letter-spacing="-1" fill="#ffffff">${escape(l)}</text>`,
		)
		.join('\n\t')}
	<text x="72" y="578" font-family="${serif}" font-size="40" fill="#ffffff">${escape(SITE.title)}</text>
	<text x="1128" y="576" text-anchor="end" font-family="${mono}" font-size="20" fill="#ffffff" fill-opacity="0.9">${escape(domain)}</text>
</svg>`;

	return sharp(await landscape())
		.composite([{ input: Buffer.from(overlay) }])
		.png()
		.toBuffer();
}
