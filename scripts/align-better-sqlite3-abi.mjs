#!/usr/bin/env node
// Aligns the better-sqlite3 native binary with the runtime that is about to
// load it. The Electron app requires Electron's ABI (NODE_MODULE_VERSION 143)
// while Vitest runs under Node (ABI 127) — both share the single
// build/Release/better_sqlite3.node, so the binary must be swapped when the
// target runtime changes. This script detects the currently compiled ABI and
// only re-downloads the matching prebuilt when it differs, making the swap
// safe to run before every `dev`/`start`/`test`.
//
// Usage: node scripts/align-better-sqlite3-abi.mjs [--runtime=electron|node]
import { spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { createRequire } from 'node:module'
import path from 'node:path'

const require = createRequire(import.meta.url)

const MODULE_NAME = 'better-sqlite3'
const BINARY_RELATIVE_PATH = ['build', 'Release', 'better_sqlite3.node']
const RUNTIMES = new Set(['electron', 'node'])
const DEFAULT_RUNTIME = 'electron'

function parseRuntime() {
  const flag = process.argv.find((arg) => arg.startsWith('--runtime'))
  if (!flag) {
    return DEFAULT_RUNTIME
  }
  const value = flag.includes('=')
    ? flag.split('=')[1]
    : process.argv[process.argv.indexOf(flag) + 1]
  return value ?? DEFAULT_RUNTIME
}

const runtime = parseRuntime()
if (!RUNTIMES.has(runtime)) {
  console.error(`Unknown runtime "${runtime}". Expected one of: ${[...RUNTIMES].join(', ')}.`)
  process.exit(1)
}

let moduleDir
try {
  moduleDir = path.dirname(require.resolve(`${MODULE_NAME}/package.json`))
} catch {
  console.error(`${MODULE_NAME} is not installed. Run "pnpm install" first.`)
  process.exit(1)
}

const binaryPath = path.join(moduleDir, ...BINARY_RELATIVE_PATH)

function readElectronAbi() {
  const electronBinaryPath = require('electron')
  const probe = spawnSync(electronBinaryPath, ['-e', 'console.log(process.versions.modules)'], {
    encoding: 'utf8',
    env: { ...process.env, ELECTRON_RUN_AS_NODE: '1' }
  })
  if (probe.status !== 0) {
    throw new Error(`Unable to read Electron's ABI: ${probe.stderr}`)
  }
  return Number(probe.stdout.trim())
}

/**
 * ABI the current binary was compiled against, or null when the binary is
 * missing. Probing happens in a child process so a mismatch never throws here.
 */
function readCompiledAbi() {
  if (!existsSync(binaryPath)) {
    return null
  }
  const probe = spawnSync(process.execPath, ['-e', `require(${JSON.stringify(binaryPath)})`], {
    encoding: 'utf8'
  })
  if (probe.status === 0) {
    return Number(process.versions.modules)
  }
  const match = probe.stderr.match(/NODE_MODULE_VERSION (\d+)/g)
  return match ? Number(match[0].split(' ')[1]) : null
}

function readTargetAbi() {
  return runtime === 'electron' ? readElectronAbi() : Number(process.versions.modules)
}

function downloadPrebuilt() {
  const targetVersion =
    runtime === 'electron' ? require('electron/package.json').version : process.versions.node
  const args = ['--runtime', runtime, '--target', targetVersion]
  const download = spawnSync('npx', ['prebuild-install', ...args], {
    cwd: moduleDir,
    stdio: 'inherit',
    shell: true
  })
  if (download.status !== 0) {
    console.error(`prebuild-install failed for runtime "${runtime}".`)
    process.exit(1)
  }
}

function verifyBinary(targetAbi) {
  const probeCommand =
    runtime === 'electron'
      ? {
          binary: require('electron'),
          env: { ...process.env, ELECTRON_RUN_AS_NODE: '1' }
        }
      : { binary: process.execPath, env: process.env }
  const probe = spawnSync(probeCommand.binary, ['-e', `require(${JSON.stringify(binaryPath)})`], {
    encoding: 'utf8',
    env: probeCommand.env
  })
  if (probe.status !== 0) {
    console.error(`Verification failed: the binary still does not load under ${runtime}.`)
    process.exit(1)
  }
  console.log(`${MODULE_NAME} aligned with ${runtime} (ABI ${targetAbi}).`)
}

const targetAbi = readTargetAbi()
const compiledAbi = readCompiledAbi()

if (compiledAbi === targetAbi) {
  console.log(`${MODULE_NAME} already aligned with ${runtime} (ABI ${targetAbi}).`)
  process.exit(0)
}

console.log(
  compiledAbi === null
    ? `${MODULE_NAME} binary missing — downloading the ${runtime} prebuilt…`
    : `${MODULE_NAME} compiled for ABI ${compiledAbi} but ${runtime} needs ABI ${targetAbi} — swapping…`
)
downloadPrebuilt()
verifyBinary(targetAbi)
