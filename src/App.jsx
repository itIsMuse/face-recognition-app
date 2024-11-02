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


  const [boundingBox, setBoundingBox] = useState({})
    const calculateFaceLocation = (data) => {
            const boundingBox = data.outputs[0].data.regions[0].region_info.bounding_box;
            const image = document.getElementById('img')
            const imageWidth = image.width
            const imageHeight = image.height
            // Calculate x, y, width, height from the bounding box
            const x = boundingBox.left_col * imageWidth;
            const y = boundingBox.top_row * imageHeight;
            const width = (boundingBox.right_col - boundingBox.left_col) * imageWidth;
            const height = (boundingBox.bottom_row - boundingBox.top_row) * imageHeight;
            console.log(x, y, width, height)
            return { x, y, width, height };
        }
        ;
        
        // set the right location by multiply the giving coordinates to the width and height 
       

   

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
// const [box, setBox] = useState(null)


const onInputChange = (event) => { 
setInputUrl(event.target.value)
}

const onButtonSubmit = () => {
    inputUrl

    fetch('/api/v2/models/' + 
        'face-detection' + "/versions/" + '6dc7e46bc9124c5c8824be4822abe105' + "/outputs", 
        setUpJSON(inputUrl))
    .then(response => response.json())
    .then(result => {
        const faceLocation = calculateFaceLocation(result);
        setBoundingBox(faceLocation)
    })
    .catch(error => console.log('error', error));
}

  return (
    
      <div className='App'>
        <ParticlesComponent id = 'particle'/>
        <Nav />
        <Logo />
        <Rank />
        <InputText onInputChange = {onInputChange} onButtonSubmit = {onButtonSubmit}/>

        <FaceRecognition boundingBox = {[boundingBox]} imageBox = {inputUrl}/>
      </div>
  )
}

export default App


// look for the error that giving you the error
// continue the collecting of data from clarifai  
