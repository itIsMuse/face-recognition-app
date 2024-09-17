import React from 'react'
import Logo from '../Logo/Logo'


const Nav = () => {
  return (
    <div>
     
        <nav className='inline-block grid grid-cols-2 m-2 ' >
      <Logo />
        <p className='inline-block text-lg underline text-black p-3 hover:opacity-75 cursor-pointer'>Sign out </p>
      </nav>
    </div>
  )
}

export default Nav
