import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import './index.css';

// Guard against third-party extension injection issues (MetaMask, Phantom, etc.)
if (typeof window !== 'undefined') {
  window.addEventListener(
    'unhandledrejection',
    (event) => {
      const reason = event.reason;
      const msg = (reason && (reason.message || reason.stack || String(reason))) || '';
      if (
        /metamask|ethereum|web3|wallet|chrome-extension|moz-extension/i.test(msg)
      ) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    },
    true
  );

  window.addEventListener(
    'error',
    (event) => {
      const msg = event.message || '';
      const file = event.filename || '';
      if (
        /metamask|ethereum|web3|wallet|chrome-extension|moz-extension/i.test(msg) ||
        /chrome-extension|moz-extension/i.test(file)
      ) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    },
    true
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
