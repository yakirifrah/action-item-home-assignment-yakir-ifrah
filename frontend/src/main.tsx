import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import './index.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import './App.css'
import './reset.css'
import {DefaultRoutes} from './conf/projectConstant.ts'
import React from 'react'
import ReactDOM from 'react-dom/client'
import ErrorScreen from './screens/ErrorScreen/ErrorScreen.tsx'
import HomeScreen from './screens/HomeScreen/HomeScreen.tsx'
import ListScreen from './screens/ListScreen/ListScreen.tsx'
import ProfileScreen from './screens/ProfileScreen/ProfileScreen.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorScreen />,
    element: <HomeScreen />,
  },
  {
    path: DefaultRoutes.users,
    errorElement: <ErrorScreen />,
    element: <ListScreen />,
  },
  {
    path: DefaultRoutes.History,
    errorElement: <ErrorScreen />,
    element: <ListScreen showHistory={true} />,
  },
  {
    path: DefaultRoutes.Profile,
    errorElement: <ErrorScreen />,
    element: <ProfileScreen />,
  },
])
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
