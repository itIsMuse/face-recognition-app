import React from 'react'

const FaceRecognition = ({imageBox, canvas}) => {
  console.log(canvas)
  return (
    <div className='center pa-2' >
      <div className=''>
      <canvas ref={canvas} width="500" height="auto"></canvas>
      <img  id='img'  src = {imageBox} alt = 'sent image' width='500px' height='auto'/>
      </div>
    </div>
  )
}

export default FaceRecognition
