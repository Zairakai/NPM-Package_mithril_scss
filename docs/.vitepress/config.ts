import { existsSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitepress'

const here = dirname(fileURLToPath(import.meta.url))
const generated = join(here, 'sidebar.generated.json')
const reference = existsSync(generated) ? JSON.parse(readFileSync(generated, 'utf8')) : []

const ci = process.env

// What built this site: shown at the bottom of every page.
const build = {
  version: ci.DOCS_VERSION ?? 'next',
  ref: ci.CI_COMMIT_REF_NAME ?? 'local',
  commit: ci.CI_COMMIT_SHORT_SHA ?? '',
  commitUrl: ci.CI_PROJECT_URL && ci.CI_COMMIT_SHA ? `${ci.CI_PROJECT_URL}/-/commit/${ci.CI_COMMIT_SHA}` : '',
  pipeline: ci.CI_PIPELINE_ID ?? '',
  pipelineUrl: ci.CI_PIPELINE_URL ?? '',
  date: ci.CI_COMMIT_TIMESTAMP ?? new Date().toISOString(),
}

const project = 'https://gitlab.com/zairakai/npm-packages/mithril-scss'

// GitLab.com serves the site from the root of a unique domain. The versions live in folders of it:
// DOCS_BASE is the folder of this build (/1.2.0/) and DOCS_ROOT the root of the site (/).
export default defineConfig({
  title: '@zairakai/mithril-scss',
  description:
    'A lightweight modular SCSS framework: tokens, functions, mixins, grid and spacing, with opt-in styles for @zairakai/vue-components.',
  base: process.env.DOCS_BASE ?? '/',
  cleanUrls: true,
  lastUpdated: true,
  themeConfig: {
    root: process.env.DOCS_ROOT ?? '/',
    build,
    badges: [
      {
        label: 'Pipeline',
        image: `${project}/badges/main/pipeline.svg?ignore_skipped=true&key_text=Main`,
        href: `${project}/-/commits/main`,
      },
      {
        label: 'npm',
        image: 'https://img.shields.io/npm/v/@zairakai/mithril-scss',
        href: 'https://www.npmjs.com/package/@zairakai/mithril-scss',
      },
      {
        label: 'Release',
        image: 'https://img.shields.io/gitlab/v/release/zairakai/npm-packages/mithril-scss?logo=gitlab',
        href: `${project}/-/releases`,
      },
      {
        label: 'License',
        image: 'https://img.shields.io/badge/license-MIT-blue.svg',
        href: `${project}/-/blob/main/LICENSE`,
      },
      {
        label: 'Node.js',
        image: 'https://img.shields.io/badge/node.js-%3E%3D24-green.svg?logo=node.js',
        href: 'https://nodejs.org',
      },
    ],
    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'Component styles', link: '/guide/components' },
      { text: 'Gallery', link: '/guide/gallery' },
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
          { text: 'Gallery', link: '/guide/gallery' },
        ],
      },
      { text: 'Reference', link: '/reference/', items: reference },
    ],
    search: { provider: 'local' },
    outline: [2, 3],
  },
})
