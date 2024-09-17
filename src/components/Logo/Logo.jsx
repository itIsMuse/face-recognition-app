import React from 'react'
import Tilt from 'react-parallax-tilt'
import './logo.css'
import MUSEE from'./MUSEE.png'

const Logo = () => {
  return (
    <div
      className ="m-4 mt-0 grid grid-cols-5 grid-row-5">
        <Tilt className='tilt' options={{max: 25}} style={{}}>
      <div className='' style={{ height: '100%',backgroundColor: '#060842' }}>
       <img src={MUSEE}/>
      </div>
    </Tilt>
</div>
  )
}

export default Logo
