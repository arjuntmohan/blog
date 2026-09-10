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

1. On GitHub, create a new **public** repository named exactly `<your-username>.github.io`.
2. In `astro.config.mjs`, set `site: 'https://<your-username>.github.io'`.
   In `src/consts.ts`, add your LinkedIn/GitHub links.
3. Push this folder to that repository. The first push will ask you to sign in to GitHub.
4. In the repository, go to **Settings → Pages** and set **Source** to **GitHub Actions**.
5. Watch the **Actions** tab. When the run turns green, the site is live at
   `https://<your-username>.github.io`.

A custom domain (like `yourname.com`, about $12/year) can be added later under
**Settings → Pages → Custom domain**. Update `site:` to match.

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
   `src/consts.ts` (along with `repo: '<your-username>/<your-username>.github.io'`).
5. Push. Every post now has a comment box, and you get a GitHub notification for each new comment.
