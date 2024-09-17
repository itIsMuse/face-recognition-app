import React from 'react'
import Tilt from 'react-parallax-tilt'
import './logo.css'

const Logo = () => {
  return (
    <div
      className ="m-4 mt-0">
        <Tilt className='tilt rounded-md shadow-lg' options = {{max: 25}} style={{height: '100px'}}>
<div className='tilt-inner'>
🌝
</div>
</Tilt>
</div>
  )
}

export default Logo
