import React from 'react'


const Nav = () => {
  return (
    <div>
      <nav style={{display : 'flex', justifyContent: 'flex-end', textDecoration: 'underline'}}>
        <p className='text-lg underline text-yellow p-3 hover:opacity-75 cursor-pointer'>Sign out </p>
      </nav>
    </div>
  )
}

export default Nav
