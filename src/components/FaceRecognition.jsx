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
    <div className='center pa-2 ' >
      <img id='img' width="500" height="400" ref={imgRef}  src = {imageBox} alt = 'sent image'/>
      <canvas  ref={canvasRef} ></canvas>
      </div>
  )
}

export default FaceRecognition
