import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Sub from './sub'
import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom"

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/sub",
    element: <Sub />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
