import { existsSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitepress'

const here = dirname(fileURLToPath(import.meta.url))
const generated = join(here, 'sidebar.generated.json')
const reference = existsSync(generated) ? JSON.parse(readFileSync(generated, 'utf8')) : []

// GitLab.com serves the site from the root of a unique domain. Set DOCS_BASE for a path (/group/project/).
export default defineConfig({
  title: '@zairakai/mithril-scss',
  description:
    'A lightweight modular SCSS framework: tokens, functions, mixins, grid and spacing, with opt-in styles for @zairakai/vue-components.',
  base: process.env.DOCS_BASE ?? '/',
  cleanUrls: true,
  lastUpdated: true,
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'Component styles', link: '/guide/components' },
      { text: 'Reference', link: '/reference/' },
      { text: 'GitLab', link: 'https://gitlab.com/zairakai/npm-packages/mithril-scss' },
    ],
    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Getting started', link: '/guide/getting-started' },
          { text: 'Tokens and theming', link: '/guide/tokens' },
          { text: 'Component styles', link: '/guide/components' },
          { text: 'Grid and spacing', link: '/guide/grid-and-spacing' },
        ],
      },
      { text: 'Reference', link: '/reference/', items: reference },
    ],
    search: { provider: 'local' },
    outline: [2, 3],
  },
})
