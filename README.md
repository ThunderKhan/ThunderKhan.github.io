# Ayan Khan — Portfolio

A minimal, editorial-style personal portfolio built with React, TypeScript, Vite, and Tailwind CSS. Deployed as a fully static site to GitHub Pages via GitHub Actions.

Live site (after deployment): `https://GITHUB_USERNAME.github.io/`

## Install dependencies

```bash
npm install
```

## Run locally

```bash
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

To create a production build and preview it:

```bash
npm run build
npm run preview
```

The static output is generated in `dist/`.

## Update portfolio content

All editable content lives in one file:

```
src/data/portfolio.ts
```

Edit that file to change the intro, skills, education, timeline entries, projects, and links. Before publishing, replace these placeholders:

| Placeholder | Where | Replace with |
| --- | --- | --- |
| `YOUR_EMAIL` | `src/data/portfolio.ts` | Your professional email |
| `YOUR_GITHUB_URL` | `src/data/portfolio.ts`, `index.html` | Your GitHub profile URL |
| `YOUR_LEETCODE_URL` | `src/data/portfolio.ts` | Your LeetCode profile URL |
| `GITHUB_USERNAME` | `index.html`, `public/robots.txt`, `public/sitemap.xml` | Your GitHub username |

The three project cards contain clearly-labelled **sample content** — replace them with your real projects before publishing.

## Where to place the résumé

Put your PDF at:

```
public/Ayan_Khan_Resume.pdf
```

It will be served from `/Ayan_Khan_Resume.pdf`, which is what all the "View Résumé" and "Download" buttons already point to.

## How to add project screenshots

1. Add an image to `public/projects/` (e.g. `public/projects/my-app.png`).
2. In `src/data/portfolio.ts`, set the project's `screenshot` field to `/projects/my-app.png` and write a descriptive `screenshotAlt`.

Recommended size: roughly 1280 × 800 (16:10). PNG or WebP both work.

## Create the GitHub Pages repository

This site is designed as a GitHub **user site**, so the repository name matters:

1. Sign in to GitHub and create a new **public** repository named exactly:
   ```
   GITHUB_USERNAME.github.io
   ```
   (replace `GITHUB_USERNAME` with your actual username, e.g. `ayankhan.github.io`).
2. Push this project to it:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/GITHUB_USERNAME/GITHUB_USERNAME.github.io.git
   git push -u origin main
   ```

## Enable GitHub Pages

1. In the repository, go to **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **GitHub Actions**.
3. That's it — the included workflow (`.github/workflows/deploy.yml`) handles the rest.

## Deploy updates

Every push to `main` triggers the workflow, which builds the site and deploys `dist/` to GitHub Pages:

```bash
git add .
git commit -m "Update content"
git push
```

You can watch progress in the repository's **Actions** tab. The site updates at `https://GITHUB_USERNAME.github.io/` within a minute or two.

## Connect a custom domain later

1. Buy a domain from any registrar.
2. In the repository, go to **Settings → Pages → Custom domain**, enter your domain, and save. GitHub creates a `CNAME` file through the Pages settings.
3. At your DNS provider:
   - For an apex domain (`example.com`), add `A` records pointing to GitHub Pages' IPs:
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - For a subdomain (`www.example.com`), add a `CNAME` record pointing to `GITHUB_USERNAME.github.io`.
4. Back in **Settings → Pages**, enable **Enforce HTTPS** once the certificate is issued.
5. Update the canonical URL and Open Graph URLs in `index.html`, plus `public/robots.txt` and `public/sitemap.xml`, to use the new domain.

## Project structure

```
├── .github/workflows/deploy.yml   # GitHub Pages deployment
├── index.html                     # Meta tags, fonts, JSON-LD, theme bootstrap
├── public/
│   ├── 404.html                   # Static not-found page
│   ├── favicon.svg                # Placeholder favicon
│   ├── robots.txt
│   ├── sitemap.xml
│   └── projects/                  # Project screenshots
└── src/
    ├── data/portfolio.ts          # ← All editable content
    ├── hooks/                     # Theme + active-section hooks
    ├── components/                # Page sections
    ├── App.tsx
    ├── main.tsx
    └── index.css                  # Tailwind theme tokens
```
