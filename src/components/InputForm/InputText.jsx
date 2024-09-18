import React from 'react'
import './InputText.css'

const InputText = () => {

  const introText = 'The brain will detect faces in your pictures. Give it a try'
  return (
    <>
    <div className='text-lg w-full border'>
      <p className='text-center'>{introText}</p>
    <div className='center'>
      <input className='w-4/5'  type="text" />
      <button className='p-2 bg-yellow-800 w-2/5 flex-grow' type='submit'>Detect</button>
    </div>
    </div>
    </>
  )
}

export default InputText
