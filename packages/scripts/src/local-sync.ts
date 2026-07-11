/**
 * Link the unpublished Qwik-stack packages into this workspace for local
 * development (see components/qwik/PLAN.md Part 1).
 *
 * Strategy: pure post-install symlinks — no package.json or lockfile
 * mutation, so there is no link noise to accidentally commit.
 *
 *   components/qwik/node_modules/@ark-ui/qwik  -> ../ark-qwik/packages/qwik
 *   ../ark-qwik/node_modules/@zag-js/*         -> ../zag/packages/**
 *   ../ark-qwik/node_modules/@qwik.dev         -> park-ui's @qwik.dev install
 *
 * `@ark-ui/qwik` is intentionally NOT in components/qwik's dependencies (it
 * is unpublished; declaring it would break `bun install` for everyone), so
 * bun ignores it entirely and module resolution finds the symlink. Imports
 * inside the ark checkout resolve at REAL paths through the farm above; the
 * zag checkout resolves its own cross-package imports via its pnpm install.
 *
 * The Panda fork is not linked into the dependency graph at all: qwik
 * codegen runs the fork CLI directly (see components/qwik "prepare:local"),
 * and the npm @pandacss/dev stays in place for types + other frameworks.
 *
 * Expected sibling layout (relative to the park-ui repo root):
 *   ../zag       gabrielgrant/zag  @ qwik-adapter-f        (`pnpm install --ignore-scripts` run)
 *   ../ark-qwik  gabrielgrant/ark  @ claude/busy-noether-lu8dvd (worktree ok)
 *   ../panda     gabrielgrant/panda @ claude/panda-qwik-v2-support-3nl3s5,
 *                built (`pnpm install && pnpm build`)
 *
 * Re-run after any `bun install` (bun may prune unknown symlinks).
 * `--revert` removes the symlinks it created.
 */
import { existsSync, lstatSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, symlinkSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'

const rootDir = resolve(import.meta.dirname, '../../..')
const parentDir = dirname(rootDir)
const zagDir = join(parentDir, 'zag')
const arkQwikDir = join(parentDir, 'ark-qwik')
const pandaDir = join(parentDir, 'panda')
const arkQwikPackage = join(arkQwikDir, 'packages', 'qwik')

const links = () => [
  { path: join(rootDir, 'components/qwik/node_modules/@ark-ui/qwik'), target: arkQwikPackage },
  { path: join(arkQwikDir, 'node_modules/@qwik.dev'), target: join(rootDir, 'components/qwik/node_modules/@qwik.dev') },
]

const collectZagPackages = () => {
  const result: Record<string, string> = {}
  const visit = (dir: string, depth: number) => {
    if (!existsSync(dir) || !statSync(dir).isDirectory()) return
    const manifestPath = join(dir, 'package.json')
    if (existsSync(manifestPath)) {
      const name = JSON.parse(readFileSync(manifestPath, 'utf-8')).name
      if (name?.startsWith('@zag-js/')) result[name.split('/')[1]] = dir
      return
    }
    if (depth <= 0) return
    for (const entry of readdirSync(dir)) visit(join(dir, entry), depth - 1)
  }
  visit(join(zagDir, 'packages'), 2)
  visit(join(zagDir, 'shared'), 2)
  return result
}

const checkLayout = () => {
  for (const [dir, hint] of [
    [zagDir, 'clone gabrielgrant/zag@qwik-adapter-f as ../zag'],
    [join(zagDir, 'node_modules'), 'run `pnpm install --ignore-scripts` in ../zag'],
    [arkQwikPackage, 'add an ark worktree of claude/busy-noether-lu8dvd as ../ark-qwik'],
    [pandaDir, 'clone + build gabrielgrant/panda@claude/panda-qwik-v2-support-3nl3s5 as ../panda'],
  ] as const) {
    if (!existsSync(dir)) throw new Error(`missing linked checkout: ${dir} (${hint})`)
  }
}

const ensureLink = (path: string, target: string) => {
  if (existsSync(path) || lstatSync(path, { throwIfNoEntry: false })) rmSync(path, { recursive: true })
  mkdirSync(dirname(path), { recursive: true })
  symlinkSync(target, path)
  console.info(`linked ${path} -> ${target}`)
}

const main = () => {
  const revert = process.argv.includes('--revert')
  const zagScope = join(arkQwikDir, 'node_modules/@zag-js')

  if (revert) {
    for (const { path } of links()) {
      if (lstatSync(path, { throwIfNoEntry: false })) rmSync(path, { recursive: true })
    }
    if (existsSync(zagScope)) rmSync(zagScope, { recursive: true })
    console.info('local links removed')
    return
  }

  checkLayout()
  for (const { path, target } of links()) ensureLink(path, target)
  for (const [shortName, dir] of Object.entries(collectZagPackages())) {
    ensureLink(join(zagScope, shortName), dir)
  }
}

main()
