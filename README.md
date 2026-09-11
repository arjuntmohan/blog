# My blog

A personal blog built with [Astro](https://astro.build). Posts are Markdown files, and the site
publishes itself to GitHub Pages every time you push.

## Where things live

| What | File |
| --- | --- |
| Blog name, tagline, social links | `src/consts.ts` |
| Your live web address | `site:` in `astro.config.mjs` |
| About page | `src/pages/about.md` |
| Home page intro sentence | `src/pages/index.astro` |
| Posts | `src/content/blog/*.md` |
| Colors and fonts | `src/styles/global.css` (colors), `astro.config.mjs` (font) |

## Writing a post

```bash
npm run new -- "My Post Title"
```

That creates `src/content/blog/my-post-title.md` as a **draft**, with a checklist of the
innovator habits at the top. The checklist is hidden from readers. Write in plain Markdown:

```markdown
## A heading

A paragraph with **bold**, *italic*, and a [link](https://example.com).

> A quote

- a list item
```

The top of each post (the front matter) controls how it shows up:

```yaml
title: "My Post Title"
description: "Shows under the title and in LinkedIn link previews."
pubDate: 2026-09-10
tags: ["ai", "future-of-work"]   # each tag gets its own page at /tags/<tag>/
draft: true                      # change to false to publish
```

To add an image, put it in `src/assets/`, then either use `![description](../../assets/photo.jpg)`
in the post or add `heroImage: ../../assets/photo.jpg` to the front matter for a big banner image.

**Tip for class:** give every class post a shared tag like `tech`, then send your professor
`https://<your-site>/tags/tech/`. You can still write about anything else on the same blog.

## Previewing on your computer

```bash
npm run dev
```

Open http://localhost:4321. Drafts show up here (marked "Draft") but never on the live site.
The page reloads as you save. Press `Ctrl+C` in the terminal to stop.

## Publishing

Every push to `main` rebuilds and publishes the site in about a minute:

```bash
git add -A
git commit -m "New post: My Post Title"
git push
```

No terminal? On github.com, open `src/content/blog/`, click **Add file → Create new file**,
write your post, and commit. The site updates the same way.

## Going live (one-time setup)

The site lives at **https://blog.arjuntmohan.com**, served by GitHub Pages from the
`arjuntmohan/blog` repository. The root domain `arjuntmohan.com` is kept free for a portfolio.

1. Make sure the repository is **public** (Settings → General → Danger Zone → Change visibility).
2. Push this folder with GitHub Desktop.
3. In the repository, go to **Settings → Pages** and set **Source** to **GitHub Actions**.
   Watch the **Actions** tab until the run turns green.
4. Same page, **Custom domain**: enter `blog.arjuntmohan.com` and save.
5. In Cloudflare, go to **arjuntmohan.com → DNS → Records** and add a `CNAME` record: name `blog`,
   target `arjuntmohan.github.io`, proxy status **DNS only** (grey cloud).
6. When GitHub's DNS check passes, check **Enforce HTTPS**.

If the domain ever changes, update `site:` in `astro.config.mjs` to match.

## Turn on comments

Comments use [giscus](https://giscus.app), which stores each post's comments as a GitHub
Discussion in your repository. It's free, has no ads, and handles spam well. **Commenters need a
GitHub account.** For people who don't have one, the comments on your LinkedIn post are the
other place the conversation happens.

1. Repository **Settings → General → Features**: check **Discussions**.
2. Install the giscus app: https://github.com/apps/giscus and give it access to only this repository.
3. In the repo's **Discussions** tab, click the pencil next to Categories, then **New category**.
   Name it `Comments`, set the format to **Announcement**, and save.
4. Go to https://giscus.app, type your repo name, pick the `Comments` category, then scroll to
   "Enable giscus". Copy the `data-repo-id` and `data-category-id` values into `COMMENTS` in
   `src/consts.ts`.
5. Push. Every post now has a comment box, and you get a GitHub notification for each new comment.
