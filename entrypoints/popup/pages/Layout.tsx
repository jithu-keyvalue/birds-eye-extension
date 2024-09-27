import React from 'react'
import './Layout.scss'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <main className='layout'>
      <Outlet />
    </main>
  )
}

export default Layout