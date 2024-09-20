import React from 'react'
import './InputText.css'

const InputText = () => {

  const introText = 'The brain will detect faces in your pictures. Give it a try'
  return (
    <>
    <div className='text-lg w-full border'>
      <p className='text-center'>{introText}</p>
    <div className='center'>
      <input className='w-3/5'  type="text" />
      <button className='p-2 bg-yellow-600 w-1/5 transition-transform duration-700 ease-in-out hover:scale-110' type='submit'>Detect</button>
    </div>
    </div>
    </>
  )
}

export default InputText
