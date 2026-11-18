import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles/index.css';

// Offline support for the installed app. Production builds only (it would cache
// stale files during development), and only where service workers are allowed:
// https or localhost, not file:// or sandboxed embeds.
if (import.meta.env.PROD && window.isSecureContext && window.location.protocol !== 'file:') {
  window.addEventListener('load', () => {
    try {
      navigator.serviceWorker?.register('./sw.js').catch(() => {});
    } catch {
      /* not available in this context */
    }
  });
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
