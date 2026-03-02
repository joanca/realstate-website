# Emily B - Real Estate Website

A React single-page application for Emily B, a Portland real estate advisor. Built with modern web technologies using esm.sh CDN for zero-build development.

## Tech Stack

- **React 18** - UI framework (via esm.sh CDN)
- **Tailwind CSS** - Utility-first CSS (via CDN)
- **esm.sh** - CDN that transforms JSX on-the-fly from GitHub
- **No build tools** - Everything runs directly in the browser

## Development

```bash
pnpm dev    # Start development server (NODE_ENV=dev)
pnpm start  # Start production server (NODE_ENV=production)
```

The site will be available at `http://localhost:3000`

## Architecture

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  index.html │────▶│   main.jsx  │────▶│   App.jsx   │
│  (entry)    │     │  (mount)    │     │  (content)  │
└─────────────┘     └─────────────┘     └─────────────┘
       │                   │                   │
       │                   │                   │
       ▼                   ▼                   ▼
  Tailwind CDN      esm.sh ?jsx          esm.sh CDN
  styles.css        transforms JSX       from GitHub
```

### How It Works

1. `index.html` is the entry point
2. It imports `main.jsx` via esm.sh with `?jsx` parameter
3. esm.sh fetches the file from GitHub and transforms JSX to JS
4. `main.jsx` mounts the React app and renders `App.jsx`
5. All imports use esm.sh CDN for dependency resolution

## File Structure

```
src/
├── index.html        # Entry point HTML
├── main.jsx          # React root mount
├── App.jsx           # Main application component
├── styles.css        # Custom fonts and styles
└── assets/
    └── images/       # Static images
```

## Import Patterns

### Using @src alias

```jsx
// From anywhere in the app
import Component from "@src/components/Component.jsx"
```

The `@src/` alias is defined in the import map and resolves to:
`https://esm.sh/gh/joanca/realstate-website@main/src/`

### Direct esm.sh imports

```jsx
import { useState } from "react"
import { createRoot } from "react-dom/client"
```

Import maps resolve these to esm.sh URLs automatically.

## Deployment

### GitHub-backed deployment

This project uses a GitHub-backed workflow:

1. **Edit locally** - Make changes to files
2. **Push to GitHub** - `git push origin main`
3. **esm.sh serves** - esm.sh fetches from GitHub and transforms JSX

No build step, no CI/CD pipeline needed.

### Production URL

The site is served directly from:
```
https://esm.sh/gh/joanca/realstate-website@main/src/index.html
```

Or use a static file server like `pnpm start`.

## Key Files

| File | Purpose |
|------|---------|
| `index.html` | HTML shell with Tailwind config, import maps |
| `main.jsx` | React initialization and root mount |
| `App.jsx` | Main component with all page content |
| `styles.css` | @font-face declarations for custom fonts |
| `package.json` | Project metadata and npm scripts |

## Custom Fonts

The site uses custom web fonts loaded via CDN:

- **Archivo** - Primary font family
- **Archivo Condensed** - Headings
- **Archivo SemiExpanded** - Accents
- **Work Sans** - Body text

All fonts are loaded from jsDelivr CDN in `styles.css`.

## Tailwind Configuration

Custom theme extensions in `index.html`:

```javascript
tailwind.config = {
  theme: {
    extend: {
      colors: {
        'brand-orange': '#bd760c',
        'brand-blue': '#b6cce4',
        'brand-cream-light': '#fffaf3',
        'brand-cream-dark': '#ffeed4',
        'text-dark': '#3a3a3a',
        'text-green': '#032b21',
      },
      fontFamily: {
        'archivo': ['"Archivo"', 'sans-serif'],
        'archivo-condensed': ['"Archivo Condensed"', 'sans-serif'],
        'archivo-semi-expanded': ['"Archivo SemiExpanded"', 'sans-serif'],
        'work-sans': ['"Work Sans"', 'sans-serif'],
      },
    },
  },
}
```

## License

Private project for Emily B Realty.
