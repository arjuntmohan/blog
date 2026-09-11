// Generates the pixel-art landscape used on the home page and in link previews.
// Run with: node scripts/generate-hero.mjs   (writes public/hero.png)
// Change SEED for a different arrangement of clouds, flowers, and buildings.
import sharp from 'sharp';

const W = 320;
const H = 170;
const SEED = 7;
const PAGE_BG = [245, 245, 242];

let s = SEED;
const rand = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 2 ** 32);

const px = new Uint8Array(W * H * 4);
const set = (x, y, [r, g, b], a = 255) => {
	if (x < 0 || y < 0 || x >= W || y >= H) return;
	const i = (y * W + x) * 4;
	px[i] = r;
	px[i + 1] = g;
	px[i + 2] = b;
	px[i + 3] = a;
};
const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const bayer = [
	[0, 8, 2, 10],
	[12, 4, 14, 6],
	[3, 11, 1, 9],
	[15, 7, 13, 5],
].map((row) => row.map((v) => (v + 0.5) / 16));

// Pick between two colors with ordered dithering, which gives the banded retro look.
const dither = (x, y, t, a, b) => (t > bayer[y % 4][x % 4] ? b : a);

// Sky: bands from deep blue to pale horizon.
const sky = ['#4a86d4', '#5b97de', '#6ea8e6', '#86baee', '#a3cdf3', '#c2def6'].map(hex);
const horizon = 110;
for (let y = 0; y < horizon; y++) {
	const f = (y / horizon) * (sky.length - 1);
	const i = Math.min(Math.floor(f), sky.length - 2);
	for (let x = 0; x < W; x++) set(x, y, dither(x, y, f - i, sky[i], sky[i + 1]));
}

// Sun glow in the upper right.
const sun = { x: 186, y: 26 };
for (let y = 0; y < 60; y++)
	for (let x = 150; x < 230; x++) {
		const d = Math.hypot(x - sun.x, (y - sun.y) * 1.1);
		if (d < 7) set(x, y, hex('#fff6d8'));
		else if (d < 10) set(x, y, dither(x, y, (10 - d) / 3, hex('#cfe6fa'), hex('#fff1c9')));
	}

// Clouds: clusters of overlapping circles with a shaded underside.
const cloud = (cx, cy, size) => {
	const puffs = Array.from({ length: 5 + Math.floor(rand() * 4) }, () => ({
		x: cx + (rand() - 0.5) * size * 3.2,
		y: cy + (rand() - 0.5) * size * 0.8,
		r: size * (0.55 + rand() * 0.6),
	}));
	for (let y = Math.floor(cy - size * 2); y < cy + size * 2; y++)
		for (let x = Math.floor(cx - size * 4); x < cx + size * 4; x++) {
			const inside = puffs.some((p) => Math.hypot(x - p.x, (y - p.y) * 1.25) < p.r);
			if (!inside) continue;
			const shade = (y - (cy - size)) / (size * 2.2);
			set(x, y, dither(x, y, shade, hex('#ffffff'), hex('#dcebf8')));
		}
};
cloud(34, 104, 5);
cloud(160, 90, 6);
cloud(214, 38, 6);
cloud(304, 92, 7);

// Distant city skyline on the horizon.
let bx = 96;
while (bx < 250) {
	const w = 4 + Math.floor(rand() * 7);
	const h = 6 + Math.floor(rand() * 16);
	for (let y = horizon - h; y < horizon + 4; y++)
		for (let x = bx; x < bx + w; x++) {
			const lit = (x - bx) % 2 === 1 && (y - (horizon - h)) % 3 === 1 && rand() < 0.35;
			set(x, y, lit ? hex('#d9e8f3') : x === bx ? hex('#9fb9cf') : hex('#afc7da'));
		}
	bx += w + Math.floor(rand() * 3);
}

// Rolling hills, far to near, with speckled texture.
const hill = (base, amp, freq, phase, a, b) => {
	for (let x = 0; x < W; x++) {
		const top = Math.round(base + Math.sin(x * freq + phase) * amp + Math.sin(x * freq * 2.7 + phase) * amp * 0.35);
		for (let y = top; y < H; y++) {
			const t = rand() < 0.12 ? 1 : (y - top) / 40;
			set(x, y, dither(x, y, t, a, b));
		}
	}
};
hill(104, 4, 0.03, 1.2, hex('#8cc37a'), hex('#79b567'));
hill(118, 5, 0.022, 3.4, hex('#6daa57'), hex('#5c9a48'));
hill(130, 3, 0.035, 0.4, hex('#5a9b45'), hex('#4a883a'));

// Tree on the right: a tapered trunk with branches, and a canopy with highlights and a dark outline.
const trunk = { x: 268, top: 68, bottom: 146 };
for (let y = trunk.top; y < trunk.bottom; y++) {
	const half = 4 + Math.floor((y - trunk.top) / 16) + (y > trunk.bottom - 5 ? trunk.bottom - 5 - y + 3 : 0);
	for (let x = trunk.x - half; x <= trunk.x + half; x++) {
		const edge = x < trunk.x - half + 2 ? '#553a28' : x > trunk.x + half - 2 ? '#8d6849' : '#72523a';
		set(x, y, rand() < 0.08 ? hex('#5f4430') : hex(edge));
	}
}
for (const [dx, len] of [[-1, 22], [1, 18]])
	for (let i = 0; i < len; i++) for (let t = 0; t < 3; t++) set(trunk.x + dx * (i + 3), trunk.top + 22 - Math.floor(i * 0.8) + t, hex('#6a4c36'));

const leaves = Array.from({ length: 22 }, () => ({
	x: trunk.x + (rand() - 0.5) * 80,
	y: 38 + rand() * 46,
	r: 9 + rand() * 11,
}));
const inLeaf = (x, y) => leaves.find((p) => Math.hypot(x - p.x, y - p.y) < p.r);
for (let y = 0; y < 112; y++)
	for (let x = 196; x < W; x++) {
		const l = inLeaf(x, y);
		if (!l) continue;
		const outline = !inLeaf(x, y + 2) || !inLeaf(x - 2, y) || !inLeaf(x + 2, y);
		const t = (y - l.y + l.r) / (l.r * 2) + (x - l.x) / (l.r * 6) + (rand() - 0.5) * 0.35;
		let c = t < 0.3 ? '#6fb055' : t < 0.55 ? '#529a41' : t < 0.8 ? '#3f8235' : '#2f6a2a';
		if (outline && t > 0.4) c = '#285d26';
		if (rand() < 0.04 && t < 0.5) c = '#8cc76b';
		set(x, y, hex(c));
	}

// Flowers scattered in the foreground grass.
const flowers = ['#f4d35e', '#ffffff', '#ee8f9c', '#f6a86b'].map(hex);
for (let n = 0; n < 70; n++) {
	const x = Math.floor(rand() * W);
	const y = 136 + Math.floor(rand() * 24);
	set(x, y, flowers[Math.floor(rand() * flowers.length)]);
	set(x, y + 1, hex('#3d7a31'));
}

// Dissolve the bottom edge into the page background, pixel by pixel.
for (let y = H - 14; y < H; y++) {
	const t = (y - (H - 14)) / 14;
	for (let x = 0; x < W; x++) if (rand() < t * t * 1.4) set(x, y, PAGE_BG);
}

await sharp(Buffer.from(px), { raw: { width: W, height: H, channels: 4 } })
	.png()
	.toFile('public/hero.png');
console.log(`Wrote public/hero.png (${W}×${H})`);
