import React from 'react'

const Rank = ({name, entries}) => {
  console.log(name)
    const rank = `Your rank is ${entries}`
  return (
  <>
    <div className='text-lg center '>
          <p>Hi user `${name}`</p>  
    </div>
    <div className='text-lg center '>
          {rank}  
    </div>
    </>
  )
}

export default Rank