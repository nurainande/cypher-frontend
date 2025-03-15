import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';
// import router from './routes/routes';
// import App from './App';
import './index.css'
import router from './routes/routes';
import ContextProvider from './Context/ContextProvider';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  </StrictMode>
);
