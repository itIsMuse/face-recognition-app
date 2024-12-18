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
    const [signedIn, setSignedIn] = useState('false')

    const [userinfo, setUserinfo] = useState({
                "id" : "",
                'name': "",
                'email': "",
                'password': "",
                'entries': 0,
                'Date-joined': new Date
    })

    const loadUser = (data)=>{
        setUserinfo({
          "id": data.id,
          "name": data.name,
          "email": data.email,
          "password": data.password,
          "entries": data.entries,
          "Date-joined": data.Date
         })
console.log(userinfo)
    }

    
       

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

    userinfo.entries ++
}



const handleAuthentication = () => {
    setIsAuthenticated(true); // Update the authentication state
    navigate('/home'); // Navigate to the home route
  };    

  const removeAuthentication = ()=>{
    setIsAuthenticated(false)
  }


const handleRegister = ()=>{
    handleAuthentication()
}

const handleSignInOn = ()=> {
    setSignedIn(true)
}
const handleSignInOff = () => {
    setSignedIn(false)
}



  return (

      <div className="App">
        <ParticlesComponent id="particle" />
        <Nav removeAuthentication={removeAuthentication} signedIn ={signedIn} handleSignInOff ={handleSignInOff} />

        <Routes>
          <Route path="/" element={<Navigate to="/signin" />} />
          <Route path="/signin" element={<SignIn onAuthenticate={handleAuthentication} signedIn = {handleSignInOn}  loadUser = {loadUser} />} />
          <Route path="/register" element={<Register handleRegister={handleRegister} onAuthenticate = {handleAuthentication} />} />
          <Route
            path="/home"
            element={
              <div>
                <Logo />
                <Rank name = {userinfo.name} entries = {userinfo.entries}/>
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



// remember youre seeing the project from three different computers
// you create your database first from the details you know you will need 
// i am a bit worried i may not be able to do it myself without help from chat and google but arent we all they main secret is to creat so many projects that it is second nature and how do i do that ? by getting a job in tech to learn create this first and then the next 