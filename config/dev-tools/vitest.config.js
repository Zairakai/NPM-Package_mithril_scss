/**
 * Project Vitest configuration.
 * Extends the @zairakai/js-dev-tools base config: environment, coverage, thresholds and reports come from it.
 */

import baseConfig from '@zairakai/js-dev-tools/config/vitest.config.js'
import { defineConfig, mergeConfig } from 'vitest/config'

export default mergeConfig(baseConfig, defineConfig({}))
