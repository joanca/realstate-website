const SHADOW_BASE_STYLE_ID = 'emily-shadow-base'
const SHADOW_STYLESHEET_ID = 'emily-shadow-stylesheet'
const SHADOW_APP_ID = 'emily-shadow-app'

const SHADOW_BASE_CSS = `
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

export function getOrCreateShadowRoot(host: HTMLElement) {
  return host.shadowRoot ?? host.attachShadow({ mode: 'open' })
}

export function ensureShadowBaseStyles(shadowRoot: ShadowRoot) {
  if (!shadowRoot.querySelector(`#${SHADOW_BASE_STYLE_ID}`)) {
    const baseStyles = document.createElement('style')
    baseStyles.id = SHADOW_BASE_STYLE_ID
    baseStyles.textContent = SHADOW_BASE_CSS
    shadowRoot.append(baseStyles)
  }
}

export function ensureShadowStylesheet(shadowRoot: ShadowRoot, href: string) {
  if (!shadowRoot.querySelector(`#${SHADOW_STYLESHEET_ID}`)) {
    const appStylesheet = document.createElement('link')
    appStylesheet.id = SHADOW_STYLESHEET_ID
    appStylesheet.rel = 'stylesheet'
    appStylesheet.setAttribute('data-keep-stylesheet', '')
    appStylesheet.href = href
    shadowRoot.append(appStylesheet)
  }
}

export function ensureShadowMountNode(shadowRoot: ShadowRoot) {
  const existingNode = shadowRoot.querySelector<HTMLElement>(`#${SHADOW_APP_ID}`)

  if (existingNode) {
    return existingNode
  }

  const mountNode = document.createElement('div')
  mountNode.id = SHADOW_APP_ID
  shadowRoot.append(mountNode)
  return mountNode
}
