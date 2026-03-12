#!/usr/bin/env bats
#
# Unit Tests — Package Structure
# Verifies required files are present and package is correctly configured.
#

load '../helpers/test_helper'

setup() {
    setup_test_env
}

teardown() {
    teardown_test_env
}

# ============================================================================
# Root config files
# ============================================================================

@test ".gitlab-ci.yml exists" {
    assert_file_exists "${PROJECT_ROOT}/.gitlab-ci.yml"
}

@test "Makefile exists" {
    assert_file_exists "${PROJECT_ROOT}/Makefile"
}

@test ".editorconfig exists" {
    assert_file_exists "${PROJECT_ROOT}/.editorconfig"
}

@test "vitest.config.js exists" {
    assert_file_exists "${PROJECT_ROOT}/vitest.config.js"
}

@test "eslint.config.js exists" {
    assert_file_exists "${PROJECT_ROOT}/eslint.config.js"
}

@test "prettier.config.js exists" {
    assert_file_exists "${PROJECT_ROOT}/prettier.config.js"
}

@test "stylelint.config.js exists" {
    assert_file_exists "${PROJECT_ROOT}/stylelint.config.js"
}

@test "config/dev-tools/knip.config.js exists" {
    assert_file_exists "${PROJECT_ROOT}/config/dev-tools/knip.config.js"
}

# ============================================================================
# npm — no yarn
# ============================================================================


@test "yarn.lock does not exist" {
    run test -f "${PROJECT_ROOT}/yarn.lock"
    [ "$status" -ne 0 ]
}

# ============================================================================
# src/ entry points
# ============================================================================

@test "src/index.scss exists" {
    assert_file_exists "${PROJECT_ROOT}/src/index.scss"
}

@test "src/grid.scss exists" {
    assert_file_exists "${PROJECT_ROOT}/src/grid.scss"
}

@test "src/spacing.scss exists" {
    assert_file_exists "${PROJECT_ROOT}/src/spacing.scss"
}

@test "src/variables.scss exists" {
    assert_file_exists "${PROJECT_ROOT}/src/variables.scss"
}

@test "src/mixins.scss exists" {
    assert_file_exists "${PROJECT_ROOT}/src/mixins.scss"
}

# ============================================================================
# package.json
# ============================================================================

@test "package.json includes src/ in files[]" {
    run grep -q '"src"' "${PROJECT_ROOT}/package.json"
    [ "$status" -eq 0 ]
}

@test "package.json has publishConfig access public" {
    run grep -q '"access": "public"' "${PROJECT_ROOT}/package.json"
    [ "$status" -eq 0 ]
}

@test "package.json uses @zairakai/mithril-scss" {
    run grep -q '"@zairakai/mithril-scss"' "${PROJECT_ROOT}/package.json"
    [ "$status" -eq 0 ]
}

# ============================================================================
# .gitlab-ci.yml
# ============================================================================

@test ".gitlab-ci.yml includes pipeline-js-package.yml" {
    run grep -q 'pipeline-js-package.yml' "${PROJECT_ROOT}/.gitlab-ci.yml"
    [ "$status" -eq 0 ]
}

@test ".gitlab-ci.yml does not use ref: main" {
    run grep -q 'ref: main' "${PROJECT_ROOT}/.gitlab-ci.yml"
    [ "$status" -ne 0 ]
}

@test ".gitlab-ci.yml uses npm-packages/js-dev-tools project" {
    run grep -q 'npm-packages/js-dev-tools' "${PROJECT_ROOT}/.gitlab-ci.yml"
    [ "$status" -eq 0 ]
}

@test ".gitlab-ci.yml sets NPM_PACKAGE_NAME" {
    run grep -q 'NPM_PACKAGE_NAME' "${PROJECT_ROOT}/.gitlab-ci.yml"
    [ "$status" -eq 0 ]
}
