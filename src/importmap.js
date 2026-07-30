;(function () {
  var importMap = {
    "imports": {
      "/node/": "https://aravena.me/static/esm/node/",
      "https://aravena.me/node/": "https://aravena.me/static/esm/node/",
      "@tanstack/react-router": "https://aravena.me/static/esm/@tanstack/react-router@1.170.18?standalone&deps=react@19.2.4,react-dom@19.2.4&external=react,react-dom",
      "@tanstack/react-router/": "https://aravena.me/static/esm/@tanstack/react-router@1.170.18&standalone&deps=react@19.2.4,react-dom@19.2.4&external=react,react-dom/",
      "embla-carousel-react": "https://aravena.me/static/esm/embla-carousel-react@8.6.0?standalone&deps=react@19.2.4,react-dom@19.2.4&external=react,react-dom",
      "embla-carousel-react/": "https://aravena.me/static/esm/embla-carousel-react@8.6.0&standalone&deps=react@19.2.4,react-dom@19.2.4&external=react,react-dom/",
      "react": "https://aravena.me/static/esm/react@19.2.4?bundle",
      "react/": "https://aravena.me/static/esm/react@19.2.4&bundle/",
      "react/jsx-runtime": "https://aravena.me/static/esm/react@19.2.4/jsx-runtime?bundle",
      "react/jsx-dev-runtime": "https://aravena.me/static/esm/react@19.2.4/jsx-dev-runtime?bundle",
      "react-dom": "https://aravena.me/static/esm/react-dom@19.2.4?bundle&deps=react@19.2.4&external=react",
      "react-dom/": "https://aravena.me/static/esm/react-dom@19.2.4&bundle&deps=react@19.2.4&external=react/",
      "react-dom/client": "https://aravena.me/static/esm/react-dom@19.2.4/client?bundle&deps=react@19.2.4&external=react"
    }
  }

  function revealPageOnFailure() {
    document.documentElement.removeAttribute('data-emily-loading')
    document.getElementById('emily-preload-hide')?.remove()
  }

  if (!document.querySelector('script[data-emily-importmap]')) {
    var script = document.createElement('script')
    script.type = 'importmap'
    script.dataset.emilyImportmap = 'true'
    script.textContent = JSON.stringify(importMap)
    document.head.appendChild(script)
  }

  import(
    'https://aravena.me/static/esm/gh/joanca/realstate-website@main/src/main.tsx?jsx&deps=@tanstack/react-router@1.170.18,embla-carousel-react@8.6.0,react@19.2.4,react-dom@19.2.4&external=@tanstack/react-router,embla-carousel-react,react,react-dom&v=' + Date.now()
  ).catch(function (error) {
    console.error('[emily-realestate] Failed to load app', error)
    revealPageOnFailure()
  })
})()
