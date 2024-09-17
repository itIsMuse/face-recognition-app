import React from 'react'
import Tilt from 'react-parallax-tilt'
import './logo.css'
import MUSEE from'./MUSEE.png'

const Logo = () => {
  return (
    <div
      className ="m-4 mt-0">
        <Tilt>
      <div className='m-7' style={{ height: '250px', backgroundColor: 'darkgreen' }}>
       <img src={MUSEE}/>
      </div>
    </Tilt>
</div>
  )
}

export default Logo
