# Ayan Khan — Portfolio

Personal portfolio and writing site for Ayan Khan, built as a fast static React application and deployed to GitHub Pages.

**Live site:** [ayankhan.me](https://ayankhan.me/)  
**Writing:** [ayankhan.me/blog](https://ayankhan.me/blog)

![Portfolio preview](public/og-image.png)

## About

This repository powers my personal developer portfolio. It brings together my projects, open-source work, technical interests, education, résumé, GitHub activity, and long-form engineering writing in one place.

The site is designed to stay lightweight and maintainable while still supporting route-specific SEO metadata, static blog routes, accessibility checks, and automated deployment.

## Highlights

- Responsive single-page portfolio with dedicated project, open-source, skills, education, and contact sections.
- First-class writing section at `/blog` with individual article routes.
- Static blog route generation for GitHub Pages so article URLs have crawlable route-specific metadata.
- Open Graph, Twitter Card, canonical URL, sitemap, robots, and JSON-LD metadata.
- Build-time GitHub contribution data used by the activity section.
- Light/dark theme support and selectable ambient backgrounds.
- Reduced-motion support and keyboard-accessible interactions.
- Self-hosted Manrope typography.
- ESLint, React Hooks, and JSX accessibility checks enforced in CI.
- Automatic GitHub Pages deployment from `main`.

## Tech stack

| Area | Technology |
| --- | --- |
| UI | React 19, TypeScript |
| Build | Vite 7 |
| Styling | Tailwind CSS 4 |
| Motion | Motion |
| Icons | Lucide React |
| Fonts | Fontsource Manrope, IBM Plex Mono |
| Quality | ESLint, `typescript-eslint`, React Hooks, `jsx-a11y` |
| Deployment | GitHub Actions, GitHub Pages |

## Repository structure

```text
.
├── .github/workflows/
│   ├── ci.yml                         # PR/manual lint + production build
│   └── deploy.yml                     # GitHub Pages deployment
├── public/
│   ├── Ayan_Khan_Resume.pdf
│   ├── 404.html
│   ├── favicon.svg
│   ├── og-image.png
│   ├── robots.txt
│   └── sitemap.xml
├── scripts/
│   ├── fetch-github-contributions.mjs # Build-time public GitHub activity
│   ├── generate-apple-icon.mjs
│   ├── generate-og.mjs
│   └── prerender-blog.mjs             # Generates static /blog HTML routes
├── src/
│   ├── components/                    # Portfolio and blog UI
│   ├── data/
│   │   ├── portfolio.ts               # Portfolio content and links
│   │   └── blogs.ts                   # Blog metadata and article content
│   ├── hooks/
│   ├── App.tsx                        # Route selection and page composition
│   ├── index.css
│   └── main.tsx
├── eslint.config.mjs
├── index.html                         # Base SEO, JSON-LD, theme bootstrap
├── package.json
└── vite.config.ts
```

## Local development

Requirements:

- Node.js 22 or newer
- npm

Install dependencies:

```bash
npm ci
```

Start the development server:

```bash
npm run dev
```

Run the quality checks:

```bash
npm run lint
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

The production output is written to `dist/`.

## Updating portfolio content

Most portfolio copy and structured content lives in:

```text
src/data/portfolio.ts
```

This includes the site identity, links, résumé path, about content, education, projects, skills, interests, and related portfolio data.

Static assets such as the résumé, icons, Open Graph image, and project screenshots live under `public/`.

## Publishing a blog post

Blog posts are defined in:

```text
src/data/blogs.ts
```

Each post contains its slug, title, description, publication date, tags, cover image, canonical URL, related publication links, repository link, and structured content blocks.

During `npm run build`, `scripts/prerender-blog.mjs` generates static HTML entries for `/blog` and every configured article route. This gives GitHub Pages real route files with article-specific title, description, canonical, Open Graph, Twitter, and publication metadata before React runs.

When adding a new article, also keep `public/sitemap.xml` in sync until sitemap generation is automated.

## CI and deployment

Pull requests to `main` run the portfolio CI workflow, which installs dependencies, lints the source, generates GitHub contribution data, and builds the production site.

Pushes to `main` run the GitHub Pages deployment workflow. The workflow builds the same `dist/` artifact and publishes it to the live custom domain:

[https://ayankhan.me/](https://ayankhan.me/)

## SEO and routing

The repository includes:

- Canonical URLs for the custom domain.
- Open Graph and Twitter Card metadata.
- `Person` structured data on the main document.
- Route-specific blog metadata generated at build time.
- `robots.txt` and `sitemap.xml`.
- A GitHub Pages `404.html` fallback for unresolved routes.

## License

This repository contains my personal portfolio content, résumé, writing, and branding. Unless a file explicitly states otherwise, please do not reuse those personal assets or present this site as your own.
