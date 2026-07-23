import { readFile, writeFile } from 'node:fs/promises'

type PackageJson = {
  dependencies?: Record<string, string>
}

type ImportMap = {
  imports: Record<string, string>
}

const ARAVENA_ESM_BASE = 'https://aravena.me/static/esm'
const APP_MODULE_URL = `${ARAVENA_ESM_BASE}/*gh/joanca/realstate-website@main/src/main.tsx?jsx&v=`
const EMBLA_CAROUSEL_PACKAGE = 'embla-carousel-react'
const SCHEDULER_VERSION = '0.27.0'

const packageJson = JSON.parse(
  await readFile('package.json', 'utf8')
) as PackageJson

function versionFromSpecifier(packageName: string, specifier: string) {
  const version = specifier.match(/\d+\.\d+\.\d+(?:[-+][0-9A-Za-z.-]+)?/)?.[0]
  if (!version) {
    throw new Error(`Unsupported version specifier for ${packageName}: ${specifier}`)
  }

  return version
}

function buildDependencyImportMap(dependencies: Record<string, string>) {
  const imports: Record<string, string> = {}

  for (const [packageName, specifier] of Object.entries(dependencies)) {
    const version = versionFromSpecifier(packageName, specifier)

    if (packageName === EMBLA_CAROUSEL_PACKAGE) {
      imports[packageName] = `${ARAVENA_ESM_BASE}/*${packageName}@${version}?standalone`
      continue
    }

    imports[packageName] = `${ARAVENA_ESM_BASE}/*${packageName}@${version}`
    imports[`${packageName}/`] = `${ARAVENA_ESM_BASE}/*${packageName}@${version}/`
  }

  imports.scheduler = `${ARAVENA_ESM_BASE}/*scheduler@${SCHEDULER_VERSION}`

  return { imports } satisfies ImportMap
}

const importMap = buildDependencyImportMap(packageJson.dependencies ?? {})

const importMapSource = JSON.stringify(importMap, null, 2)
  .split('\n')
  .map((line, index) => (index === 0 ? line : `  ${line}`))
  .join('\n')

const output = `;(function () {
  var importMap = ${importMapSource}

  function revealPageOnFailure() {
    document.documentElement.removeAttribute('data-emily-loading')
    document.getElementById('emily-preload-hide')?.remove()
  }

  if (!document.querySelector('script[data-emily-importmap]')) {
    var script = document.createElement('script')
    script.type = 'importmap'
    script.dataset.emilyImportmap = 'true'
    script.textContent = JSON.stringify(importMap)
    document.head.appendChild(script)
  }

  import(
    '${APP_MODULE_URL}' + Date.now()
  ).catch(function (error) {
    console.error('[emily-realestate] Failed to load app', error)
    revealPageOnFailure()
  })
})()
`

await writeFile('src/importmap.js', output)
