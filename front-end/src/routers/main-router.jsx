import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Testpage from '../routes/page'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Testpage/>,
    index: true
  }
])

export default router