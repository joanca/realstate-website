# AGENTS.md

## 1. Overview

React single-page application for Emily B real estate website. Uses esm.sh CDN for JSX transformation with PostCSS/Tailwind CSS build process for optimized styles.

## 2. Project Agent Workflow

This project uses a hybrid workflow:
- **JSX**: esm.sh transforms JSX on-the-fly (no bundler)
- **CSS**: PostCSS + Tailwind CSS v4 build process
- **GitHub-backed**: esm.sh fetches directly from GitHub
- **Pre-commit hook**: Automatically builds CSS before commits

## 3. Project CLI Commands

### Development

```bash
pnpm dev           # Start dev server (NODE_ENV=dev, port 3000)
pnpm start         # Start production server (NODE_ENV=production, port 3000)
pnpm css:build     # Build Tailwind CSS once
pnpm css:watch     # Watch and rebuild CSS on changes
```

### Git Commands

```bash
git status -s                                    # Short status
git diff                                         # Show unstaged changes
git diff --cached                               # Show staged changes
git ls-files --others --exclude-standard        # List untracked files
git log --oneline --decorate --graph --all      # Commit history
```

### No Test/Lint

- **No test command** - No tests configured
- **No lint command** - No linter configured

## 4. Architecture Notes

### Entry Point Flow

```
index.html
  └─ imports main.jsx via esm.sh ?jsx
       └─ imports App.jsx (relative)
            └─ imports output.css (built Tailwind)
            └─ imports react (via import map)
```

### Import Map

```json
{
  "imports": {
    "react": "https://esm.sh/react@18",
    "react-dom/client": "https://esm.sh/react-dom@18/client",
    "react/jsx-runtime": "https://esm.sh/react@18/jsx-runtime",
    "@src/": "https://esm.sh/gh/joanca/realstate-website@main/src/"
  }
}
```

### Key Patterns

1. **JSX Transformation**: esm.sh `?jsx` parameter transforms JSX server-side
2. **Import Resolution**: Import maps handle bare imports
3. **GitHub Integration**: esm.sh/gh/ loads files directly from GitHub repo
4. **CSS Build**: PostCSS compiles Tailwind directives to optimized CSS

## 5. File Structure

```
src/
├── index.html        # Entry point with import maps
├── main.jsx          # React root mount
├── App.jsx           # Main component (all content), imports output.css
├── styles.css        # Tailwind directives + custom CSS (source)
├── output.css        # Compiled Tailwind CSS (generated, tracked in git)
└── assets/
    └── images/       # Static image assets

package.json          # npm scripts + dev dependencies
pnpm-lock.yaml        # Lock file
tailwind.config.js    # Tailwind configuration
postcss.config.js     # PostCSS configuration
.git/hooks/pre-commit # Auto-builds CSS before commits
```

## 6. Import Conventions

### Within main.jsx

```jsx
import App from "./App.jsx"  // Relative import works here
```

### Within App.jsx

```jsx
import './output.css'              // Compiled Tailwind CSS
import { useEffect } from "react"  // Import map resolves to esm.sh
```

### Using @src Alias (in index.html or other contexts)

```jsx
import App from "@src/App.jsx"
```

## 7. Deployment Workflow

### Development Cycle

1. Edit files locally
2. Run `pnpm dev` to start local server
3. View at http://localhost:3000
4. For CSS changes, run `pnpm css:watch` in another terminal (or let pre-commit hook build)
5. Commit changes - pre-commit hook auto-builds CSS
6. Push to GitHub for esm.sh to pick up

### Production Deployment

1. Push to `main` branch: `git push origin main`
2. esm.sh automatically serves latest from GitHub
3. Pre-commit hook ensures CSS is always built before commit
4. No CI/CD pipeline needed

### GitHub Repository

- **Repo**: `github.com/joanca/realstate-website`
- **Branch**: `main`
- **esm.sh URL**: `https://esm.sh/gh/joanca/realstate-website@main/src/...`

## 8. Styling

### Tailwind CSS

- Built with PostCSS + Tailwind CSS v4
- Configuration in `tailwind.config.js`
- Source file: `src/styles.css` (contains Tailwind directives)
- Output file: `src/output.css` (compiled, imported by App.jsx)
- Custom colors: brand-orange, brand-blue, brand-cream-*, text-dark, text-green
- Custom fonts: archivo, archivo-condensed, archivo-semi-expanded, work-sans

### Custom CSS

- `styles.css` contains @font-face declarations and custom classes
- `.house-dot-i` class for special house icon dot in "advisor"
- CSS is compiled into `output.css`

### CSS Build Process

```bash
# One-time build
pnpm css:build

# Watch mode (recommended during development)
pnpm css:watch
```

## 9. Dependencies

### Runtime (via CDN)

- React 18.x
- ReactDOM 18.x

### Dev Dependencies

- `serve` - Static file server for local development
- `tailwindcss` - Tailwind CSS framework
- `@tailwindcss/postcss` - Tailwind CSS v4 PostCSS plugin
- `postcss` - CSS transformer
- `postcss-cli` - CLI for PostCSS
- `autoprefixer` - Adds vendor prefixes

## 10. Common Tasks

### Add New Component

1. Create `src/components/NewComponent.jsx`
2. Import in `App.jsx`: `import NewComponent from "./components/NewComponent.jsx"`
3. Use Tailwind classes as needed
4. Commit changes (CSS auto-rebuilds via pre-commit hook)
5. Push to GitHub

### Add New Tailwind Color/Font

1. Edit `tailwind.config.js` to add custom colors/fonts
2. Run `pnpm css:build` or commit (auto-builds)
3. Push to GitHub

### Add New Font

1. Add @font-face to `src/styles.css`
2. Add to Tailwind config fontFamily in `tailwind.config.js`
3. Run `pnpm css:build` or commit (auto-builds)
4. Push to GitHub

### Update React Version

1. Edit import map in `index.html`
2. Change `react@18` to desired version
3. Push to GitHub

## 11. Troubleshooting

### "Minified React error #31"

- **Cause**: Importing React element instead of component
- **Fix**: Ensure `main.jsx` uses `?jsx` parameter in import URL

### Module Not Found

- **Cause**: esm.sh cache or GitHub not updated
- **Fix**: Wait a few seconds after push, or clear browser cache

### Styles Not Loading

- **Cause**: CSS not built or output.css missing
- **Fix**: Run `pnpm css:build` then commit the updated output.css

### Tailwind Classes Not Working

- **Cause**: CSS not rebuilt after changes
- **Fix**: Run `pnpm css:build` or let pre-commit hook handle it

### Pre-commit Hook Not Running

- **Cause**: Hook not executable
- **Fix**: Run `chmod +x .git/hooks/pre-commit`

## 12. Agent Restrictions

- **Do not** add bundlers (webpack, vite, etc.) - keep JSX via esm.sh
- **Do not** modify `src/output.css` directly - it's generated from `styles.css`
- **Do not** modify import map without updating all related imports
- **Always** run `pnpm css:build` if you modify Tailwind config or styles.css before committing
- **Always** commit `src/output.css` after CSS changes
- **Always** test with `pnpm dev` locally before pushing