// Safe localStorage and sessionStorage polyfill for iframe/cross-origin security restrictions
try {
  const test = window.localStorage;
} catch (e) {
  try {
    const store: Record<string, string> = {};
    const mockStorage = {
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, value: any) => { store[key] = String(value); },
      removeItem: (key: string) => { delete store[key]; },
      clear: () => { for (const k in store) delete store[k]; },
      key: (i: number) => Object.keys(store)[i] || null,
      get length() { return Object.keys(store).length; }
    };
    Object.defineProperty(window, 'localStorage', {
      value: mockStorage,
      writable: true,
      configurable: true
    });
  } catch (err) {
    console.warn("Failed to polyfill localStorage:", err);
  }
}

try {
  const test = window.sessionStorage;
} catch (e) {
  try {
    const store: Record<string, string> = {};
    const mockStorage = {
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, value: any) => { store[key] = String(value); },
      removeItem: (key: string) => { delete store[key]; },
      clear: () => { for (const k in store) delete store[k]; },
      key: (i: number) => Object.keys(store)[i] || null,
      get length() { return Object.keys(store).length; }
    };
    Object.defineProperty(window, 'sessionStorage', {
      value: mockStorage,
      writable: true,
      configurable: true
    });
  } catch (err) {
    console.warn("Failed to polyfill sessionStorage:", err);
  }
}

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
