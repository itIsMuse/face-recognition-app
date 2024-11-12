import React from 'react'


const Nav = ({onRouteChange, Register, route}) => {

  return (
    
    <div>
{route === 'signin' ? <div>
      <nav className='flex justify-end' >    
        <p onClick={Register} className='text-lg underline text-white p-3 hover:opacity-75 cursor-pointer'>Register </p>
      </nav>
</div>: route === 'register' ?<nav> <p onClick={onRouteChange} className='text-lg underline text-white p-3 hover:opacity-75 cursor-pointer'>Sign out </p></nav>:<nav className='flex justify-end' >    
        <p onClick={Register} className='text-lg underline text-white p-3 hover:opacity-75 cursor-pointer'>Register </p>
        <p onClick={onRouteChange} className='text-lg underline text-white p-3 hover:opacity-75 cursor-pointer'>Sign out </p>
      </nav>} 
    </div>
  )

}
export default Nav
