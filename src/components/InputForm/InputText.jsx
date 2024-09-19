import React from 'react'
import './InputText.css'

const InputText = () => {

  const introText = 'The brain will detect faces in your pictures. Give it a try'
  return (
    <>
    <div className='text-lg w-full border'>
      <p className='text-center'>{introText}</p>
    <div className='center gap-4'>
      <input className='w-3/5'  type="text" />
      <button className='p-3 bg-yellow-800 w-2/5  hover:flex-grow-1 transition-all ' type='submit'>Detect</button>
    </div>
    </div>
    </>
  )
}

export default InputText
