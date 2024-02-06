import ReactDOM from 'react-dom/client'
import './index.css'
import { router } from './routes/Routes'
import { RouterProvider } from 'react-router-dom'
import UserContext from './UserContext'
import React from 'react'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <UserContext>
  <RouterProvider router={router} />
  </UserContext>
)
