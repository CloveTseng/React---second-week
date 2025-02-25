import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import App from './App';
import './styles.css';

const root = createRoot(document.querySelector('#root'));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
