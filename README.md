# Emily B - Real Estate Website

React single-page application for Emily B, a Portland real estate advisor.

## Tech Stack

- React 19
- TypeScript
- Vite + `@vitejs/plugin-react-swc`
- Tailwind CSS v4 via `@tailwindcss/vite`
- Vitest + Testing Library

## Development

```bash
pnpm dev         # Start Vite dev server on :3000
pnpm css:build   # Build and extract Tailwind CSS to src/output.css
pnpm test        # Run tests
pnpm typecheck   # Run TypeScript checks
```

## Architecture

Entry flow:

```text
src/index.html -> src/main.tsx -> src/App.tsx
```

- `src/main.tsx` mounts React into `#emily-realestate` and renders inside a Shadow DOM root.
- Global font-face rules are injected into `document.head`.
- `src/getShadowStylesheetHref.ts` picks local `output.css` in dev/localhost and jsDelivr in production.
- `src/utils/normalizeEmbeddedDom.ts` normalizes host-page wrappers after hydration when embedded.

## File Structure

```text
src/
├── index.html
├── embedded.html
├── main.tsx
├── App.tsx
├── styles.css
├── output.css
├── getShadowStylesheetHref.ts
├── utils/
│   └── normalizeEmbeddedDom.ts
├── test/
│   ├── setup.ts
│   └── utils/embeddedFixture.ts
└── *.test.ts(x)

vite.config.ts
tsconfig.json
tsconfig.node.json
package.json
```

## Styling

- Tailwind v4 is configured in `src/styles.css` using CSS-first `@theme` tokens.
- `src/output.css` is generated and committed.
- Do not edit `src/output.css` directly.

## Testing

- Test runner: Vitest (`pnpm test`)
- Environment: jsdom
- Setup file: `src/test/setup.ts`

## Deployment Notes

- The repository keeps source in TypeScript/TSX.
- Embedded usage imports `./main.tsx` from HTML entrypoints in `src/index.html` and `src/embedded.html`.
- No `@src` import alias is configured; local imports are relative.

## WordPress Embed

Use this snippet in WordPress to embed the app from esm.sh and keep the page hidden until React finishes first mount:

```html
<script>
  document.documentElement.setAttribute("data-emily-loading", "true");

  const style = document.createElement("style");
  style.id = "emily-preload-hide";
  style.textContent =
    'html[data-emily-loading="true"] body, html[data-emily-loading="true"] body * { visibility: hidden !important; }';
  document.head.appendChild(style);

  window.setTimeout(() => {
    document.documentElement.removeAttribute("data-emily-loading");
    document.getElementById("emily-preload-hide")?.remove();
  }, 7000);
</script>

<main id="emily-realestate"></main>
<script type="module">
  import "https://aravena.me/static/esm/gh/joanca/realstate-website@main/src/main.tsx?jsx";
</script>
```

At runtime, `src/App.tsx` removes `data-emily-loading` and the temporary style in a `useLayoutEffect`, so the full page appears at once after the app mounts.

## Listings Widget

- Technical documentation for the legacy listings integration is in `docs/listings-widget.md`.

## License

Private project for Emily B Realty.
