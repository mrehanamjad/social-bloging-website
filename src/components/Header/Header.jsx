import React, { useState } from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FaBars, FaHome, FaPlus, FaList, FaUser, FaSignInAlt, FaUserPlus } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()
  const [showNavBar, setShowNavBar] = useState(false)

  const navItems = [
    {
      name: 'Home',
      slug: '/',
      active: authStatus,
      icon: FaHome
    },
    {
      name: 'Login',
      slug: '/login',
      active: !authStatus,
      icon: FaSignInAlt
    },
    {
      name: 'Signup',
      slug: '/signup',
      active: !authStatus,
      icon: FaUserPlus
    },
    {
      name: 'All Posts',
      slug: '/all-posts',
      active: authStatus,
      icon: FaList
    },
    {
      name: 'My Posts',
      slug: '/my-posts',
      active: authStatus,
      icon: FaUser
    },
    {
      name: 'Add Post',
      slug: '/add-post',
      active: authStatus,
      icon: FaPlus
    },
  ]

  const NavButton = ({ item, onClick }) => (
    <button
      onClick={onClick}
      className={`cursor-pointer relative flex items-center justify-center px-4 py-2 transition-all duration-300 
         hover:text-blue-600 
        hover:bg-blue-50 rounded-3xl
        ${item.name === 'Signup' ? 'bg-blue-600 text-white' : 'text-gray-700'}
         `}
    >
      <item.icon className="mr-2 " />
      <span className="text-sm font-medium">{item.name}</span>
    </button>
  )

  return (
    <header className='w-full bg-white shadow-md '>
      <Container>
        {/* Desktop Navigation */}
        <nav className='hidden md:flex items-center justify-between py-4 px-2'>
          <Link to='/' className="flex items-center">
            <Logo />
          </Link>
          
          <div className="flex items-center space-x-2">
            {navItems.map((item) => item.active && (
              <NavButton 
                key={item.name} 
                item={item} 
                onClick={() => navigate(item.slug)} 
              />
            ))}
          </div>
            
            {authStatus && <LogoutBtn className="ml-4" />}
        </nav>

        {/* Mobile Navigation */}
        <nav className="md:hidden flex items-center  justify-between p-4">
          <Link to='/' className="flex items-center">
            <Logo />
          </Link>
          
          <div>
            <button 
              className="text-gray-600 focus:outline-none"
              onClick={() => setShowNavBar(!showNavBar)}
            >
              {showNavBar ? (
                <IoClose className="text-3xl text-red-500" />
              ) : (
                <FaBars className="text-3xl" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        {showNavBar && (
          <div className="md:hidden absolute left-0 right-0 z-50 bg-white shadow-lg">
            <div className="flex flex-col divide-y divide-gray-200">
              {navItems.map((item) => item.active && (
                <div 
                  key={item.name} 
                  className="px-4 py-3 hover:bg-gray-50 transition-colors"
                  onClick={() => {
                    navigate(item.slug)
                    setShowNavBar(false)
                  }}
                >
                  <div className="flex items-center text-gray-700 hover:text-blue-600 hover:bg-blue-50">
                    <item.icon className="mr-3" />
                    <span className="text-sm font-medium">{item.name}</span>
                  </div>
                </div>
              ))}
              
              {authStatus && (
                <div className="px-4 py-3">
                  <LogoutBtn className="w-full" />
                </div>
              )}
            </div>
          </div>
        )}
      </Container>
    </header>
  )
}

export default Header