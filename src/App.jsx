import React from 'react'
import Nav from './components/Nav/Nav'
import Logo from './components/Logo/Logo'
import InputText from './components/InputForm/InputText'
import FaceRecognition from './components/FaceRecognition'
import './App.css'
import ParticlesComponent from './components/particles'

const App = () => {


  return (
    
      <div className='App'>
<ParticlesComponent id = 'particles'/>
        <Nav />
        <Logo />
        <Rank />
         <InputText />
        {/* <FaceRecognition /> */}
      </div>
  )
}

export default App
