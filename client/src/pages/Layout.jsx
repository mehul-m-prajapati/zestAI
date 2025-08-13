import { Outlet, useNavigate } from "react-router-dom"
import { assets } from '../assets/assets'
import { Menu, X } from 'lucide-react'
import {SignIn, useUser} from '@clerk/clerk-react'
import Sidebar from '../components/Sidebar'
import { useState } from "react"


function Layout() {

  const navigate = useNavigate();
  const {user} = useUser();
  const [sidebar, setSidebar] = useState(false);

  return user ? (
    <div>
        <nav className='w-full px-8 min-h-14 flex items-center justify-between border-b border-gray-200'>
            <img src={assets.logo} className='cursor-pointer w-12 sm:w-14' alt='' onClick={() => navigate('/')} />
            {sidebar ? (
            <X
                onClick={() => setSidebar(false)}
                className='w-6 h-6 text-gray-600 sm:hidden'
            />
            ) : (
            <Menu
                onClick={() => setSidebar(true)}
                className='w-5 h-6 text-gray-600 sm:hidden'
            />
            )}
        </nav>

        <div className='flex-1 w-full flex h-[calc(100vh-64px)]'>
            <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
            <div className='flex-1 bg-[#F4F7FB]'>
                <Outlet />
            </div>
        </div>
    </div>
  ) :
  <div className='flex items-center justify-center h-screen'>
    <SignIn />
  </div>
}

export default Layout
