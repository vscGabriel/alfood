import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './index.css';
import RouterApp from './router/router';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <RouterApp />
    </BrowserRouter>,
  </React.StrictMode>,
  document.getElementById('root')
);
