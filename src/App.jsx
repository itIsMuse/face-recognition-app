import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Logo from './components/Logo'
import InputText from './components/InputText'
import Background from './components/Background'

import './App.css'

import React from 'react'
import HomePage from './pages/HomePage'

const App = () => {

  return (
    <div>
      <Routes>
      <Route path='/home' element= {<HomePage/>}/>
      <Route path='/logo' element= {<Logo/>}/>
      <Route path='/' element= {<InputText />}/>
      <Route path='/home' element= {<InputText />}/>
<Background />
      </Routes>
    </div>
  )
}

export default App
