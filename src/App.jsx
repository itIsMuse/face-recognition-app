import React, {useState, useEffect, useRef} from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, NavLink, useNavigate} from 'react-router-dom';
import Nav from './components/Nav/Nav'
import Logo from './components/Logo/Logo'
import InputText from './components/InputForm/InputText'
import FaceRecognition from './components/FaceRecognition'
import './App.css'
import ParticlesComponent from './components/particles'
import Rank from './components/Rank'
import SignIn from './SignIn form/SignIn'
import Register from './components/Register/Register';

const App = () => {



const navigate = useNavigate()
    const [boundingBox, setBoundingBox] = useState({})
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [route, setRoute] = useState('')

    const [userinfo, setUserinfo] = useState({
                "id" : "",
                'name': "",
                'email': "",
                'password': "",
                'entries': 0,
                'Date-joined': new Date
    })

    
        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await fetch('http://localhost:4500/');
                    const data = await response.json();
                    console.log(data)
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
    
            fetchData(); // Call the function when the component mounts
        }, [])
   

    const calculateFaceLocation = (data) => {
            const regions = data.outputs[0].data.regions;
            const image = document.getElementById('img')
            const imageWidth = image.width
            const imageHeight = image.height
            // Calculate x, y, width, height from the bounding box
            
            return regions.map(box =>{
                const boundingBox = box.region_info.bounding_box
                return{
                     x : boundingBox.left_col * imageWidth,
             y : boundingBox.top_row * imageHeight,
             width : (boundingBox.right_col - boundingBox.left_col) * imageWidth,
             height : (boundingBox.bottom_row - boundingBox.top_row) * imageHeight,
                }
            })
        }
        ;
       

   

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

// const handleAuthentication = () => {
// setIsAuthenticated(true)
// navigate('/home')
// }

const handleAuthentication = () => {
    setIsAuthenticated(true); // Update the authentication state
    navigate('/home'); // Navigate to the home route
  };

// const onRouteChange = (route) => {
// setRoute(route)
// navigate(route)
// }

const handleRegister = ()=>{
    navigate('/signin') 
}

  return (

      <div className="App">
        <ParticlesComponent id="particle" />
        <Nav isAuthenticated={isAuthenticated}/>

        <Routes>
          <Route path="/" element={<Navigate to="/signin" />} />
          <Route path="/signin" element={<SignIn onAuthenticate={handleAuthentication}  />} />
          <Route path="/register" element={<Register handleRegister={handleRegister} onAuthenticate = {handleAuthentication} />} />
          <Route
            path="/home"
            element={
              <div>
                <Logo />
                <Rank />
                <InputText onInputChange={onInputChange} onButtonSubmit={onButtonSubmit} />
                <FaceRecognition boundingBox={boundingBox} imageBox={inputUrl} />
              </div>
            }
          />
        </Routes>
      </div>
  )
}

export default App


//youre tryuing to stop using 'success' for the check on the frontend and now start using the user object 
// you also want to integrate the whole 
