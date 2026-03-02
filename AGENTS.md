# AGENTS.md

## 1. Overview

React single-page application for Emily B real estate website. Built with zero build tools - uses esm.sh CDN for JSX transformation and module resolution.

## 2. Project Agent Workflow

This project uses a simplified workflow:
- **No build step** - esm.sh transforms JSX on-the-fly
- **GitHub-backed** - esm.sh fetches directly from GitHub
- **CDN-first** - All dependencies via CDN (React, Tailwind, fonts)

## 3. Project CLI Commands

### Development

```bash
pnpm dev      # Start dev server (NODE_ENV=dev, port 3000)
pnpm start    # Start production server (NODE_ENV=production, port 3000)
```

### Git Commands

```bash
git status -s                                    # Short status
git diff                                         # Show unstaged changes
git diff --cached                               # Show staged changes
git ls-files --others --exclude-standard        # List untracked files
git log --oneline --decorate --graph --all      # Commit history
```

### No Build/Test/Lint

- **No build command** - Zero build step architecture
- **No test command** - No tests configured
- **No lint command** - No linter configured

## 4. Architecture Notes

### Entry Point Flow

```
index.html
  └─ imports main.jsx via esm.sh ?jsx
       └─ imports App.jsx (relative)
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

## 5. File Structure

```
src/
├── index.html        # Entry point with Tailwind config + import maps
├── main.jsx          # React root mount
├── App.jsx           # Main component (all content)
├── styles.css        # @font-face declarations
└── assets/
    └── images/       # Static image assets

package.json          # npm scripts only (serve)
pnpm-lock.yaml        # Lock file for serve dependency
```

## 6. Import Conventions

### Within main.jsx

```jsx
import App from "./App.jsx"  // Relative import works here
```

### Within App.jsx

```jsx
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
4. Changes require push to GitHub for esm.sh to pick up

### Production Deployment

1. Push to `main` branch: `git push origin main`
2. esm.sh automatically serves latest from GitHub
3. No CI/CD pipeline needed

### GitHub Repository

- **Repo**: `github.com/joanca/realstate-website`
- **Branch**: `main`
- **esm.sh URL**: `https://esm.sh/gh/joanca/realstate-website@main/src/...`

## 8. Styling

### Tailwind CSS

- Loaded via CDN in `index.html`
- Custom config in inline `<script>` tag
- Custom colors: brand-orange, brand-blue, brand-cream-*, text-dark, text-green
- Custom fonts: archivo, archivo-condensed, archivo-semi-expanded, work-sans

### Custom CSS

- `styles.css` contains @font-face declarations
- `.house-dot-i` class for special house icon dot in "advisor"
- Loaded via jsDelivr CDN

## 9. Dependencies

### Runtime (via CDN)

- React 18.x
- ReactDOM 18.x
- Tailwind CSS (latest)

### Dev Dependencies

- `serve` - Static file server for local development

## 10. Common Tasks

### Add New Component

1. Create `src/components/NewComponent.jsx`
2. Import in `App.jsx`: `import NewComponent from "./components/NewComponent.jsx"`
3. Push to GitHub

### Update React Version

1. Edit import map in `index.html`
2. Change `react@18` to desired version
3. Push to GitHub

### Add New Font

1. Add @font-face to `styles.css`
2. Add to Tailwind config fontFamily in `index.html`
3. Push to GitHub

## 11. Troubleshooting

### "Minified React error #31"

- **Cause**: Importing React element instead of component
- **Fix**: Ensure `main.jsx` uses `?jsx` parameter in import URL

### Module Not Found

- **Cause**: esm.sh cache or GitHub not updated
- **Fix**: Wait a few seconds after push, or clear browser cache

### Styles Not Loading

- **Cause**: CSS file path incorrect
- **Fix**: Check jsDelivr URL in `index.html` link tag

## 12. Agent Restrictions

- **Do not** add build tools (webpack, vite, etc.)
- **Do not** add npm dependencies (keep it CDN-based)
- **Do not** modify import map without updating all related imports
- **Always** push to GitHub after changes for esm.sh to serve updates
- **Always** test with `pnpm dev` locally before pushing
