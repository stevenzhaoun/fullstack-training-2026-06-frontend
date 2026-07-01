import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CssBaseline } from '@mui/material'
import './index.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import App from './App.tsx'
import { BrowserRouter } from 'react-router';
import { Provider } from 'react-redux';
import store from './store.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CssBaseline />
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
