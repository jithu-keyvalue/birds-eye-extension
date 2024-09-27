import React from 'react'
import './Layout.scss'
import { Outlet } from 'react-router-dom'

const Layout = (props:any) => {
  return (
    <main className='layout'>
      <Outlet context={props} />
    </main>
  )
}

export default Layout