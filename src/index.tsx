import React from 'react';
import { createRoot } from 'react-dom/client';
import 'antd/dist/reset.css'; // Ensure you have the correct path
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();






