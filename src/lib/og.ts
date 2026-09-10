import sharp from 'sharp';
import { SITE } from '../consts';

// Builds the 1200×630 preview card that LinkedIn, iMessage, Slack, etc. show when a link is shared.

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

export async function renderCard(title: string, kicker: string): Promise<Buffer> {
	const size = title.length > 60 ? 58 : 68;
	const lines = wrap(title, size === 68 ? 26 : 32, 4);
	const lineHeight = size * 1.18;
	const top = 315 - ((lines.length - 1) * lineHeight) / 2 + size * 0.1;
	const serif = `Newsreader, Georgia, 'DejaVu Serif', 'Liberation Serif', serif`;
	const sans = `'Helvetica Neue', Helvetica, 'DejaVu Sans', Arial, sans-serif`;

	const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
	<rect width="1200" height="630" fill="#faf8f4"/>
	<rect x="0" y="0" width="14" height="630" fill="#b3441e"/>
	<text x="90" y="110" font-family="${sans}" font-size="24" font-weight="600" letter-spacing="3" fill="#b3441e">${escape(kicker.toUpperCase())}</text>
	${lines
		.map(
			(l, i) =>
				`<text x="90" y="${top + i * lineHeight}" font-family="${serif}" font-size="${size}" font-weight="500" fill="#1f1d1a">${escape(l)}</text>`,
		)
		.join('\n\t')}
	<line x1="90" y1="520" x2="1110" y2="520" stroke="#e4ded2" stroke-width="2"/>
	<text x="90" y="570" font-family="${serif}" font-size="30" font-weight="600" fill="#1f1d1a">${escape(SITE.title)}</text>
	<text x="1110" y="570" text-anchor="end" font-family="${sans}" font-size="22" fill="#6d685f">${escape(new URL(import.meta.env.SITE).host)}</text>
</svg>`;

	return sharp(Buffer.from(svg)).png().toBuffer();
}
