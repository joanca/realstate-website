# AGENTS.md

## 1. Overview

React single-page application for Emily B real estate website. Uses Vite for local development with SWC-based JSX transformation, and Tailwind CSS v4 via `@tailwindcss/vite` plugin.

## 2. Project Agent Workflow

This project uses a hybrid workflow:
- **Development**: Vite dev server with @vitejs/plugin-react-swc for JSX transformation and HMR
- **CSS**: Tailwind CSS v4 via `@tailwindcss/vite` plugin
- **Production**: esm.sh CDN serves files from GitHub (separate deployment)
- **Pre-commit hook**: Automatically builds CSS before commits

## 3. Project CLI Commands

### Development

```bash
pnpm dev           # Start Vite dev server (port 3000, HMR enabled)
pnpm css:build     # Build Tailwind CSS to src/output.css
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

### Entry Point Flow (Development)

```
index.html
  └─ imports main.jsx (Vite transforms JSX via SWC)
       └─ imports App.jsx (relative)
            └─ imports output.css (built Tailwind)
            └─ imports react (from node_modules)
```

### Production (esm.sh)

Production deployment uses a separate `index.html` that imports via esm.sh CDN with `?jsx` parameter for JSX transformation.

### Key Patterns

1. **JSX Transformation (Dev)**: Vite + @vitejs/plugin-react-swc transforms JSX locally
2. **JSX Transformation (Prod)**: esm.sh `?jsx` parameter transforms JSX server-side
3. **Import Resolution**: Vite resolves bare imports from node_modules
4. **CSS Build**: Vite build extracts CSS to `src/output.css`

## 5. File Structure

```
src/
├── index.html        # Entry point for development
├── main.jsx          # React root mount
├── App.jsx           # Main component (all content), imports output.css
├── styles.css        # Tailwind v4 config + @font-face declarations
├── output.css        # Compiled Tailwind CSS (generated, tracked in git)
└── assets/
    └── images/       # Static image assets

vite.config.js        # Vite configuration
package.json          # npm scripts + dev dependencies
pnpm-lock.yaml        # Lock file
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
import { useEffect } from "react"  // Vite resolves from node_modules
```

## 7. Development Workflow

### Local Development

1. Run `pnpm dev` to start Vite dev server
2. View at http://localhost:3000
3. Edit files - Vite provides hot module replacement (HMR)
4. CSS is compiled on-the-fly by `@tailwindcss/vite`
5. Commit changes - pre-commit hook auto-builds CSS

### Production Deployment

1. Push to `main` branch: `git push origin main`
2. esm.sh automatically serves latest from GitHub
3. Pre-commit hook ensures CSS is always built before commit

### GitHub Repository

- **Repo**: `github.com/joanca/realstate-website`
- **Branch**: `main`

## 8. Styling

### Tailwind CSS v4

- Integrated via `@tailwindcss/vite` plugin
- Configuration in `src/styles.css` using `@theme {}` block
- Custom colors: brand-orange, brand-blue, text-dark, text-green
- Custom fonts: archivo, archivo-condensed, archivo-semi-expanded, work-sans

### CSS Configuration (src/styles.css)

```css
@import "tailwindcss" source("./");

@theme {
  --color-brand-orange: #bd760c;
  --color-brand-blue: #b6cce4;
  /* ... */
}
```

### Custom CSS

- `styles.css` contains @font-face declarations and custom classes
- `.house-dot-i` class for special house icon dot in "advisor"
- CSS is compiled into `output.css`

### CSS Build Process

```bash
# Build CSS for production
pnpm css:build
```

This runs `vite build` and extracts the CSS to `src/output.css`.

## 9. Dependencies

### Dev Dependencies

- `vite` - Development server and build tool
- `@vitejs/plugin-react-swc` - SWC-based React plugin for Vite
- `@tailwindcss/vite` - Tailwind CSS v4 Vite plugin
- `react` - React library (for development)
- `react-dom` - React DOM (for development)
- `tailwindcss` - Tailwind CSS framework

### Production Dependencies

- None - React loaded via esm.sh CDN in production

## 10. Common Tasks

### Add New Component

1. Create `src/components/NewComponent.jsx`
2. Import in `App.jsx`: `import NewComponent from "./components/NewComponent.jsx"`
3. Use Tailwind classes as needed
4. Commit changes (CSS auto-rebuilds via pre-commit hook)
5. Push to GitHub

### Add New Tailwind Color/Font

1. Edit `src/styles.css` to add variables in `@theme {}` block
2. Run `pnpm css:build` or commit (auto-builds)
3. Push to GitHub

### Add New Font

1. Add @font-face to `src/styles.css`
2. Add font variable in `@theme {}` block
3. Run `pnpm css:build` or commit (auto-builds)
4. Push to GitHub

### Update React Version

1. Run `pnpm add -D react react-dom` to update dev dependencies
2. Push to GitHub

## 11. Troubleshooting

### Vite Dev Server Not Starting

- **Cause**: Missing dependencies or port in use
- **Fix**: Run `pnpm install` or kill process on port 3000

### Styles Not Loading

- **Cause**: CSS not built
- **Fix**: Run `pnpm css:build`

### Tailwind Classes Not Working

- **Cause**: Classes not being detected
- **Fix**: Ensure `source("./")` is in `styles.css` import

### Pre-commit Hook Not Running

- **Cause**: Hook not executable
- **Fix**: Run `chmod +x .git/hooks/pre-commit`

### SWC Build Scripts Warning

- **Cause**: pnpm requires explicit approval for build scripts
- **Fix**: Run `pnpm approve-builds` and select @swc/core and esbuild

## 12. Agent Restrictions

- **Do not** modify `src/output.css` directly - it's generated from `styles.css`
- **Do not** create `tailwind.config.js` - Tailwind v4 uses CSS-first configuration
- **Do not** add runtime dependencies - keep React as dev dependency only
- **Always** run `pnpm css:build` if you modify styles.css before committing
- **Always** commit `src/output.css` after CSS changes
- **Always** test with `pnpm dev` locally before pushing