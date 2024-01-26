import ReactDOM from 'react-dom/client'
import './index.css'
import React from 'react'
import { router } from './routes/Routes'
import { RouterProvider } from 'react-router-dom'
import UserContext from './UserContext'



ReactDOM.createRoot(document.getElementById('root')!).render(
  <UserContext>
  <RouterProvider router={router} />
  </UserContext>
)
