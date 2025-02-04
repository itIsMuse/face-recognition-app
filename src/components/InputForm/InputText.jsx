import React from 'react'
import './InputText.css'


const InputText = ({onInputChange, onButtonSubmit}) => {

  const introText = 'Input the face URL to detect the face in the image'
  return (
    <>
    <div className='p-5 pt-9 mt- shadow text-lg w-full'>
      <p className='text-center'>{introText}</p>
      <div className='form p-5 rounded-md shadow-md'>
    <div className='center'>
      <input onChange={onInputChange}  className='w-3/5 text-black'  type="text" />
      <button onClick={onButtonSubmit} className='p-1 bg-blue-800 w-1/5 transition-transform duration-700 ease-in-out hover:scale-110' type='submit'>Detect</button>
    </div>
    </div>
    </div>
    </>
  )
}

export default InputText
