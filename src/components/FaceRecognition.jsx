import React from 'react'

const FaceRecognition = ({imageBox}) => {
  return (
    <div className='center' >
      <img src = {imageBox} alt = 'sent image'/>
    </div>
  )
}

export default FaceRecognition
