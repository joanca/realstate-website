import { createRoot } from "react-dom/client"
import App from "./App.jsx"
import "./styles.css"
import { getShadowStylesheetHref } from './getShadowStylesheetHref.js'

const GLOBAL_FONT_FACE_CSS = `
@font-face {
  font-family: 'Archivo';
  src: url('https://cdn.jsdelivr.net/gh/Omnibus-Type/Archivo@master/fonts/webfonts/Archivo-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
}

@font-face {
  font-family: 'Archivo';
  src: url('https://cdn.jsdelivr.net/gh/Omnibus-Type/Archivo@master/fonts/webfonts/Archivo-Italic.woff2') format('woff2');
  font-weight: 400;
  font-style: italic;
}

@font-face {
  font-family: 'Archivo';
  src: url('https://cdn.jsdelivr.net/gh/Omnibus-Type/Archivo@master/fonts/webfonts/Archivo-Medium.woff2') format('woff2');
  font-weight: 500;
  font-style: normal;
}

@font-face {
  font-family: 'Archivo';
  src: url('https://cdn.jsdelivr.net/gh/Omnibus-Type/Archivo@master/fonts/webfonts/Archivo-MediumItalic.woff2') format('woff2');
  font-weight: 500;
  font-style: italic;
}

@font-face {
  font-family: 'Archivo';
  src: url('https://cdn.jsdelivr.net/gh/Omnibus-Type/Archivo@master/fonts/webfonts/Archivo-Bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
}

@font-face {
  font-family: 'Archivo Condensed';
  src: url('https://cdn.jsdelivr.net/gh/Omnibus-Type/Archivo@master/fonts/webfonts/ArchivoCondensed-Bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
}

@font-face {
  font-family: 'Archivo Condensed';
  src: url('https://cdn.jsdelivr.net/gh/Omnibus-Type/Archivo@master/fonts/webfonts/ArchivoCondensed-ExtraBold.woff2') format('woff2');
  font-weight: 800;
  font-style: normal;
}

@font-face {
  font-family: 'Archivo SemiExpanded';
  src: url('https://cdn.jsdelivr.net/gh/Omnibus-Type/Archivo@master/fonts/webfonts/ArchivoSemiExpanded-Medium.woff2') format('woff2');
  font-weight: 500;
  font-style: normal;
}

@font-face {
  font-family: 'Archivo SemiExpanded';
  src: url('https://cdn.jsdelivr.net/gh/Omnibus-Type/Archivo@master/fonts/webfonts/ArchivoSemiExpanded-Bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
}

@font-face {
  font-family: 'Work Sans';
  src: url('https://cdn.jsdelivr.net/gh/weiweihuanghuang/Work-Sans@master/fonts/webfonts/WorkSans-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
}

@font-face {
  font-family: 'Work Sans';
  src: url('https://cdn.jsdelivr.net/gh/weiweihuanghuang/Work-Sans@master/fonts/webfonts/WorkSans-Italic.woff2') format('woff2');
  font-weight: 400;
  font-style: italic;
}

@font-face {
  font-family: 'Work Sans';
  src: url('https://cdn.jsdelivr.net/gh/weiweihuanghuang/Work-Sans@master/fonts/webfonts/WorkSans-Medium.woff2') format('woff2');
  font-weight: 500;
  font-style: normal;
}

@font-face {
  font-family: 'Work Sans';
  src: url('https://cdn.jsdelivr.net/gh/weiweihuanghuang/Work-Sans@master/fonts/webfonts/WorkSans-MediumItalic.woff2') format('woff2');
  font-weight: 500;
  font-style: italic;
}

@font-face {
  font-family: 'Work Sans';
  src: url('https://cdn.jsdelivr.net/gh/weiweihuanghuang/Work-Sans@master/fonts/webfonts/WorkSans-SemiBold.woff2') format('woff2');
  font-weight: 600;
  font-style: normal;
}

@font-face {
  font-family: 'Work Sans';
  src: url('https://cdn.jsdelivr.net/gh/weiweihuanghuang/Work-Sans@master/fonts/webfonts/WorkSans-SemiBoldItalic.woff2') format('woff2');
  font-weight: 600;
  font-style: italic;
}
`

const host = document.getElementById('emily-realestate')

if (!host) {
  throw new Error('Missing #emily-realestate mount element')
}

if (!document.getElementById('emily-global-fonts')) {
  const globalFonts = document.createElement('style')
  globalFonts.id = 'emily-global-fonts'
  globalFonts.textContent = GLOBAL_FONT_FACE_CSS
  document.head.append(globalFonts)
}

if (document.fonts && typeof document.fonts.ready?.then === 'function') {
  document.fonts.ready.then(() => {
    const hasWorkSans = document.fonts.check('16px "Work Sans"')
    const hasArchivo = document.fonts.check('16px "Archivo"')

    if (!hasWorkSans || !hasArchivo) {
      console.warn('[emily-realestate] Custom fonts failed to load; browser fallbacks may be used.', {
        workSansLoaded: hasWorkSans,
        archivoLoaded: hasArchivo,
      })
    }
  })
}

const shadowRoot = host.shadowRoot ?? host.attachShadow({ mode: 'open' })

if (!shadowRoot.querySelector('#emily-shadow-base')) {
  const baseStyles = document.createElement('style')
  baseStyles.id = 'emily-shadow-base'
  baseStyles.textContent = `
    :host {
      all: initial;
      display: block;
      position: relative;
      isolation: isolate;
      contain: layout style paint;
      font-family: "Work Sans", sans-serif;
      color: #3a3a3a;
      font-weight: 400;
      font-style: normal;
      line-height: 1.5;
      font-size: 16px;
      letter-spacing: normal;
      text-transform: none;
      text-indent: 0;
      word-spacing: normal;
      text-align: left;
      direction: ltr;
      writing-mode: horizontal-tb;
      text-rendering: optimizeLegibility;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    :host,
    :host *,
    :host *::before,
    :host *::after {
      box-sizing: border-box;
    }

    :host button,
    :host input,
    :host textarea,
    :host select {
      font: inherit;
      color: inherit;
    }
  `
  shadowRoot.append(baseStyles)
}

if (!shadowRoot.querySelector('#emily-shadow-stylesheet')) {
  const appStylesheet = document.createElement('link')
  appStylesheet.id = 'emily-shadow-stylesheet'
  appStylesheet.rel = 'stylesheet'
  appStylesheet.setAttribute('data-keep-stylesheet', '')
  appStylesheet.href = getShadowStylesheetHref()
  shadowRoot.append(appStylesheet)
}

let mountNode = shadowRoot.querySelector('#emily-shadow-app')

if (!mountNode) {
  mountNode = document.createElement('div')
  mountNode.id = 'emily-shadow-app'
  shadowRoot.append(mountNode)
}

createRoot(mountNode).render(<App />)
