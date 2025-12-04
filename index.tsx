import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

console.log("index.tsx: Starting...");
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error("No root");

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
console.log("index.tsx: Render called.");