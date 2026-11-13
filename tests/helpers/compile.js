import path from 'node:path'
import { fileURLToPath } from 'node:url'
import * as sass from 'sass'

const srcDirectory = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../../src',
)

/**
 * Compiles a piece of SCSS against the sources of the package.
 *
 * The modules are loaded as `fn` (functions), `mx` (mixins), `vars`
 * (variables), so a test only writes the rule it checks.
 *
 * @param {string} source - The SCSS to compile.
 * @returns {string} The compressed CSS.
 */
export const compile = (source) =>
  sass.compileString(
    `@use "functions" as fn; @use "mixins" as mx; @use "variables" as vars; ${source}`,
    {
      style: 'compressed',
      loadPaths: [srcDirectory],
      logger: sass.Logger.silent,
    },
  ).css

/**
 * Compiles a source file of the package, by its path from `src/`.
 *
 * @param {string} file - The path from `src/`, e.g. `bases/reset.scss`.
 * @returns {string} The compressed CSS.
 */
export const compileFile = (file) =>
  sass.compile(path.join(srcDirectory, file), {
    style: 'compressed',
    logger: sass.Logger.silent,
  }).css
