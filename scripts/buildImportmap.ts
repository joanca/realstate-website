import { readFile, writeFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";

type PackageJson = {
  dependencies?: Record<string, string>;
};

type ImportMap = {
  imports: Record<string, string>;
};

type DependencyPin = {
  name: string;
  version: string;
};

type EsmUrlOptions = {
  bundle?: boolean;
  deps?: DependencyPin[];
  external?: string[];
  flags?: string[];
  suffixQueryParam?: string;
  standalone?: boolean;
  subpath?: string;
};

type GitHubModule = {
  owner: string;
  repo: string;
  ref: string;
  path: string;
};

export const ARAVENA_ESM_BASE = "https://aravena.me/static/esm";

const APP_GITHUB_MODULE = {
  owner: "joanca",
  repo: "realstate-website",
  ref: "main",
  path: "src/main.tsx",
} satisfies GitHubModule;

const NODE_POLYFILL_PREFIX = "/node/";
const ARAVENA_NODE_POLYFILL_PREFIX = "https://aravena.me/node/";
const REACT_EXTERNALS = ["react", "react-dom"];

export function versionFromSpecifier(packageName: string, specifier: string) {
  const version = specifier.match(/\d+\.\d+\.\d+(?:[-+][0-9A-Za-z.-]+)?/)?.[0];
  if (!version) {
    throw new Error(
      `Unsupported version specifier for ${packageName}: ${specifier}`,
    );
  }

  return version;
}

function formatQuery(options: EsmUrlOptions, queryPrefix: "?" | "&") {
  const parts: string[] = [];

  if (options.flags?.length) {
    parts.push(...options.flags);
  }

  if (options.bundle) {
    parts.push("bundle");
  }

  if (options.standalone) {
    parts.push("standalone");
  }

  if (options.deps?.length) {
    parts.push(
      `deps=${options.deps.map(({ name, version }) => `${name}@${version}`).join(",")}`,
    );
  }

  if (options.external?.length) {
    parts.push(`external=${options.external.join(",")}`);
  }

  if (options.suffixQueryParam) {
    parts.push(`${options.suffixQueryParam}=`);
  }

  return parts.length > 0 ? `${queryPrefix}${parts.join("&")}` : "";
}

export function buildEsmModuleUrl(
  moduleSpecifier: string,
  options: EsmUrlOptions = {},
) {
  return `${ARAVENA_ESM_BASE}/${moduleSpecifier}${formatQuery(options, "?")}`;
}

export function buildEsmPackageUrl(
  packageName: string,
  version: string,
  options: EsmUrlOptions = {},
) {
  const subpath = options.subpath ? `/${options.subpath}` : "";
  return buildEsmModuleUrl(`${packageName}@${version}${subpath}`, options);
}

export function buildEsmPackagePrefixUrl(
  packageName: string,
  version: string,
  options: EsmUrlOptions = {},
) {
  return `${ARAVENA_ESM_BASE}/${packageName}@${version}${formatQuery(options, "&")}/`;
}

function addExactAndPrefixEntries(
  imports: Record<string, string>,
  packageName: string,
  version: string,
  options: EsmUrlOptions = {},
) {
  imports[packageName] = buildEsmPackageUrl(packageName, version, options);
  imports[`${packageName}/`] = buildEsmPackagePrefixUrl(packageName, version, options);
}

function dependencyPinsFor(
  dependencies: Record<string, string>,
  packageNames: string[],
) {
  return packageNames.flatMap((packageName) => {
    const specifier = dependencies[packageName];
    return specifier
      ? [{ name: packageName, version: versionFromSpecifier(packageName, specifier) }]
      : [];
  });
}

function allDependencyPins(dependencies: Record<string, string>) {
  return dependencyPinsFor(dependencies, Object.keys(dependencies));
}

export function buildGithubModuleSpecifier({ owner, repo, ref, path }: GitHubModule) {
  return `gh/${owner}/${repo}@${ref}/${path}`;
}

export function buildAppModuleUrl(dependencies: Record<string, string>) {
  return buildEsmModuleUrl(buildGithubModuleSpecifier(APP_GITHUB_MODULE), {
    flags: ["jsx"],
    deps: allDependencyPins(dependencies),
    external: Object.keys(dependencies),
    suffixQueryParam: "v",
  });
}

function addReactEntries(
  imports: Record<string, string>,
  version: string,
) {
  const options = { bundle: true };

  addExactAndPrefixEntries(imports, "react", version, options);
  imports["react/jsx-runtime"] = buildEsmPackageUrl("react", version, {
    ...options,
    subpath: "jsx-runtime",
  });
  imports["react/jsx-dev-runtime"] = buildEsmPackageUrl("react", version, {
    ...options,
    subpath: "jsx-dev-runtime",
  });
}

function addReactDomEntries(
  imports: Record<string, string>,
  version: string,
  dependencies: Record<string, string>,
) {
  const deps = dependencyPinsFor(dependencies, ["react"]);
  const options = { bundle: true, deps, external: ["react"] };

  addExactAndPrefixEntries(imports, "react-dom", version, options);
  imports["react-dom/client"] = buildEsmPackageUrl("react-dom", version, {
    ...options,
    subpath: "client",
  });
}

function addReactPeerPackageEntries(
  imports: Record<string, string>,
  packageName: string,
  version: string,
  dependencies: Record<string, string>,
) {
  addExactAndPrefixEntries(imports, packageName, version, {
    standalone: true,
    deps: dependencyPinsFor(dependencies, REACT_EXTERNALS),
    external: REACT_EXTERNALS.filter((dependencyName) => dependencyName in dependencies),
  });
}

export function buildDependencyImportMap(dependencies: Record<string, string>) {
  const imports: Record<string, string> = {};

  imports[NODE_POLYFILL_PREFIX] = `${ARAVENA_ESM_BASE}/node/`;
  imports[ARAVENA_NODE_POLYFILL_PREFIX] = `${ARAVENA_ESM_BASE}/node/`;

  for (const [packageName, specifier] of Object.entries(dependencies)) {
    const version = versionFromSpecifier(packageName, specifier);

    if (packageName === "react") {
      addReactEntries(imports, version);
      continue;
    }

    if (packageName === "react-dom") {
      addReactDomEntries(imports, version, dependencies);
      continue;
    }

    addReactPeerPackageEntries(imports, packageName, version, dependencies);
  }

  return { imports } satisfies ImportMap;
}

export function renderImportMapScript(importMap: ImportMap, appModuleUrl: string) {
  const importMapSource = JSON.stringify(importMap, null, 2)
    .split("\n")
    .map((line, index) => (index === 0 ? line : `  ${line}`))
    .join("\n");

  return `;(function () {
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
    '${appModuleUrl}' + Date.now()
  ).catch(function (error) {
    console.error('[emily-realestate] Failed to load app', error)
    revealPageOnFailure()
  })
})()
`;
}

export async function buildImportMapFile() {
  const packageJson = JSON.parse(
    await readFile("package.json", "utf8"),
  ) as PackageJson;

  const importMap = buildDependencyImportMap(packageJson.dependencies ?? {});
  const appModuleUrl = buildAppModuleUrl(packageJson.dependencies ?? {});
  await writeFile("src/importmap.js", renderImportMapScript(importMap, appModuleUrl));
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await buildImportMapFile();
}
