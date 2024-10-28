import React, {useState, useEffect, useRef} from 'react'
import Nav from './components/Nav/Nav'
import Logo from './components/Logo/Logo'
import InputText from './components/InputForm/InputText'
import FaceRecognition from './components/FaceRecognition'
import './App.css'
import ParticlesComponent from './components/particles'
import Rank from './components/Rank'
import { data } from 'autoprefixer'

const App = () => {

    const calculateFaceLocation = (data) => {
        
        const clarifaiData = data.outputs[0].data.regions[0].region_info.bounding_box
        const image = document.getElementById('img') // get the image through dom manipulation
        const width = Number(image.width) // get the width of the image
        const height = Number(image.height) // get the width of the image
        
        const calculated = {
            top: Number(clarifaiData.top_row * height),
            bottom: Number(clarifaiData.bottom_row * height),
            left: Number(clarifaiData.left_col * width),
            right: Number(clarifaiData.right_col * width) 
        }
        console.log(calculated)
        return calculated
        // set the right location by multiply the giving coordinates to the width and height 

    }

    const canvas = () => {
        const canvasRef = useRef(null);
        const imgRef = useRef(null);
      
        // Function to draw bounding box
        const drawBoundingBox = (x, y, width, height) => {
          const canvas = canvasRef.current;
          console.log(canvas)
          const ctx = canvas.getContext('2d');
          const img = imgRef.current;
      
          if (img.complete) {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
            ctx.strokeStyle = 'red';
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
        };
      
        // Example coordinates
        useEffect(() => {
          drawBoundingBox(120, 40, 300, 200); // You can replace with dynamic values
        }, []);
    }

   

const setUpJSON = (imageUrl) => {
    const PAT = '87124373b52f4a0a9374b0aa624c5402';
    // Specify the correct user_id/app_id pairings
    // Since you're making inferences outside your app's scope
    const USER_ID = 'museya';
    const APP_ID = 'face-detection';
    // Change these to whatever model and image URL you want to use
    const MODEL_ID = 'face-detection';
    const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';
    const IMAGE_URL = imageUrl;

    
    ///////////////////////////////////////////////////////////////////////////////////
    // YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
    ///////////////////////////////////////////////////////////////////////////////////
    
    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID

        },
        
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": IMAGE_URL
                    }
                }
            }
        ]
    });
    
    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };
    // console.log(requestOptions)
    return requestOptions
}


// NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
// https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
// this will default to the latest version_id


const [inputUrl, setInputUrl] = useState('');
const [box, setBox] = useState(null)


const onInputChange = (event) => { 
setInputUrl(event.target.value)
}

const onButtonSubmit = () => {
    inputUrl

    fetch("/api/v2/models/" + 
        'face-detection' + "/versions/" + '6dc7e46bc9124c5c8824be4822abe105' + "/outputs", 
        setUpJSON(inputUrl))
    .then(response => response.json())
    .then(result => calculateFaceLocation(result))
    // .then(result => {
    //     const regions = result.outputs[0].data.regions;
    //     regions.forEach(region => {
    //         // Accessing and rounding the bounding box values
    //         const boundingBox = region.region_info.bounding_box;
    //         const topRow = boundingBox.top_row.toFixed(3);
    //         const leftCol = boundingBox.left_col.toFixed(3);
    //         const bottomRow = boundingBox.bottom_row.toFixed(3);
    //         const rightCol = boundingBox.right_col.toFixed(3);

    //         region.data.concepts.forEach(concept => {
    //             // Accessing and rounding the concept value
    //             const name = concept.name;
    //             const value = concept.value.toFixed(4);

    //             console.log(`${name}: ${value} BBox: ${topRow}, ${leftCol}, ${bottomRow}, ${rightCol}`);
    
    //         });
    //     });

    // })
    .catch(error => console.log('error', error));

}

  return (
    
      <div className='App'>
        <ParticlesComponent id = 'particle'/>
        <Nav />
        <Logo />
        <Rank />
        <InputText onInputChange = {onInputChange} onButtonSubmit = {onButtonSubmit}/>

        <FaceRecognition canvas = {canvas} imageBox = {inputUrl}/>
      </div>
  )
}

export default App

// Read and understand logic giving by chatgpt
// test chatgpt example ,try to use what its prompt said about creating other components and imports
// go back and use the way you were taught by adre  
