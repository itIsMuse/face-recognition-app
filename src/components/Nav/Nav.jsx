import React from 'react'


const Nav = ({onRouteChange}) => {

  return (
    <div>
        <nav className='flex justify-end' >
        <p onClick={onRouteChange} className='text-lg underline text-white p-3 hover:opacity-75 cursor-pointer'>Sign out </p>
      </nav>
    </div>
  )
}

export default Nav
