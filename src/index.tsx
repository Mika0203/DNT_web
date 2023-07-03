import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import reportWebVitals from './reportWebVitals';
import MainRouter from './routing/router';
import {ThemeProvider} from '@mui/material';
import {theme} from './styles/theme';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <ThemeProvider theme={theme}>
    <MainRouter />
  </ThemeProvider>
);
reportWebVitals();
