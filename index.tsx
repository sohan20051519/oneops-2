
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Mock process.env for the frontend environment
const process = {
  env: {
    API_KEY: 'AIzaSyAMSh9xGexcNFizL3rCRlA1qEVsTGuun68'
  }
};
(window as any).process = process;

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
