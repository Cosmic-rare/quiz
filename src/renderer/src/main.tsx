import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Viewer from "./viewer"
import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom"
import Responder from './responder'

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/viewer",
    element: <Viewer />,
  },
  {
    path: "/responder",
    element: <Responder />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
