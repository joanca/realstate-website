import React from 'https://esm.sh/react@18';
import { createRoot } from 'https://esm.sh/react-dom@18/client';
import App from 'https://esm.sh/gh/joanca/realstate-website@main/src/App.jsx?jsx';

const root = createRoot(document.getElementById('emily-realestate'));
root.render(React.createElement(App));
