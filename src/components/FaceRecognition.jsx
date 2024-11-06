import React, {useRef, useEffect} from 'react'
// import drawBoundingBox from './drawBoundingBox'
import './faceRecognition.css'

const FaceRecognition = ({imageBox, boundingBox}) => {

  const canvasRef = useRef(null);

  useEffect(() => {
    // Ensure boundingBoxes has data and the image source is loaded
    if (boundingBox && boundingBox.length > 0) { 
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d'); // Get the 2D drawing context

      // Set canvas size to match the image's size
      const image = document.getElementById('img');
      canvas.width = image.width;
      canvas.height = image.height;

      // Clear previous drawings
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw each bounding box
      boundingBox.forEach((box) => {
        const { x, y, width, height } = box;
        ctx.strokeStyle = 'blue';
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, width, height); // Draw rectangle for bounding box
      });
    }
  }, [boundingBox, imageBox]);

      return (
    <div className='center pa-2' style={{ position: 'relative', display: 'inline-block' }}>
      {/* Display the image */}
      <img id="img" src={imageBox} alt="Detected face" style={{ width: '500px', height: '400px'}} />

      {/* Overlay the canvas on top of the image */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          pointerEvents: 'none', // Allows clicks to pass through to the image
        }}
      />
    </div>
  );
};

export default FaceRecognition
