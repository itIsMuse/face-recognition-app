import React from 'react'
import './InputText.css'


const InputText = ({onInputChange, onButtonSubmit}) => {

  const introText = 'The brain will detect faces in your pictures. Give it a try'
  return (
    <>
    <div className='p-5 pt-9 mt-8 shadow text-lg w-full'>
      <p className='text-center'>{introText}</p>
      <div className='form p-5 rounded-md shadow-md'>
    <div className='center'>
      <input className='w-3/5 text-black p-2'  type="text" onChange={onInputChange}/>
      <button className='p-1 bg-blue-800 w-1/5 transition-transform duration-700 ease-in-out hover:scale-110' type='submit' onClick ={onButtonSubmit}>Detect</button>
    </div>
    </div>
    </div>
    </>
  )
}

export default InputText
