import React from 'react'
import './InputText.css'

const InputText = () => {

  const introText = 'The brain will detect faces in your pictures. Give it a try'
  return (
    <>
    <div className='text-lg container border'>
      <div className='center'>
      <p>{introText}</p>
      </div>
    <div className='center'>
      <input className='center w-3/4' type="text" />
      <button className='border p-1 grow'type='submit'>Detect</button>
    </div>
    </div>
    </>
  )
}

export default InputText
