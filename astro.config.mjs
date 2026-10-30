import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
  server: { host: true },
  // Keep client JS external so the strict production CSP permits the menu.
  vite: { server: { allowedHosts: ['terminal.local'] }, build: { assetsInlineLimit: 0 } },
});
