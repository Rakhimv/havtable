
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { NextUIProvider } from '@nextui-org/react'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <NextUIProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </NextUIProvider>
  </StrictMode>,
)


if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(registration => {
      console.log('Service Worker зарегистрирован с областью видимости:', registration.scope);
    })
    .catch(error => {
      console.error('Ошибка регистрации Service Worker:', error);
    });
}


