import React, {useRef, useEffect} from 'react'
import drawBoundingBox from './drawBoundingBox'
import './faceRecognition.css'

const FaceRecognition = ({imageBox, boundingBox}) => {

  const canvasRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    if (boundingBox && canvasRef.current && imgRef.current) {
      const { x, y, width, height } = boundingBox;
      drawBoundingBox(canvasRef.current, imgRef.current, x, y, width, height);
    }
  }, [boundingBox]);

  return (
    <div className='center pa-2' >
      <div className=''>
      <canvas ref={canvasRef} width="300" height="200"></canvas>
      <img  ref={imgRef} id='img'  src = {imageBox} alt = 'sent image'/>
      </div>
    </div>
  )
}

export default FaceRecognition
