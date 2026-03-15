const importMap = {
  imports: {
    "react": "https://aravena.me/static/esm/react@19.2.4",
    "react/": "https://aravena.me/static/esm/react@19.2.4/",
    "react-dom": "https://aravena.me/static/esm/react-dom@19.2.4",
    "react-dom/": "https://aravena.me/static/esm/react-dom@19.2.4/",
    "react-dom/client": "https://aravena.me/static/esm/react-dom/client@19.2.4",
    "react/jsx-runtime": "https://aravena.me/static/esm/react/jsx-runtime@19.2.4"
  }
}

const existingImportMap = document.querySelector('script[type="importmap"]')
if (!existingImportMap) {
  const script = document.createElement('script')
  script.type = 'importmap'
  script.textContent = JSON.stringify(importMap)
  document.head.appendChild(script)
}
