// Generates the reference pages from the SassDoc comments (`///`) of the source, so that they cannot drift from the code.
// Run: npm run generate (from docs/). The pages are written in docs/reference/ and are not committed.
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const src = resolve(here, '../../src')
const out = resolve(here, '../reference')

const files = {
  functions: ['functions.scss', 'Functions', 'Sass functions: colors, units, lookups in the tokens.'],
  mixins: ['mixins.scss', 'Mixins', 'Sass mixins: media queries, grid, spacing, theme and export of CSS variables.'],
  variables: [
    'variables.scss',
    'Variables',
    'The design tokens. Every one is `!default`: override it before the first `@use`.',
  ],
  placeholders: ['placeholders.scss', 'Placeholders', 'Placeholders to `@extend`: flex, grid, typography.'],
}

// The text of a comment block, without the separators (=====) and the leading slashes.
function parseBlock(lines) {
  const text = lines.map((line) => line.replace(/^\s*\/\/\/ ?/, ''))
  const description = []
  const params = []
  const examples = []
  let returns = ''
  let throws = ''
  let mode = 'description'
  let example = []

  for (const line of text) {
    if (/^=+$/.test(line.trim())) {
      continue
    }

    const tag = /^@(\w+)\s*(.*)$/.exec(line)

    if (tag) {
      if ('example' === mode && example.length) {
        examples.push(example.join('\n').trim())
        example = []
      }

      mode = tag[1]

      if ('param' === tag[1]) {
        const match = /^(?:\{([^}]+)\}\s*)?(\$[\w-]+)\s*(?:-\s*)?(.*)$/.exec(tag[2])

        if (match) {
          params.push({ type: match[1] ?? '', name: match[2], description: match[3] })
        }
      } else if ('return' === tag[1]) {
        returns = tag[2].replace(/^\{[^}]+\}\s*-?\s*/, '')
      } else if ('throws' === tag[1]) {
        throws = tag[2]
      } else if ('example' === tag[1] && tag[2]) {
        example.push(tag[2])
      }
    } else if ('example' === mode) {
      example.push(line)
    } else if ('description' === mode) {
      description.push(line)
    }
  }

  if (example.length) {
    examples.push(example.join('\n').trim())
  }

  return { description: description.join('\n').trim(), params, returns, throws, examples }
}

function entriesOf(file, kind) {
  const lines = readFileSync(join(src, file), 'utf8').split('\n')
  const entries = []
  let block = []

  for (const line of lines) {
    if (/^\s*\/\/\//.test(line) && !/^\s{2,}/.test(line)) {
      block.push(line)

      continue
    }

    const match =
      'functions' === kind
        ? /^@function ([\w-]+)\((.*)\)\s*\{/.exec(line)
        : 'mixins' === kind
          ? /^@mixin ([\w-]+)(?:\((.*)\))?\s*\{/.exec(line)
          : 'variables' === kind
            ? /^\$([\w-]+):/.exec(line)
            : /^%([\w-]+)\s*\{/.exec(line)

    if (match && block.length) {
      entries.push({ name: match[1], signature: match[2], ...parseBlock(block) })
    }

    block = []
  }

  return entries.filter((entry) => !entry.name.startsWith('-') && !['used-variables'].includes(entry.name))
}

const cell = (text) =>
  String(text ?? '')
    .replace(/\|/g, '\\|')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\{/g, '&#123;')
    .replace(/\}/g, '&#125;')

const prose = (text) => text.replace(/</g, '&lt;').replace(/\{/g, '&#123;').replace(/\}/g, '&#125;')

rmSync(out, { recursive: true, force: true })
mkdirSync(out, { recursive: true })

const sidebar = []
let total = 0

for (const [kind, [file, title, summary]] of Object.entries(files)) {
  const entries = entriesOf(file, kind)
  const lines = [`# ${title}`, '', summary, '', `${entries.length} documented in \`src/${file}\`.`, '']

  for (const entry of entries) {
    const heading =
      'functions' === kind || 'mixins' === kind
        ? `${entry.name}(${entry.signature ?? ''})`
        : 'placeholders' === kind
          ? `%${entry.name}`
          : `$${entry.name}`

    lines.push(`## ${heading.replace(/[{}<]/g, '')}`, '')

    if (entry.description) {
      lines.push(prose(entry.description), '')
    }

    if (entry.params.length) {
      lines.push('| Parameter | Type | Description |', '| :--- | :--- | :--- |')
      entry.params.forEach((param) =>
        lines.push(`| \`${param.name}\` | \`${cell(param.type)}\` | ${cell(param.description)} |`)
      )
      lines.push('')
    }

    if (entry.returns) {
      lines.push(`**Returns** ${prose(entry.returns)}`, '')
    }

    if (entry.throws) {
      lines.push(`**Throws** ${prose(entry.throws)}`, '')
    }

    entry.examples.forEach((example) => lines.push('```scss', example, '```', ''))
    total += 1
  }

  writeFileSync(join(out, `${kind}.md`), lines.join('\n'))
  sidebar.push({ text: title, link: `/reference/${kind}` })
}

writeFileSync(
  join(out, 'index.md'),
  [
    '# Reference',
    '',
    `${total} documented items, generated from the SassDoc comments of the source.`,
    '',
    ...sidebar.map((item) => `- [${item.text}](${item.link})`),
    '',
  ].join('\n')
)
writeFileSync(resolve(here, '../.vitepress/sidebar.generated.json'), JSON.stringify(sidebar, null, 2))
console.log(`${total} items written`)
