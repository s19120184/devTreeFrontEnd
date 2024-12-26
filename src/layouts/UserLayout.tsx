import React from 'react'
import Logo from '../components/logo/Logo'
import { Outlet } from 'react-router-dom'

export default function UserLayout() {
  return (
    <>
      <div className=" bg-slate-800 min-h-screen ">
        <div className="max-w-lg mx-auto pt-10 px-5">
          <Logo user />
          <div className="py-10">
            <Outlet />
          </div>
        </div>
      </div>
      {/*Utilizamos el Toaster en el layout que a su vez se expadira a sus vistas */}
      
    </>
  )
}
