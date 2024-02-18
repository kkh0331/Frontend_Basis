import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Testpage from '../routes/page'
import CampaignListPage from '~/routes/campaign/page'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Testpage/>,
    index: true
  },
  {
    path: '/campaign',
    element : <CampaignListPage/>,
    index: true
  }
])

export default router