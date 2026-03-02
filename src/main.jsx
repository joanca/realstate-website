import React from 'https://esm.sh/react@18';
import { createRoot } from 'https://esm.sh/react-dom@18/client';

const isDev = ['localhost', '127.0.0.1'].includes(window.location.hostname);
const devParam = isDev ? '&dev' : '';

const App = (await import(`https://esm.sh/gh/joanca/realstate-website@main/src/App.jsx?jsx${devParam}`)).default;

const root = createRoot(document.getElementById('emily-realestate'));
root.render(React.createElement(App));
