import { describe, expect, it } from "vitest";
import {
  ARAVENA_ESM_BASE,
  buildAppModuleUrl,
  buildDependencyImportMap,
  buildEsmPackagePrefixUrl,
  buildEsmPackageUrl,
  buildGithubModuleSpecifier,
  renderImportMapScript,
  versionFromSpecifier,
} from "./buildImportmap";

const dependencies = {
  "@tanstack/react-router": "^1.170.18",
  "embla-carousel-react": "8.6.0",
  react: "19.2.4",
  "react-dom": "19.2.4",
};

describe("versionFromSpecifier", () => {
  it("extracts semver versions from package specifiers", () => {
    expect(versionFromSpecifier("react", "^19.2.4")).toBe("19.2.4");
    expect(versionFromSpecifier("example", "~1.2.3-beta.1")).toBe("1.2.3-beta.1");
  });

  it("throws for unsupported specifiers", () => {
    expect(() => versionFromSpecifier("workspace-package", "workspace:*")).toThrow(
      "Unsupported version specifier for workspace-package: workspace:*",
    );
  });
});

describe("esm package URL builders", () => {
  it("builds exact package URLs with deps and external query params", () => {
    expect(
      buildEsmPackageUrl("@tanstack/react-router", "1.170.18", {
        standalone: true,
        deps: [
          { name: "react", version: "19.2.4" },
          { name: "react-dom", version: "19.2.4" },
        ],
        external: ["react", "react-dom"],
      }),
    ).toBe(
      `${ARAVENA_ESM_BASE}/@tanstack/react-router@1.170.18?standalone&deps=react@19.2.4,react-dom@19.2.4&external=react,react-dom`,
    );
  });

  it("builds prefix URLs using esm.sh ampersand query syntax", () => {
    expect(
      buildEsmPackagePrefixUrl("@tanstack/react-router", "1.170.18", {
        standalone: true,
        deps: [
          { name: "react", version: "19.2.4" },
          { name: "react-dom", version: "19.2.4" },
        ],
        external: ["react", "react-dom"],
      }),
    ).toBe(
      `${ARAVENA_ESM_BASE}/@tanstack/react-router@1.170.18&standalone&deps=react@19.2.4,react-dom@19.2.4&external=react,react-dom/`,
    );
  });
});

describe("app module URL builder", () => {
  it("builds GitHub module specifiers from structured pieces", () => {
    expect(
      buildGithubModuleSpecifier({
        owner: "joanca",
        repo: "realstate-website",
        ref: "main",
        path: "src/main.tsx",
      }),
    ).toBe("gh/joanca/realstate-website@main/src/main.tsx");
  });

  it("builds the app module URL from dependency metadata", () => {
    expect(buildAppModuleUrl(dependencies)).toBe(
      `${ARAVENA_ESM_BASE}/gh/joanca/realstate-website@main/src/main.tsx?jsx&deps=@tanstack/react-router@1.170.18,embla-carousel-react@8.6.0,react@19.2.4,react-dom@19.2.4&external=@tanstack/react-router,embla-carousel-react,react,react-dom&v=`,
    );
    expect(buildAppModuleUrl(dependencies)).not.toContain("/static/esm/*gh");
  });
});

describe("buildDependencyImportMap", () => {
  it("builds React and React DOM entries that bundle their internal dependencies", () => {
    const { imports } = buildDependencyImportMap(dependencies);

    expect(imports.react).toBe(`${ARAVENA_ESM_BASE}/react@19.2.4?bundle`);
    expect(imports["react/"]).toBe(`${ARAVENA_ESM_BASE}/react@19.2.4&bundle/`);
    expect(imports["react/jsx-runtime"]).toBe(
      `${ARAVENA_ESM_BASE}/react@19.2.4/jsx-runtime?bundle`,
    );
    expect(imports["react/jsx-dev-runtime"]).toBe(
      `${ARAVENA_ESM_BASE}/react@19.2.4/jsx-dev-runtime?bundle`,
    );
    expect(imports["react-dom/client"]).toBe(
      `${ARAVENA_ESM_BASE}/react-dom@19.2.4/client?bundle&deps=react@19.2.4&external=react`,
    );
  });

  it("builds standalone React peer package entries without externalizing every dependency", () => {
    const { imports } = buildDependencyImportMap(dependencies);

    expect(imports["@tanstack/react-router"]).toBe(
      `${ARAVENA_ESM_BASE}/@tanstack/react-router@1.170.18?standalone&deps=react@19.2.4,react-dom@19.2.4&external=react,react-dom`,
    );
    expect(imports["@tanstack/react-router/"]).toBe(
      `${ARAVENA_ESM_BASE}/@tanstack/react-router@1.170.18&standalone&deps=react@19.2.4,react-dom@19.2.4&external=react,react-dom/`,
    );
    expect(imports["embla-carousel-react"]).toBe(
      `${ARAVENA_ESM_BASE}/embla-carousel-react@8.6.0?standalone&deps=react@19.2.4,react-dom@19.2.4&external=react,react-dom`,
    );
  });

  it("includes Node polyfill prefix and does not hardcode scheduler", () => {
    const { imports } = buildDependencyImportMap(dependencies);

    expect(imports["/node/"]).toBe(`${ARAVENA_ESM_BASE}/node/`);
    expect(imports["https://aravena.me/node/"]).toBe(`${ARAVENA_ESM_BASE}/node/`);
    expect(imports.scheduler).toBeUndefined();
    expect(Object.values(imports).some((value) => value.includes("*scheduler"))).toBe(false);
  });

  it("does not generate malformed query prefix entries", () => {
    const { imports } = buildDependencyImportMap(dependencies);

    expect(Object.values(imports).some((value) => value.includes("?standalone/"))).toBe(false);
    expect(Object.values(imports).some((value) => value.includes("?bundle/"))).toBe(false);
    expect(Object.values(imports).some((value) => value.includes("/static/esm/*"))).toBe(false);
  });
});

describe("renderImportMapScript", () => {
  it("renders the generated app module URL", () => {
    const appModuleUrl = buildAppModuleUrl(dependencies);
    const script = renderImportMapScript(buildDependencyImportMap(dependencies), appModuleUrl);

    expect(script).toContain(
      `import(\n    '${appModuleUrl}' + Date.now()\n  )`,
    );
  });
});
