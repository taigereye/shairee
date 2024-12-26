import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     {/* All components within App are within a routing context and can use nagivation hook */}
    <BrowserRouter> 
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
