import { spawnSync } from 'node:child_process'
import { existsSync, mkdirSync, rmSync, symlinkSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

// Links the unpublished @ark-ui/qwik from a sibling ark checkout into this
// workspace's node_modules (see components/qwik/PLAN.md Part 1). The ark
// checkout must itself be bootstrapped first (zag adapter branch and
// `bun run local:sync` per ark's packages/qwik/PLAN.md Part 1) so its own
// @zag-js/* deps resolve from its real path.
//
// Panda needs no sibling checkout: components/qwik uses the published
// @pandacss/dev 2.x plus pandacss-plugin-qwik, installed by `bun install`.
//
// Usage: node scripts/local-qwik-sync.mjs [--revert]
// The symlink lives in node_modules only; nothing to keep out of git except
// making sure `bun install` ran normally first.

const rootDir = join(dirname(fileURLToPath(import.meta.url)), '..')
const arkQwikDir = join(rootDir, '..', 'ark', 'packages', 'qwik')
const linkDir = join(rootDir, 'node_modules', '@ark-ui')
const linkPath = join(linkDir, 'qwik')

if (process.argv.includes('--revert')) {
  rmSync(linkPath, { recursive: true, force: true })
  console.info('removed node_modules/@ark-ui/qwik link')
  process.exit(0)
}

if (!existsSync(arkQwikDir)) {
  console.error('sibling ../ark checkout not found (expected ' + arkQwikDir + ')')
  process.exit(1)
}
if (!existsSync(join(arkQwikDir, 'node_modules'))) {
  console.warn(
    'warning: ../ark/packages/qwik has no node_modules; run `bun run local:sync` in ../ark first',
  )
}
if (!existsSync(join(rootDir, 'node_modules'))) {
  spawnSync('bun', ['install', '--ignore-scripts'], { stdio: 'inherit', cwd: rootDir })
}

mkdirSync(linkDir, { recursive: true })
rmSync(linkPath, { recursive: true, force: true })
symlinkSync(arkQwikDir, linkPath, 'dir')
console.info(`linked node_modules/@ark-ui/qwik -> ${arkQwikDir}`)
