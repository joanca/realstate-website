;(function () {
  var importMap = {
    "imports": {
      "@tanstack/react-router": "https://aravena.me/static/esm/*@tanstack/react-router@1.170.18",
      "@tanstack/react-router/": "https://aravena.me/static/esm/*@tanstack/react-router@1.170.18/",
      "embla-carousel-react": "https://aravena.me/static/esm/*embla-carousel-react@8.6.0?standalone",
      "react": "https://aravena.me/static/esm/*react@19.2.4",
      "react/": "https://aravena.me/static/esm/*react@19.2.4/",
      "react-dom": "https://aravena.me/static/esm/*react-dom@19.2.4",
      "react-dom/": "https://aravena.me/static/esm/*react-dom@19.2.4/",
      "scheduler": "https://aravena.me/static/esm/*scheduler@0.27.0"
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
    'https://aravena.me/static/esm/*gh/joanca/realstate-website@main/src/main.tsx?jsx&v=' + Date.now()
  ).catch(function (error) {
    console.error('[emily-realestate] Failed to load app', error)
    revealPageOnFailure()
  })
})()
