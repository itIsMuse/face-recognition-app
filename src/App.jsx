import React, {useState} from 'react'
import Nav from './components/Nav/Nav'
import Logo from './components/Logo/Logo'
import InputText from './components/InputForm/InputText'
import FaceRecognition from './components/FaceRecognition'
import './App.css'
import ParticlesComponent from './components/particles'
import Rank from './components/Rank'

const App = () => {

    const calculateFaceLocation = (data) => {
        const image = document.getElementById('img') // get the image through dom manipulation
        const width = Number(image.width) // get the width based on the cordinates given by clarifai
        const height = Number(image.height) // get the width based on the cordinates given by clarifai
        console.log(width, height) //check if it is working

        return 
        // set the right location by multiply the giving coordinates to the width and height 

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
    console.log(requestOptions)
    return requestOptions
}


// NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
// https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
// this will default to the latest version_id


const [inputUrl, setInputUrl] = useState('');
const [faceData, setFaceData] = useState(null)


const onInputChange = (event) => { 
setInputUrl(event.target.value)
}

const onButtonSubmit = () => {
    inputUrl

    fetch("/api/v2/models/" + 
        'face-detection' + "/versions/" + '6dc7e46bc9124c5c8824be4822abe105' + "/outputs", 
        setUpJSON(inputUrl))
    .then(response => calculateFaceLocation(response))
    .then(result => {
        const regions = result.outputs[0].data.regions;
        regions.forEach(region => {
            // Accessing and rounding the bounding box values
            const boundingBox = region.region_info.bounding_box;
            const topRow = boundingBox.top_row.toFixed(3);
            const leftCol = boundingBox.left_col.toFixed(3);
            const bottomRow = boundingBox.bottom_row.toFixed(3);
            const rightCol = boundingBox.right_col.toFixed(3);

            region.data.concepts.forEach(concept => {
                // Accessing and rounding the concept value
                const name = concept.name;
                const value = concept.value.toFixed(4);

                console.log(`${name}: ${value} BBox: ${topRow}, ${leftCol}, ${bottomRow}, ${rightCol}`);
    
            });
        });

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

        <FaceRecognition imageBox = {inputUrl}/>
      </div>
  )
}

export default App

// what do i want to do
// 1. create a function that collects data from the regions and calculates the location
// 2. calculate that data relative to the total image
// 3. display a box that surrounds that relative value i calculated
