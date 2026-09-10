// Creates a new draft post:  npm run new -- "My Post Title"
import { existsSync, writeFileSync } from 'node:fs';

const title = process.argv.slice(2).join(' ').trim();
if (!title) {
	console.error('Give your post a title:  npm run new -- "My Post Title"');
	process.exit(1);
}

const slug = title
	.toLowerCase()
	.replace(/['’]/g, '')
	.replace(/[^a-z0-9]+/g, '-')
	.replace(/^-|-$/g, '');
const file = `src/content/blog/${slug}.md`;
if (existsSync(file)) {
	console.error(`${file} already exists. Pick a different title.`);
	process.exit(1);
}

const d = new Date();
const today = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

writeFileSync(
	file,
	`---
title: ${JSON.stringify(title)}
description: "One sentence that makes someone want to click."
pubDate: ${today}
tags: []
draft: true
---

<!--
  Innovator habits (aim for at least 2 per post):
    [ ] Associating    — connect ideas from unrelated fields
    [ ] Questioning    — ask "why?", "why not?", "what if?"
    [ ] Observing      — describe something you actually noticed
    [ ] Networking     — bring in what someone else told you or wrote
    [ ] Experimenting  — try something and report what happened

  Before publishing:
    [ ] End with a question readers can answer in one comment
    [ ] Add 1–3 tags (e.g. "ai", "future-of-work", "tech-and-society", "startups")
    [ ] Change draft: true to draft: false
-->

Start writing here.
`,
);
console.log(`Created ${file}`);
