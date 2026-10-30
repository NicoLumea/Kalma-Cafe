# Cloudflare deployment preparation

**No deployment, Cloudflare project, DNS change or credential configuration was performed.** The project is pure static Astro and does not require a Cloudflare server adapter, Worker runtime code or database.

## Recommended: Pages with Git integration

After separate deployment authorization, connect the existing `NicoLumea/Kalma-Cafe` repository in Cloudflare Pages.

| Setting | Value |
| --- | --- |
| Framework preset | Astro |
| Root directory | Repository root |
| Production branch | `main`, only after the implementation PR is reviewed and merged |
| Build command | `npm run build` |
| Build output | `dist` |
| Node version | 24 (set `NODE_VERSION=24` for build environments if necessary) |
| Preview branches | Select explicitly; `feature/kalma-heritage` is the development branch |

Cloudflare installs the dependencies using the lockfile. Verify Pages uses the intended Node version in its build log. `public/_headers` is copied into `dist` and provides noindex, security and local-asset caching headers. A real `404.html` is generated so this is not an SPA fallback.

## Alternative: Workers static assets

`wrangler.jsonc` points the Workers static asset system at `./dist` and uses the generated 404 page. It contains no account IDs, secrets, routes or custom domains. For an authorized Workers Builds Git connection, set the build command to `npm run build` and the deployment command to `npx wrangler deploy`. Wrangler must be installed/available in that deployment environment. Do not run deployment commands until Cloudflare authorization and the desired project name have been confirmed.

Choose either Pages or Workers; do not configure both unintentionally. The repository does not contain a deploy script or automatic deployment workflow.

## Development versus production

- Development: `astro dev`; the preview-only `terminal.local` host is explicitly allowed in Vite's development server.
- Production: files in `dist`; no Vite server, API routes, secrets or runtime application server.
- All pages remain noindex until the independent prototype is intentionally retired or replaced. Noindex does not make a public URL private.
- Review legal placeholders, permissions to use official branding, confirmed content and accessibility before any real business launch.

References: [Astro Cloudflare deployment](https://docs.astro.build/en/guides/deploy/cloudflare/), [Cloudflare Pages Astro guide](https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/), [Workers static assets](https://developers.cloudflare.com/workers/static-assets/).
