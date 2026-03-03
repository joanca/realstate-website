import { createHash } from 'node:crypto'
import { mkdir, readdir, readFile, rename, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(scriptDir, '..')
const distAssetsDir = path.join(repoRoot, 'src', 'dist', 'assets')
const outputCssPath = path.join(repoRoot, 'src', 'output.css')
const cssVersionFilePath = path.join(repoRoot, 'src', 'generated', 'cssVersion.ts')

const entries = await readdir(distAssetsDir)
const cssFiles = entries.filter((entry) => entry.endsWith('.css')).sort()

if (cssFiles.length === 0) {
  throw new Error(`No CSS files found in ${distAssetsDir}`)
}

const preferredCssFile = cssFiles.find((fileName) => /^index-[^.]+\.css$/.test(fileName)) ?? cssFiles[0]
const builtCssPath = path.join(distAssetsDir, preferredCssFile)
const builtCssContent = await readFile(builtCssPath)

const hashFromFilename = preferredCssFile.match(/-([A-Za-z0-9]+)\.css$/)?.[1]
const cssVersion = hashFromFilename ?? createHash('sha256').update(builtCssContent).digest('hex').slice(0, 16)

await rename(builtCssPath, outputCssPath)
await mkdir(path.dirname(cssVersionFilePath), { recursive: true })
await writeFile(cssVersionFilePath, `export const CSS_VERSION = '${cssVersion}'\n`, 'utf8')
await rm(path.join(repoRoot, 'src', 'dist'), { recursive: true, force: true })

console.log(`CSS finalized: output.css (v=${cssVersion})`)
