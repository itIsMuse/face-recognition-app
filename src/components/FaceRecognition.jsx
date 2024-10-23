import React from 'react'

const FaceRecognition = ({imageBox}) => {
  return (
    <div className='center pa-2' >
      <div className=''>
      <img id='img'  src = {imageBox} alt = 'sent image' width='500px' height='auto'/>
      </div>
    </div>
  )
}

export default FaceRecognition
