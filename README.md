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

## License

Private project for Emily B Realty.
