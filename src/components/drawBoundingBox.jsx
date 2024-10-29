    const drawBoundingBox = (canvas, img, x, y, width, height) => {
        const ctx = canvas.getContext('2d');
      
        // Ensure the image is loaded before drawing
        if (img.complete) {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
          ctx.strokeStyle = 'blue';
          ctx.lineWidth = 2;
          ctx.strokeRect(x, y, width, height); // Draws bounding box
        } else {
          img.onload = () => {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = 'red';
            ctx.lineWidth = 2;
            ctx.strokeRect(x, y, width, height); // Draws bounding box
          };
         }    
         }
  

export default drawBoundingBox
