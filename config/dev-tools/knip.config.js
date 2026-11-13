/**
 * Knip configuration - extends the @zairakai/js-dev-tools base config.
 * @see https://knip.dev/reference/configuration
 */

import baseConfig from '@zairakai/js-dev-tools/config/knip.config.js'

export default {
  ...baseConfig,
  project: ['tests/**/*.js'],
}
